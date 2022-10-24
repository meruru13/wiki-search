const form = document.querySelector('.js-search-form')

form.addEventListener('submit', handleSubmit)

async function handleSubmit(event) {
  event.preventDefault()
  const inputValue = document.querySelector('.js-search-input').value
  const searchQuery = inputValue.trim()
  try {
  const results = await searchWiki(searchQuery)
  displayResults(results)
  } catch (err) {
    alert(`Failed. ${err}`)
  }
  
}

async function searchWiki(searchQuery) {
  const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`)
  if (!res.ok) {
    throw Error(res.statusText)
  }
  const json = await res.json()
  return json
}

function displayResults(res) {
  const searchResults = document.querySelector('.js-search-results')
  res.query.search.forEach(res => {
  const url = `https://en.wikipedia.org/?curid=${res.pageid}`
  searchResults.insertAdjacentHTML(
    'beforeend',
    `<div class="result-item">
      <h3 class="result-title">
        <a href="${url}" target="_blank" rel="noopener">${res.title}</a>
      </h3>
      <a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>
      <span class="result-snippet">${res.snippet}</span><br>
    </div>`
  )
  })
}
