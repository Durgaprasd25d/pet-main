const MedicalRecord = require("../models/MedicalRecord");
const Pet = require("../models/Pet");

const cloudinary = require("../config/cloudinaryConfig");

// @desc    Add a medical record
// @route   POST /api/medical-records
// @access  Private
exports.addMedicalRecord = async (req, res) => {
  const { petId, diagnosis, medication, notes, recordDate } = req.body;

  try {
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    let documentUrl = req.body.documentUrl || "";

    // Handle Cloudinary upload if file is present
    if (req.file) {
      documentUrl = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "auto", folder: "petcare_medical_records" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          },
        );
        uploadStream.end(req.file.buffer);
      });
    }

    const medicalRecord = new MedicalRecord({
      petId,
      vetId: req.user.role === "vet" ? req.user._id : null,
      diagnosis,
      medication,
      notes,
      documentUrl,
      recordDate: recordDate || Date.now(),
    });

    const createdRecord = await medicalRecord.save();
    res.status(201).json(createdRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get medical records for a pet
// @route   GET /api/medical-records/pet/:petId
// @access  Private
exports.getMedicalRecordsByPet = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ petId: req.params.petId })
      .populate("vetId", "name clinicName specialty")
      .sort("-recordDate");
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a medical record
// @route   DELETE /api/medical-records/:id
// @access  Private
exports.deleteMedicalRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    await MedicalRecord.findByIdAndDelete(req.params.id);
    res.json({ message: "Medical record removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
