import React, { useState } from "react";
import styled from "styled-components";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

//dnd

const DndShop = (props) => {
  const [cardId, updateCardId] = useState(props.post_list);
  React.useEffect(() => {
    updateCardId(props.post_list);
  }, [props.post_list]);
  function handleOnDragEnd(result) {
    console.log(result);
    if (!result.destination) return;
    const items = Array.from(cardId);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCardId(items);
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="cardId">
          {(provided) => {
            return (
              <DndBox
                className="cardId"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div>나의 정책 </div>
                {cardId.map((x, index) => (
                  <Draggable key={index} draggableId={x.title} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <CardBox>{x.title}</CardBox>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </DndBox>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DndShop;

const DndBox = styled.div`
  position: absolute;
  width: 150px;
  height: 599px;
  right: 0;
  border-radius: 20px 0 0 20px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  margin-top: 80px;
`;

const CardBox = styled.div`
  width: 120px;
  height: 120px;
  background: rgba(255, 169, 90, 0.5);
  border-radius: 10px;
`;
