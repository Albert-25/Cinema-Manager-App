const stripe = require('stripe')(process.env.REACT_APP_SRIPE_PRIVATE_KEY);
const { Router } = require("express");
const router = Router();
// app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:3000';



const startSession = async (req, res) => {
    let Finale = []
    req.body.map((e) => Finale.push({
        price: e.priceID,
        quantity: e.quantity
    }))
    const session = await stripe.checkout.sessions.create({

        line_items: Finale
        ,
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/success`,
        cancel_url: `${YOUR_DOMAIN}/cancel`,
    });
    let varrita = []
    varrita.push(session.url)
    varrita.push(session.id)
    res.send(varrita)


}

const RetriveSesion = async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(
        req.params.id
    );
    res.send(session)
}


const insertProduct = async (req, res, next) => {
    try {
        const product = await stripe.products.create({
            name: req.body.name,
            images: req.body.images,
            description: req.body.description,
        });
        res.json(product.id);
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
router.get("/retrive/:id", RetriveSesion)

module.exports = router;

