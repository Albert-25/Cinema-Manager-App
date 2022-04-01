const stripe = require('stripe')(process.env.REACT_APP_SRIPE_PRIVATE_KEY);
const { Router } = require("express");
const router = Router();
// app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:3000';



const startSession = async (req, res) => {
    req.body
    // let Finale = []
    // req.body.map((e) => Finale.push({
    //     price: e.price,
    //     quantity: e.quantity
    // }))
    // console.log("Finale", Finale)
    // const session = await stripe.checkout.sessions.create({

    //     line_items: Finale
    //     ,
    //     mode: 'payment',
    //     success_url: `${YOUR_DOMAIN}/success`,
    //     cancel_url: `${YOUR_DOMAIN}/cancel`,
    // });
    // res.send(session.url)
    // console.log(session.url);
    res.json('stripe')
}


const insertProduct = async (req, res, next) => {
    try {
        const product = await stripe.products.create({
            name: req.body.name,
            images: req.body.images,
            description: req.body.description,
        });
        res.json(product.id);
        console.log(product.id)
    } catch (err) {
        next(err);
    }
};
const insertPrice = async (req, res) => {
    const price = await stripe.prices.create({
        product: req.body.product,
        unit_amount: req.body.unit_amount,
        currency: 'usd',
        // recurring: {interval: 'month'},
    });
    res.json(price)
}



const getAll = async (req, res, next) => {
    try {
        const product = await stripe.products.create({
            name: 'Golden Shower',
        });
        res.json(product);
    } catch (error) {
        next(error);
    }
};




router.get("/", getAll);
router.post("/", insertProduct)
router.post("/prices", insertPrice)
router.post("/create-checkout-session", startSession)

module.exports = router;

