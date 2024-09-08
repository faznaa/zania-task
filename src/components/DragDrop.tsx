import { sampleData } from "@/utils/data";
import React, { useState, useCallback } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CustomImage from "./CustomImage";
import Modal from "./Modal";
import useAutoSave from "@/hooks/useAutoSave";
import Spinner from "./Spinner";

const ItemTypes = {
  CARD: "card",
};

function Card({ item, index, moveCard }: any) {
  const [_, ref] = useDrag<any>({
    type: ItemTypes.CARD,
    item: { index },
  });

  const [_i, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover: (draggedItem: any) => {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [open, setOpen] = useState(false);

  return (
    <div
      ref={(node) => ref(drop(node)) as any}
      className="h-80 w-64  text-lg  "
    >
      <div>{item.title}</div>
      <button
        onClick={() => setOpen(true)}
        className="w-64 h-64 overflow-hidden mx-auto"
      >
        <CustomImage
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </button>
      <Modal open={open} setOpen={setOpen}>
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </Modal>
    </div>
  );
}

export default function DragDrop() {
    const { items, setItems, lastSaved, isSaving } = useAutoSave('/api/cats'); 
    const moveCard = useCallback(
        (fromIndex: number, toIndex: number) => {
          const updatedItems = [...items];
          const [movedItem] = updatedItems.splice(fromIndex, 1);
          updatedItems.splice(toIndex, 0, movedItem);
      
          const reorderedItems = updatedItems.map((item, index) => ({
            ...item,
            position: index,
          }));
      
          setItems(reorderedItems);
        },
        [items]
      );

  return (
    <DndProvider backend={HTML5Backend}>
        <div className="w-full flex justify-start text-gray-200 text-lg my-5">
        {lastSaved && (
             <span>Last saved {lastSaved}</span>
        )}
        {isSaving && <Spinner className="border-white"/> }
        </div>
      <div className="grid grid-cols-3 gap-6">
        {items.map((item:any, index:number) => (
          <Card
            key={item.title}
            index={index}
            item={item}
            moveCard={moveCard}
          />
        ))}
      </div>
    </DndProvider>
  );
}
