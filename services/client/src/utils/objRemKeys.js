export default function(obj, keys) {
  return Object.keys(obj)
    .filter(key => !(key in keys))
    .reduce((prev, key) => (
      { ...prev, [key]: obj[key] }
    ), {});
}
