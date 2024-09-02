const { calculateAdoptionCosts } = require("../utils/adoptionCalculator");
const Dog = require("../models/Dog");
const InitialAdoption = require("../models/InitialAdoption");
const MonthlyAdoption = require("../models/MonthlyAdoption");
const LongTermAdoption = require("../models/LongTermAdoption");
const { getCostsBySize } = require("../models/adoptionCosts");


async function getAdoptionCosts(req, res) {
  const dogId = req.params.dogId;

  try {
    const adoptionCosts = await calculateAdoptionCosts(dogId, Dog, InitialAdoption, MonthlyAdoption, LongTermAdoption, getCostsBySize);
    res.status(200).json({ data: adoptionCosts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAdoptionCosts,
};
