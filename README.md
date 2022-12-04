# Session expiration popup

This component is used to indicate that user session has expired.


### Attributes

* **redirect-to** - redirect url to go after clicking on the popup or press ESC
* **session-check-url** - heartbeat url to check user session against.
* **interval** - interval of check requests in ms.
* **force-show** - force popup to be shown no matter session is expired or not.
* **clear-cookies** - clear the cookies before going to the redirect url or reload the page if the **redirect-to** is empty


### How to Use

Step 1.
```bash
npm i session-expiration-popup
```

Step 2.
```javascript
import 'session-expiration-popup'
```

Step 3.
```html
<style>
  :root {
    --se-bg-color: #7c3aed;
    --se-text-color: #fff;
    --se-opacity: 0.9;
    --se-overlay-color: #000;
    --se-overlay-opacity: 0.25;
  }
</style>

<session-expiration-popup
  redirect-to="/logout"
  session-check-url="/api/session"
  interval="60000"
  force-show
  clear-cookies
>
</session-expiration-popup>
```