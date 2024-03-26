const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Name must exist"]
    },
    age: Number,
    email: {
        type: String,
        unique: true,
    },
    phoneNum: {
        type: Number,
        require: true
    },
    role: {
        type: String,
        enum:['admin', "user"],
        default: "user"
    },
    active: {
        type: Boolean,
        default: true
    },
    photo: {
        type: String,
        require: true,
        default: "user-default.jpg"
    },
    password: {
        type: String,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Customer = mongoose.model('Customers', customerSchema);

// const customerTest = new Customer({
//     name: 'Anastasia',
//     email: 'anastasia12@gmail.com',
//     phoneNum: 77777777777,
// });

// customerTest.save().then(doc => {
//     console.log(doc)
// }).catch((err) => {
//     console.log("error" + err)
// });

module.exports = Customer;