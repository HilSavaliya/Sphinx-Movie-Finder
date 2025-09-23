# Contributing to Sphinx Movie Finder

Thank you for your interest in contributing to the Sphinx Movie Finder project! This document provides guidelines for contributing to the project.

## How to Contribute

### Reporting Bugs

If you find a bug in the project, please report it by creating an issue on GitHub. When reporting a bug, please include:

- A clear title describing the bug
- A detailed description of the bug
- Steps to reproduce the bug
- Expected behavior
- Actual behavior
- Screenshots or screen recordings if applicable
- Your environment information (browser, OS, etc.)

### Suggesting Features

If you have an idea for a new feature, please create an issue on GitHub with:

- A clear title describing the feature
- A detailed description of the feature and why it would be useful
- Examples of similar features in other applications (if applicable)

### Submitting Pull Requests

We welcome pull requests! Here's how to submit one:

1. Fork the repository
2. Create a new branch for your feature or bug fix (`git checkout -b feature/amazing-feature` or `git checkout -b fix/some-bug`)
3. Make your changes
4. Test your changes thoroughly
5. Commit your changes with clear, descriptive messages (`git commit -m 'Add some amazing feature'`)
6. Push your branch to your fork (`git push origin feature/amazing-feature`)
7. Create a pull request to the main repository

### Pull Request Guidelines

When creating a pull request, please:

- Provide a clear title and description of your changes
- Reference any related issues (e.g., "Fixes #123")
- Include screenshots or screen recordings if your changes affect the UI
- Ensure your code follows the project's coding style
- Update any relevant documentation
- Keep pull requests as small and focused as possible

## Development Setup

To set up your development environment:

1. Clone the repository: `git clone https://github.com/ITSSPHINX/Sphinx-Movie-Finder.git`
2. Install dependencies: `npm install`
3. Set up environment variables by copying `.env.example` to `.env.local` and adding your TMDB API key
4. Start the development server: `npm run dev`

## Code Style

This project uses ESLint for code linting. Please ensure your code passes all lint checks before submitting a pull request:

```bash
npm run lint
```

## License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

## Questions?

If you have any questions about contributing, please create an issue on GitHub.
