const systemConfig = require('../../config/system.js')

const authMiddleware = require('../../middlewares/admin/auth.middleware.js')

const dashboardRoutes = require('./dashboard.route')

const productsRoutes = require('./products.route')

const productsCategoryRoutes = require('./products-category.route')

const roleRoutes = require('./role.route')

const accountsRoutes = require('./account.js')

const authRoutes = require('./auth.js')


module.exports = (app) =>{

  const PATH_ADMIN = systemConfig.prefixAdmin;
  
  app.use( PATH_ADMIN + "/dashboard",authMiddleware.requireAuth,dashboardRoutes);

  app.use( PATH_ADMIN + "/products",authMiddleware.requireAuth,productsRoutes);

  app.use( PATH_ADMIN + "/products-category",authMiddleware.requireAuth,productsCategoryRoutes);

  app.use( PATH_ADMIN + "/roles",authMiddleware.requireAuth,roleRoutes);

  app.use( PATH_ADMIN + "/accounts",authMiddleware.requireAuth,accountsRoutes);

  app.use( PATH_ADMIN + "/auth",authRoutes);

}
