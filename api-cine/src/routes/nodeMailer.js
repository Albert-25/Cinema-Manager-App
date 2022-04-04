var nodemailer = require("nodemailer");
const { Router } = require("express");
const router = Router();
const QRCode = require("qrcode")


const liString = (name, quantity) => {
    return `<li><span>${name} ${quantity}</span></li>`
}
// QRCode.toDataURL(codigoUID).then(data => { codigoQR = data })
const sendEmail = async (req, res) => {
    let imagen = await QRCode.toDataURL(req.body.QR)


    let productsString = req.body.products.map((e) => liString(e.name, e.quantity))
    productsString.join()

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
        to: req.body.email,
        attachDataUrls: true,
        form: "Thanks~.",
        html: `<p><b>Saludos</b> Querid@ ${req.body.name} <img src="https://c.tenor.com/jBUbiy6D_ssAAAAC/draw-spinner.gif"/></p>
        <p>su compra en nuestro sitio se ha completado recientemente, aqui le enviaremos<br/>
        la informacion de lo que compro y un codigo QR para llevarlo y mostrarlo en el cine~<br/>
        Usted compro:<br/></p>
        Productos: <br/>
        ${productsString}
        Precio total:${req.body.price} pesos brasileños <br/>
        <img src=${imagen} alt="qr"/>`,
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