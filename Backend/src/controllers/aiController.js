const { GoogleGenerativeAI } = require("@google/generative-ai");
const Pet = require("../models/Pet");
const Vaccination = require("../models/Vaccination");
const Appointment = require("../models/Appointment");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "YOUR_MOCK_GEMINI_KEY");

exports.chatWithAI = async (req, res) => {
  try {
    const { message, history } = req.body;
    const userId = req.user.id; // From authMiddleware

    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        reply: "Hi! I'm your PetCare AI assistant. (Demo Mode: Add GEMINI_API_KEY to .env to enable real AI). How can I help with your pet today?",
        isMock: true
      });
    }

    console.log(`[AI Chat] Fetching context for User: ${userId}`);

    // 1. Fetch User's Pets
    const pets = await Pet.find({ ownerId: userId });
    const petIds = pets.map(p => p._id);

    // 2. Fetch Vaccinations and Appointments in parallel
    const [vaccinations, appointments] = await Promise.all([
      Vaccination.find({ petId: { $in: petIds } }),
      Appointment.find({ userId: userId }).populate('vetId petId')
    ]);

    // 3. Construct a rich Pet context string
    let petContext = "User's Registered Pets and Medical History:\n";
    if (pets.length === 0) {
      petContext += "The user has no pets registered yet.\n";
    } else {
      pets.forEach(pet => {
        petContext += `- ${pet.name} (${pet.type}, ${pet.breed || 'Unknown breed'}). Age: ${pet.age || 'N/A'}, Weight: ${pet.weight || 'N/A'}, Gender: ${pet.gender || 'N/A'}.\n`;
        
        // Add vaccinations for this pet
        const petVaccs = vaccinations.filter(v => v.petId.toString() === pet._id.toString());
        if (petVaccs.length > 0) {
          petContext += `  Vaccinations: ${petVaccs.map(v => `${v.vaccineType} (Last: ${v.dateAdministered ? v.dateAdministered.toDateString() : 'N/A'}, Next: ${v.nextDueDate ? v.nextDueDate.toDateString() : 'N/A'})`).join(", ")}\n`;
        }
        
        // Add medical history from Pet model
        if (pet.medicalHistory && pet.medicalHistory.length > 0) {
          petContext += `  Internal Medical Log: ${pet.medicalHistory.map(m => `${m.title} on ${m.date ? m.date.toDateString() : 'N/A'}: ${m.description}`).join("; ")}\n`;
        }
      });
    }

    // 4. Add Appointment Context
    if (appointments.length > 0) {
      const upcoming = appointments.filter(a => a.status === 'scheduled');
      const completed = appointments.filter(a => a.status === 'completed');
      
      if (upcoming.length > 0) {
        petContext += "\nUpcoming Vet Appointments:\n";
        upcoming.forEach(a => {
          petContext += `- ${a.petId?.name || 'Pet'} has an appointment for "${a.reason}" with ${a.vetId?.name || 'Vet'} on ${a.date ? a.date.toDateString() : 'N/A'} at ${a.time || 'N/A'}.\n`;
        });
      }
    }

    console.log(`[AI Chat] Context depth: ${petContext.length} chars. Message: "${message.substring(0, 30)}..."`);
    
    // Using gemini-2.5-flash
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemPrompt = `You are a specialized Pet Care Assistant. Your job is to answer questions related to pets. 
You HAVE ACCESS to the user's pet details and medical history below. Use this information to provide personalized, relevant advice. 
If the user's question is about a specific pet they own, refer to the details provided.
If the question is NOT related to pets, politely decline.

${petContext}

IMPORTANT:
1. If a pet is overdue for a vaccination or has a health issue in history, mention it if relevant to the user's question.
2. Be empathetic and professional.
3. If you suggest a vet visit, remind them of any upcoming appointments they already have if it's with the same vet or for the same reason.`;

    const contextPrompt = `${systemPrompt}

Previous Conversation:
${(history || []).map(h => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.parts[0].text}`).join("\n")}

User: ${message}`;

    const result = await model.generateContent(contextPrompt);
    const response = await result.response;
    const text = response.text();
    
    console.log(`[AI Chat] Success with personalized context.`);
    res.status(200).json({ reply: text });

  } catch (error) {
    console.error("AI Chat personalized error:", error);
    res.status(500).json({ 
      reply: "I'm having trouble analyzing your pet's records. Please try again!",
      error: error.message 
    });
  }
};
