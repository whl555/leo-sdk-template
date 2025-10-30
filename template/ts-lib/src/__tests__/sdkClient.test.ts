import { createClient } from '../index';

describe('createClient', () => {
  it('creates a client with default endpoint', () => {
    const client = createClient();

    expect(client.ping()).toContain('<%= sdkName %>');
  });

  it('uses a custom endpoint when provided', () => {
    const endpoint = 'https://api.example.test';
    const client = createClient({ endpoint });

    expect(client.ping()).toContain(endpoint);
  });
});

