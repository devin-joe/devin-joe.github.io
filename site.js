class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header>
            <a href="/"><h1>Devin Joe</h1></a>
            <nav>
                <a href="/">Home</a>
                <a href="/#about">About Me</a>
                <a href="/#projects">Goofy Projects</a>
                <a href="/#jokes">Jokes</a>
            </nav>
        </header>
        `;
    }
}
customElements.define('site-header', SiteHeader);

class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer>
            <p>&copy; 2026 Devin Joe. All rights reserved.</p>
        </footer>
        `;
    }
}
customElements.define('site-footer', SiteFooter);
