const { getCostsBySize } = require("../models/adoptionCosts");
const Dog = require("../models/Dog");
const InitialAdoption = require("../models/InitialAdoption");

async function getAdoptionCosts(req, res) {
  const dogId = req.params.dogId;

  try {
    const dogResult = await Dog.show(dogId);

    const costOfValues = await getCostsBySize(
      dogResult.gender,
      dogResult.size,
      dogResult.neutered
    );

    let neuteredPrice;
    console.log("neuter", dogResult);
    if (!dogResult.neutered) {
      neuteredPrice = costOfValues.neuter.price;
    } else {
      neuteredPrice = 0;
    }
    const microchipPrice = dogResult.microchipped ? 0 : 10.9;
    const collarLeashPrice = dogResult.collar_leash ? 0 : 15;
    const obediencePrice = dogResult.obedience_classes_needed ? 65 : 0;
    const averageMedicalCost = 822;
    console.log("ip", dogResult);
    console.log(
      "price",
      neuteredPrice,
      microchipPrice,
      collarLeashPrice,
      obediencePrice,
      costOfValues
    );
    const initialCost =
      neuteredPrice +
      microchipPrice +
      costOfValues.bed.price +
      collarLeashPrice +
      obediencePrice;
    console.log("initial", initialCost);

    const monthlyCost =
      costOfValues.food.price +
      costOfValues.insurance.price +
      costOfValues.vet.price;
    const longTermCost = costOfValues.eol.price + averageMedicalCost;

    const initialObject = {
      calculated_price: initialCost,
      neutering_price_id: costOfValues.neuter.id,
      microchip_price: microchipPrice,
      bed_size_id: costOfValues.bed.id,
      collar_leash_price: collarLeashPrice,
      obedience_classes_price: obediencePrice,
      dog_id: dogResult.dog_id
    };

    // calculated_price, neutering_price_id, microchip_price, bed_size_id, collar_leash_price, obedience_classes_price, dog_id
    await InitialAdoption.create(initialObject);

    // Send the response
    res.json({
      dogName: dogResult.dog_name,
      size: dogResult.size,
      initialCost,
      monthlyCost,
      longTermCost,
    });
  } catch (err) {
    res.status(500).send("Error fetching costs: " + err.message);
  }
}

module.exports = {
  getAdoptionCosts,
};
