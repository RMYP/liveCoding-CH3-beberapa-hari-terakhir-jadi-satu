const express = require("express")
const morgan = require("morgan");
const app = express()

const customerRouter = require('./routes/customerRoute')

app.use(express.json())
app.use(morgan('dev'))
// app.use merupakan middleware
// expressjs.com/en/resource/middleware
// todo: pelajari middleware
//       pelajari morgan
app.use((req,res,next) => {
    console.log("hello FSW 1, ini middleware kita sendiri")
    next()
})

app.use((req,res,next) => {
    req.requestTime = new Date().toISOString();
    next();
})

// const customers = JSON.parse(
//     fs.readFileSync(`${__dirname}/data/dummy.json`));

// id == wildcard
// get data by id
// app.get('/api/v1/customers/:id', getCustomersById)
// // api untuk update data
// app.patch('/api/v1/customers/:id', updateCustomersById)
// // api untuk delete data
// app.delete('/api/v1/customers/:id', deteleCustomersById)
// // api untuk create new data
// app.post('/api/v1/customers/', createCustomer)

// const customerRouter = express.Router();
app.use('/api/v1/customers', customerRouter)
// app.get('/', defaultRoute)
// customerRouter.route('/').post(createCustomer).get(getAllCustomer)
// customerRouter.route('/:id').get(getCustomersById).patch(updateCustomersById).delete(deteleCustomersById)
// pelajari status code
module.exports = app;