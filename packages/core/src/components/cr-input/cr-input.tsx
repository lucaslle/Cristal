import { AttachInternals, Component, Event, EventEmitter, Prop, h } from '@stencil/core';
import { FieldText, RequiredMark, describedBy } from '../../utils/field';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

@Component({
  tag: 'cr-input',
  styleUrls: ['../../global/field.css', 'cr-input.css'],
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class CrInput {
  @AttachInternals() internals: ElementInternals;

  @Prop() label!: string;
  @Prop({ reflect: true }) name?: string;
  @Prop({ mutable: true }) value = '';
  @Prop() type: InputType = 'text';
  @Prop() hint?: string;
  @Prop() error?: string;
  @Prop() placeholder?: string;
  @Prop() autocomplete?: string;
  @Prop({ reflect: true }) required = false;
  @Prop({ reflect: true }) disabled = false;

  @Event() crInput: EventEmitter<string>;
  @Event() crChange: EventEmitter<string>;

  private input?: HTMLInputElement;
  private initialValue?: string;

  componentDidRender() {
    this.syncForm();
  }

  formResetCallback() {
    if (this.initialValue !== undefined) this.value = this.initialValue;
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  private syncForm() {
    this.internals.setFormValue(this.value);
    if (this.input) this.internals.setValidity(this.input.validity, this.input.validationMessage, this.input);
  }

  private onInput = (event: Event) => {
    this.initialValue ??= this.value;
    this.value = (event.target as HTMLInputElement).value;
    this.syncForm();
    this.crInput.emit(this.value);
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') this.internals.form?.requestSubmit();
  };

  render() {
    const id = 'control';
    return (
      <div class="field">
        <label class="label" htmlFor={id} part="label">
          {this.label}
          <RequiredMark required={this.required} />
        </label>
        <FieldText id={id} hint={this.hint} error={this.error} />
        <input
          ref={(el) => (this.input = el)}
          id={id}
          class="control"
          part="control"
          type={this.type}
          name={this.name}
          value={this.value}
          placeholder={this.placeholder}
          autocomplete={this.autocomplete}
          required={this.required}
          disabled={this.disabled}
          aria-invalid={this.error ? 'true' : undefined}
          aria-describedby={describedBy({ id, hint: this.hint, error: this.error })}
          onInput={this.onInput}
          onChange={() => this.crChange.emit(this.value)}
          onKeyDown={this.onKeyDown}
        />
      </div>
    );
  }
}
