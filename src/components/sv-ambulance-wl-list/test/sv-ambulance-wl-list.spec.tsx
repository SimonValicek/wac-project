import { newSpecPage } from '@stencil/core/testing';
import { SvAmbulanceWlList } from '../sv-ambulance-wl-list';

describe('sv-ambulance-wl-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SvAmbulanceWlList],
      html: `<sv-ambulance-wl-list></sv-ambulance-wl-list>`,
    });
    expect(page.root).toEqualHtml(`
      <sv-ambulance-wl-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sv-ambulance-wl-list>
    `);
  });
});
