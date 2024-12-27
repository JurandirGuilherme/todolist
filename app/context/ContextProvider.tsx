'use client'
import React, { useState } from 'react'
import { createContext } from 'react'
import { message } from 'antd';

export const DataMock = createContext();



function ContextProvider({children}) {

const [messageApi, contextHolder] = message.useMessage();

  const [mock, setMock] = useState([]);
  return (
    <DataMock.Provider value={{mock, setMock, messageApi}}>
        {contextHolder}
        {children}
    </DataMock.Provider>
  )
}

export default ContextProvider