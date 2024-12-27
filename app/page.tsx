'use client'
import React, { useContext, useEffect } from "react";
import Card from "./components/Card";
import { DataMock } from "./context/ContextProvider";
import { Button, Form, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

function Page() {
  const { mock, setMock, messageApi } = useContext(DataMock);
   const [form] = Form.useForm();

  const onFinish = async ()=>{
    console.log(form.getFieldsValue().titulo.trim())
    if (form.getFieldsValue().titulo == undefined || form.getFieldsValue().titulo.trim().length == 0) {
      messageApi.error('Nome da tarefa não pode estar vazio!')
      return form.resetFields();
    }
    setMock([...mock, {id: Math.random(), ...form.getFieldsValue(), completed: false}])
    form.resetFields();  
  }


  return (
    <>
    <div className=" md:w-[100vh]  px-2">
      <Form 
      form={form} 
      onFinish={onFinish}
      className="flex justify-center space-x-4 p-2"
      >
        <Form.Item className="w-full" name="titulo">
          <Input className="p-2 py-3 dark:bg-[#2e2e2e] dark:border-[#000000] dark:placeholder:text-slate-300  font-semibold dark:text-white placeholder:font-semibold" placeholder="Adicione uma nova tarefa"></Input>
        </Form.Item>
        <Form.Item>
          <Button  className="py-6 flex justify-center items-center align-middle text-base font-semibold dark:bg-indigo-700" type="primary" htmlType="submit">
            <div className="flex space-x-1">
              <p>Criar</p>
              <PlusCircleOutlined className="text-xl"/>
            </div>
            </Button>
        </Form.Item>
      </Form>
      <div className="flex justify-between p-2 font-semibold text-sm dark:text-white">
        <p>Tarefas criadas: {mock.length}</p>
        <p>Concluídas: {mock.filter((e)=> e.completed == true).length}</p>
      </div>
      {mock.map((e)=>{
       return <Card key={e.id} id={e.id}/>
      })}
    </div>
    </>
  );
}

export default Page;
