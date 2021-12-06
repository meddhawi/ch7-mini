var faker = require('faker')

// const orders = [...Array(10)].map( (order) => (
//     {
//         product_id: Math.floor(Math.random() * 10) + 1,
//         user_id: Math.floor(Math.random() * 10) + 1,
//         qty: Math.floor(Math.random() * 20) + 1,
//         price: faker.commerce.price(),
//         transaction_status: 'WAITING',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }
// ))

// console.log(parseInt(faker.finance.amount(1, 100, 0)))
console.log(faker.image.food())