# Fred
![Fred Flintstone](http://f.cl.ly/items/1E2E1a2M1w1L3J1W0638/flintstones-fred1.gif)

### Installation
`npm install fred`

### API Key
Fred and the FRED API require and API key. You can [request an api key from the official Federal Reserve web site](http://api.stlouisfed.org/api_key.html).

### Overview

Create an instance of `fred` with your API key:
```javascript
var fred = require('fred')('GiVeMe1APIKeYPLeaSe' || process.env.FRED_API_KEY);
```

Request a resource:
```javascript
fred.series.observations('GDP', function(err, grossNationalProduct) {
  if (!err) console.log(grossNationalProduct.observations)
  done(err);
});
```


### More information

The [documentation for the FRED API](http://api.stlouisfed.org/docs/fred/#General_Documentation) is available on the Federal Reserve's web site.