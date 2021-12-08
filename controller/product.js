const express = require('express')
const Sequelize = require('sequelize')
const { Op } = require('sequelize')
const { Product, Orders, Review } = require('../models');

module.exports = {
    homepage: async (req, res) => {
        try {
            let products = await Product.findAll();
            res.render('product/homepage', {
                products: products
            });
        } catch(error) {
            console.log(error)
        }
    },

    search: async(req, res) => {
        try{
            const {searchResult} = req.query;
            Product.findAll({where: { title: { [Op.iLike]: '%' + searchResult + '%'} }})
                .then(products => res.render('product/homepage', {
                    products: products
                }))
                
        }catch(error) {
            console.log(error)
        }
    },

    productShow: async (req, res) => {
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
    },

    productBuy: async(req, res) => {
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
    }
}
