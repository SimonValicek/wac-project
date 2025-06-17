import { newSpecPage } from '@stencil/core/testing';
import { ReservationManager } from '../reservation-manager';

describe('reservation-manager', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ReservationManager],
      html: `<reservation-manager></reservation-manager>`,
    });
    expect(page.root).toEqualHtml(`
      <reservation-manager>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </reservation-manager>
    `);
  });
});
