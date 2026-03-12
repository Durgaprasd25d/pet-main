const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Request logging middleware
app.use((req, res, next) => {
  const body = { ...req.body };
  if (body.password) body.password = "********";
  console.log(
    `[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`,
    body,
  );
  next();
});

// Import routes
const authRoutes = require("./routes/authRoutes");
const petRoutes = require("./routes/petRoutes");
const vetRoutes = require("./routes/vetRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const vaccinationRoutes = require("./routes/vaccinationRoutes");
const adoptionRoutes = require("./routes/adoptionRoutes");
const lostPetRoutes = require("./routes/lostPetRoutes");
const communityRoutes = require("./routes/communityRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/vets", vetRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/vaccinations", vaccinationRoutes);
app.use("/api/adoptions", adoptionRoutes);
app.use("/api/lostpets", lostPetRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Pet Care API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
