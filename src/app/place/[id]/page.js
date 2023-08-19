"use client";
import AddItem from "@/components/AddItem";
import ListComponent from "@/components/ListComponent";
import { useEffect, useState } from "react";

export default function PlacePage(params) {
  const [tasks, setTasks] = useState(['']);

  useEffect(() => {
    const id = params.params.id;
    const getUrl = `/api/task?id=${id}`;
    fetch(getUrl, {
      next: { revalidate: 1 },
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setTasks(response))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div>
      {tasks?.map((task) => (
        <ListComponent key={task._id} title={task.title} id={task._id} parentId={params.params.id} active={task.active} type="task" />
      ))}

      <AddItem typeId={params.params.id} type="task" />
    </div>
  );
}
