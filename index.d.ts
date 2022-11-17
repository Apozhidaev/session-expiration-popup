interface HTMLElementEventMap {
  reload: Event;
}

declare namespace React {
  interface ClassAttributes<T> {}
  interface HTMLAttributes<T> {}
}

interface SessionExpirationPopupHTMLAttributes<T>
  extends React.HTMLAttributes<T> {
  ["session-check-url"]?: string;
  interval?: string | number;
  ["force-show"]?: "true" | "false" | boolean;
  ["clear-cookies"]?: "true" | "false" | boolean;
}

interface HTMLSessionExpirationPopupElement extends HTMLElement {}

interface SessionExpirationPopupProps
  extends React.ClassAttributes<HTMLSessionExpirationPopupElement>,
    SessionExpirationPopupHTMLAttributes<HTMLSessionExpirationPopupElement> {}

declare namespace JSX {
  interface IntrinsicElements {
    ["session-expiration-popup"]: SessionExpirationPopupProps;
  }
}
