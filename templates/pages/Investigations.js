import { LitElement, html, css } from "lit-element";
import InvestigationSchema from "InvestigationSchema";
import { parseColumns } from "mv-table-utils";
import * as config from "config";
import "mv-button";
import "mv-container";
import "mv-font-awesome";
import "mv-pagination";
import "mv-table";
import "mv-tooltip";
import "../components/layout/PageLayout.js";

export default class PageTemplate extends LitElement {
  static get properties() {
    return {
      pages: { type: Number },
      currentPage: { type: Number },
      items: { type: Array },
    };
  }

  static get styles() {
    return css`
      h1 {
        margin-top: 0;
      }
    `;
  }

  constructor() {
    super();
    this.pages = 20;
    this.currentPage = 1;
    this.items = [];
  }

  render() {
    return html`
      <page-layout>
        <mv-container>
          <h1>Investigations</h1>
          <mv-button type="rounded" @button-clicked="${this.newItem}">
            <mv-fa icon="plus"></mv-fa>New
          </mv-button>
          <mv-table
            .columns="${this.columns || []}"
            .rows="${this.items}"
            with-checkbox
            .action-column="${this.actionColumn}"
          ></mv-table>
          <mv-pagination
            type="text"
            .page="${this.currentPage}"
            .pages="${this.pages}"
            @change-page="${this.gotoPage}"
          ></mv-pagination>
        </mv-container>
      </page-layout>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    const { INVESTIGATION } = config;
    this.columns = parseColumns(
      InvestigationSchema.properties,
      INVESTIGATION.LIST_COLUMNS
    );
  }

  gotoPage = (event) => {
    const { detail = {} } = event || {};
    this.currentPage = detail.page || 1;
  };

  newItem = () => {
    history.pushState(null, "", "./form");
  };
}

customElements.define("page-template", PageTemplate);
