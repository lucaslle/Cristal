import { AttachInternals, Component, Event, EventEmitter, Prop, h } from '@stencil/core';
import { FieldText, RequiredMark, describedBy } from '../../utils/field';

/**
 * Case à cocher.
 * @part label - Le libellé.
 * @part control - La case native.
 * @part hint - Le texte d'aide.
 * @part error - Le message d'erreur.
 */
@Component({
  tag: 'cr-checkbox',
  styleUrls: ['../../global/field.css', 'cr-checkbox.css'],
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class CrCheckbox {
  @AttachInternals() internals: ElementInternals;

  /** Libellé affiché à côté de la case. */
  @Prop() label!: string;
  /** Nom envoyé avec le formulaire. */
  @Prop({ reflect: true }) name?: string;
  /** Valeur envoyée quand la case est cochée. */
  @Prop() value = 'on';
  /** État coché. */
  @Prop({ mutable: true, reflect: true }) checked = false;
  /** État partiellement coché, par exemple pour « tout sélectionner ». */
  @Prop() indeterminate = false;
  /** Texte d'aide, lu par les lecteurs d'écran. */
  @Prop() hint?: string;
  /** Message d'erreur ; passe la case en état invalide. */
  @Prop() error?: string;
  /** Rend la case obligatoire. */
  @Prop({ reflect: true }) required = false;
  /** Désactive la case. */
  @Prop({ reflect: true }) disabled = false;

  /** Émis quand la case change ; detail : l'état coché. */
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
