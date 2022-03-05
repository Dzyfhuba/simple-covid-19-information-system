class Navbar extends HTMLElement {

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.title_head = this.getAttribute("title") || "Write Title Bar Here";
        this.render();
    }

    render() {
        this._shadowRoot.innerHTML = `
       <style>
           * {
               margin: 0;
               padding: 0;
               box-sizing: border-box;
           }
           :host {
               display: flex;
               flex-direction: row;
               justify-content: space-between;
               background-color: var(--color-background);
               color: var(--color-text);
               box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
           }
           h2 {
               padding: 16px;
           }
           h2:hover {
                text-shadow: 0 0 10px var(--color-shadow);
                cursor: pointer;
              }
            :host > nav {
                display: flex;
                flex-direction: row;
            }
            :host > nav > li {
                list-style: none;
                height: 100%;
                display: inherit;
                align-items: center;
                padding: 0 16px;
            }
            :host > nav > li:hover {
                cursor: pointer;
                text-shadow: 0 0 10px var(--color-shadow);
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2) inset;
            }
       </style>`;
        this._shadowRoot.innerHTML += `
         <h2>${this.title_head}</h2>
         <nav>
                <li>
                    Dashboard
                </li>
                <li>
                    Countries
                </li>
                <li>
                    Daily
                </li>
         </nav>
         `;
    }
}
customElements.define("nav-bar", Navbar);