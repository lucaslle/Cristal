import { Component, Element, Event, EventEmitter, Prop, Watch, h } from '@stencil/core';
import { OverlayContent, releaseScroll, syncDialog } from '../../utils/overlay';

@Component({
  tag: 'cr-drawer',
  styleUrls: ['../../global/overlay.css', 'cr-drawer.css'],
  shadow: true,
})
export class CrDrawer {
  @Element() el!: HTMLElement;

  @Prop({ mutable: true, reflect: true }) open = false;
  @Prop() label!: string;
  @Prop() closeLabel = 'Fermer';
  @Prop({ reflect: true }) placement: 'start' | 'end' = 'end';

  @Event() crClose: EventEmitter<void>;

  private dialog?: HTMLDialogElement;

  @Watch('open')
  openChanged() {
    syncDialog(this.dialog, this.open);
  }

  componentDidLoad() {
    this.openChanged();
  }

  disconnectedCallback() {
    if (this.dialog?.open) releaseScroll();
  }

  private onClose = () => {
    releaseScroll();
    this.open = false;
    this.crClose.emit();
  };

  render() {
    return (
      <dialog ref={(el) => (this.dialog = el)} class={`drawer ${this.placement}`} part="dialog" aria-labelledby="title" onClose={this.onClose}>
        <OverlayContent
          label={this.label}
          closeLabel={this.closeLabel}
          hasFooter={!!this.el.querySelector('[slot="footer"]')}
          onCloseClick={() => (this.open = false)}
        />
      </dialog>
    );
  }
}
