const multer = require('multer');
const { Files } = require("../models");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const formData = multer({ storage: storage });

class filesController{
    async store(req, res) {
        try {
            formData.single("documen")(req, res, async (err) => { // Note the use of async here
                if (err) {
                    return res.json({ message: err.message }); // Return added to prevent further execution in case of error
                } else {
                    try {
                        const file = await Files.create({ // Await the asynchronous operation
                            fileName: req.file.filename,
                            type: req.file.mimetype,
                            url: `http://localhost:3000/src/uploads/images/${req.file.filename}`,
                            path: req.file.path
                        });
                        return res.json({ // Return the response
                            message: "Berhasil Menambahkan Data",
                            data: file,
                        });
                    } catch (error) {
                        return res.status(400).json({ message: error.message });
                    }
                }
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    async 
}


module.exports = new filesController();