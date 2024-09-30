import { useState } from 'react'
import './App.css'
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, DropAnimation, defaultDropAnimationSideEffects } from '@dnd-kit/core';
import { Card } from './Card';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { DraggableCard } from './DraggableCard';

export function SortableZone() {
  const [items, setItems] = useState(['1', '2', '3', '4', '5']);
  const [activeId, setActiveId] = useState<string | null>(null);
  const dropAnimationConfig: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0',
        },
      },
    }),
  };
  const two = 2 * 2

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div className={'w-[40em] grid grid-cols-' + two}>
          {items.map(id =>
            <DraggableCard key={id} id={id} />
          )}
        </div>
      </SortableContext>

      <DragOverlay dropAnimation={dropAnimationConfig}>
        {activeId ? (
          <Card id={activeId} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active !== null && over !== null && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  }
}