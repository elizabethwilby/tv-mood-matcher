const moodGenres = {
  happy: ['Comedy', 'Family', 'Music'],
  romantic: ['Romance', 'Comedy', 'Drama', 'Western'],
  spooky: ['Horror', 'Thriller', 'Supernatural', 'Science-Fiction'],
  adventurous: ['Adventure', 'Action', 'Fantasy', 'Western', 'Sports', 'Science-Fiction'],
  emotional: ['Drama', 'Family', 'Romance', 'Western', 'Legal', 'Sports'],
  sad: ['Drama', 'Romance', 'History'],
  sleepy: ['Family', 'Music', 'Romance', 'Comedy'],
  funny: ['Comedy'],
  crazy: ['Thriller', 'Action', 'Supernatural', 'Anime'],
  intense: ['Action', 'Thriller', 'Espionage', 'Legal', 'Western', 'Sports'],
  angry: ['Action', 'Crime', 'War', 'Western', 'Anime'],
  curious: ['Science-Fiction', 'Mystery', 'Medical', 'Legal', 'Sports'],
  tired: ['Comedy', 'Family'],
  jealous: ['Drama', 'Romance', 'Crime', 'Legal'],
  melancholy: ['Drama', 'Romance', 'Western', 'Fantasy'],
}

function removeHtmlTags(str) {
  if (!str) return '';
  return str.replace(/<[^>]*>/g, '');
}

document.addEventListener('DOMContentLoaded', () => {
  let displayedShows = []
  let showQueue = []
  let watchList = []
  let matchingShows = []

  const recsContainer = document.getElementById('recs')
  const watchListItems = document.getElementById('watchlist-items')
  const form = document.getElementById('mood-form')
  const statusFilter = document.getElementById('status')
  
  function renderShows(shows){
    while (recsContainer.firstChild) {
      recsContainer.removeChild(recsContainer.firstChild)
    }
    shows.slice(0,6).forEach(show => {
      const card = createCard(show)
      recsContainer.appendChild(card)
    })
  }
  statusFilter.addEventListener('change', () => {
  const selectedStatus = statusFilter.value
  const filtered = selectedStatus === 'all'
    ? matchingShows
    : matchingShows.filter(show => show.status === selectedStatus)
  renderShows(filtered)
})

  function replaceCard(card) {
    card.remove()
    if (showQueue.length > 0) {
      const nextShow = showQueue.shift()
      const newCard = createCard(nextShow)
      recsContainer.appendChild(newCard)
    }
  }

  function createCard(show) {
    const card = document.createElement('div')
    card.className = 'card'

    const imageContainer = document.createElement('div')
    imageContainer.className = 'image-container'

    const imageFront = document.createElement('div')
    imageFront.className = 'image-front'
    imageFront.style.backgroundImage = `url(${show.image ? show.image.medium : ''})`

    const imageBack = document.createElement('div')
    imageBack.className = 'image-back'

    const summary = document.createElement('p')
    summary.textContent = removeHtmlTags(show.summary)

    imageBack.appendChild(summary)
    imageContainer.appendChild(imageFront)
    imageContainer.appendChild(imageBack)

    const cardInfo = document.createElement('div')
    cardInfo.className = 'card-info'

    const title = document.createElement('h2')
    title.textContent = show.name

    const genres = document.createElement('p')
    genres.textContent = show.genres.join(', ')

    const rating = document.createElement('p')
    rating.textContent = `Rating: ${show.rating.average || 'N/A'}`

    const language = document.createElement('p')
    language.textContent = `Language: ${show.language}`

    const status = document.createElement('p')
    status.textContent = `Status: ${show.status}`

    const buttonContainer = document.createElement('div')
    buttonContainer.className = 'button-container'

    const yesButton = document.createElement('button')
    yesButton.textContent = '✓'
    yesButton.className = 'yes-button'

    const noButton = document.createElement('button')
    noButton.textContent = 'x'
    noButton.className = 'no-button'

    buttonContainer.appendChild(yesButton)
    buttonContainer.appendChild(noButton)

    cardInfo.appendChild(title)
    cardInfo.appendChild(genres)
    cardInfo.appendChild(rating)
    cardInfo.appendChild(language)
    cardInfo.appendChild(status)
    cardInfo.appendChild(buttonContainer)

    imageContainer.addEventListener('mouseover', () => {
      imageContainer.style.transform = 'rotateY(180deg)'
    })
    imageContainer.addEventListener('mouseout', () => {
      imageContainer.style.transform = 'rotateY(0deg)'
    })

    noButton.addEventListener('click', () => {
      replaceCard(card)
    })

    yesButton.addEventListener('click', () => {
      watchList.push(show)
      const watchListItem = document.createElement('p')
      watchListItem.textContent = show.name
      watchListItems.appendChild(watchListItem)
      replaceCard(card)
    })

    card.appendChild(imageContainer)
    card.appendChild(cardInfo)
    return card
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const selectedMood = document.getElementById('mood').value
    const genres = moodGenres[selectedMood]
    fetch('https://api.tvmaze.com/shows')
      .then(response => response.json())
      .then(data => {
          matchingShows = data.filter(show =>
          show.genres.some(genre => genres.includes(genre))
        )
        displayedShows = matchingShows.slice(0, 6)
        showQueue = matchingShows.slice(6)
        renderShows(matchingShows)
      })


    })

})
//Stretch 1
fetch("https://api.tvmaze.com/shows")
  .then(response => response.json())
  .then(data => {
    const status = [...new Set(data.map(show => show.status))]
    // console.log(status) //ended, running, tbd// if else else, shows the shows under those catagories
  })

//Stretch 2
fetch("https://api.tvmaze.com/shows")
  .then(response => response.json())
  .then(data => {
    const rating = [...new Set(data.map(show => show.rating.average))]
    //console.log(rating) if else, if higher than 8.0 show, if lower null
  })
//Stretch 3
fetch("https://api.tvmaze.com/shows")
  .then(response => response.json())
  .then(data => {
    const allLanguages = [...new Set(data.map(show => show.network?.name))]
    //console.log(allLanguages)
    //choose networks, check boxes, show only shows from those networks
  })


