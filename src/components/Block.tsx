import React from 'react';
import { Block as BlockType} from '../types/workspace';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash } from 'lucide-react';

interface BlockProps {
  block: BlockType;
  onUpdate: (updates: Partial<BlockType>) => void;
  onDelete: () => void;
  onAddBlock: () => void;
}

export const Block: React.FC<BlockProps> = ({
  block,
  onUpdate,
  onDelete,
  onAddBlock,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative flex items-start gap-2 py-1"
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 pt-1"
      >
        <GripVertical size={16} />
      </div>

      {/* Block Content */}
      <textarea
        value={block.text || ''}
        onChange={(e) => onUpdate({ text: e.target.value })}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.shiftKey === false) {
            e.preventDefault();
            onAddBlock();
          }
        }}
        placeholder="Type something…"
        className="w-full resize-none bg-transparent outline-none text-gray-900 dark:text-gray-100"
        rows={1}
      />

      {/* Delete Button */}
      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500"
      >
        <Trash size={14} />
      </button>
    </div>
  );
};
