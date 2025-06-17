import { newE2EPage } from '@stencil/core/testing';

describe('reservation-manager', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<reservation-manager></reservation-manager>');

    const element = await page.find('reservation-manager');
    expect(element).toHaveClass('hydrated');
  });
});
