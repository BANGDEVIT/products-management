const systemConfig = require('../../config/system.js')

const dashboardRoutes = require('./dashboard.route')

const productsRoutes = require('./products.route')

const productsCategoryRoutes = require('./products-category.route')

const roleRoutes = require('./role.route')

const accountsRoutes = require('./account.js')


module.exports = (app) =>{

  const PATH_ADMIN = systemConfig.prefixAdmin;
  
  app.use( PATH_ADMIN + "/dashboard",dashboardRoutes);

  app.use( PATH_ADMIN + "/products",productsRoutes);

  app.use( PATH_ADMIN + "/products-category",productsCategoryRoutes);

  app.use( PATH_ADMIN + "/roles",roleRoutes);

  app.use( PATH_ADMIN + "/accounts",accountsRoutes);

}
