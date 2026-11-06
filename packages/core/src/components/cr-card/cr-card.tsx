import { Component, Element, h } from '@stencil/core';

@Component({
  tag: 'cr-card',
  styleUrl: 'cr-card.css',
  shadow: true,
})
export class CrCard {
  @Element() el!: HTMLElement;

  render() {
    const has = (slot: string) => !!this.el.querySelector(`[slot="${slot}"]`);
    return (
      <div class="card" part="card">
        {has('header') && (
          <div class="header" part="header">
            <slot name="header" />
          </div>
        )}
        <div class="body" part="body">
          <slot />
        </div>
        {has('footer') && (
          <div class="footer" part="footer">
            <slot name="footer" />
          </div>
        )}
      </div>
    );
  }
}
