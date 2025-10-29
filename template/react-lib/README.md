# <%= sdkName %>

<%= description %>

## Getting Started

```bash
<%= packageManager %> install
<%= packageManager %> run build
<%= packageManager %> run test
```

## Usage

```tsx
import SdkSection from '<%= sdkName %>';

export function Demo() {
  return (
    <SdkSection title="Hello from <%= sdkName %>">
      <p>Ship your React SDK with confidence.</p>
    </SdkSection>
  );
}
```

## Scripts

- `clean` – remove the compiled `dist/` folder.
- `build` – bundle the SDK with Rollup and emit type definitions.
- `test` – run unit tests in a JSDOM environment via Jest.
- `prepare` – automatically invokes the build before publish.
- `release` – wraps `scripts/publish.js` to run checks and publish safely.

Use the release helper with an optional version bump:

```bash
<%= packageManager %> run release -- patch
```

## License

MIT © <%= author %>

