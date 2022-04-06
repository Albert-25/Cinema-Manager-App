export const getItemsCart = (key) => {
  let items = localStorage.getItem(key)
    if (!items) {
      items = []
    } else {
      items = JSON.parse(items)
    }
  return items
}