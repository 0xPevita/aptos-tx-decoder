const fetch = (...args) => import("node-fetch").then(({ default: f }) => f(...args));

const APTOS_API = "https://api.testnet.aptoslabs.com/v1";

async function getTransaction(hash) {
  const resp = await fetch(`${APTOS_API}/transactions/by_hash/${hash}`);
  if (!resp.ok) throw new Error(`TX not found: ${hash}`);
  return resp.json();
}

async function decodeTransaction(hash) {
  const tx = await getTransaction(hash);
  return {
    hash: tx.hash,
    sender: tx.sender,
    function: tx.payload?.function || "unknown",
    args: tx.payload?.arguments || [],
    success: tx.success,
    gasUsed: tx.gas_used,
    timestamp: new Date(Number(tx.timestamp) / 1000).toISOString(),
    version: tx.version,
  };
}

function getTransactionType(tx) {
  const fn = tx.payload?.function || "";
  if (fn.includes("blob")) return "SHELBY_STORAGE";
  if (fn.includes("coin")) return "COIN_TRANSFER";
  if (fn.includes("token")) return "NFT";
  if (fn.includes("stake")) return "STAKING";
  return "OTHER";
}

async function getAccountTransactions(address, limit = 10) {
  const resp = await fetch(`${APTOS_API}/accounts/${address}/transactions?limit=${limit}`);
  const txns = await resp.json();
  return txns.map((tx) => ({
    hash: tx.hash,
    function: tx.payload?.function || "unknown",
    success: tx.success,
    timestamp: new Date(Number(tx.timestamp) / 1000).toISOString(),
    type: getTransactionType(tx),
  }));
}

module.exports = { decodeTransaction, getTransactionType, getAccountTransactions };
