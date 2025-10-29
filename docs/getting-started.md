# Getting Started

## Installation

Install the leo-sdk-template globally:

```bash
npm install -g leo-sdk-template
```

## Quick Start

Create a new SDK project:

```bash
leo-sdk my-awesome-sdk
```

Follow the interactive prompts to configure your project, or use the `--defaults` flag for quick setup:

```bash
leo-sdk my-awesome-sdk --defaults
```

## Command Options

- `--defaults` - Use default values for all prompts
- `-v, --version` - Print the installed `leo-sdk` version
- `--with-examples` - Copy example assets when the chosen template provides them (current templates omit these)
- `--with-ci` - Copy GitHub Actions CI/CD configuration when available
- `--org <org>` - Set organization name
- `--author <author>` - Set author name
- `--template <type>` - Choose between `ts-lib` (default) and `react-lib`

## Project Structure

Your project layout depends on the template you select.

### `ts-lib`

- Focused on headless SDKs – provides a tiny client class in `src/index.ts` that you can extend.
- Ships only `build`, `prepare`, and `release` scripts so you can publish without extra tooling.

### `react-lib`

- Tailored for component SDKs – exposes a minimal `SdkSection` component in `src/index.ts`.
- Shares the same publish-friendly script set while keeping dependencies slim.

## Next Steps

1. Navigate to your project:
   ```bash
   cd my-awesome-sdk
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project scaffold:
   ```bash
   npm run build
   ```

4. Publish when ready:
   ```bash
   npm run release
   ```

## Development Workflow

- Extend the default code in `src/index.ts` to expose your SDK surface.
- Update README instructions as you add functionality or tooling.
- Add tests, examples, or CI as needed for your release process.

## Customization

The template provides a solid foundation, but you can customize it:

- Tweak TypeScript compiler options in `tsconfig.json` for your target consumers.
- Introduce additional scripts (linting, testing, storybook) as your project grows.
- Wire up CI or examples by adding the relevant folders and re-running the generator.




