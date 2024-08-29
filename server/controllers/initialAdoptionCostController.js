async function create(req, res) {
  try {
    const data = req.body;
    if (
      !(data.bed_size_price === 25) ||
      !(data.bed_size_price === 30) ||
      !(data.bed_size_price === 35) ||
      !data.bed_size_price
    ) {
      throw new Error("bed_size_price attribute should be 25, 30 or 35");
    }
  } catch (error) {}
}
