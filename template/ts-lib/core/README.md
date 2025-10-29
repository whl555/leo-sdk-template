# <%= sdkName %>

<%= description %>

## Quick start

```bash
<%= packageManager %> install
<%= packageManager %> run build
```

## Usage

```ts
import { createClient } from '<%= sdkName %>';

const client = createClient({ endpoint: 'https://api.example.com' });

console.log(client.ping());
```

## Scripts

- `build` – compile TypeScript to `dist/`.
- `prepare` – invoked automatically by npm prior to publish.
- `release` – convenience script for `npm publish`.

## License

MIT © <%= author %>

