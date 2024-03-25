const express = require("express");
const app = express();
const files = require("./router/Files.js");
const categories = require("./router/Categories.js");
const users = require("./router/Users.js");
const auth = require("./router/Auth.js");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// url image
app.use('/src/uploads', express.static('src/uploads'));


app.use("/v1/upload", files);
app.use("/v1/categories", categories );
app.use("/v1/users", users );
app.use("/v1/auth", auth );


app.get('/', (req, res) => {
    res.json({meesage: "Hello World!"});
});
app.listen(3000, () => {
    console.log('Server listening on port 3000');
}); 