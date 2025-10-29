import type { FC, PropsWithChildren } from 'react';

export interface SectionProps {
  title?: string;
}

export const SdkSection: FC<PropsWithChildren<SectionProps>> = ({ title = '<%= sdkName %>', children }) => (
  <section aria-label={title} style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.75rem' }}>
    <h2 style={{ margin: 0, fontSize: '1.125rem' }}>{title}</h2>
    <div style={{ marginTop: '0.75rem' }}>{children ?? null}</div>
  </section>
);

export default SdkSection;

