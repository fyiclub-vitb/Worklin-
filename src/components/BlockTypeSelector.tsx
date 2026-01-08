import React from 'react';
import { BlockType } from '../types/workspace';

interface BlockTypeSelectorProps {
  currentType: BlockType;
  onChange: (type: BlockType) => void;
}

const blockTypes: { type: BlockType; label: string }[] = [
  { type: 'paragraph', label: 'Text' },
  { type: 'heading1', label: 'H1' },
  { type: 'heading2', label: 'H2' },
  { type: 'heading3', label: 'H3' },
  { type: 'bulleted-list', label: 'List' },
  { type: 'checkbox', label: 'Todo' },
];

export const BlockTypeSelector: React.FC<BlockTypeSelectorProps> = ({
  currentType,
  onChange,
}) => {
  return (
    <select
      value={currentType}
      onChange={(e) => onChange(e.target.value as BlockType)}
      className="text-sm px-2 py-1 border border-gray-300 rounded hover:border-gray-400 cursor-pointer bg-white"
    >
      {blockTypes.map((type) => (
        <option key={type.type} value={type.type}>
          {type.label}
        </option>
      ))}
    </select>
  );
};
