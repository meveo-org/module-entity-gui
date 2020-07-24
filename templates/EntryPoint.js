import { LitElement, html, css } from "lit-element";
import "mv-router";

class EntryPoint extends LitElement {
  static get properties() {
    return {};
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <mv-router>
        <!-- component paths are relative to /web_modules/mv-router -->
        <mv-router
          default
          route
          path="/list"
          name="investigation-page"
          storage-modes="server,local"
          component="../../pages/Investigations.js"
        ></mv-router>
        <mv-router
          route
          path="/form"
          name="investigation-page"
          storage-modes="server,local"
          component="../../pages/Investigation.js"
        ></mv-router>
      </mv-router>
    `;
  }
}

customElements.define("entry-point", EntryPoint);
