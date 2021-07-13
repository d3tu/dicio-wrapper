# dicio-wrapper
www.dicio.com.br wrapper.
```javascript
const dicioWrapper = require("dicio-wrapper");

dicioWrapper("universe").then(res => {
  // Returns an object with the elements word, definition, url and urls.
  console.log(res);
}).catch(err => {
  console.log(err.message);
})
```