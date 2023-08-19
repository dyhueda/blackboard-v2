"use client";
import AddItem from "@/components/AddItem";
import ListComponent from "@/components/ListComponent";
import { useEffect, useState } from "react";

export default function GroupPage(params) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const id = params.params.id;
    const getUrl = `/api/place?id=${id}`;
    fetch(getUrl, {
      next: { revalidate: 1 },
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setPlaces(response))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {places?.map((place) => (
        <ListComponent key={place._id} title={place.title} id={place._id} parentId={params.params.id} type="place" />
      ))}

      <AddItem typeId={params.params.id} type="place" />
    </div>
  );
}
