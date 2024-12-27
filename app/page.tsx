'use client';

import React, { useContext } from "react";
import Card from "./components/Card";
import { DataMock } from "./context/ContextProvider";
import { Button, Form, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

interface Task {
  id: number;
  titulo: string;
  completed: boolean;
}

interface DataMockContext {
  mock: Task[];
  setMock: React.Dispatch<React.SetStateAction<Task[]>>;
  messageApi: {
    error: (msg: string) => void;
  };
}

function Page() {
  const { mock, setMock, messageApi } = useContext(DataMock) as DataMockContext;
  const [form] = Form.useForm();

  const onFinish = async () => {
    const { titulo } = form.getFieldsValue();

    if (!titulo || titulo.trim().length == 0) {
      form.resetFields();
      return messageApi.error("Nome da tarefa não pode estar vazio!");
    }

    setMock([
      ...mock,
      { id: Math.random(), titulo, completed: false },
    ]);

    form.resetFields();
  };

  return (
    <div className="md:w-[100vh] px-2">
      <Form
        form={form}
        onFinish={onFinish}
        className="flex justify-center space-x-4 p-2"
      >
        <Form.Item className="w-full" name="titulo" rules={[{ required: true, warningOnly:true }]}>
          <Input
            className="p-2 py-3 dark:bg-[#2e2e2e] dark:border-[#000000] dark:placeholder:text-slate-300 font-semibold dark:text-white placeholder:font-semibold"
            placeholder="Adicione uma nova tarefa"
          />
        </Form.Item>
        <Form.Item>
          <Button
            className="py-6 flex justify-center items-center align-middle text-base font-semibold dark:bg-indigo-700"
            type="primary"
            htmlType="submit"
          >
            <div className="flex space-x-1">
              <p>Criar</p>
              <PlusCircleOutlined className="text-xl" />
            </div>
          </Button>
        </Form.Item>
      </Form>
      <div className="flex justify-between p-2 font-semibold text-sm dark:text-white">
        <p>Tarefas criadas: {mock.length}</p>
        <p>Concluídas: {mock.filter((e) => e.completed).length}</p>
      </div>
      {mock.map((task) => (
        <Card key={task.id} id={task.id} />
      ))}
    </div>
  );
}

export default Page;
