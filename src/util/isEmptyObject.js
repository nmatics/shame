export default function isEmptyObject(value) {
  return Object.keys(value).some(key => value[key] === null);
}