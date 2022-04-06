import React ,{createContext,useReducer}from 'react';

let stateSection={
	section:'peliculas'
}
let root=(state,action)=>{
	switch(action.type){
	    case "sectionSelect":
	        return {...state,section:action.payload}
	    default:
	      return state
	}
}


export const AdminContext= createContext()



export const AdminContextProvider=({children})=>{
	const [state,dispatch]= useReducer(root,stateSection)

	return (
	   <AdminContext.Provider value={{state,dispatch}}>
	      {children}
	   </AdminContext.Provider >
	)
}