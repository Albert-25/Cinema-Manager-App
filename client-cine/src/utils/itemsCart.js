export const getItemsCart = () => {
  let items = localStorage.getItem("items")
    if (!items) {
      items = []
    } else {
      items = JSON.parse(items)
    }
  return items
}