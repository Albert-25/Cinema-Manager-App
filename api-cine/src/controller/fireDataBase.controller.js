const {db, app, secundaria} = require('../../firebase.js');
const admin = require('firebase-admin');

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
  const {correo, password, imagen, nombre, rol} = req.body
  console.log('we are here')
    let data = await admin.auth().createUser({
email: correo,
password: password,
})

  let final = await db.collection('usuarios').doc(`${data.uid}`).set({
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
 console.log('doc', doc)
 res.send(doc)
}

const deleteUser = async (req, res, next) => {
    const id = req.params.id;
 await db.collection('usuarios').doc(`${id}`).delete()
 res.send('Contact deleted');
}

const updateUser = async (req, res, next) => {
    const id = req.params.id;

  await db.collection('usuarios').doc(`${id}`).update(req.body)

  res.send('Contact updated')

}


module.exports = {
  allUsers,
  createUsers,
  editUsers,
  deleteUser,
  updateUser
};
