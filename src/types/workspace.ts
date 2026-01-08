export type BlockType = 'paragraph' | 'heading1' | 'heading2' | 'heading3' | 'bulleted-list' | 'checkbox';

export interface Block {
  id: string;
  type: BlockType;
  text: string;
  checked?: boolean;
}

export interface Page {
  id: string;
  title: string;
  icon: string;
  blocks: Block[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Workspace {
  pages: Page[];
}
