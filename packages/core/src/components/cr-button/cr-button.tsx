import { Component, h } from '@stencil/core';

@Component({
  tag: 'cr-button',
  styleUrl: 'cr-button.css',
  shadow: true,
})
export class CrButton {
  render() {
    return (
      <button part="button" type="button">
        <slot />
      </button>
    );
  }
}
