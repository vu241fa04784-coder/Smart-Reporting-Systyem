const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Serve frontend
app.use(express.static(__dirname));

// Homepage route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Auto-create uploads folder
if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");

// ❌ COMMENT MongoDB for now
// mongoose.connect("mongodb://127.0.0.1:27017/complaints");

const Complaint = mongoose.model("Complaint", {
    name: String,
    age: Number,
    profession: String,
    location: String,
    address: String,
    category: String,
    extraDetails: String,
    description: String,
    image: String,
    createdAt: { type: Date, default: Date.now }
});

const upload = multer({ 
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, "uploads/"),
        filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
    })
});

app.post("/submit", upload.single("photo"), async (req, res) => {
    try {
        const newComplaint = new Complaint({
            ...req.body,
            image: req.file ? req.file.filename : null
        });
        await newComplaint.save();
        res.status(200).send("Success");
    } catch (err) {
        res.status(500).send("Error");
    }
});

app.get("/complaints", async (req, res) => {
    try {
        const data = await Complaint.find().sort({ createdAt: -1 });
        res.json(data);
    } catch (error) {
        res.status(500).send("Error fetching complaints ❌");
    }
});

// ✅ Dynamic port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT + " 🚀");
});