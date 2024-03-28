const { Users, Files } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config().parsed;

class authController {
    generateToken = async (payload) => {
        const accessToken = jwt.sign(
            { userId: payload.id },
            env.JWT_ACCESS_TOKEN_SECRET,
            { expiresIn: env.JWT_ACCESS_TOKEN_EXPIRES_IN },
        );
        const refreshToken = jwt.sign(
            { userId: payload.id },
            env.JWT_REFRESH_TOKEN_SECRET,
            { expiresIn: env.JWT_REFRESH_TOKEN_EXPIRES_IN },
        );

        return { accessToken, refreshToken };
    }

    login = async (req, res) => {
        try {
            // check if email is valid
            const user = await Users.findOne({
                where: { email: req.body.email }
                // include: [{
                //     model: Files,
                //     as: 'Avatar' // Update the alias to match the association
                // }]
            });
            // Email validation regex
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

            // Inside the login method, after retrieving the email from req.body.email, add this check:
            if (!emailRegex.test(req.body.email)) {
                return res.status(400).json({ message: "INVALID_EMAIL_FORMAT" });
            }

            if (!user) {
                return res.status(400).json({ message: "USER_NOT_FOUND" });
            }

            // check if password is valid
            const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

            if (!isPasswordValid) {
                return res.status(400).json({ message: "INVALID_PASSWORD" });
            }

            // generate token
            const { accessToken, refreshToken } = await this.generateToken(user);

            return res.status(200).json({
                code: 200,
                message: "Berhasil masuk",
                accessToken: accessToken,
                refreshToken: refreshToken,
                expiresIn: env.JWT_ACCESS_TOKEN_EXPIRES_IN,
                tokenType: "Bearer",
                user
            })

        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}
module.exports = new authController();