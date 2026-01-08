import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Page } from '../types/workspace';

interface SidebarProps {
  pages: Page[];
  currentPageId: string | null;
  onSelectPage: (pageId: string) => void;
  onAddPage: () => void;
  onDeletePage: (pageId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  pages,
  currentPageId,
  onSelectPage,
  onAddPage,
  onDeletePage,
}) => {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">📓 Worklin</h1>
        <p className="text-xs text-gray-500 mt-1">Notes & Docs</p>
      </div>

      {/* New Page Button */}
      <button
        onClick={onAddPage}
        className="m-4 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        <Plus size={18} />
        New Page
      </button>

      {/* Pages List */}
      <div className="flex-1 overflow-y-auto px-2 py-2">
        {pages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400 text-sm">No pages yet</p>
            <p className="text-gray-400 text-xs mt-2">Create one to get started</p>
          </div>
        ) : (
          pages.map((page) => (
            <div
              key={page.id}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition ${
                currentPageId === page.id
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span
                className="text-lg flex-shrink-0 cursor-pointer"
                onClick={() => onSelectPage(page.id)}
              >
                {page.icon}
              </span>
              <div className="flex-1 min-w-0" onClick={() => onSelectPage(page.id)}>
                <p className="text-sm font-medium truncate">{page.title}</p>
                <p className="text-xs text-gray-400">
                  {page.blocks.length} blocks
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeletePage(page.id);
                }}
                className="p-1 hover:bg-red-100 rounded transition text-gray-400 hover:text-red-500"
                aria-label="Delete page"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4 text-xs text-gray-500">
        <p>v0.1.0 • MIT License</p>
        <p className="mt-2">
          <a href="https://github.com/your-username/worklin" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
      </div>
    </div>
  );
};
