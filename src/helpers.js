export function getStaticKey(item) {
  return JSON.stringify(item)
    .toString(36)
    .replace(/[^A-Za-z0-9]/g, '')
}
