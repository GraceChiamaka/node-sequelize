const express = require('express');
const Product = require("../models/products")


const getAllProducts = (req, res, next)  => {
    Product.findAll().then((products) => {
        return res.status(200).json({ data: products })
    }).catch((error) => { throw error })
}

const getProduct = (req, res, next) => {
    const productId = req.params.id;

    Product.findByPk(productId).then((product) => {
        return res.status(200).json({data: product})
    }).catch((error ) => {throw error}) 
}

const getCart = (req, res, next) => {
    req.user.getCart().then(cart => {
        return cart.getProducts().then(products => {
            return res.status(200).json({data: products})
        }).catch(error => {console.log(error)})
    }).catch(err => {
        throw err
    }) 
}

const addProductToCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user
        .getCart()
        .then(cart => {
        fetchedCart = cart;
        return cart.getProducts({ where: { id: prodId } });
        })
        .then(products => {
        let product;
        if (products.length > 0) {
            product = products[0];
        }

        if (product) {
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
            return product;
        }
        return Product.findByPk(prodId);
        })
        .then(product => {
        return fetchedCart.addProduct(product, {
            through: { quantity: newQuantity }
        });
        })
        .then(() => {
            return res.status(201).json({message: 'Product added to cart'})
        })
        .catch(err => console.log(err));
}

const removeProductFromCart = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.getCart()
        .then(cart => {
        return cart.getProducts({where: {id: prodId}})
        }).then(products => {
            const product = products[0];
            return product.cartItem.destroy();
    }).then(result => res.status(200).json({message: 'Product removed from Cart'})).catch(err => console.log(err))
}

const createOrder = (req, res, next) => {
    let fetchedCart;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts()
        })
        .then((products) => {
            console.log('products', products);
            req.user.createOrder()
                .then((order) => {
                    order.addProducts(products.map(product => {
                        product.orderItems = {
                            quantity: product.cartItems.quantity
                        };
                        return product
                }), {through: {quantity}})
        }).catch(err => console.log(err))
        }).then((result) => {
            console.log(result);
            fetchedCart.setProducts(null)
                .then((result) => {
                    return res.status(201).json({data: result})
                })
        })
        .catch(err => console.log(err))
 };
const getOrder = (req, res, next) => { 
    req.users.getOrders({include: ['products']}).then((orders) => {
        return res.status(200).json({data: orders})
    }).catch((err) => {
        console.log(err)
    });
};
const getCheckout = (req, res, next) => { };
// const createOrder = (req, res, next) => { }

module.exports = {
    getAllProducts,
    getProduct,
    getCart,
    addProductToCart,
    removeProductFromCart,
    createOrder,
    getOrder,
    getCheckout
}