import authors from '../data/authors.json'

export function findValue(object, searchKey) {
  let value
  for (const key in object) {
    if (key === searchKey) return object[key]
    if (typeof object[key] === 'object') value = findValue(object[key], searchKey)
  }
  return value
}

export const includes = (text, phrase) => {
  if (!text) return false
  const t = text.toLowerCase(), p = phrase.toLowerCase()
  return t.includes(p) || t.replace(/ě/g, 'e').replace(/y/g, 'i').includes(p)
}

export function smoothscroll() {
  const y = document.documentElement.scrollTop || document.body.scrollTop
  if (y > 0) {
    window.requestAnimationFrame(smoothscroll)
    window.scrollTo (0, y - (y / 5))
  }
}

export function compare(a, b) {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

export const getName = (author, lang) =>
  authors.commons[author] || (authors[lang] && authors[lang][author]) || author

/**
@param authors: array
@return Map(author name: image src)
*/
export function getThumbnails(authors) {
  return fetch(`https://sh.wikipedia.org/w/api.php?action=query&titles=${authors.join('|')}&prop=pageimages&format=json&pithumbsize=50&origin=*`)
    .then(res => res.json())
    .then(res => {
      if (!res.query.pages) return
      const thumbnails = new Map()
      for (const key in res.query.pages) {
        const obj = res.query.pages[key]
        if (!obj.thumbnail) continue
        thumbnails.set(obj.title, obj.thumbnail.source)
      }
      return thumbnails
    })
}