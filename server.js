const express = require("express");
const cors = require("cors"); // Pastikan 'cors' terinstal (npm install cors)

const app = express();
app.use(cors());
app.use(express.json());

// 1. MELAYANI FILE STATIS (FRONTEND)
// Express akan melayani semua file seperti index.html, CSS, JS dari folder 'public'.
app.use(express.static('public')); 

// 2. DATABASE SEMENTARA (IN-MEMORY)
let allDatasets = [];

// ==========================================
// API ROUTES
// ==========================================

// GET: Mengambil semua dataset
app.get("/api/data", (req, res) => {
  res.json(allDatasets);
});

// POST: Menyimpan dataset baru
app.post("/api/data", (req, res) => {
  const dataset = req.body;
  allDatasets.push(dataset);
  res.json({ message: "Dataset berhasil disimpan", dataset });
});

// DELETE: Menghapus salah satu dataset berdasarkan ID
app.delete("/api/data/:id", (req, res) => {
  const id = Number(req.params.id);
  
  const initialLength = allDatasets.length;
  allDatasets = allDatasets.filter(d => d.id !== id);
  
  if (allDatasets.length < initialLength) {
      res.json({ message: "Dataset dihapus" });
  } else {
      res.status(404).json({ message: "Dataset tidak ditemukan" });
  }
});

// 3. START SERVER DENGAN PORT DINAMIS
// Mengambil port dari environment variable (untuk hosting), atau 3000 (untuk lokal).
const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});