import { useState, useEffect } from 'react';
import { Workspace, Page, Block, BlockType } from '../types/workspace';

const STORAGE_KEY = 'worklin-workspace';

export const useWorkspace = () => {
  const [workspace, setWorkspace] = useState<Workspace>({ pages: [] });
  const [currentPageId, setCurrentPageId] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Convert date strings back to Date objects
        const workspaceWithDates: Workspace = {
          pages: parsed.pages.map((page: any) => ({
            ...page,
            createdAt: new Date(page.createdAt),
            updatedAt: new Date(page.updatedAt),
          })),
        };
        setWorkspace(workspaceWithDates);
        if (workspaceWithDates.pages.length > 0) {
          setCurrentPageId(workspaceWithDates.pages[0].id);
        }
      } catch (error) {
        console.error('Failed to parse workspace:', error);
        initializeDefault();
      }
    } else {
      initializeDefault();
    }
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    if (workspace.pages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(workspace));
    }
  }, [workspace]);

  const initializeDefault = () => {
    const defaultPage: Page = {
      id: '1',
      title: 'Welcome to Worklin',
      icon: '📝',
      blocks: [
        { id: 'b1', type: 'heading1', text: 'Welcome to Worklin' },
        { id: 'b2', type: 'paragraph', text: '✨ Start typing to create your first note...' },
        { id: 'b3', type: 'paragraph', text: '📚 Click "New Page" in the sidebar to add more pages' },
        { id: 'b4', type: 'bulleted-list', text: 'Supports headings, paragraphs, lists, and checklists' },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setWorkspace({ pages: [defaultPage] });
    setCurrentPageId('1');
  };

  const addPage = (title: string = 'Untitled Page', icon: string = '📄') => {
    const newPage: Page = {
      id: Date.now().toString(),
      title,
      icon,
      blocks: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setWorkspace((prev) => ({ pages: [...prev.pages, newPage] }));
    setCurrentPageId(newPage.id);
  };

  const deletePage = (pageId: string) => {
    setWorkspace((prev) => ({
      pages: prev.pages.filter((p) => p.id !== pageId),
    }));
    if (currentPageId === pageId) {
      const remaining = workspace.pages.filter((p) => p.id !== pageId);
      setCurrentPageId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const updatePageTitle = (pageId: string, title: string) => {
    setWorkspace((prev) => ({
      pages: prev.pages.map((p) =>
        p.id === pageId ? { ...p, title, updatedAt: new Date() } : p
      ),
    }));
  };

  const updatePageIcon = (pageId: string, icon: string) => {
    setWorkspace((prev) => ({
      pages: prev.pages.map((p) =>
        p.id === pageId ? { ...p, icon, updatedAt: new Date() } : p
      ),
    }));
  };

  const addBlock = (pageId: string, type: BlockType = 'paragraph') => {
    setWorkspace((prev) => ({
      pages: prev.pages.map((p) =>
        p.id === pageId
          ? {
              ...p,
              blocks: [
                ...p.blocks,
                { id: Date.now().toString(), type, text: '', checked: false },
              ],
              updatedAt: new Date(),
            }
          : p
      ),
    }));
  };

  const updateBlock = (pageId: string, blockId: string, updates: Partial<Block>) => {
    setWorkspace((prev) => ({
      pages: prev.pages.map((p) =>
        p.id === pageId
          ? {
              ...p,
              blocks: p.blocks.map((b) =>
                b.id === blockId ? { ...b, ...updates } : b
              ),
              updatedAt: new Date(),
            }
          : p
      ),
    }));
  };

  const deleteBlock = (pageId: string, blockId: string) => {
    setWorkspace((prev) => ({
      pages: prev.pages.map((p) =>
        p.id === pageId
          ? {
              ...p,
              blocks: p.blocks.filter((b) => b.id !== blockId),
              updatedAt: new Date(),
            }
          : p
      ),
    }));
  };

  const currentPage = workspace.pages.find((p) => p.id === currentPageId);

  return {
    workspace,
    currentPage,
    currentPageId,
    setCurrentPageId,
    addPage,
    deletePage,
    updatePageTitle,
    updatePageIcon,
    addBlock,
    updateBlock,
    deleteBlock,
  };
};
