## config.json

Copy ~/params/example.config.json to ~/params/config.json

### example config.json

```javascript
{
  "title": "vue-open-etc-pool",
  "description": "vue based frontend for open-etc-pool",
  "logo": "etc.svg",
  "favicon": "favicon.png",
  "url": "http://127.0.0.1:3000",
  "api": "http://127.0.0.1:8080",
  "stratum": "127.0.0.1:8008",
  "network": "classic",
  "explorer": {
    "url": "https://expedition.dev",
    "type": "expedition"
  },
  "symbol": "ETC",
  "poolFee": "1",
  "payoutThreshold": "0.5",
  "blocktime": 13.2,
  "epochLength": 60000,
  "theme": {
    "dark": true,
    "themes": {
      "dark": {
        "primary": "#1976D2",
        "secondary": "#424242",
        "accent": "#82B1FF",
        "error": "#FF5252",
        "info": "#2196F3",
        "success": "#4CAF50",
        "warning": "#FFC107"
      },
      "light": {
        "primary": "#1976D2",
        "secondary": "#424242",
        "accent": "#82B1FF",
        "error": "#FF5252",
        "info": "#2196F3",
        "success": "#4CAF50",
        "warning": "#FFC107"
      }
    }
  }
}
```

## images/icons

To avoid future merge conflicts dont replace the existing icon/image files, add new ones alongside and update the config. Images/icons can be found in the ~/static directory.

## network

`classic` or `mordor`.

## explorer type

`expedition` or `blockscout`

## theme
 
`dark`: If true pool interface defaults to darkmode.

Colors for each theme (dark/light) can be configured via config.json, see: https://vuetifyjs.com/en/features/theme for additional options.

Addtional customizations/overrides can be done via ~/assets/variables.scss, see: https://vuetifyjs.com/en/features/sass-variables/ for more info.