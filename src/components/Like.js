// import React, { useState, useEffect } from "react";

// import styled from "styled-components";
// import { Text, Grid, Input, Button } from "../elements/index";

// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// const Like = (props) => {
//   console.log("like의", props);
//   const [dataId, updateCardId] = useState(props.policyList);

//   React.useEffect(() => {
//     updateCardId(props.policyList);
//   }, [props.policyList]);

//   function handleOnDragEnd(result) {
//     console.log(result);
//     if (!result.destination) return;
//     const items = Array.from(dataId);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     updateCardId(items);
//   }
//   return (
//     <div>
//       <Text>다른 유저들이 좋아요 한 순위!!</Text>
//       <DragDropContext onDragEnd={handleOnDragEnd}>
//         <Droppable droppableId="dataId">
//           {(provided, snapshot) => {
//             return (
//               <div
//                 className="dataId"
//                 {...provided.droppableProps}
//                 ref={provided.innerRef}
//                 isDraggingOver={snapshot.isDraggingOver}
//               >
//                 {dataId.map((x, idx) => {
//                   return (
//                     <Draggable key={idx} draggableId={x.title} index={idx}>
//                       {(provided, snap) => (
//                         <LikeBox
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           ref={provided.innerRef}
//                           isDragging={snap.isDragging}
//                         >
//                           <div style={{ display: "flex" }}>
//                             <div>일자리</div>
//                             <div>소관부처명</div>
//                           </div>
//                           <h1>{x.title}</h1>
//                           <Text>{x.desc}</Text>
//                         </LikeBox>
//                       )}
//                     </Draggable>
//                   );
//                 })}
//                 {provided.placeholder}
//               </div>
//             );
//           }}
//         </Droppable>
//       </DragDropContext>
//     </div>
//   );
// };

// export default Like;

// const LikeBox = styled.div`
//   width: 1194px;
//   height: 204px;
//   border: 1px solid red;
// `;
