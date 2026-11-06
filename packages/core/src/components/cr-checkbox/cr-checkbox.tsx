import { AttachInternals, Component, Event, EventEmitter, Prop, h } from '@stencil/core';
import { FieldText, RequiredMark, describedBy } from '../../utils/field';

@Component({
  tag: 'cr-checkbox',
  styleUrls: ['../../global/field.css', 'cr-checkbox.css'],
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class CrCheckbox {
  @AttachInternals() internals: ElementInternals;

  @Prop() label!: string;
  @Prop({ reflect: true }) name?: string;
  @Prop() value = 'on';
  @Prop({ mutable: true, reflect: true }) checked = false;
  @Prop() indeterminate = false;
  @Prop() hint?: string;
  @Prop() error?: string;
  @Prop({ reflect: true }) required = false;
  @Prop({ reflect: true }) disabled = false;

  @Event() crChange: EventEmitter<boolean>;

  private input?: HTMLInputElement;
  private initialChecked?: boolean;

  componentDidRender() {
    if (this.input) this.input.indeterminate = this.indeterminate;
    this.syncForm();
  }

  formResetCallback() {
    if (this.initialChecked !== undefined) this.checked = this.initialChecked;
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  private syncForm() {
    this.internals.setFormValue(this.checked ? this.value : null);
    if (this.input) this.internals.setValidity(this.input.validity, this.input.validationMessage, this.input);
  }

  private onChange = (event: Event) => {
    this.initialChecked ??= this.checked;
    this.checked = (event.target as HTMLInputElement).checked;
    this.syncForm();
    this.crChange.emit(this.checked);
  };

  render() {
    const id = 'control';
    return (
      <div class="field">
        <div class="row">
          <input
            ref={(el) => (this.input = el)}
            id={id}
            class="box"
            part="control"
            type="checkbox"
            checked={this.checked}
            required={this.required}
            disabled={this.disabled}
            aria-invalid={this.error ? 'true' : undefined}
            aria-describedby={describedBy({ id, hint: this.hint, error: this.error })}
            onChange={this.onChange}
          />
          <label class="label" htmlFor={id} part="label">
            {this.label}
            <RequiredMark required={this.required} />
          </label>
        </div>
        <FieldText id={id} hint={this.hint} error={this.error} />
      </div>
    );
  }
}
