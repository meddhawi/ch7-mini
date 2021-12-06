const express = require('express')
const app = express()
const port = process.env.port || 8000;
const Sequelize = require('sequelize')



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

const { Product, Order, Review } = require('./models')

//Test model
app.get('/', async (req, res, next) => {
    try {
        let products = await Product.findAll();
        res.render('homepage', {
            productList: products
        });
    } catch(error) {
        console.log(error)
    }
}); 

app.get('/products/:id', async (req, res) => {
    try{
        const product = await Product.findByPk(req.params.id)
        const review = await Review.findAll({
            where: {
                product_id: req.params.id
            }
        })
        // let reviews = await Review.findAll();
        res.render('product', {
            products: product,
            reviews: review
        })
    }catch(error){
        console.log(error)
    }
});



app.listen(port, () => {
    console.log(`Go to http://localhost:${port}`)
})