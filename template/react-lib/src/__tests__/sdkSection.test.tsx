import React from 'react';
import { renderToString } from 'react-dom/server';
import { SdkSection } from '../index';

describe('SdkSection', () => {
  it('renders without crashing', () => {
    expect(() =>
      renderToString(
        <SdkSection title="Smoke Test">
          <p>Hello from <%= sdkName %></p>
        </SdkSection>
      )
    ).not.toThrow();
  });
});

