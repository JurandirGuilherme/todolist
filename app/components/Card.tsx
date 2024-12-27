'use client'
import { CheckOutlined, DeleteOutlined, EditOutlined, ExclamationCircleFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, Modal } from "antd";
import { Card } from "antd";
import React, { useContext,  useState } from "react";
import { DataMock } from "../context/ContextProvider";

function CardList({id}) {
    const {mock, setMock, messageApi} = useContext(DataMock)
    const [isEdtting, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState('');

    const cardMock = mock.find((e)=> e.id == id)

    const handleDeleteButton = (id:number)=>{
        setMock(mock.filter((e)=> e.id !== id))
        messageApi.success('Tarefa removida com sucesso!')
    }
    const handleCompletedTask = ()=>{
        const task = mock.map((e)=>{
            if (e.id == id){
                const {completed, ...items} = e
                return {...items, completed: !completed}
            }
            return e
        })
        setMock(task)
    }


    const handleEditTask = ()=>{
        setIsEditing(true)
        setEditValue(cardMock.titulo)
    }

    const confirmEdit = () =>{
        if (editValue == cardMock.titulo) return setIsEditing(false)
        if (editValue == '') return messageApi.error('Nome da tarefa não pode estar vazio.')
        const task = mock.map((e)=>{
            if (e.id == id){
                const {...items} = e
                return {...items, titulo: editValue}
            }
            return e
        })
        setMock(task)
        messageApi.success('Tarefa editada com sucesso!')
        setIsEditing(false)
    }

    const [showModalDelete,setShowModalDelete] = useState(false);

    return (
    <>
    <Modal 
    title={<div className="flex space-x-2 mx-3"><ExclamationCircleOutlined className="text-red-600 text-xl"/> <h1> Confirmar exclusão da tarefa?</h1></div>}
    open={showModalDelete}
    className="w-96"
    onOk={()=>{handleDeleteButton(id)}}
    onCancel={()=>{setShowModalDelete(false)}}
    onClose={()=>{setShowModalDelete(false)}}
    okButtonProps={{danger:true}}
    okText='Excluir'
    cancelText='Cancelar'
    />
    {
        !cardMock.completed 
        ?
        <div className="py-1 ">
        <Card className="h-20">
            <form className="flex justify-between items-center " onSubmit={(e)=>{e.preventDefault(); confirmEdit();}}>
                <div onClick={!isEdtting ? handleCompletedTask : undefined} className="flex space-x-2 cursor-pointer">
                    <Checkbox  checked={cardMock.completed}/>
                    {isEdtting 
                    ? 
                    <>
                    <Input value={editValue} onChange={(e)=>{setEditValue(e.target.value)}}></Input>
                    </>
                    : 
                    <>
                    <h1>{cardMock.titulo}</h1>
                    </>
                    }
                </div>
                <div className=" space-x-2">
                    { isEdtting ? 
                    <>
                    <Button color="primary" variant="outlined" onClick={confirmEdit}><CheckOutlined/></Button>
                    </>
                    :
                    <>
                    <Button color="primary" variant="outlined"onClick={()=>{handleEditTask()}}><EditOutlined/></Button>
                    <Button color="danger" variant="outlined" onClick={()=>{setShowModalDelete(true)}}><DeleteOutlined/></Button>
                    </>
                     }
                </div>
            </form>
        </Card>
      </div>
        :
        <div className="py-1">
        <Card  className=" h-20 bg-gray-200 po" >
            <div className="flex justify-between items-center text-red-950">
                <div onClick={handleCompletedTask} className="flex space-x-2 cursor-pointer">
                    <Checkbox  className="range" checked={cardMock.completed} />
                    <h1 className="text-gray-600"><s>{cardMock.titulo} </s></h1>
                </div>
                <div className="space-x-2">
                    {/* <Button color="default" variant="outlined" style={{backgroundColor:"whitesmoke"}} onClick={()=>{handleDeleteButton(id)}}><EditOutlined style={{color:'GrayText'}}/></Button> */}
                    <Button color="default" variant="outlined" className="hover:border-red-400" onClick={()=>{setShowModalDelete(true)}}><DeleteOutlined style={{color:'GrayText'}}/></Button>

                </div>
            </div>
        </Card>
    </div>
    }
    </>
  );
}

export default CardList;
