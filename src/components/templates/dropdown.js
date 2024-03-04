export const createItem = (data, parent) => {
  parent.innerHTML = ''

  data.forEach(item => {
    const article = document.createElement('article')
    article.innerHTML = item
    parent.appendChild(article)
  })
}
