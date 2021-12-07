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

const { Product, Orders, Review } = require('./models');
const { where } = require('sequelize');

//Test model
app.get('/', async (req, res, next) => {
    try {
        let products = await Product.findAll();
        res.render('product/homepage', {
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
        res.render('product/product', {
            products: product,
            reviews: review
        })
    }catch(error){
        console.log(error)
    }
});

app.post('/buy/:id', async(req, res) =>{
    try{
        const product = await Product.findByPk(req.params.id)
        const { quantity } = req.body;
        await Orders.create({
            product_id: req.params.id,
            user_id: 1,
            qty: quantity,
            price: product.price * quantity,
            transaction_status: 'WAITING'            
        }).then(res.redirect('/products/' + req.params.id));
    }catch(error){
        console.log(error)
    }
})



app.get('/admin/orders', async(req, res) => {
    try{
        const order = await Orders.findAll()
        const orderDone = await Orders.findAll({
            where:{
                transaction_status: 'DONE'
            }
        })
        const orderCancelled = await Orders.findAll({
            where:{
                transaction_status: 'CANCELLED'
            }
        })
        const orderWaiting = await Orders.findAll({
            where:{
                transaction_status: 'WAITING'
            }
        })

        res.render('admin/adminorder', {
            order, orderDone, orderCancelled, orderWaiting
        })

    } catch(error) {
        console.log(error)
    }
})

app.post('/admin/orders', async(req, res)=>{
    try{
        const {status_done, status_cancel, historyDelete , orderID} = req.body;
        if(status_done){
            await Orders.update({
                transaction_status: status_done
            },{
                where:{
                    id: orderID
                }
            })
    
        }
        if(status_cancel){
            await Orders.update({
                transaction_status: status_cancel
            },{
                where:{
                    id: orderID
                }
            })
        }
        if(historyDelete){
            await Orders.destroy({
                where:{
                    id: orderID
                }
            })
        }

        res.redirect('/admin/orders');

    }catch(error){
        console.log(error)
    }
})

app.get('/admin/products', async(req, res) => {
    try{
        let products = await Product.findAll();
        res.render('admin/adminproducts',{
            products: products
        })

    }catch(error) {
        console.log(error)
    }
})

app.post('/admin/products', async(req, res) => {
    try{
        const { productID, title, description, stock, price} = req.body;
        console.log("ID:" + productID)
        await Product.update({
            title,
            description,
            stock,
            price
        },{
            where:{
                id: productID
            }
        })
        
        res.redirect('/admin/products')

    }catch(error) {
        console.log(error)
    }
})

app.post('/admin/products/delete', async(req, res) =>{
    try{
        const { productID, deleteProduct } = req.body;
        if(deleteProduct){
            await Product.destroy({
                where: {
                    id: productID
                }
            })
        }
        res.redirect('/admin/products')
    }catch(error) {
        console.log(error)
    }
})


app.listen(port, () => {
    console.log(`Go to http://localhost:${port}`)
})