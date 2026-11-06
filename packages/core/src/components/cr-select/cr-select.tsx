import { AttachInternals, Build, Component, Element, Event, EventEmitter, Prop, State, h } from '@stencil/core';
import { FieldText, RequiredMark, describedBy } from '../../utils/field';

interface SelectOption {
  value: string;
  label: string;
  disabled: boolean;
}

@Component({
  tag: 'cr-select',
  styleUrls: ['../../global/field.css', 'cr-select.css'],
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class CrSelect {
  @Element() el!: HTMLElement;
  @AttachInternals() internals: ElementInternals;

  @Prop() label!: string;
  @Prop({ reflect: true }) name?: string;
  @Prop({ mutable: true }) value = '';
  @Prop() placeholder?: string;
  @Prop() hint?: string;
  @Prop() error?: string;
  @Prop({ reflect: true }) required = false;
  @Prop({ reflect: true }) disabled = false;

  @State() options: SelectOption[] = [];

  @Event() crChange: EventEmitter<string>;

  private select?: HTMLSelectElement;
  private observer?: MutationObserver;
  private initialValue?: string;

  connectedCallback() {
    if (!Build.isBrowser) return;
    this.observer = new MutationObserver((mutations) => {
      if (mutations.some((mutation) => mutation.target !== this.el || mutation.type === 'childList')) this.readOptions();
    });
    this.observer.observe(this.el, { childList: true, subtree: true, characterData: true, attributes: true });
  }

  disconnectedCallback() {
    this.observer?.disconnect();
  }

  componentWillLoad() {
    this.readOptions();
  }

  componentDidRender() {
    this.syncForm();
  }

  formResetCallback() {
    if (this.initialValue !== undefined) this.value = this.initialValue;
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  private readOptions() {
    this.options = Array.from(this.el.querySelectorAll('option')).map((option) => ({
      value: option.value,
      label: option.textContent?.trim() ?? '',
      disabled: option.disabled,
    }));
  }

  private syncForm() {
    this.internals.setFormValue(this.select?.value ?? this.value);
    if (this.select) this.internals.setValidity(this.select.validity, this.select.validationMessage, this.select);
  }

  private selectedValue() {
    return this.value || (this.placeholder ? '' : (this.options[0]?.value ?? ''));
  }

  private onChange = (event: Event) => {
    this.initialValue ??= this.selectedValue();
    this.value = (event.target as HTMLSelectElement).value;
    this.syncForm();
    this.crChange.emit(this.value);
  };

  render() {
    const id = 'control';
    const selected = this.selectedValue();
    return (
      <div class="field">
        <label class="label" htmlFor={id} part="label">
          {this.label}
          <RequiredMark required={this.required} />
        </label>
        <FieldText id={id} hint={this.hint} error={this.error} />
        <select
          ref={(el) => (this.select = el)}
          id={id}
          class="control"
          part="control"
          required={this.required}
          disabled={this.disabled}
          aria-invalid={this.error ? 'true' : undefined}
          aria-describedby={describedBy({ id, hint: this.hint, error: this.error })}
          onChange={this.onChange}
        >
          {this.placeholder && (
            <option value="" selected={!selected}>
              {this.placeholder}
            </option>
          )}
          {this.options.map((option) => (
            <option value={option.value} disabled={option.disabled} selected={option.value === selected}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
