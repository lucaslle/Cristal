import { AttachInternals, Component, Event, EventEmitter, Prop, h } from '@stencil/core';
import { FieldText, RequiredMark, describedBy } from '../../utils/field';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

/**
 * Champ de saisie de texte.
 * @part label - Le libellé.
 * @part control - Le champ natif.
 * @part hint - Le texte d'aide.
 * @part error - Le message d'erreur.
 */
@Component({
  tag: 'cr-input',
  styleUrls: ['../../global/field.css', 'cr-input.css'],
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class CrInput {
  @AttachInternals() internals: ElementInternals;

  /** Libellé affiché au-dessus du champ. */
  @Prop() label!: string;
  /** Nom envoyé avec le formulaire. */
  @Prop({ reflect: true }) name?: string;
  /** Valeur du champ. */
  @Prop({ mutable: true }) value = '';
  /** Type de saisie. */
  @Prop() type: InputType = 'text';
  /** Texte d'aide, lu par les lecteurs d'écran. */
  @Prop() hint?: string;
  /** Message d'erreur ; passe le champ en état invalide. */
  @Prop() error?: string;
  /** Texte indicatif affiché quand le champ est vide. */
  @Prop() placeholder?: string;
  /** Indication de remplissage automatique du navigateur. */
  @Prop() autocomplete?: string;
  /** Rend la saisie obligatoire. */
  @Prop({ reflect: true }) required = false;
  /** Désactive le champ. */
  @Prop({ reflect: true }) disabled = false;

  /** Émis à chaque frappe ; detail : la valeur. */
  @Event() crInput: EventEmitter<string>;
  /** Émis quand le champ perd le focus après modification ; detail : la valeur. */
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
