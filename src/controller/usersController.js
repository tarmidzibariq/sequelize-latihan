const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

// const filesController = require('./filesController').store;
class UsersController{
    async store(req, res){
        try {
            const { fullName, email, confirmNewPassword, newPassword, role, status } = req.body;
            
            // jika confirm New Password tidak sama dengan new password
            if (confirmNewPassword !== newPassword) {
                return res.status(400).json({message: "PASSWORD IS NOT SAME"});
            }

            // jika email tersedia di databased 
            const userExists = await Users.findOne({where: {email: email}});
            if (userExists) {
                return res.status(400).json({message: "Email already registered"});
            }

            // create data users
            const data = await Users.create({
                fullName: fullName,
                email: email,
                password: bcrypt.hashSync(confirmNewPassword, 10),
                role: role,
                status: status,
            });
            return res.json({
                code: 201,
                message: "Data berhasil dibuat",
                data
            });

        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    // async index(req, res) {
        
    // }
    async show(req, res) {
        try {
            const { id } = req.params;
            const data = await Users.findOne({ where: { id: id } });
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
            const { fullName, email, confirmNewPassword, newPassword, role, status } = req.body;

            let updateData = {};

            // Jika confirmNewPassword dan newPassword diberikan dan sama
            if (newPassword && confirmNewPassword && newPassword === confirmNewPassword) {
                updateData.password = bcrypt.hashSync(newPassword, 10);
            } else if (newPassword || confirmNewPassword) {
                // Jika salah satu dari password baru atau konfirmasi diberikan tapi tidak cocok
                return res.status(400).json({ message: "PASSWORD IS NOT SAME" });
            }

            // Cek jika email ingin diubah dan sudah ada di database
            if (email) {
                const userExists = await Users.findOne({ where: { email, id: { [Op.ne]: id } } });
                if (userExists) {
                    return res.status(400).json({ message: "Email already registered" });
                }
                updateData.email = email;
            }

            // Tambahkan field lain ke updateData jika ada perubahan
            if (fullName) updateData.fullName = fullName;
            if (role) updateData.role = role;
            if (status) updateData.status = status;
            

            // Perbarui data pengguna jika ada data untuk diperbarui
            if (Object.keys(updateData).length > 0) {
                await Users.update(updateData, { where: { id: id } });
            } else {
                return res.status(400).json({ message: "No data provided for update" });
            }

            const updatedData = await Users.findOne({ where: { id: id } });

            return res.json({
                code: 200,
                message: "Data berhasil diperbarui",
                updatedData
            });
            
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new UsersController();