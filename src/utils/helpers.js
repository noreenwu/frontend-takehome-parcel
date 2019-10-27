export function formatItem(item) {
  // the api returns a huge amount of information for each gem. Here, we pare that down
  // by pulling out the fields we really want to save for the user
   const searchItem = {
    sha: item.sha,
    name: item.name,
    authors: item.authors,
    info: item.info,
    homepage_uri: item.homepage_uri,
    gem_uri: item.gem_uri,
    wiki_uri: item.wiki_uri,
    source_code_uri: item.source_code_uri
  }

  return searchItem

}

export function saveItemToStorage(item) {

  const searchItem = formatItem(item)

  localStorage.setItem(item.sha, JSON.stringify(searchItem))

}

export function deleteItemFromStorage(id) {
  localStorage.removeItem(id)
  console.log("deleting from local storage", id)
}

export function getAllFromStorage() {

  let savedItems = {}
  let keys= Object.keys(localStorage)

  for(let k of keys) {
    savedItems[k] = JSON.parse(localStorage.getItem(k))
  }
  console.log("from local storage", savedItems)

  return savedItems
}

export function paginate(results) {
  let pages = []

  // how many pages
  const numPages = Math.ceil(results.length / 10)

  console.log("num pages", numPages, results)

  let i = 0
  while (i < numPages) {
    pages[i] = results.slice(10*i, (i+1)*10)
    i++
  }
  console.log("pages ", pages)
  return pages
}
