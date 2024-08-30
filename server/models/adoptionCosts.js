const db = require("../db/connect");

async function getCostsBySize(gender, size, neuterBoolean) {
  const bedQuery =
    "SELECT bed_size_id, bed_price FROM bed_size WHERE size = $1";
  let neuterQuery;
  if (!neuterBoolean) {
    neuterQuery =
      "SELECT neutering_price_id, neutering_price FROM neutering_price WHERE gender = $1 AND size = $2";
  } else {
    neuterQuery =
      "SELECT neutering_price_id, neutering_price FROM neutering_price WHERE neutering_price_id = $1";
  }
  const foodQuery =
    "SELECT amount_of_food_id, food_price FROM amount_of_food WHERE size = $1";
  const insuranceQuery =
    "SELECT pet_insurance_id, insurance_price FROM pet_insurance WHERE size = $1";
  const vetQuery =
    "SELECT veterinary_care_id, vet_price FROM veterinary_care WHERE size = $1";
  const eolQuery =
    "SELECT end_of_life_id, end_of_life_price FROM end_of_life WHERE size = $1";

  try {
    const bedResult = await db.query(bedQuery, [size]);
    let neuterResult;
    if (!neuterBoolean) {
      neuterResult = await db.query(neuterQuery, [gender, size]);
    } else {
      neuterResult = await db.query(neuterQuery, [7]);
    }
    const foodResult = await db.query(foodQuery, [size]);
    const insuranceResult = await db.query(insuranceQuery, [size]);
    const vetResult = await db.query(vetQuery, [size]);
    const eolResult = await db.query(eolQuery, [size]);

    return {
      bed: {
        price: bedResult.rows[0].bed_price,
        id: bedResult.rows[0].bed_size_id,
      },
      neuter: {
        price: neuterResult.rows[0].neutering_price,
        id: neuterResult.rows[0].neutering_price_id,
      },
      food: {
        price: foodResult.rows[0].food_price,
        id: foodResult.rows[0].amount_of_food_id,
      },
      insurance: {
        price: insuranceResult.rows[0].insurance_price,
        id: insuranceResult.rows[0].pet_insurance_id,
      },
      vet: {
        price: vetResult.rows[0].vet_price,
        id: vetResult.rows[0].veterinary_care_id,
      },
      eol: {
        price: eolResult.rows[0].end_of_life_price,
        id: eolResult.rows[0].end_of_life_id,
      },
    };
  } catch (err) {
    throw new Error("Failed to get costs: " + err.message);
  }
}

module.exports = {
  getCostsBySize,
};
