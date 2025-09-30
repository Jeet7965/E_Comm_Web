import CategaryModel from "../Model/CategaryModel";

export const createCategory = async(req,resp)=>{
    try {
        const { category } = req.body;
    
        if (!category) {
          return resp.status(400).json({ message: "Category is required" });
        }
    
        const newCategory = await CategaryModel.insertOne({ category });
    
        resp.status(201).json({
          message: "Category created Successfully!",
          success: true,
          data: newCategory
        });
    
      } catch (error) {
        console.error(error);
        resp.status(500).json({
          success: false,
          message: "Server error",
          error: error.message
        });
      }
}


export const getCategories = async (req, res) => {
  try {
    const categories = await CategaryModel.find();
    res.json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};