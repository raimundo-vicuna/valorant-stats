const express = require("express");
const axios = require("axios");
require("dotenv").config({ path: '../.env' });

const router = express.Router();
const API_KEY = process.env.dev_api_key;

if (!API_KEY) {
    console.error("API key is not loaded correctly. Please check your .env file.");
}

router.get("/stats/:puuid", async (req, res) => {
    
})

router.get("/stats/:name/:tag", async (req, res) => {
    const { name, tag } = req.params;
    console.log(`Recibido: name=${name}, tag=${tag}`);

    if (!name || !tag) {
        return res.status(400).json({ error: "Faltan parámetros name o tag" });
    }

    try {
        const encodedTag = encodeURIComponent(tag);
        const url = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${encodedTag}`;

        const response = await axios.get(url, {
            headers: { "X-Riot-Token": API_KEY }
        });

        if (response.data) {
            res.json(response.data);
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }

    } catch (error) {
        if (error.response) {
            console.error("Error de respuesta de la API:", error.response.data);
            res.status(500).json({ error: "Error al obtener la información del jugador" });
        } else {
            console.error("Error de solicitud:", error.message);
            res.status(500).json({ error: "No se pudo conectar con la API" });
        }
    }
});

module.exports = router;
