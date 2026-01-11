import React, { useState, useRef, useEffect } from 'react';
import { Page, BlockType, Block } from '../types/workspace';
import { Block as BlockComponent } from './Block';
import { Plus, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { EmptyState, Illustrations } from './ui/empty-state';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';

import { useWorkspaceStore } from '../store/workspaceStore';

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
  const titleInputRef = useRef<HTMLInputElement>(null);

  const {
    blocks,
    addBlock,
    reorderBlocks,
    updateBlock,
  } = useWorkspaceStore();

  useEffect(() => {
    if (isTitleEditing && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isTitleEditing]);

  /* ---------------- Drag & Drop Setup ---------------- */

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    if (!page) return;

    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = blocks.findIndex(b => b.id === active.id);
    const newIndex = blocks.findIndex(b => b.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(blocks, oldIndex, newIndex);

    // update local state immediately
    reorderBlocks(reordered);

    // persist order
    reordered.forEach((block, index) => {
      onUpdateBlock(block.id, { order: index });
    });
  };

  /* --------------------------------------------------- */

  if (!page) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white dark:bg-[#1e1e1e]">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
            W
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Welcome to WorkLin
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Select a page from the sidebar or create a new one to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-[#1e1e1e] overflow-hidden">
      {/* Page Header */}
      <div className="relative">
        {page.cover ? (
          <div
            className="h-48 w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${page.cover})` }}
          />
        ) : (
          <div className="h-12 w-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20" />
        )}

        <div className="max-w-4xl mx-auto px-16 pt-12 pb-4">
          <div className="flex items-start gap-3 mb-2">
            <div className="text-5xl mt-1">{page.icon}</div>
            <div className="flex-1 min-w-0">
              <input
                ref={titleInputRef}
                type="text"
                value={page.title}
                onChange={(e) => onUpdatePageTitle(e.target.value)}
                onFocus={() => setIsTitleEditing(true)}
                onBlur={() => setIsTitleEditing(false)}
                className="w-full text-4xl font-bold text-gray-900 dark:text-gray-100 bg-transparent focus:outline-none"
                placeholder="Untitled"
              />
            </div>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              <MoreHorizontal size={20} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Blocks */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-16 py-4">
          {blocks.length === 0 ? (
            <EmptyState
              title="This page is empty"
              description="Type / to insert blocks or add your first block using the button below"
              ctaText="Add your first block"
              onClick={() => onAddBlock('paragraph')}
              illustration={Illustrations.NoBlocks}
            />
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={blocks.map(b => b.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-1">
                  {blocks.map((block, index) => (
                    <motion.div
                      key={block.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                    >
                      <BlockComponent
                        block={block}
                        onUpdate={(updates) => {
                          // optimistic UI update
                          updateBlock(block.id, updates);

                          // persist to Firestore
                          onUpdateBlock(block.id, updates);
                        }}
                        onDelete={() => onDeleteBlock(block.id)}
                        onAddBlock={() =>
                          addBlock({
                            id: crypto.randomUUID(),
                            type: 'paragraph',
                            text: '',
                            content: '',
                            order: blocks.length,
                          })
                        }
                      />
                    </motion.div>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}

          {/* Add Block Button */}
          <div className="mt-8 mb-12">
            <button
              onClick={() => onAddBlock('paragraph')}
              className="group flex items-center gap-2 px-3 py-2 text-gray-500 hover:bg-gray-50 rounded w-full"
            >
              <Plus size={18} className="opacity-0 group-hover:opacity-100" />
              <span className="text-sm">
                Type <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">/</kbd> for commands
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
