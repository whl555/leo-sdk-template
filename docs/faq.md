# Frequently Asked Questions

## General Questions

### Q: What is leo-sdk-template?
A: leo-sdk-template is a CLI tool that generates TypeScript SDK projects with best practices, testing, building, and documentation already configured.

### Q: Why use this template instead of creating from scratch?
A: The template provides:
- Pre-configured TypeScript, testing, and build setup
- Multiple output formats (ES, CJS, UMD)
- Example applications
- CI/CD workflows
- Documentation structure
- Best practices for SDK development

## Installation & Usage

### Q: How do I install leo-sdk-template?
A: Install globally via npm:
```bash
npm install -g leo-sdk-template
```

### Q: Can I use it with yarn or pnpm?
A: Yes, the generated project supports all package managers. You can specify your preference during setup:
```bash
leo-sdk my-project
# Select your preferred package manager during setup
```

### Q: How do I update to the latest template version?
A: Update the CLI tool:
```bash
npm update -g leo-sdk-template
```

## Project Structure

### Q: Can I modify the generated project structure?
A: Yes, after generation you can modify the structure as needed. The template provides a starting point, not a rigid framework.

### Q: What if I don't need the example application?
A: You can skip examples during setup or remove the `example/` directory after generation.

### Q: How do I add more build targets?
A: Modify the `rollup.config.js` file to add additional output formats or configurations.

## Development

### Q: How do I add new SDK methods?
A: 1. Add methods to `src/core/SdkCore.ts`
2. Update type definitions in `src/types/index.ts`
3. Write tests in `src/__tests__/`
4. Update documentation

### Q: How do I handle breaking changes?
A: 1. Update the version in `package.json`
2. Document changes in `CHANGELOG.md`
3. Follow semantic versioning (semver)
4. Consider migration guides for major versions

### Q: Can I use React components in my SDK?
A: Yes, the template supports React. Add React as a peer dependency and import/export your components.

## Testing

### Q: How do I test browser-specific features?
A: The template includes `jsdom` environment. For more complex browser testing, consider adding Playwright or Cypress.

### Q: How do I mock external APIs in tests?
A: Use Jest's mocking capabilities:
```typescript
// Mock fetch
global.fetch = jest.fn();

// Mock your SDK methods
jest.mock('../src/core/SdkCore');
```

### Q: How do I run tests in CI?
A: If you included CI configuration (`--with-ci`), tests run automatically on push/PR. Otherwise, add to your CI:
```yaml
- name: Run tests
  run: npm test
```

## Building & Publishing

### Q: How do I build for production?
A: Run the build script:
```bash
npm run build
```

### Q: What files are included in the npm package?
A: Check the `files` array in `package.json`. By default: `dist/`, `README.md`.

### Q: How do I publish to npm?
A: 1. Build the project: `npm run build`
2. Run tests: `npm test`
3. Publish: `npm publish`

### Q: Can I publish to a private registry?
A: Yes, configure your npm registry:
```bash
npm config set registry https://your-registry.com
npm publish
```

## Customization

### Q: How do I add custom CLI flags?
A: Modify `bin/index.js` and `src/generator.ts` to add new options.

### Q: Can I change the template files?
A: Yes, modify files in the `template/` directory to customize the generated output.

### Q: How do I add support for different frameworks?
A: Create new template variants in separate directories and modify the generator to support framework selection.

## Troubleshooting

### Q: The CLI is not working after installation
A: Try:
1. Check if installed globally: `npm list -g leo-sdk-template`
2. Verify PATH includes npm global bin directory
3. Reinstall: `npm uninstall -g leo-sdk-template && npm install -g leo-sdk-template`

### Q: Generated project has build errors
A: 1. Ensure all dependencies are installed: `npm install`
2. Check Node.js version (requires >=16)
3. Clear cache: `npm cache clean --force`

### Q: Tests are failing in generated project
A: 1. Run `npm install` to ensure test dependencies are installed
2. Check Jest configuration in `jest.config.js`
3. Verify test files are in correct locations

### Q: TypeScript errors in generated code
A: 1. Check TypeScript version compatibility
2. Verify `tsconfig.json` configuration
3. Ensure all type definitions are installed

## Contributing

### Q: How do I contribute to the template?
A: 1. Fork the repository
2. Make your changes
3. Add tests
4. Submit a pull request

### Q: How do I report bugs?
A: Create an issue on the GitHub repository with:
- Template version
- Node.js version
- Command used
- Error messages
- Expected vs actual behavior




