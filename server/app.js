const express = require("express");
const routes = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 
app.use("/api", routes);

app.get("/", (req, res) => {
    res.send("Servidor está funcionando correctamente");
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
