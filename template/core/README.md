# <%= sdkName %>

<%= description %>

## Installation

```bash
npm install <%= sdkName %>
# or
yarn add <%= sdkName %>
# or
pnpm add <%= sdkName %>
```

## Usage

```typescript
import { <%= sdkName %> } from '<%= sdkName %>';

// Basic usage example
const sdk = new <%= sdkName %>({
  // configuration options
});

// Use the SDK
sdk.someMethod();
```

## API Reference

### Constructor

```typescript
new <%= sdkName %>(options: <%= sdkName %>Options)
```

#### Options

| Parameter | Type | Description |
|-----------|------|-------------|
| `option1` | `string` | Description of option1 |
| `option2` | `boolean` | Description of option2 |

### Methods

#### `someMethod()`

Description of the method.

```typescript
sdk.someMethod(): Promise<Result>
```

## Examples

Check the `example/` directory for complete usage examples.

## Development

```bash
# Install dependencies
npm install

# Start development mode
npm run dev

# Build the project
npm run build

# Run tests
npm run test

# Lint code
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [<%= author %>]

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for details.
