'use client'
import React, { useContext, useEffect } from "react";
import Card from "./components/Card";
import { DataMock } from "./context/ContextProvider";
import { Button, Form, Input } from "antd";

function Page() {
  const { mock, setMock } = useContext(DataMock);
   const [form] = Form.useForm();

  const onFinish = ()=>{
    console.log(form.getFieldsValue())
    setMock([...mock, {id: Math.random(), ...form.getFieldsValue(), completed: false}])
    form.resetFields();
  }


  return (
    <>
    <div className=" md:w-[75vh]  px-2">
      <Form 
      form={form} 
      onFinish={onFinish}
      className="flex justify-center space-x-4 p-2"
      >
        <Form.Item className="w-full" name="titulo">
          <Input className="p-2" placeholder="Adicione uma nova tarefa"></Input>
        </Form.Item>
        <Form.Item>
          <Button  className="h-10 flex text-center justify-center text-base font-semibold" type="primary" htmlType="submit">Criar</Button>
        </Form.Item>
      </Form>
      <div className="flex justify-between p-2 font-semibold text-sm">
        <p>Tarefas criadas: {mock.length}</p>
        <p>Concluídas: {mock.filter((e)=> e.completed == true).length}</p>
      </div>
      {mock.map((e)=>{
       return <Card key={e.id} id={e.id} titulo={e.titulo}/>
      })}
    </div>
    </>
  );
}

export default Page;
