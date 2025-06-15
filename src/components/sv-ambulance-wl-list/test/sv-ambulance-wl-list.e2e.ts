import { newE2EPage } from '@stencil/core/testing';

describe('sv-ambulance-wl-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sv-ambulance-wl-list></sv-ambulance-wl-list>');

    const element = await page.find('sv-ambulance-wl-list');
    expect(element).toHaveClass('hydrated');
  });
});
