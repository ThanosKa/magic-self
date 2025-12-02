# Create Pull Request

This command helps you create a pull request following magic-self.dev's contribution guidelines.

## Prerequisites

- You have made your changes and they are ready to commit
- You have tested your changes locally (`pnpm test`)
- Your code follows the project's [code style guidelines](.cursor/rules/code-style.mdc)

## What this command does

1. **Checks current branch** - Ensures you're not on main/master
2. **Runs tests** - Validates your changes don't break existing functionality
3. **Runs linting** - Ensures code style compliance
4. **Runs type checking** - Validates TypeScript types
5. **Checks formatting** - Ensures code is properly formatted
6. **Stages changes** - Adds all modified files to git
7. **Commits changes** - Uses conventional commit format (you'll be prompted for type and message)
8. **Pushes branch** - Pushes your feature branch to origin
9. **Creates PR** - Opens your browser to create a pull request with the proper template

## Command Options

- `type`: Commit type (feat, fix, docs, style, refactor, test, chore) - defaults to prompting
- `scope`: Optional scope for the commit (e.g., "auth", "ui", "api")
- `message`: Commit message - defaults to prompting
- `draft`: Create as draft PR (true/false) - defaults to false

## Usage Examples

```bash
# Interactive mode (recommended) - prompts for commit details
cursor create-pr

# With specific commit type and message
cursor create-pr --type feat --message "add dark mode toggle"

# With scope
cursor create-pr --type fix --scope ui --message "fix button hover states"

# Create draft PR
cursor create-pr --draft true
```

## Conventional Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## PR Template Fields

When creating your PR, fill out the template with:

- **Description**: Detailed explanation of your changes
- **Related Issue**: Link to any related issues (e.g., "Fixes #123")
- **Type of Change**: Mark the appropriate checkboxes
- **Checklist**: Ensure all items are checked
- **Screenshots**: Add screenshots if UI changes
- **Testing Instructions**: How reviewers can test your changes

## Branch Naming Convention

Use descriptive branch names following the pattern:

- `feature/description-of-feature`
- `fix/description-of-fix`
- `docs/update-documentation`
- `refactor/description-of-refactor`

## After Running This Command

1. Review the PR description and fill in all required fields
2. Add any relevant labels
3. Request reviewers if needed
4. Link to any related issues

## Troubleshooting

- **Command fails on tests**: Run `pnpm test` locally and fix any failing tests
- **Linting errors**: Run `pnpm lint` and fix any code style issues
- **Type errors**: Run `pnpm tsc --noEmit` and fix TypeScript issues
- **Formatting issues**: Run `pnpm format` to auto-format your code

## Need Help?

- Check the [Contributing Guide](.github/CONTRIBUTING.md) for detailed guidelines
- Open an issue if you encounter problems with this command
- Ask questions in GitHub Discussions
