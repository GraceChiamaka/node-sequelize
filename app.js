const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const errorController = require('./controllers/error');
const sequelize = require('./utils/database');

const ProductModel = require('./models/products');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const OrderItem = require('./models/order-item');
const Order = require('./models/order');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.use((req, res, next) => {
    User.findByPk(1).then(user => {
        req.user = user;
        // console.log(req.user, '=== userr')
        next()
    }).catch(err => console.log(err));
    
})

app.use('/admin',adminRoutes);
app.use('/', shopRoutes)
app.use(errorController);

ProductModel.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(ProductModel);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(ProductModel, {through: CartItem});
ProductModel.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(ProductModel, { through: OrderItem });
ProductModel.belongsToMany(Order, {through: OrderItem})



sequelize.sync(
    // { force: true }
).then(result => {
    return User.findByPk(1)
}).then(user => {
    if (!user) {
        return User.create({firstName: "Gigi", lastName: "Hadid", email: "gigi@mailinator.com"})
    }
    return user;
}).then(user => {
    user.getCart().then((cart) => {
      if (cart) {
        return cart;
      } else {
        return user.createCart();
      }
    });
}).then(cart => {
    app.listen(4400);
  })
  .catch(err => {
    console.log(err);
  });


