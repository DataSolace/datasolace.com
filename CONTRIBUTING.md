# Contributing to DataSolace

Thank you for your interest in contributing to the DataSolace project! We welcome contributions of all kinds, including bug fixes, new features, documentation improvements, and more.

## Table of Contents

- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Code Style](#code-style)
- [Reporting Issues](#reporting-issues)
- [Community Standards](#community-standards)

---

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/datasolace.git
   cd datasolace
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## How to Contribute

- **Bug Reports:**  
  Open an issue describing the bug, steps to reproduce, and expected/actual behavior.

- **Feature Requests:**  
  Open an issue describing the feature and your use case.

- **Pull Requests:**  
  1. Fork the repository.
  2. Create a new branch (`git checkout -b feat/your-feature`).
  3. Make your changes.
  4. Write or update tests as needed.
  5. Commit your changes (see [Commit Message Guidelines](#commit-message-guidelines)).
  6. Push to your fork and open a pull request.

---

## Development Workflow

- All code should be written in TypeScript and follow the project's code style.
- UI components are in `src/components/`.
- Pages are in `src/app/`.
- Use [Next.js](https://nextjs.org/) conventions.
- For styling, use Tailwind CSS utility classes.
- Test your changes locally before submitting a PR.

---

## Commit Message Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages. Example types:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding or correcting tests
- `chore`: Maintenance

**Example:**

```markdown
feat: add user authentication system
fix: resolve navigation menu overflow issue
docs: update API documentation
style: format code according to style guide
refactor: simplify user profile component
test: add unit tests for data validation
chore: update dependencies
```

**Format:**
```markdown
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

---

## Code Style

- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for code formatting
- Prefer functional components with hooks
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Keep components small and focused

**TypeScript Guidelines:**
- Use strict mode
- Prefer interfaces over types for object shapes
- Use proper typing for all variables and functions
- Avoid `any` type when possible

**React/Next.js Guidelines:**
- Use modern React patterns (hooks, functional components)
- Follow Next.js file-based routing conventions
- Use proper error boundaries
- Implement proper loading states

---

## Reporting Issues

When reporting issues, please include:

1. **Clear title** describing the problem
2. **Detailed description** of the issue
3. **Steps to reproduce** the problem
4. **Expected behavior** vs **actual behavior**
5. **Environment details** (OS, browser, Node.js version)
6. **Screenshots or videos** if applicable
7. **Console errors** or logs if relevant

**Issue Template:**
```markdown
## Bug Report

### Description
[Describe the issue]

### Steps to Reproduce
1. [First step]
2. [Second step]
3. [And so on...]

### Expected Behavior
[What you expected to happen]

### Actual Behavior
[What actually happened]

### Environment
- OS: [e.g., macOS, Windows, Linux]
- Browser: [e.g., Chrome, Firefox, Safari]
- Node.js Version: [e.g., 18.0.0]

### Additional Information
[Screenshots, logs, etc.]
```

---

## Community Standards

### Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. By participating in this project, you agree to:

- Be respectful and considerate of others
- Use inclusive language
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

### Communication

- Use clear, respectful language in all communications
- Be patient with newcomers and help them learn
- Provide constructive feedback on pull requests
- Ask questions when you're unsure about something
- Share knowledge and help others grow

### Recognition

We appreciate all contributions, big and small. Contributors will be recognized in:

- Project documentation
- Release notes
- Contributor hall of fame (if applicable)

---

## Getting Help

If you need help with contributing:

1. Check existing issues and pull requests
2. Read the project documentation
3. Ask questions in discussions or issues
4. Join our community channels (if available)

Thank you for contributing to DataSolace! 🚀
