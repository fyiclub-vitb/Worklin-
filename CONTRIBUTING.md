# Contributing to Worklin

Thank you for your interest in contributing to Worklin! This document provides guidelines and instructions for contributing to the project.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- A code editor (VS Code recommended)

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork the repo on GitHub, then clone your fork
   git clone https://github.com/your-username/worklin.git
   cd worklin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The app should load with the default welcome page

## Development Workflow

### Making Changes

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add comments for complex logic
   - Test your changes locally

3. **Test your changes**
   ```bash
   npm run lint  # Type check
   npm run build # Build for production
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: description of your changes"
   ```

   Use clear, descriptive commit messages:
   - `Add: new feature description`
   - `Fix: bug description`
   - `Update: change description`
   - `Refactor: refactoring description`

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template
   - Submit the PR

## Code Style Guidelines

### TypeScript

- Use TypeScript strict mode
- Avoid `any` types - use proper typing
- Use `React.FC<Props>` for functional components
- Use interfaces for props and data structures
- Use const/let (never var)
- Use arrow functions for component definitions

### React

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper prop interfaces
- Add proper key props for lists

### Styling

- Use Tailwind CSS exclusively
- Follow the existing color scheme
- Maintain consistent spacing
- Use responsive design patterns
- Add hover and focus states

### File Structure

- Keep related files together
- Use descriptive file names
- One component per file
- Export components as default when appropriate

## Reporting Issues

### Bug Reports

When reporting a bug, please include:

1. **Description**: Clear description of the bug
2. **Steps to Reproduce**: Step-by-step instructions
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Screenshots**: If applicable
6. **Environment**: Browser, OS, Node version

### Feature Requests

When requesting a feature, please include:

1. **Description**: Clear description of the feature
2. **Use Case**: Why this feature would be useful
3. **Proposed Solution**: How you envision it working
4. **Alternatives**: Other solutions you've considered

## Pull Request Process

1. **Update Documentation**: If you add features, update README.md
2. **Add Tests**: If applicable (future)
3. **Ensure Build Passes**: `npm run build` should succeed
4. **No Console Errors**: Check browser console
5. **Responsive Design**: Test on different screen sizes

### PR Review Checklist

- [ ] Code follows style guidelines
- [ ] TypeScript compiles without errors
- [ ] No console errors or warnings
- [ ] Works on desktop and mobile
- [ ] Documentation updated (if needed)
- [ ] Commit messages are clear

## Project Structure

```
worklin/
├── src/
│   ├── components/     # React components
│   ├── hooks/         # Custom React hooks
│   ├── types/         # TypeScript type definitions
│   ├── styles/        # CSS/Tailwind styles
│   └── utils/         # Utility functions
├── public/            # Static assets
└── ...config files
```

## Questions?

- Open an issue for questions
- Check existing issues first
- Be respectful and constructive

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to Worklin! 🚀
