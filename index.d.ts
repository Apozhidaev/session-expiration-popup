declare namespace JSX {
  interface IntrinsicElements {
    ["session-expiration-popup"]: {
      ["session-check-url"]?: string;
      interval?: string | number;
      ["force-show"]?: "true" | "false" | boolean;
      ["clear-cookies"]?: "true" | "false" | boolean;
    };
  }
}
