const express = require('express')
const cors = require('cors')
const app = express()
const mysql = require('mysql2')
require('dotenv').config()

var omise = require('omise')({
    'publicKey': process.env.OMISE_PUBLIC_KEY,
    'secretKey': process.env.OMISE_SECRET_KEY
})

app.use(express.json())
app.use(cors())

let dbcon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'micro'
})

console.log(process.env.OMISE_PUBLIC_KEY)

// const createCard = async () => {
//     const customer = await omise.customers.create({
//         email: 'john.doe@example.com',
//         description: 'John Doe (id: 30)',
//         card: "tokn_test_5oniixjrc8q9tpufphn"
//     });

//     let charge = await omise.charges.create({
//         amount: 10000,
//         currency: 'thb',
//         customer: customer.id
//     });

//     console.log("Charge", charge)
// }

// createCard()

app.post('/checkout-credit-card', async (req, res) => {
    let token = req.body.token
    let user = req.body.user
    let total = req.body.total

    try {
        const customer = await omise.customers.create({
            email: user,
            card: token
        });

        let charge = await omise.charges.create({
            amount: total,
            currency: 'thb',
            customer: customer.id
        });

        res.send({ charge: charge, status: 'success' })

    } catch (err) {
        console.log(err)
    }
})

app.post('/truewallet', async (req, res) => {
    let source = omise.createSource('truemoney', {
        "amount": 400000,
        "currency": "THB",
        "phone_number": "0812345678"
    }, function (statusCode, response) {
        console.log(response)
    });

    if(source['object'] === 'source'){
        let charge = omise
    }
})

app.post("/CheckAuth", (req, res) => {
    let username = req.body.username
    let password = req.body.password

    dbcon.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, rs) => {
        if (err) throw err

        if (rs.length > 0) {
            res.send(rs)
        }
        else {
            res.send(false)
        }
    })
})

app.post("/register", (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email

    dbcon.query("SELECT * FROM users WHERE username = ?", [username], (err, rs) => {
        if (err) throw err

        if (rs.length > 0) {
            res.send({ AlreadyId: true })
        }
        else {
            dbcon.query("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", [username, password, email], (err, rs) => {
                if (err) throw err

                res.send({ SuccessRegister: true })
            })
        }
    })
})


app.get('/product', (req, res) => {
    dbcon.query("SELECT * FROM stock", (err, rs) => {
        if (err) throw err

        res.send(rs)
    })
})

app.get('/product_buy/:id', (req, res) => {
    let id = req.params.id

    dbcon.query("SELECT * FROM stock WHERE id = ?", [id], (err, rs) => {
        if (err) throw err

        res.send(rs)
    })
})

app.post('/add_order', (req, res) => {
    let holder = req.body.holder
    let cart = req.body.cart

    dbcon.query("INSERT INTO orders (holder, paper) VALUES (?, ?)", [holder, cart], (err, rs) => {
        if (err) throw err

        res.send(true)
    })
})

app.get('/order', (req, res) => {

    dbcon.query("SELECT * FROM orders", (err, rs) => {
        if (err) throw err

        res.send(rs)
    })

})


app.post('/delete_order', (req, res) => {
    let id = req.body.id

    dbcon.query("DELETE FROM orders WHERE id = ?", [id], (err, rs) => {
        if (err) throw err

        res.send(true)
    })

})


app.listen('3001', () => {
    console.log("Server is running on port 3001")
})