const { Funciones } = require("../db/models/funcion");
const { Pelicula } = require("../db/models/pelicula");
const stripe = require('stripe')(process.env.REACT_APP_SRIPE_PRIVATE_KEY);

const getAll = async (req, res, next) => {
  try {
    let funciones = await Funciones.findAll({ include: [Pelicula] });
    if (funciones) {
      res.json(funciones);
    }
    else {
      req.json({ message: "no se encontró ninguna funcion en la base de datos" })
    }
  } catch (error) {
    next(error);
  }
};

const getFuncion = async (req, res, next) => {
  let id = req.params.id;
  try {
    const func = await Funciones.findByPk(id, { include: [Pelicula] });
    if (func) return res.json(func);
    next();
  } catch (error) {
    next(error);
  }
};

const crearFuncion = async (req, res, next) => {
  const { funcion, peliculaId } = req.body;
  let peli = await Pelicula.findByPk(peliculaId)

  try {
    const stripeProduct = await stripe.products.create({
      name: peli.titulo,
      images: ["https://www.pngmart.com/files/6/Ticket-PNG-Free-Download.png"],
      description: funcion.detalle,
    });

    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: funcion.precio,
      currency: 'usd',
      // recurring: {interval: 'month'},
    });


    funcion.id = stripeProduct.id
    funcion.priceID = stripePrice.id


    let func = await Funciones.create(funcion);
    await func.addPelicula(peliculaId);
    return res.json({
      message: "funcion creada satisfactoriamente",
      data: func,
    });
  } catch (error) {
    console.log(error);
  }
};
// ---------------------------------------------------------------------------------------
const crearFunciones = async (req, res, next) => {
  const { funciones, peliculaId } = req.body;
  let peli = await Pelicula.findByPk(peliculaId)
  try {

    for (let i = 0; i < funciones.length; i++){
      const stripeProduct = await stripe.products.create({
        name: peli.titulo,
        images: ["https://www.pngmart.com/files/6/Ticket-PNG-Free-Download.png"],
        description: funciones[i].detalle,
      });

      const stripePrice = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: funciones[i].precio,
        currency: 'usd',
        // recurring: {interval: 'month'},
      });

      funciones[i].id = stripeProduct.id
      funciones[i].priceID = stripePrice.id
    }

    let funcs = await Funciones.bulkCreate(funciones, {
      ignoreDuplicates: true,
    });

    funcs.map((element) => {
      element.addPelicula(peliculaId);
    });

    return res.send(funcs);
  } catch (error) {
    next(error);
  }
};

const editarFuncion = async (req, res, next) => {
  const id = req.params.id;
  try {
    const [func] = await Funciones.update(req.body.funcion, {
      where: { id: id },
    });
    if (func) {
      return res.json({
        message: "Funcion actualizada satisfactoriamente",
        data: await Funciones.findByPk(id, { include: [Pelicula] }),
      });
    }
  } catch (error) {
    next(error);
  }
};

const eliminarFuncion = async (req, res, next) => {
  const id = req.params.id;
  try {
    const eliminado = await Funciones.destroy({ where: { id: id } });
    if (eliminado) {
      return res.json({ message: "Funcion eliminada satisfactoriamente" });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getFuncion,
  crearFuncion,
  crearFunciones,
  editarFuncion,
  eliminarFuncion,
};
