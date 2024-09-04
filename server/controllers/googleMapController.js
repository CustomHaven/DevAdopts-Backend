const axios = require("axios");

const index = (req, res) => {
    res.status(200).json({ data: process.env.GOOGLE_MAPS_API_KEY });
}

const show = async (req, res) => {
    try {
        const postcode = req.query.postcode;
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(postcode)}&key=${apiKey}`;
        const response = await axios.get(url);
        if (response.data.status === "OK") {
            const location = response.data.results[0].geometry.location;
            res.status(200).json({ data: { latitude: location.lat, longitude: location.lng } });
        } else {
            throw new Error("Internal Server Error");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { show, index };