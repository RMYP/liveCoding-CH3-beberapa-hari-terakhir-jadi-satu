
require("dotenv").config()
const mongoose = require("mongoose")
const app = require("./app")
const PORT = process.env.PORT ;

// pelajari promise
const db = process.env.database;
mongoose.connect(db, {
useNewUrlParser: true,
}).then(con => {
    console.log("connection success");
});

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
})