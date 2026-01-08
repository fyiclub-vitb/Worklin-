import React from 'react';
import { Sidebar } from './components/Sidebar';
import { PageEditor } from './components/PageEditor';
import { useWorkspace } from './hooks/useWorkspace';

function App() {
  const {
    workspace,
    currentPage,
    currentPageId,
    setCurrentPageId,
    addPage,
    deletePage,
    updatePageTitle,
    addBlock,
    updateBlock,
    deleteBlock,
  } = useWorkspace();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        pages={workspace.pages}
        currentPageId={currentPageId}
        onSelectPage={setCurrentPageId}
        onAddPage={() => addPage()}
        onDeletePage={(pageId) => {
          if (confirm('Are you sure you want to delete this page?')) {
            deletePage(pageId);
          }
        }}
      />
      <PageEditor
        page={currentPage}
        onAddBlock={(type) => currentPageId && addBlock(currentPageId, type)}
        onUpdateBlock={(blockId, updates) =>
          currentPageId && updateBlock(currentPageId, blockId, updates)
        }
        onDeleteBlock={(blockId) =>
          currentPageId && deleteBlock(currentPageId, blockId)
        }
        onUpdatePageTitle={(title) =>
          currentPageId && updatePageTitle(currentPageId, title)
        }
      />
    </div>
  );
}

export default App;
