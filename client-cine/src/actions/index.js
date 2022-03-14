import { Service } from '../utils/service'
import { REQUEST_FAILED } from './types'

const api = new Service()

// -------------------------       Async action -------------------------------

// export const nombreFunction = () => ((dispatch) =>{
//   api.nombreMetodo() 
//     .then(res => {
//       // Procesamos res
//       dispatch({
//         type: Enviamos el type,
//         payload: Enviamos payload
//       });
//     })
//     .catch(err => {
//       dispatch({
//         type: REQUEST_FAILED,
//         payload: err
//       })
//     })
// })


// -----------------------------     Sync action ---------------------------------------

// export const nombreFunction = (attr) => {
//   return {
//     type: Enviamos el type,
//     payload: Enviamos pauload (attr)
//   };
// }; 