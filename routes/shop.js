const express = require('express');
const router = express.Router();

const {getAllProducts, getProduct, getCart, addProductToCart, removeProductFromCart, getOrder, getCheckout, createOrder} = require('../controllers/shop')


router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.get('/cart', getCart);
router.post('/cart', addProductToCart);
router.delete('/cartItem', removeProductFromCart);
router.get('/orders', getOrder);
router.post('/orders', createOrder);
router.get('/checkout', getCheckout);


module.exports = router;