const express = require('express')
const Sequelize = require('sequelize')
const { Product, Orders, Review } = require('../models');

module.exports = {
    ordersGet: async(req, res) => {
        try{
            const order = await Orders.findAll()
            const orderDone = await Orders.findAll(
                {
                    where: {transaction_status: 'DONE'},
                    include: {model: Product}
                }
            )
            const orderCancelled = await Orders.findAll(
                {
                    where: {transaction_status: 'CANCELLED'},
                    include: {model: Product}
                })
            const orderWaiting = await Orders.findAll(
                {
                    where: {transaction_status: 'WAITING'},
                    include: {model: Product}
                }
            ) 
    
            res.render('admin/adminorder', {
                order, orderDone, orderCancelled, orderWaiting
            })
    
        } catch(error) {
            console.log(error)
        }
    },

    ordersPost: async(req, res)=>{
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
                        id: historyDelete
                    }
                })
            }
    
            res.redirect('/admin/orders');
    
        }catch(error){
            console.log(error)
        }
    },

    productGet: async(req, res) => {
        try{
            let products = await Product.findAll();
            res.render('admin/adminproducts',{
                products: products
            })
    
        }catch(error) {
            console.log(error)
        }
    },

    productEdit: async(req, res) => {
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
    },

    productDelete: async(req, res) =>{
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
    },

    productCreate: async(req, res) =>{
        try{
            const { title, description, stock, price } = req.body;
            await Product.create({
                title,
                description,
                stock,
                price
            })
            res.redirect('/admin/products')
        }catch(error) {
            console.log(error)
        }
    },

    adminTest: async(req, res) => {
        try{
            const order = await Orders.findAll({
                where:{
                    product_id: 3
                }
            },{
                include:{
                model: Product,
                
            }})
            const product = await Product.findByPk(3,
                {
                    include:{
                        model: Orders,
                        where:{
                            transaction_status: 'DONE'
                        }
                        
                    }
                })
            const orderWaiting = await Orders.findAll(
                {
                    where: {transaction_status: 'DONE'},
                    include: {model: Product}
                }
            )
            res.send(JSON.stringify(product, null, 2))
            // res.render('admin/adminorder', {
            //     order, orderDone, orderCancelled, orderWaiting
            // })
    
        } catch(error) {
            console.log(error)
        }
    }
}
