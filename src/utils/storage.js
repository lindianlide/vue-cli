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
