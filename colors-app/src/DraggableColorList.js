import React from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import DraggableColorBox from './DraggableColorBox'

const DraggableColorList = SortableContainer(({
  colors,
  deleteColorBox
}) => {
  return (
    <div style={{ height: '100%' }}>
      {/* the height of DraggableColorBox is relative to its parent
      however the first div has no height, so we set 100% to recover */}
      {colors.map((color, i) => (
        <DraggableColorBox
          key={color.name}
          color={color.color}
          name={color.name}
          deleteColorBox={() => deleteColorBox(color.name)}
          //for dnd
          index={i}
        />
      ))}
    </div>
  );
})

export default DraggableColorList
