import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from './Card';

interface DraggableProps {
    id: string
}

export function DraggableCard({ id }: DraggableProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? '0' : 'inherit',
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Card id={id} />
        </div>
    );
}