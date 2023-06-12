const productController = require('../controllers/productsController');
const passport = require('passport')

module.exports = (app, upload) => {
    app.get('/api/products/findByCategory/:id_category', passport.authenticate('jwt',{session:false}), productController.findByCategory)
    app.get('/api/products/findByNameAndCategory/:id_category/:name',  passport.authenticate('jwt', { session: false }), productController.findByNameAndCategory);
    app.post('/api/products/create', passport.authenticate('jwt',{session:false}), upload.array('image',3), productController.create)
}