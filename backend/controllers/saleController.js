import Sale from "../Models/sale.js";

export const createSale = async (req, res) => {
  try {


    const { items, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items provided in cart" });
    }

    const userId = req.user._id || req.user.id;

    const newSale = new Sale({
      userId,
      items,
      totalAmount,
    });

    const savedSale = await newSale.save();
    console.log("✅ Sale Saved Successfully:", savedSale);
    res.status(201).json(savedSale);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getMySales = async (req, res) => {
  try {
    const sales = await Sale.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
export const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};