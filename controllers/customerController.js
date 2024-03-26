const express = require("express");
const fs = require('fs');
const customers = require("./../model/customersModels");
const Customer = require("./../model/customersModels");
    
const defaultRoute = (req, res, next) => {
    res.send("<h1> Hello anastasia </h1>")
}

const getAllCustomer = async (req, res, next) => {
    try {
        // basic filter
        const queryObject = {...req.query};
        const excludeColumn = ['page', 'sort', 'limit', 'fields'];
        excludeColumn.forEach(el => delete queryObject[el]);

        // advance filter
        let queryStr = JSON.stringify(queryObject);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match=> `$${match}`); //output => $gte
        queryStr = JSON.parse(queryStr)
        // 
        
        let query = customers.find(queryStr)
       
        // sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            console.log(sortBy)
            query = query.sort(sortBy)
        }else{
            query = query.sort('createdAt')
        }

        // field limiting
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields)
        }else{
            query = query.select(' -__v')
        }

        // pagination

        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 2;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit)

        let numCustomers
        if(req.query.page){
            let numCustomers = await Customer.countDocuments();
            // new error akan masuk ke if(err)
            if(skip > numCustomers) throw new Error("Page does not exist");
        }

        // eksekusi query
        const customer = await query
        res.status(200).json({
            status: "success",
            requestAt: req.requestTime,
            totalData: customer.length,
            data: {
                customer,
            },
            totalPage: numCustomers
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }
   
}

const getCustomersById =  async (req, res, next) => {
    try {
        const {id} = req.params.id;
        const customer = await customers.findById(id)
        console.log(id)
        console.log(customer)
        // menggunakan array method untuk membantu menemukan data
        console.log(customer);
        res.status(200).json({
            status: "success", 
            data: {
                customer
            }
    })
    } catch (err) {
        res.status(400).json({
            status: "fail"
        })
    }
    
}

const updateCustomersById = async (req,res) => {
    try {
    const {id} = req.params.id;
    const customer = await customers.findByIdAndUpdate(id, req.body, {
        new:true,
    });
    res.status(200).json({
        status: "success",
        message: "berhasil update data",
        data: {
            customer
        }
    })} 
    catch (err) {
        res.status(400).json({
            status: "fail",
            massage: err.massage
        })
    }
    
}

const deteleCustomersById = async (req,res) => {
try {
    const id = req.params.id;
    await customers.findByIdAndDelete(id)
    res.status(200).json({
        status: "success",
        massage: "berhasil delete data"
    })
} catch (err) {
    res.status(400).json({
        status: "fail",
        massage: err.massage
    })
}
    
}

const createCustomer = async (req, res) => {
    try {
        const newCustomer = await customers.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                customer:newCustomer
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message : err.mssage
        })
    }
    
}

module.exports = {
    getAllCustomer,
    defaultRoute,
    getCustomersById,
    deteleCustomersById,
    updateCustomersById,
    createCustomer
}