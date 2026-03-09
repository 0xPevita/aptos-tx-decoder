# aptos-tx-decoder

> Decode and parse Aptos transactions for debugging and analytics.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Aptos](https://img.shields.io/badge/Aptos-blue?style=flat-square)

## Usage
```javascript
const { decodeTransaction, getTransactionType } = require("./src");

const tx = await decodeTransaction("0xTX_HASH");
console.log(tx.function);   // shelby::blob::register_blob
console.log(tx.sender);     // 0x1234...
console.log(tx.success);    // true
```

## License
MIT
