const { Categories } = require("../models");

class CategoriesController {
  async store(req, res) {
    try {
      const { title } = req.body;
        const data = await Categories.create({
          title: title,
        });
      return res.json({
        code: "201",
        message: "Berhasil Menambahkan Data",
        data 
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  async index(req, res) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.pageSize) || 3;
      const offset = Number((page - 1) * limit) || 0;

      const data = await Categories.findAndCountAll({
        offset: offset,
        limit: limit,
      });
      return res.json({
        code: 200,
        message : `${data.count} Data Sudah Diterima`,
        count : data.count,
        page: Number(page) || 1,
        pageSize: Number(limit),
        data : data.rows,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  async show(req, res) {
    try {
      const { id } = req.params;
      const data = await Categories.findOne({ where: { id: id } });
      return res.json({
        code: 200,
        message: "Data Sudah Diterima",
        data
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const { title } = req.body;

      // Step 1: Update the category
      await Categories.update({ title: title }, { where: { id: id } });

      // Step 2: Retrieve the updated category
      const updatedCategory = await Categories.findOne({ where: { id: id } });

      return res.json({
        code: 200,
        message: "Data Berhasil Diperbarui",
        data : updatedCategory
      });
      
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      const data = await Categories.destroy({ where: { id: id } });
      return res.json({
        code: 200,
        message: "Data Berhasil Dihapus",
      });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
  }

}

module.exports = new CategoriesController();
