const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Auto-create uploads folder
if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");

mongoose.connect("mongodb://127.0.0.1:27017/complaints");

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

app.listen(5000, () => console.log("Server running on port 5000 🚀"));
mongoose.connect("mongodb://127.0.0.1:27017/complaints")
.then(() => {
    console.log("MongoDB Connected ✅");
})
.catch((err) => {
    console.log("MongoDB Connection Error Details:");
    console.error(err); // This will print the full error message
});
// ✅ GET ALL COMPLAINTS (Add this part)
app.get("/complaints", async (req, res) => {
    try {
        const data = await Complaint.find().sort({ createdAt: -1 });
        res.json(data); // This sends the data to your browser
    } catch (error) {
        res.status(500).send("Error fetching complaints ❌");
    }
});