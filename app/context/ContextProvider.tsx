'use client'
import React, { useState } from 'react'
import { createContext } from 'react'
import { message } from 'antd';
import DataMockContext from '../interfaces/DataMockContext';
import Task from '../interfaces/Task';

export const DataMock = createContext<DataMockContext>({
  mock: [],
  setMock: () => {},
  messageApi: {
    error: () => {},
    success: () => {},
  }
}
);



function ContextProvider({children}: Readonly<{
  children: React.ReactNode;
}>) {

const [messageApi, contextHolder] = message.useMessage({maxCount:1});
  const [mock, setMock] = useState<Task[]>([]);
  return (
    <DataMock.Provider value={{mock, setMock, messageApi}}>
        {contextHolder}
        {children}
    </DataMock.Provider>
  )
}

export default ContextProvider