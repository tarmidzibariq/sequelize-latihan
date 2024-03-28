const jwt = require('jsonwebtoken');
const { Users } = require("../models");
const auth = () => {
    return  async (req, res, next) =>{
        try {
            if(!req.headers["authorization"]) throw { message: "TOKEN_REQUIRED" };
            const token = req.header("Authorization").split(" ")[1];

            // console.log(token);
            if (!token) {
                throw { message: "TOKEN_WRONG"}
            }

            const verified = jwt.verify(token,process.env.JWT_ACCESS_TOKEN_SECRET);
            if (!verified) {
                throw { message: "UNAUTHORIZED" }
            }
            const user = await Users.findOne({ where: verified.userID });
            // ini nanti dipakai dicontroller
            req.user = {
                id: user.id,
                nama: user.nama,
                email: user.email,

                // request role saat login
                role:user.role
            }
            // console.log(verified);

            next();
        } catch (error) {
            if (error.message == "invalid token") {
                error.message = "INVALID_TOKEN";
            } else if (error.message == "jwt expired") {
                error.message = "TOKEN_EXPIRED";
            }

            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = auth;