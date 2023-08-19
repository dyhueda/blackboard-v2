"use client";
import AddItem from "@/components/AddItem";
import ListComponent from "@/components/ListComponent";
import { useEffect, useState } from "react";

export default function UserPage(params) {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const id = params.params.id;
    const getUrl = `/api/group?id=${id}`;
    fetch(getUrl, {
      next: { revalidate: 1 },
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setGroups(response))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {groups?.map((group) => (
        <ListComponent key={group._id} title={group.title} id={group._id} parentId={params.params.id} type="group" />
      ))}

      <AddItem typeId={params.params.id} type="group" />
    </div>
  );
}
