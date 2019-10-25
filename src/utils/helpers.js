export function formatItem(item) {
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

   window.localStorage.setItem(item.sha, JSON.stringify(searchItem))

}

export function deleteItemFromStorage(id) {

}
