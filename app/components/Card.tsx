'use client'
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Checkbox } from "antd";
import { Card } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { DataMock } from "../context/ContextProvider";

function CardList({ id, titulo }) {
    const {mock, setMock} = useContext(DataMock)
    const cardMock = mock.find((e)=> e.id == id)


    const handleDeleteButton = (id:number)=>{
        console.log(id)
        setMock(mock.filter((e)=> e.id !== id))
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
  return (
    <>
    {
        !cardMock.completed 
        ?
        <div className="py-1 ">
        <Card className="h-20">
            <div className="flex justify-between items-center">
                <div onClick={handleCompletedTask} className="flex space-x-2 cursor-pointer">
                    <Checkbox  checked={cardMock.completed}/>
                    <h1>{titulo}</h1>
                </div>
                <Button color="danger" variant="outlined" onClick={()=>{handleDeleteButton(id)}}><DeleteOutlined/></Button>
            </div>
        </Card>
      </div>
        :
        <div className="py-1">
        <Card  className=" h-20" styles={{body:{background:'#f5f5f5'}}}>
            <div className="flex justify-between items-center text-red-950">
                <div onClick={handleCompletedTask} className="flex space-x-2 cursor-pointer">
                    <Checkbox  className="range" checked={cardMock.completed} />
                    <h1 className="text-gray-600"><s>{titulo} </s></h1>
                </div>
                <Button color="default" variant="outlined" style={{backgroundColor:"whitesmoke"}} onClick={()=>{handleDeleteButton(id)}}><DeleteOutlined style={{color:'GrayText'}}/></Button>
            </div>
        </Card>
    </div>
    }
    </>
  );
}

export default CardList;
