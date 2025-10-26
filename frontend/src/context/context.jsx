/* eslint-disable react-refresh/only-export-components */
import React,{createContext} from 'react'


export let contextdata = createContext();
const ContextProvider = ({children}) => {

  return (
   <contextdata.Provider>
    {children}
   </contextdata.Provider>
  )
}

export default ContextProvider