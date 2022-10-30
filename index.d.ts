declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["session-expiration-popup"]: {
        ["session-check-url"]?: string;
        ["interval"]?: string | number;
        ["force-show"]?: string | boolean;
        ["clear-cookies"]?: string | boolean;
      };
    }
  }
}
