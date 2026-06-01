// document.addEventListener("DOMContentLoaded", () => {
// fetch("https://api.tvmaze.com/shows")
//   .then(response => response.json())
//   .then(data => console.log(data))

//   fetch("https://api.tvmaze.com/shows")
//   .then(response => response.json())
//   .then(data => {
//     const allGenres = [...new Set(data.flatMap(show => show.genres))]
//     console.log(allGenres)
//   })

const moodGenres = {
  happy: ["Comedy", "Family", "Music"],
  romantic: ["Romance", "Comedy", "Drama", "Western"],
  spooky: ["Horror", "Thriller", "Supernatural"],
  adventurous: ["Adventure", "Action", "Fantasy", "Western", "Sports"],
  emotional: ["Drama", "Family", "Romance", "Western", "Legal", "Sports"],
  sad: ["Drama", "Romance", "History"],
  sleepy: ["Family", "Music", "Romance", "Comedy"],
  funny: ["Comedy"],
  crazy: ["Thriller", "Action", "Supernatural", 'Anime'],
  intense: ["Action", "Thriller", "Espionage", "Legal", "Western", "Sports"],
  angry: ["Action", "Crime", "War", "Western", "Anime"],
  curious: ["Science-Fiction", "Mystery", "Medical", "Legal", "Sports"],
  tired: ["Comedy", "Family"],
  jealous: ["Drama", "Romance", "Crime", "Legal"]
}

function createCard(show) {
  const card = document.createElement("div")
  
  const title = document.createElement("h2")
  title.textContent = show.name
  const img = document.createElement("img")
  img.src = show.image.medium

  
  card.appendChild(img)
  card.appendChild(title)
  
  return card
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('mood-form')

  form.addEventListener("submit", (event) => {
    event.preventDefault()
    const selectedMood = document.getElementById("mood").value
    console.log(selectedMood)

    const genres = moodGenres[selectedMood]
    // console.log(genres)

    let displayedShows = []
    let showQueue = []

    fetch("https://api.tvmaze.com/shows")
     .then(response => response.json())
     .then(data => {
       const matchingShows = data.filter(show => 
         show.genres.some(genre => genres.includes(genre))
    )
    // console.log(matchingShows)
    displayedShows = matchingShows.slice(0, 6)
    showQueue = matchingShows.slice(6)
    
    const recsContainer = document.getElementById('recs')
    while (recsContainer.firstChild) {
       recsContainer.removeChild(recsContainer.firstChild)
    }
    displayedShows.forEach(show => {
        const card = createCard(show)
        recsContainer.appendChild(card)
    })
    // console.log(displayedShows)
    // console.log(showQueue)
  })
 })

})



