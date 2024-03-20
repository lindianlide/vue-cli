export const language = {
  defaultValue: 'zhCN',
  getItem() {
    let language = localStorage.getItem('language')
    if (language) return language
    language =
      navigator.language && navigator.language.startsWith('en')
        ? 'enUS'
        : navigator.language.replace('-', '').replace('_', '') || this.defaultValue
    localStorage.setItem('language', language)
    return language
  },
  setItem(item) {
    localStorage.setItem('language', item)
  }
}

export const tagNavigation = {
  size: 3,
  getItems() {
    const items = sessionStorage.getItem('tagNavigations')
    return items ? JSON.parse(items) : []
  },
  addItem(item) {
    const items = this.getItems()
    if (items.length < 1) items.push({ ...item, _active: true })
    else {
      items.forEach((x) => (x._active = undefined))
      const targetIndex = this.getIndex(item)
      if (targetIndex >= 0) items.splice(targetIndex, 1, { ...item, _active: true })
      else {
        if (items.length > this.size - 1) items.splice(0, 1)
        items.push({ ...item, _active: true })
      }
    }
    sessionStorage.setItem('tagNavigations', JSON.stringify(items))
    document.dispatchEvent(new CustomEvent('customStorage', { detail: items }))
  },
  removeItem(item) {
    const items = this.getItems()
    const targetIndex = this.getIndex(item, items)
    if (targetIndex < 0) return targetIndex
    const activeItem = items.find((x) => x._active)
    let activeKey = activeItem.id || activeItem.key
    items.forEach((x) => (x._active = undefined))
    if (items.length < 2) {
      items.splice(0, 1)
      activeKey = undefined
    } else {
      const activeIndex = 0 === targetIndex ? 1 : targetIndex - 1
      items[activeIndex]._active = true
      if (activeKey === (items[targetIndex].id || items[targetIndex].key))
        activeKey = items[activeIndex].id || items[activeIndex].key
      items.splice(targetIndex, 1)
    }
    sessionStorage.setItem('tagNavigations', JSON.stringify(items))
    document.dispatchEvent(new CustomEvent('customStorage', { detail: items }))
  },
  getIndex(item, items) {
    return (items || this.getItems()).findIndex(
      (x) => (item.id && x.id === item.id) || (item.key && x.key === item.key)
    )
  }
}
