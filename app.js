const express = require('express')
const app = express()
const port = process.env.port || 8000;

// Setting template engine EJS
app.set('view engine', 'ejs')

//set support body 
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

//important to link css and other static file that in public folder
app.use(express.static('public'));

var path = require ('path');
app.use(express.static(path.join(__dirname + '../public')));


const adminController = require('./controller/admin');
const productController = require('./controller/product');


app.get('/', productController.homepage); 
app.get('/search', productController.search)
app.get('/products/:id', productController.productShow);
app.post('/buy/:id', productController.productBuy)



app.get('/admin/orders', adminController.ordersGet)
app.post('/admin/orders', adminController.ordersPost)

app.get('/admin/tests', adminController.adminTest)
app.get('/admin/products', adminController.productGet)

app.post('/admin/products', adminController.productEdit)
app.post('/admin/products/delete', adminController.productDelete)
app.post('/admin/products/create', adminController.productCreate)


app.listen(port, () => {
    console.log(`Go to http://localhost:${port}`)
})