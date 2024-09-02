async function calculateAdoptionCosts(dogId, Dog, InitialAdoption, MonthlyAdoption, LongTermAdoption, getCostsBySize) {
  try {
    // console.log("inside service", dogId);
    const dogResult = await Dog.show(dogId);
    // console.log("service dogResult", dogResult);

    const costOfValues = await getCostsBySize(
      dogResult.gender,
      dogResult.size,
      dogResult.neutered
    );

    let neuteredPrice = dogResult.neutered ? 0 : costOfValues.neuter.price;
    const microchipPrice = dogResult.microchipped ? 0 : 10.9;
    const collarLeashPrice = dogResult.collar_leash ? 0 : 15;
    const obediencePrice = dogResult.obedience_classes_needed ? 65 : 0;
    const averageMedicalCost = 822;

    const initialCost =
      neuteredPrice +
      microchipPrice +
      costOfValues.bed.price +
      collarLeashPrice +
      obediencePrice;

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

    const monthlyObject = {
      calculated_monthly_cost: monthlyCost, 
      amount_of_food_id: costOfValues.food.id,
      pet_insurance_id: costOfValues.insurance.id,
      veterinary_care_id: costOfValues.vet.id, 
      dog_id: dogResult.dog_id
    };

    const ltaObject = {
      calculated_long_term_cost: longTermCost,
      end_of_life_id: costOfValues.eol.id,
      average_medical_cost: averageMedicalCost,
      dog_id: dogResult.dog_id
    };

    // Persisting the data
    await InitialAdoption.create(initialObject);
    await MonthlyAdoption.create(monthlyObject);
    await LongTermAdoption.create(ltaObject);

    return {
      dogName: dogResult.dog_name,
      size: dogResult.size,
      initialCost,
      monthlyCost,
      longTermCost,
    };
  } catch (err) {
    throw new Error("Error calculating adoption costs: " + err.message);
  }
}

module.exports = {
  calculateAdoptionCosts,
};