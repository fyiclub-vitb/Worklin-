# 📓 Worklin

A lightweight, open-source notes and documentation workspace inspired by Notion. Create pages, organize content in a sidebar, and edit using simple blocks (headings, paragraphs, bullets, checklists).

![Worklin](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![React](https://img.shields.io/badge/React-18.2-blue)

## ✨ Features

- 📄 **Page Management**: Create, rename, and delete pages with emoji icons
- 🧱 **Block-Based Editor**: 6 block types (paragraphs, headings, lists, checkboxes)
- 💾 **Auto-Save**: All changes automatically saved to localStorage
- ⌨️ **Keyboard Shortcuts**: Press Enter to create new blocks
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS
- 🔒 **Privacy-First**: All data stored locally in your browser
- 📱 **Responsive**: Works on desktop and mobile devices
- 🎯 **Type-Safe**: Full TypeScript support with strict mode

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/worklin.git
cd worklin

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run lint
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2+ with Vite
- **Language**: TypeScript 5.0+ (strict mode)
- **Styling**: Tailwind CSS 3.3+
- **Icons**: Lucide React
- **State Management**: React Hooks (custom useWorkspace hook)
- **Data Persistence**: localStorage
- **Build Tool**: Vite 4.4+

## 📁 Project Structure

```
worklin/
├── src/
│   ├── components/     # React components
│   │   ├── Sidebar.tsx
│   │   ├── PageEditor.tsx
│   │   ├── Block.tsx
│   │   └── BlockTypeSelector.tsx
│   ├── hooks/         # Custom React hooks
│   │   └── useWorkspace.ts
│   ├── types/         # TypeScript type definitions
│   │   └── workspace.ts
│   ├── styles/        # CSS/Tailwind styles
│   │   └── index.css
│   └── utils/         # Utility functions
│       └── storage.ts
├── public/            # Static assets
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🎯 Usage

### Creating Pages

1. Click the "New Page" button in the sidebar
2. The new page will appear in the sidebar
3. Click on it to start editing

### Adding Blocks

1. Click "Add Block" at the bottom of the editor
2. Or press Enter while editing a block to create a new one below

### Block Types

- **Text**: Regular paragraph text (auto-expanding textarea)
- **H1, H2, H3**: Headings with different sizes
- **List**: Bulleted list items
- **Todo**: Checkbox items with strikethrough when checked

### Editing Blocks

- Click on any block to edit
- Change block type using the dropdown on hover
- Delete blocks using the trash icon on hover
- Press Enter to create a new block below

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Notion's block-based editor
- Built with React, Vite, and Tailwind CSS
- Icons provided by [Lucide](https://lucide.dev)

## 🔗 Links

- **GitHub**: [https://github.com/your-username/worklin](https://github.com/your-username/worklin)
- **Live Demo**: [https://worklin.vercel.app](https://worklin.vercel.app) (coming soon)

## 📝 Roadmap

- [ ] Export to Markdown
- [ ] Import from Markdown
- [ ] Search functionality
- [ ] Dark mode
- [ ] Collaborative editing
- [ ] Cloud sync

---

Made with ❤️ by the Worklin team
