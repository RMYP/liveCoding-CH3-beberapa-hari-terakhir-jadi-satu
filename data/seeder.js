require("dotenv").config()
const mongoose = require("mongoose")
const fs = require("fs")
const customersModel = require("../model/customersModels")
// pelajari promise
const db = process.env.database;

mongoose.connect(db, {
useNewUrlParser: true,
}).then(con => {
    console.log("connection success");
});

const customer = JSON.parse(fs.readFileSync("./data/customers.json", "utf-8"))

const importData = async () => {
    try {
        await customersModel.create(customer);
        console.log("import data success")
    } catch (err) {
        console.log(err)
    }
    process.exit();
}

const deleteData = async () => {
    try {
        await customersModel.deleteMany()
        console.log("data has been deleted 👌")
    } catch (err) {
        console.log(err)
    }
    process.exit();
}

if(process.argv[2] == '--import'){
    importData();
}else if(process.argv[2] == '--delete'){
    deleteData();
}