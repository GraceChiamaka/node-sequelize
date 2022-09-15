
const express = require("express");
const Product = require("../models/products")

const addProduct = (req, res, next) => {
    const { title, imageUrl, price, description } = req.body;
    req.user.createProduct({
        title,
        imageUrl,
        price,
        description
    })
    .then((product) => {
        return res.status(201).json({
            message: "New Product Added!", data: product
        })
    }).catch(err => {
        throw err
    })
}

const getProduct = (req, res, next) => {
    req.user.getProduct().then(result => {
        return res.status(200).json({data: result})
    }).catch(err => { throw err })
}

const editProduct = (req, res, next) => {
    const productId = req.params.id;
    const { title, price, description, imageUrl } = req.body;
    Product.update({title, price, description, imageUrl}, {where: {id: productId}})
        .then(result => { return res.status(200).json({message: "Product updated", data: result})
    }).catch(err => {throw err})
}


const deleteProduct = (req, res, next) => {
    const productId = req.params.id;
    Product.destroy({ where: { id: productId } }).then(result => {
        console.log(result)
        return res.status(200).json({message: "Product deleted"})
    }).catch(err => {
        return res.status(500).json({message: err})
    })
}

 module.exports = {
     addProduct,
     getProduct,
     editProduct,
     deleteProduct
 }