const express = require('express');

const http = require('http');
const { Server } = require("socket.io");

const methodOverride =require('method-override');

const bodyParser = require('body-parser');

const flash = require('express-flash');

const cookieParser = require('cookie-parser');

const session = require('express-session');

const moment = require('moment');

var path = require('path');

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

//Socket.io

const server = http.createServer(app);
const io = new Server(server);

global._io = io;
//End Socket.io


// App local variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(`${__dirname}/public`));

app.use(methodOverride('_method'));

// flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End flash

// Use tinymce
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// End tinymce

// Route
routes(app);
routeAmin(app);
app.get("*",(req,res) =>{
  res.render("client/page/errors/404",{
    pageTitle : '404 Not Found',
  });
});
// Route

server.listen(port,() =>{
  console.log(`Server dang chay tai port ${port}`);
});
