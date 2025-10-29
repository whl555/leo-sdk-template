# <%= sdkName %>

<%= description %>

## Quick Start

```bash
<%= packageManager %> install
<%= packageManager %> run build
<%= packageManager %> run test
```

## Usage

```ts
import { createClient } from '<%= sdkName %>';

const client = createClient({ endpoint: 'https://api.example.com' });

console.log(client.ping());
```

## Scripts

- `clean` – remove the compiled `dist/` folder.
- `build` – bundle the SDK with Rollup and emit type definitions.
- `test` – run unit tests in Node via Jest.
- `prepare` – automatically invokes the build before publish.
- `release` – wraps `scripts/publish.js` to run checks and publish safely.

Publish with an optional version bump:

```bash
<%= packageManager %> run release -- minor
```

## License

MIT © <%= author %>

