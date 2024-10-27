const productRouters = require('./products.route');
const homeRouters = require('./home.route');
const categoryMiddleware = require('../../middlewares/client/category.middleware.js')
const searchRouters = require('./search.route.js');
const cartMiddleware = require('../../middlewares/client/cart.middleware.js')
const cartRouters = require('./cart.route.js');
const checkoutRouters = require('./checkout.route.js');
const userRouters = require('./user.route.js');
const userMiddleware = require('../../middlewares/client/user.middleware.js')
const settingGeneralMiddleware = require('../../middlewares/client/setting.middleware.js')
const chatRouters = require("./chat.route.js")
const authMiddleware = require('../../middlewares/client/auth.middleware')
const usersRouters = require("./users.route.js")
const RoomChatRouters = require("./rooms-chat.route.js")

module.exports = (app) =>{

  app.use(categoryMiddleware.category);
  app.use(cartMiddleware.cartId);
  app.use(userMiddleware.infoUser); 
  app.use(settingGeneralMiddleware.settingGeneral);


  app.use("/",homeRouters);

  app.use("/products",productRouters)

  app.use("/search",searchRouters)

  app.use("/cart",cartRouters)

  app.use("/checkout",checkoutRouters)

  app.use("/user",userRouters)

  app.use("/chat",authMiddleware.requireAuth,chatRouters)

  app.use("/users",authMiddleware.requireAuth,usersRouters)
  
  app.use("/rooms-chat",authMiddleware.requireAuth,RoomChatRouters)

}