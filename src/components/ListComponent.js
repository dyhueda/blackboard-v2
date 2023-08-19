"use client";
import { useState } from "react";
import CheckIcon from "./icons/CheckIcon";
import DeleteIcon from "./icons/DeleteIcon";
import EditIcon from "./icons/EditIcon";
import { useRouter } from "next/navigation";

export default function ListComponent(props) {
  const [isEditable, SetIsEditable] = useState(false);
  const [isActive, SetIsActive] = useState(props.active);
  const [inputValue, SetInputValue] = useState(props.title);
  const [isNotDeleted, setIsNotDeleted] = useState(true);
  const router = useRouter();
  let color;

  if (isActive === undefined) {
    color = "bg-transparent";
  }
  if (isActive === true) {
    color = "bg-green-800";
  }
  if (isActive === false) {
    color = "bg-red-800";
  }
  const handleDelete = async () => {
    const id = props.id;
    const parentId = props.parentId;
    const res = await fetch(`/api/${props.type}`, {
      method: "DELETE",
      headers:{
        "Content-type": "application/json",
      },
      body: JSON.stringify({id, parentId}),
    })
    const response = await res.json();
    if(res.ok){
      setIsNotDeleted(false)
    }else
    return response  
  };

  const handleEdit = async () =>{
    const id = props.id
    const title = inputValue
    const active = !isActive
    const res = await fetch(`/api/${props.type}`, {
      method: "PUT",
      headers:{
        "Content-type": "application/json",
      },
      body: JSON.stringify({id, title, active})
    })
    const response = await res.json();
    const message = response.message
    if(res.ok){
    }else
    throw alert(message)
  };
 
  return (
    <>
      {isNotDeleted && (
        <div className={`${color} p-1 flex w-screen gap-1`} key={props.id}>
          <div className="flex flex-row w-full">
            <button
              className="w-full"
              onClick={() => {
                if (isActive === undefined) {
                  router.push(`/${props.type}/${props.id}`)
                }else{
                  SetIsActive(!isActive);
                  handleEdit();
                }
              }}
            >
              <input
                onChange={(e) => {
                  SetInputValue(e.target.value);
                }}
                className="disabled:bg-transparent w-full p-1 rounded-l"
                value={inputValue}
                disabled={!isEditable}
              />
            </button>
            {isEditable && (
              <button
                className="bg-green-800 rounded-r p-1"
                onClick={()=>{
                  handleEdit();
                  SetIsEditable(!isEditable)
                }}
              >
                <CheckIcon />
              </button>
            )}
          </div>
          <div className="flex justify-between gap-1">
            <button
              className="bg-blue-800 rounded p-1"
              onClick={() => {
                SetIsEditable(!isEditable);
              }}
            >
              <EditIcon />
            </button >
            <button onClick={handleDelete}
            className="bg-red-800 rounded p-1">
              <DeleteIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
