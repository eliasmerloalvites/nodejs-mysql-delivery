const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const multer = require('multer');
const io = require('socket.io')(server);
const mercadopago = require('mercadopago');
mercadopago.configure({
    sandbox: true,
    access_token: 'TEST-7554673120183337-052518-df8bdf75cd5eba96fe8c598542c7a34e-549403931'
});

/* 
    IMPORTAR SOCKETS
*/

const ordersSocket = require('./sockets/ordersSocket');

/* 
*Importar RUTAS 
*/
const usersRoutes = require('./routes/userRoutes')
const categoriesRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')
const addressRoutes = require('./routes/addressRoutes')
const orderRoutes = require('./routes/orderRoutes')
const mercadoPagoRoutes = require('./routes/mercadoPagoRoutes')
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport)

app.disable('x-powered-by');
app.set('port',port);

/* 
    LLAMADO SOCKETS
*/
ordersSocket(io);

/* Cargar Imagenes */
const upload = multer({
    storage: multer.memoryStorage()
})
/* 
*LLAMADO DE LAS RUTAS 
*/
usersRoutes(app, upload)
categoriesRoutes(app)
productRoutes(app, upload)
addressRoutes(app)
orderRoutes(app)
mercadoPagoRoutes(app)


/* server.listen(port,'192.168.1.8' || 'localhost',function() {
    console.log('Aplicacion de NodeJs '+ port+ ' Iniciando...');
}) */
server.listen(port,'localhost',function() {
    console.log('Aplicacion de NodeJs '+ port+ ' Iniciando...');
})

app.get('/',(req, res) => {
    res.send('Ruta Raiz del Backend');
})
app.get('/test',(req, res) => {
    res.send('Estamos en la ruta TEST');
})

//Error Handler
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.status || 500).send(err.stack);    
})

