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

   window.localStorage.setItem(item.sha, JSON.stringify(searchItem))

}

export function deleteItemFromStorage(id) {

}
