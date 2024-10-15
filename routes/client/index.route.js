const productRouters = require('./products.route');
const homeRouters = require('./home.route');
const categoryMiddleware = require('../../middlewares/client/category.middleware.js')
const searchRouters = require('./search.route.js');
const cartMiddleware = require('../../middlewares/client/cart.middleware.js')
const cartRouters = require('./cart.route.js');

module.exports = (app) =>{

  app.use(categoryMiddleware.category);
  app.use(cartMiddleware.cartId);

  app.use("/",homeRouters);

  app.use("/products",productRouters)

  app.use("/search",searchRouters)

  app.use("/cart",cartRouters)

}