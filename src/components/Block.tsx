import React, { useState, useRef, useEffect } from 'react';
import { Block as BlockType } from '../types/workspace';
import { Trash2 } from 'lucide-react';
import { BlockTypeSelector } from './BlockTypeSelector';

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
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onAddBlock();
      setIsEditing(false);
    }
  };

  const renderContent = () => {
    const commonClasses = 'w-full bg-transparent focus:outline-none resize-none';

    switch (block.type) {
      case 'heading1':
        return (
          <input
            ref={inputRef as React.Ref<HTMLInputElement>}
            type="text"
            value={block.text}
            onChange={(e) => onUpdate({ text: e.target.value })}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsEditing(true)}
            onBlur={() => setIsEditing(false)}
            placeholder="Heading 1"
            className={`${commonClasses} text-3xl font-bold text-gray-900`}
          />
        );
      case 'heading2':
        return (
          <input
            ref={inputRef as React.Ref<HTMLInputElement>}
            type="text"
            value={block.text}
            onChange={(e) => onUpdate({ text: e.target.value })}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsEditing(true)}
            onBlur={() => setIsEditing(false)}
            placeholder="Heading 2"
            className={`${commonClasses} text-2xl font-semibold text-gray-800`}
          />
        );
      case 'heading3':
        return (
          <input
            ref={inputRef as React.Ref<HTMLInputElement>}
            type="text"
            value={block.text}
            onChange={(e) => onUpdate({ text: e.target.value })}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsEditing(true)}
            onBlur={() => setIsEditing(false)}
            placeholder="Heading 3"
            className={`${commonClasses} text-xl font-semibold text-gray-700`}
          />
        );
      case 'bulleted-list':
        return (
          <div className="flex gap-3 items-start">
            <span className="text-gray-400 mt-1">•</span>
            <input
              ref={inputRef as React.Ref<HTMLInputElement>}
              type="text"
              value={block.text}
              onChange={(e) => onUpdate({ text: e.target.value })}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsEditing(true)}
              onBlur={() => setIsEditing(false)}
              placeholder="List item"
              className={`${commonClasses} text-gray-700`}
            />
          </div>
        );
      case 'checkbox':
        return (
          <div className="flex gap-3 items-start">
            <input
              type="checkbox"
              checked={block.checked || false}
              onChange={(e) => onUpdate({ checked: e.target.checked })}
              className="mt-1 cursor-pointer"
            />
            <input
              ref={inputRef as React.Ref<HTMLInputElement>}
              type="text"
              value={block.text}
              onChange={(e) => onUpdate({ text: e.target.value })}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsEditing(true)}
              onBlur={() => setIsEditing(false)}
              placeholder="Todo item"
              className={`${commonClasses} text-gray-700 ${
                block.checked ? 'line-through text-gray-400' : ''
              }`}
            />
          </div>
        );
      default:
        return (
          <textarea
            ref={inputRef as React.Ref<HTMLTextAreaElement>}
            value={block.text}
            onChange={(e) => onUpdate({ text: e.target.value })}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsEditing(true)}
            onBlur={() => setIsEditing(false)}
            placeholder="Start typing..."
            rows={1}
            className={`${commonClasses} text-gray-700 text-base leading-relaxed`}
            style={{ overflow: 'hidden', minHeight: '24px' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = target.scrollHeight + 'px';
            }}
          />
        );
    }
  };

  return (
    <div className="flex items-start gap-3 py-2 px-4 group hover:bg-gray-50 rounded transition">
      <div className="flex gap-2 items-center opacity-0 group-hover:opacity-100 transition">
        <BlockTypeSelector
          currentType={block.type}
          onChange={(type) => onUpdate({ type })}
        />
        <button
          onClick={onDelete}
          className="p-1 hover:bg-red-100 rounded transition text-gray-400 hover:text-red-500"
          aria-label="Delete block"
        >
          <Trash2 size={16} />
        </button>
      </div>
      <div className="flex-1 min-w-0 cursor-text" onClick={() => setIsEditing(true)}>
        {renderContent()}
      </div>
    </div>
  );
};
