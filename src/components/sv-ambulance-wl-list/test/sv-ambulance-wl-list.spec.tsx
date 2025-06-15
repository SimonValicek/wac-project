import { newSpecPage } from '@stencil/core/testing';
import { SvAmbulanceWlList } from '../sv-ambulance-wl-list';

describe('sv-ambulance-wl-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SvAmbulanceWlList],
      html: `<sv-ambulance-wl-list></sv-ambulance-wl-list>`,
    });

    const wlList = page.rootInstance as SvAmbulanceWlList;
    const expectedPatients = wlList?.waitingPatients?.length;

    const items = page.root.shadowRoot.querySelectorAll('md-list-item');
    expect(items.length).toEqual(expectedPatients);

  });
});
