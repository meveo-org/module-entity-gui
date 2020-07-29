import { html, css } from "lit-element";
import { MvElement } from "mv-element";
import { validate, changeField, matchError, clearForm } from "mv-form-utils";
import InvestigationSchema from "InvestigationSchema";
import "mv-button";
import "mv-container";
import "mv-font-awesome";
import "mv-form";
import "mv-form-field";
import "mv-tooltip";
import "../components/layout/PageLayout.js";

export default class Investigation extends MvElement {
  static get properties() {
    return {
      ...super.properties,
      firstName: { type: String, attribute: false, reflect: true },
      lastName: { type: String, attribute: false, reflect: true },
      gender: { type: String, attribute: false, reflect: true },
      nationality: { type: String, attribute: false, reflect: true },
      placeOfBirth: { type: String, attribute: false, reflect: true },
      state: { type: String, attribute: false, reflect: true },
      errors: { type: Array, attribute: false, reflect: true },
    };
  }

  static get model() {
    return {
      modelClass: "Investigation",
      mappings: [
        { property: "firstName", value: "firstName" },
        { property: "lastName", value: "lastName" },
        { property: "gender", value: "gender" },
        { property: "nationality", value: "nationality" },
        { property: "placeOfBirth", value: "placeOfBirth" },
        { property: "state", value: "state" },
      ],
    };
  }

  static get styles() {
    return css`
      .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 20px;
      }
    `;
  }

  render() {
    return html`
      <page-layout>
        <mv-container>
          <mv-form .store="${this.store}" .schema="${InvestigationSchema}">
            <div class="form-grid">
              <mv-form-field
                name="firstName"
                label="First name"
                label-position="top"
                .value="${this.firstName}"
                .error="${matchError(this.errors, "firstName")}"
              ></mv-form-field>

              <mv-form-field
                name="lastName"
                label="Last name"
                label-position="top"
                .value="${this.lastName}"
                .error="${matchError(this.errors, "lastName")}"
              ></mv-form-field>

              <mv-form-field
                name="gender"
                label="Gender"
                label-position="top"
                .value="${this.gender}"
                .error="${matchError(this.errors, "gender")}"
              ></mv-form-field>

              <mv-form-field
                name="nationality"
                label="Nationality"
                label-position="top"
                .value="${this.nationality}"
                .error="${matchError(this.errors, "nationality")}"
              ></mv-form-field>

              <mv-form-field
                name="placeOfBirth"
                label="Place of birth"
                label-position="top"
                .value="${this.placeOfBirth}"
                .error="${matchError(this.errors, "placeOfBirth")}"
              ></mv-form-field>

              <mv-form-field
                name="state"
                label="State"
                label-position="top"
                .value="${this.state}"
                .error="${matchError(this.errors, "state")}"
              ></mv-form-field>
            </div>

            <div class="button-grid">
              <mv-button
                @button-clicked="${clearForm(null)}"
                button-style="info"
              >
                <mv-fa icon="undo"></mv-fa>Clear
              </mv-button>
              <mv-button @button-clicked="${this.cancel}" button-style="cancel">
                <mv-fa icon="ban"></mv-fa>Cancel
              </mv-button>
              <mv-button @button-clicked="${this.save}">
                <mv-fa icon="save"></mv-fa>Save
              </mv-button>
            </div>
          </mv-form>
        </mv-container>
      </page-layout>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("update-errors", this.handleErrors);
    this.addEventListener("clear-errors", this.clearErrors);
  }

  clearErrors = () => {
    this.errors = null;
  };

  handleErrors = (event) => {
    this.errors = event.detail.errors;
  };

  cancel = (event) => {
    this.errors = null;
    clearForm(null)(event);
    history.pushState(null, "", "./list");
  };

  save = () => {
    const errors = validate(InvestigationSchema, this.store.state);
    const hasError = errors && Object.keys(errors).some((key) => !!errors[key]);
    if (hasError) {
      console.log("errors :", errors);
    } else {
      const item = this.store.state;      
      console.log("item: ", item);
    }
  };
}

customElements.define("investigation-page", Investigation);
