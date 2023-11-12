"use client";

import React, {useEffect, useState} from 'react';
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps
} from "react-beautiful-dnd";
import {XCircleIcon} from "@heroicons/react/24/solid";
import {useBoardStore} from "@/store/boardStore";
import getUrl from "@/lib/getUrl";
import {log} from "util";
import Image from "next/image";

type TodoCardProps = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}
const TodoCard = ({
                    todo,
                    index,
                    id,
                    innerRef,
                    draggableProps,
                    dragHandleProps
                  }: TodoCardProps) => {

  const deleteTask = useBoardStore(state => state.deleteTask);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (todo.image) {
      const fetchImage = async () => {
        const url = await getUrl(todo.image!);
        if (url) {
          setImageUrl(url.toString());
        }
      };
      fetchImage().catch(err => console.log(err));
    }
  }, [todo]);


  return (
    <div
      className="bg-white rounded-md space-y-2 drop-shadow-md"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}>
      <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>
        <button onClick={() => deleteTask(index, todo, id)}
                className="text-red-500 hover:text-red-600">
          <XCircleIcon className="ml-5 h-8 w-8"/>
        </button>

      </div>
      {imageUrl && (
        <div className="h-full w-full rounded-b-md">
          <Image
            width={400}
            height={200}
            className="w-full object-contain rounded-b-md"
            src={imageUrl}
            alt="Task image"
          />
        </div>
      )}
    </div>
  );
};

export default TodoCard;
