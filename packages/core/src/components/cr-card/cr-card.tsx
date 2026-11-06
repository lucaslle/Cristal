import { Component, Element, h } from '@stencil/core';

/**
 * Carte de contenu.
 * @slot - Contenu de la carte.
 * @slot header - En-tête, affiché seulement s'il est fourni.
 * @slot footer - Pied, affiché seulement s'il est fourni.
 * @part card - Le conteneur.
 * @part header - La zone d'en-tête.
 * @part body - La zone de contenu.
 * @part footer - La zone de pied.
 */
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
