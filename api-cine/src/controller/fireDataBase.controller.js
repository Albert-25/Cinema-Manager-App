const {db} = require('../../firebase.js');
//  ...e.data()
const allUsers = async (req, res, next) => {
  try {
    const querySnapshot = await db.collection('usuarios').get()
    const contacts = querySnapshot.docs.map((e) => ({
      id: e.id,
      correo: e.data().correo,
      imagen: e.data().imagen,
      nombre: e.data().nombre,
      rol: e.data().rol,

    }))

res.json(contacts)
  } catch (error) {
    res.send(error);
  }
};

const createUsers = async (req, res, next) => {
  const {correo, imagen, nombre, rol} = req.body
  await db.collection('usuarios').add({
    correo,
      imagen,
      nombre,
      rol,
  })
  res.send('New contact created');
}

const editUsers = async (req, res, next) => {
    const id = req.params.id;
    console.log(id)
 const doc = await db.collection('usuarios').doc(`${id}`).get()
 res.json({
  id: doc.id,
  correo: doc.data().correo,
      imagen: doc.data().imagen,
      nombre: doc.data().nombre,
      rol: doc.data().rol,

 })
}


module.exports = {
  allUsers,
  createUsers,
  editUsers
};
