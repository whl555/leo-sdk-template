# <%= sdkName %>

<%= description %>

Inspired by the Solar Waterfall layout project ([GitHub](https://github.com/whl555/solar-waterfall.git)), this package exposes reusable React components and utilities for rendering responsive waterfall layouts with tunable algorithms.

## Getting started

```bash
<%= packageManager %> install
<%= packageManager %> run build
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

- `build` – compile TypeScript and JSX to `dist/`.
- `prepare` – invoked automatically by npm prior to publish.
- `release` – convenience script for `npm publish`.

## License

MIT © <%= author %>

