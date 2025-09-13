# Stand Up Bot

> A form to publish daily Stand Ups on discord

## New Release (1.0.0) (sneak peek)

- Much improved rendering time!
- covid api shows lazy loading
- all users can now publish
- gradients background for border
- on admin page can toggle dev mode and reset session
- loading indicator on CRUD actions
- Tests!

## Architecture

This app is build on:

- React JS
- Hasura GraphQL
- Netlify functions

## SETUP

To run the app, you need create an `.env` file and copy the keys from `.env.sample` and fill in the values.

## GC Awards intergration

- [x] add a table for GC awardee
- [x] the GC app receives the token to mutate Hasura server
- [x] on receive mutation, Hasura calls discord webhook to post in Discord

## Contributing

We welcome contributions to the Stand Up Bot! Here's how you can help improve this project.

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Access to Hasura GraphQL endpoint
- Discord webhook URL (for testing)

### Getting Started

1. **Fork the repository** and clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/stand-up-bot.git
   cd stand-up-bot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.sample` to `.env`
   - Fill in the required values for your development environment

4. **Start the development server:**
   ```bash
   npm start
   ```

### Development Workflow

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the existing code style and patterns

3. **Write tests** for new functionality in the `src/__tests__` directory

4. **Run tests** to ensure everything works:
   ```bash
   npm test
   ```

5. **Build the project** to check for any build issues:
   ```bash
   npm run build
   ```

6. **Commit your changes** with a clear, descriptive message:
   ```bash
   git commit -m "feat: add description of your feature"
   ```

7. **Push to your fork** and create a pull request

### Code Style Guidelines

- Follow existing code patterns and conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure components are properly structured and reusable

### Testing

- Write unit tests for new components and functions
- Use the existing testing setup with `@testing-library/react`
- Ensure all tests pass before submitting a PR
- Test your changes with different user scenarios

### Project Structure

- `src/components/` - React components
- `src/__tests__/` - Test files
- `functions/` - Netlify serverless functions
- `public/` - Static assets

### Reporting Issues

If you find a bug or have a feature request:

1. Check existing issues to avoid duplicates
2. Create a new issue with a clear title and description
3. Include steps to reproduce (for bugs)
4. Add relevant labels and screenshots if applicable

### Questions?

Feel free to open an issue for any questions about contributing or reach out to the maintainers.
