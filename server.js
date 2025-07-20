// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Routes = require("./routes4cook/routes")

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Connect to MongoDB
connectDB().catch(console.error);

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use("/", Routes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on http://localhost:${PORT}");
});
