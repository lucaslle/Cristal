import { h } from '@stencil/core';

let openOverlays = 0;
let previousOverflow = '';

export const syncDialog = (dialog: HTMLDialogElement | undefined, open: boolean) => {
  if (!dialog) return;
  if (open && !dialog.open) {
    dialog.showModal();
    if (openOverlays++ === 0) {
      previousOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
    }
  }
  if (!open && dialog.open) dialog.close();
};

export const releaseScroll = () => {
  if (openOverlays > 0 && --openOverlays === 0) document.documentElement.style.overflow = previousOverflow;
};

interface OverlayContentProps {
  label: string;
  closeLabel: string;
  hasFooter: boolean;
  onCloseClick: () => void;
}

export const OverlayContent = ({ label, closeLabel, hasFooter, onCloseClick }: OverlayContentProps) => [
  <div class="header" part="header">
    <h2 class="title" id="title" part="title">
      {label}
    </h2>
    <button class="close" part="close" type="button" aria-label={closeLabel} onClick={onCloseClick}>
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>
  </div>,
  <div class="body" part="body">
    <slot />
  </div>,
  hasFooter && (
    <div class="footer" part="footer">
      <slot name="footer" />
    </div>
  ),
];
