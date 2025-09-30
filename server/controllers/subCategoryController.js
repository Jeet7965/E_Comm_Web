import CategaryModel from "../Model/CategaryModel.js";
import SubcategoryModel from "../Model/SubcategoryModel.js";
export const createSubCategory = async (req, resp) => {
    try {
        const { subCategory } = req.body;
        const id = req.params.id

        if (!subCategory) {
            return resp.json({ message: "SubCategory name is required" });
        }
        const category = await CategaryModel.findById(id);
        if (!category) {
            return resp.status(404).json({ message: "Category not found" });
        }

        const newSubCategory = await SubcategoryModel.insertOne({ subCategory, category: id });

        resp.status(201).json({
            message: "SubCategory created Successfully!",
            success: true,
            data: newSubCategory
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


export const getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubcategoryModel.find().populate("category", "name");
    res.json({ success: true, subCategories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};