const express = require("express");
const pool = require("./db");
const app = express();
// Membuat Rute (Routing) Default
app.get("/", (req, res) => {res.send("Uji coba Nodemon berhasil datang di Server Backend TokoKita!");
});
app.get("/api/categories", async (req,res) => {
    try {
        const result = await pool.query("SELECT * FROM categoriess ORDER BY id ASC");
        res.json(result.rows);

    } catch (err){
        console.error(err.message);
        res.status(500).json({error : "error terjasdi pada server"})

    }})
// Menjalankan server di Port 5000
const PORT = 5000;
app.listen(PORT, () => {
 console.log(`Server berhasil berjalan di
http://localhost:${PORT}`);
});

