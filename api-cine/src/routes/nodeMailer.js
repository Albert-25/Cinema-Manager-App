var nodemailer = require("nodemailer");
const { Router } = require("express");
const router = Router();
let info = {
    price: 5000,
    nombre: "Elisa Gonzales",
    email: "justapinkdev@gmail.com"
}
let producto = [{
    name: "cacerola de acero",
    quantity: 3,

},
{
    name: "macaco de acero",
    quantity: 1,

}
]

const sendEmail = async (req, res) => {
    var transporter = nodemailer.createTransport({
        service: "Gmail",
        // host: "smtp.ethereal.email",
        // post: 587,
        // secure: false,
        auth: {
            user: "CineHenryPG@gmail.com",
            pass: "Cinehenrypg22"
        },
    });
    // ${producto.map((e) => (e.name))} x ${producto.map((e) => (e.quantity))}
    var mailOptions = {
        subject: "Tu compra se ha procesado.",
        to: info.email,
        form: "Thanks~.",
        html: `<p><b>Saludos</b> Querid@ ${info.nombre} <img src="https://st.depositphotos.com/1967477/3574/v/950/depositphotos_35749475-stock-illustration-cute-monkey-giving-thumb-up.jpg"/></p>
        <p>su compra en nuestro sitio se ha completado recientemente, aqui le enviaremos<br/>
        la informacion de lo que compro y un codigo QR para llevarlo y mostrarlo en el cine~<br/>
        Usted compro:<br/></p>
        Productos: <br/>
        <p>
        ${producto.map((a) =>( 
            <li key={a}>
                <span>{a}</span>
            </li>
        ))}
        </p>
        
        Precio total:${info.price} pesos brasileños <br/>
        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Commons_QR_code.png" alt="qr"/>`,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("No email send unu");
            res.status(500).send(error.message);
        } else {
            console.log("email enviado uwu, nyaa", mailOptions);
            res.status(200).json(req.body)
        }
    })
}



router.post("/send-email", sendEmail);


module.exports = router;