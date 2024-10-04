const express = require('express');

const methodOverride =require('method-override');

const bodyParser = require('body-parser');

const flash = require('express-flash');

const cookieParser = require('cookie-parser');

const session = require('express-session');

const routeAmin = require('./routes/admin/index.route');
const routes = require('./routes/client/index.route');

const database = require('./config/database.js');
require('dotenv').config();

const systemConfig = require('./config/system')

const app = express();;
const port = process.env.PORT;

database.connect();

app.set("views",`${__dirname}/views`);
app.set("view engine", "pug");

// App local variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(`${__dirname}/public`));

app.use(methodOverride('_method'));

// flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End flash


// Route
routes(app);
routeAmin(app);
// Route

app.listen(port,() =>{
  console.log(`Server dang chay tai port ${port}`);
});
