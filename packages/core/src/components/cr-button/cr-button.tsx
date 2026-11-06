import { AttachInternals, Component, Host, Prop, h } from '@stencil/core';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'link';
export type ButtonSize = 'xs' | 's' | 'm' | 'l';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  tag: 'cr-button',
  styleUrl: 'cr-button.css',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class CrButton {
  @AttachInternals() internals: ElementInternals;

  @Prop({ reflect: true }) variant: ButtonVariant = 'primary';
  @Prop({ reflect: true }) size: ButtonSize = 'm';
  @Prop() type: ButtonType = 'button';
  @Prop({ reflect: true }) disabled = false;
  @Prop({ reflect: true }) loading = false;
  @Prop({ reflect: true }) fullWidth = false;

  private handleClick = (event: MouseEvent) => {
    if (this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    const form = this.internals.form;
    if (this.type === 'submit') form?.requestSubmit();
    if (this.type === 'reset') form?.reset();
  };

  render() {
    return (
      <Host onClick={this.handleClick}>
        <button
          part="button"
          type="button"
          disabled={this.disabled}
          aria-disabled={this.loading ? 'true' : undefined}
          aria-busy={this.loading ? 'true' : undefined}
        >
          {this.loading && <span class="spinner" part="spinner" aria-hidden="true" />}
          <slot name="start" />
          <span class="label">
            <slot />
          </span>
          <slot name="end" />
        </button>
      </Host>
    );
  }
}
