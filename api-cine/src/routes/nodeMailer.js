var nodemailer = require("nodemailer");
const { Router } = require("express");
const router = Router();
const QRCode = require("qrcode")


const liString = (name, quantity) => {
    return `<li><span>${name} x  ${quantity}</span></li>`
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
        html: `<p><b>Saludos</b> Querid@ ${req.body.name}</p>
        <p>su compra en nuestro sitio se ha efectuado satisfactoriamente, abajo le mostraremos<br/>
        la informacion de su compra y un codigo QR para llevarlo y mostrarlo a nuestro empleado en Caja<br/>
        <br/>
        Usted compró:<br/></p>

        ${productsString}
        <br/>
        <br/>
        Precio total: $ ${req.body.price} USD <br/>
        <p>Aqui tiene el codigo QR, muestrelo en boleteria para recibir su compra</p><br/>
        <img src=${imagen} alt="qr"/>`,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            res.status(200).json(req.body)
        }
    })
}



router.post("/send-email", sendEmail);


module.exports = router;