import React, { useState } from 'react';
import { Page, BlockType, Block } from '../types/workspace';
import { Block as BlockComponent } from './Block';
import { Plus } from 'lucide-react';

interface PageEditorProps {
  page: Page | undefined;
  onAddBlock: (type: BlockType) => void;
  onUpdateBlock: (blockId: string, updates: Partial<Block>) => void;
  onDeleteBlock: (blockId: string) => void;
  onUpdatePageTitle: (title: string) => void;
}

export const PageEditor: React.FC<PageEditorProps> = ({
  page,
  onAddBlock,
  onUpdateBlock,
  onDeleteBlock,
  onUpdatePageTitle,
}) => {
  const [isTitleEditing, setIsTitleEditing] = useState(false);

  if (!page) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-gray-400 text-lg">Select a page to start editing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Page Header */}
      <div className="border-b border-gray-200 p-6">
        <input
          type="text"
          value={page.title}
          onChange={(e) => onUpdatePageTitle(e.target.value)}
          onFocus={() => setIsTitleEditing(true)}
          onBlur={() => setIsTitleEditing(false)}
          className="text-4xl font-bold text-gray-900 bg-transparent focus:outline-none w-full"
          placeholder="Untitled Page"
        />
        <p className="text-sm text-gray-500 mt-2">
          Last updated: {new Date(page.updatedAt).toLocaleString()}
        </p>
      </div>

      {/* Blocks */}
      <div className="flex-1 overflow-y-auto">
        {page.blocks.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-400">No blocks yet</p>
            <p className="text-gray-400 text-sm mt-2">Add one below to get started</p>
          </div>
        ) : (
          page.blocks.map((block) => (
            <BlockComponent
              key={block.id}
              block={block}
              onUpdate={(updates) => onUpdateBlock(block.id, updates)}
              onDelete={() => onDeleteBlock(block.id)}
              onAddBlock={() => onAddBlock('paragraph')}
            />
          ))
        )}
      </div>

      {/* Add Block Button */}
      <div className="border-t border-gray-200 p-4">
        <button
          onClick={() => onAddBlock('paragraph')}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition border border-gray-200"
        >
          <Plus size={18} />
          Add Block
        </button>
      </div>
    </div>
  );
};
