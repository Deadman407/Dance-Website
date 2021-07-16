const express = require("express")
const path = require("path")
//const fs = require("fs")
const app = express()
const pug = require("pug")
//const port = 80

require("./conn");
const ContactUs = require("./contacts" );

const port = process.env.PORT || 3000;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files

app.use(express.json());
app.use(express.urlencoded())

// PUB SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, "views")) // Set the views directory

//ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})

// Fill the contact form in our database
app.post("/contact", async (req, res) => {
    try {
        const contactUs = new ContactUs({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            desc: req.body.desc
        })
        const contacted = await contactUs.save();
        res.status(200).render('home.pug')
    } catch (error) {
        res.status(404).send(error);
    }
})

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on ${port}`)
})