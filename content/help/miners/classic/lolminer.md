---
title: lolMiner
minVer: 1.12
releases: https://github.com/Lolliedieb/lolMiner-releases/releases
---

```
#!/bin/bash

#################################
## Begin of user-editable part ##
#################################

POOL=STRATUM_HOST
# Address to send funds to. Change this address to yours!
WALLET=0xda904bc07fd95e39661941b3f6daded1b8a38c71

#################################
##  End of user-editable part  ##
#################################

cd "$(dirname "$0")"

./lolMiner -c ETC --pool $POOL --user $WALLET --ethstratum=ETHPROXY $@
```