const deleteAllCookies = () => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};

class SessionExpirationPopup extends HTMLElement {
  constructor() {
    super();
    this.expired = false;
    this.keydownHendler = this.keydownHendler.bind(this);
  }

  static get observedAttributes() {
    return ["session-check-url", "interval", "force-show", "clear-cookies"];
  }

  disconnectedCallback() {
    window.removeEventListener("keydown", this.keydownHendler, true);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "force-show") {
      this.render();
    }

    if (["session-check-url", "interval"].includes(name)) {
      this.sessionChecking();
    }
  }

  get root() {
    if(this._root) {
      return this._root;
    }

    this._root = new DocumentFragment();

    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.zIndex = 999999;
    overlay.style.top = 0;
    overlay.style.right = 0;
    overlay.style.bottom = 0;
    overlay.style.left = 0;
    overlay.style.opacity = 0.25;
    overlay.style.backgroundColor = "#000";
    this._root.append(overlay);

    const popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.zIndex = 999999;
    popup.style.top = 0;
    popup.style.left = "50%";
    popup.style.width = "75%";
    popup.style.transform = "translate(-50%)";
    popup.style.opacity = 0.9;
    popup.style.backgroundColor = "var(--se-bg-color, #1166e5)";
    popup.style.color = "var(--se-text-color, #fff)";
    popup.style.borderRadius = "0 0 0.25rem 0.25rem";
    popup.style.padding = "1rem";
    popup.style.lineHeight = 1;
    popup.style.fontSize = "1rem";
    popup.style.fontFamily = "sans-serif"

    const title = document.createElement("h2");
    title.style.margin = "0.25rem 0 0";
    title.style.fontSize = "2rem";
    title.style.fontWeight = 600;
    title.append("Your session expired");
    popup.append(title);

    const subtitle = document.createElement("div");
    subtitle.style.fontWeight = 500;
    subtitle.style.marginTop = "0.75rem";
    subtitle.append("Please note that all unsaved data will be lost. ");

    const link = document.createElement("a");
    link.style.color = "inherit";
    link.style.fontWeight = 600;
    link.style.textDecoration = "underline";
    link.href = "/";
    link.append("Click here");
    link.onclick = (e) => {
      e.preventDefault();
      this.reload();
    };
    subtitle.append(link);
    subtitle.append(" or press ");
    const esc = document.createElement("span");
    esc.style.fontWeight = 600;
    esc.append("ESC");
    subtitle.append(esc);
    subtitle.append(" to login and continue work with application.");

    popup.append(subtitle);
    this._root.append(popup);

    return this._root;
  }

  get clearCookies() {
    const attr = this.getAttribute("clear-cookies");
    return (!attr && this.hasAttribute("clear-cookies")) || String(attr) === "true";
  }

  get forceShow() {
    const attr = this.getAttribute("force-show");
    return (!attr && this.hasAttribute("force-show")) || String(attr) === "true";
  }

  get showPopup() {
    return this.expired || this.forceShow;
  }

  keydownHendler(e) {
    e.preventDefault();
    if (e.key === "Escape") {
      this.reload();
    }
  }

  reload() {
    if (this.clearCookies) {
      deleteAllCookies();
    }
    window.location.reload();
  }

  sessionChecking() {
    const interval = Number(this.getAttribute("interval"));
    const sessionCheckUrl = this.getAttribute("session-check-url");
    if (sessionCheckUrl && interval) {
      if (!this.timerId) {
        const checkSession = async () => {
          const result = await fetch(sessionCheckUrl, {
            credentials: "include",
          });
          if (result.status === 401) {
            this.expired = true;
            this.render();
          } else if (this.timerId) {
            this.timerId = setTimeout(checkSession, interval);
          }
        };
        this.timerId = setTimeout(checkSession, 0);
      }
    } else {
      clearTimeout(this.timerId);
      delete this.timerId;
    }
  }

  render() {
    window.removeEventListener("keydown", this.keydownHendler, true);
    if (this.showPopup) {
      window.addEventListener("keydown", this.keydownHendler, true);
      this.append(this.root);
    } else {
      this.innerHTML = "";
    }
  }
}

customElements.define("session-expiration-popup", SessionExpirationPopup);
