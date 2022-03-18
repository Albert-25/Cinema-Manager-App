// import { REQUEST_FAILED } from '../actions/types'
// import { PELI_NAME } from "../actions"

// const initialState = { 
//   peli : []
// }

// function Reducer(state = initialState, action) {
// 	switch (action.type) {
//     case PELI_NAME:
// 			return {
// 				...state,
// 				peli: action.payload
// 			}
//       default:
// 			return state;
//     }
//   }
 

// export default Reducer;


// const actionsObj = {
//   [REQUEST_FAILED]: (state, payload) => ({
//     ...state,
//     err: payload
//   })
  
    
// }

// export const rootReducer = (state = initialState, action) => {
//   if (!actionsObj.hasOwnProperty(action.type)) return state
//   return actionsObj[action.type](state, action.payload)
// }
    