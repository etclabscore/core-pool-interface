## config.json

Copy ~/params/example.config.json to ~/params/config.json

### example config.json

```javascript
{
  "title": "core-pool",
  "description": "vue based frontend for core-pool",
  "logo": "etc.svg",
  "favicon": "favicon.png",
  "url": "http://127.0.0.1:3000",
  "api": "http://127.0.0.1:8080",
  "stratum": "127.0.0.1:8008",
  "network": "classic",
  "explorer": {
    "url": "https://blockscout.com",
    "type": "blockscout"
  },
  "poolFee": "1",
  "payoutThreshold": "0.5",
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
        "warning": "#FFC107",
        "borders": "#2E2E2E"
      },
      "light": {
        "primary": "#1976D2",
        "secondary": "#F5F5F5",
        "accent": "#82B1FF",
        "error": "#FF5252",
        "info": "#2196F3",
        "success": "#4CAF50",
        "warning": "#FFC107",
        "borders": "#E1E1E1"
      }
    },
    "options": { 
      "customProperties": true 
    }
  },
  "i18n": {
    "default": "en",
    "fallback": "en"
  },
  "extraPools": []
}
```

## images/icons

To avoid future merge conflicts dont replace the existing icon/image files, add new ones alongside and update the config. Images/icons can be found in the ~/static directory.

## network

`classic`, `mordor`, `ethereum` or `ubiq`

blocktimes, epochLength, icon, title, algo are set based on network, these values can be found in ~/params/networks.json

## explorer type

`expedition`, `blockscout`, `etherscan` or `spectrum`

## theme
 
`dark`: If true pool interface defaults to darkmode.

Colors for each theme (dark/light) can be configured via config.json, see: https://vuetifyjs.com/en/features/theme for additional options.

Addtional customizations/overrides can be done via ~/assets/variables.scss, see: https://vuetifyjs.com/en/features/sass-variables/ for more info.

## extraPools

Custom menu links to additional pool instances can easily be configured via the config, simply define any additional pools as follows

```
"extraPools": [
    { "network": "ethereum", "url": "https://ethereum.pool.octano.dev", "type": "PROP" },
    { "network": "ubiq", "url": "https://ubiq.pool.octano.dev", "type": "PPLNS" },
    { "network": "classic", "url": "https://classic.pool.octano.dev", "type": "SOLO" }
]
```

Network must be a supported support key. Define any new networks in ~/params/networks.json (and submit a PR).
