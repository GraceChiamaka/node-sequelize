const express = require('express');
const router = express.Router();


const {addProduct, getProduct, editProduct, deleteProduct}= require("../controllers/admin")

router.post('/add-product', addProduct);
// router.get('/products', getProduct);
// router.put('/product/:id', editProduct);
// router.delete('/product/:id', deleteProduct)

module.exports = router;