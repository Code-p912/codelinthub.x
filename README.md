# CodeLintHub

A professional Python code quality analysis tool that provides comprehensive linting using pylint, flake8, and bandit.

## Features

- **Multiple Linting Tools**: Integrates pylint, flake8, and bandit for comprehensive code analysis
- **Clean Interface**: Modern, responsive web interface built with React and Tailwind CSS
- **File Upload**: Support for uploading .py files or pasting code directly
- **Detailed Results**: Organized results with severity levels, line numbers, and rule descriptions
- **Export Reports**: Download analysis results as text reports
- **Real-time Analysis**: Instant feedback on code quality issues

## Current Implementation

This is the frontend React application that demonstrates the complete CodeLintHub interface. The actual Python backend with Flask, pylint, flake8, and bandit integration would need to be deployed separately on a server that supports Python package installation.

## Features Demonstrated

- Code input via textarea or file upload
- Tabbed interface for different linting tools
- Severity-based issue categorization (errors, warnings, info)
- Statistics dashboard
- Report download functionality
- Responsive design for all device sizes

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Production Deployment

For a complete production deployment, you would need:

1. **Backend**: Flask server with Python linting tools installed
2. **Security**: Sandboxed code execution environment
3. **API**: RESTful endpoints for code analysis
4. **Database**: Optional storage for analysis history

## Architecture

```
Frontend (React)     Backend (Flask)      Linting Tools
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│ Code Input  │────▶│ API Endpoint │────▶│ pylint      │
│ Results UI  │◀────│ Processing   │◀────│ flake8      │
│ Reports     │     │ Security     │     │ bandit      │
└─────────────┘     └──────────────┘     └─────────────┘
```

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Linting**: ESLint, TypeScript ESLint

## License

MIT License - See LICENSE file for details