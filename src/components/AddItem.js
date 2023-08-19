"use client";

import { useState } from "react";
import CheckIcon from "./icons/CheckIcon";
import ListComponent from "./ListComponent";

export default function AddItem(props) {
  const [title, SetTitle] = useState("");
  const [listComponents, setListComponents] = useState([]);
  let active
  if(props.type === "task"){
    active = true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const typeId = props.typeId;
      const url = `/api/${props.type}`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title: title, typeId: typeId }),
      });
      const response = await res.json();
      const message = response.message;
      if (res.ok) {
        const newListComponent = { title: title, id: response.id };
        setListComponents([...listComponents, newListComponent]);
        setTitle("");
      } else {
        return message;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      {listComponents.map((component, index) => (
        <ListComponent key={index} title={component.title} id={component.id} type={props.type} parentId={props.typeId} active={active}/>
      ))}
      <div className="fixed bottom-2 w-full p-1 ">

      <form className="flex"
       onSubmit={handleSubmit}>
        <input
        className="rounded-l p-1"
        onChange={(e) => {
          SetTitle(e.target.value);
        }}
        placeholder={`Name of the ${props.type}`}
        value={title}
        />
        <button className="bg-green-800 rounded-r p-1"
        type="submit">
          <CheckIcon />
        </button>
      </form>
          </div>
    </div>
  );
}
