import {LitElement, css, html} from 'lit';
import $ from 'jquery';
import API from "../API"

class MainDashboard extends LitElement {
	connectedCallback() {
		this.api = new API().getData();
		this.confirmed = this.api.then((confirmed) => {
			console.log(confirmed);
			return confirmed;
		});
		console.log(this.confirmed);
	}
  static styles = css`
      :host{
          color: var(--color-text);
      }
    `;
  render() {
    return html`
      <header><h1>Element composition</h1></header>
    `;
  }
}
customElements.define('main-dashboard', MainDashboard);
