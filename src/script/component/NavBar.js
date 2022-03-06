class Navbar extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: "open" });
        this.items_html = "";
        this.items_icons_html = "";
    }

    connectedCallback() {
        this.title_head = this.getAttribute("title") || "Write Title Bar Here";
        this.items = this.getAttribute("items") || "";
        this.items = this.items.split(" ");
        this.items_href = this.getAttribute("items-href") || "";
        this.items_href = this.items_href.split(" ");
        this.items.forEach((item, idx) => {
            this.items_html += `
            <a href="${this.items_href[idx]}">
                ${item}
            </a>`;
        });
        this.items_icon = this.getAttribute("items-icon") || "";
        this.items_icon = this.items_icon.split(" ");
        this.items_icon.forEach((item, idx) => {
            this.items_icons_html += `
            <a href="${this.items_href[idx]}">
                <i class="${item}"></i>
            </a>`;
        });
        this.render();
    }

    render() {
        this._shadowRoot.innerHTML = `
       <style>
       @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css");
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
           h1 {
               padding: 16px;
               white-space: nowrap;
           }
           h1:hover {
                text-shadow: 0 0 10px var(--color-shadow);
                cursor: pointer;
              }
            :host > nav {
                display: flex;
                flex-direction: row;
            }
            :host > nav > a {
                list-style: none;
                height: 100%;
                display: inherit;
                align-items: center;
                padding: 0 16px;
                font-size: large;
                text-decoration: none;
                color: var(--color-text);
            }
            :host > nav > a:hover {
                cursor: pointer;
                text-shadow: 0 0 10px var(--color-shadow);
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2) inset;
            }
            :host > nav#mobile {
                position: fixed;
                bottom: 0;
                width: 100%;
                display: none;
                flex-direction: row;
                justify-content: space-between;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2) inset;
            }
            :host > nav#mobile > a:active{
                text-shadow: 0 0 10px var(--color-shadow);
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2) inset;
            }
            :host > nav#mobile > a {
                width: 100%;
                justify-content: center;
                height: 80px;
                font-size: xx-large;
            }
            @media (max-width: 768px) {
                :host > nav#desktop {
                    display: none;
                }
                :host > nav#mobile {
                    display: flex;
                }
            }
       </style>`;
        this._shadowRoot.innerHTML += `
        <h1>${this.title_head}</h1>
        <nav id="desktop">
            ${this.items_html}
        </nav>
        <nav id="mobile">
            ${this.items_icons_html}
        </nav>
         `;
    }
}
customElements.define("nav-bar", Navbar);