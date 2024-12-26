'use client'
import React, { useState } from 'react'
import { createContext } from 'react'



export const DataMock = createContext();


function ContextProvider({children}) {
  const [mock, setMock] = useState([]);
  return (
    <DataMock.Provider value={{mock, setMock}}>
        {children}
    </DataMock.Provider>
  )
}

export default ContextProvider