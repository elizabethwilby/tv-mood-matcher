# Stories

## Feature 1 - Select a Mood and Generate Recommendations

User Story: As a user, I want to select a mood so that I can receive TV show recommendations that match how I am feeling.

Details: Users will select a mood from a dropdown menu. Each mood will be associated with multiple genres through a key-value mapping object.

Examples:

* Romantic: Romance, Comedy, Drama
* Happy: Comedy, Family, Musical
* Spooky: Horror, Thriller, Mystery
* Adventurous: Adventure, Action, Fantasy
* Emotional: Drama, Family, Romance

When a user submits a mood selection, the application will retrieve TV show data from the TVMaze API and display an initial set of recommendations matching one or more genres associated with that mood.

### Event Listener

* `submit`

---

## Feature 2 - View Show Details on Card Hover

User Story: As a user, I want to view additional information about a recommendation before deciding whether I am interested in watching it.

Details: Recommendations will be displayed as interactive cards. The front of each card will display the show's image and title. When the user hovers over a card, it will flip and display additional information including the show's summary, genres, rating, language, and status.

### Event Listener

* `mouseover`

---

## Feature 3 - Save or Reject Recommendations

User Story: As a user, I want to save recommendations I like and remove recommendations I do not like so that I can narrow down my viewing options.

Details: Each recommendation card will contain a green checkmark and a red X. Clicking the green checkmark will add the show to a dedicated watchlist section that remains visible on the page while the user continues browsing. Clicking the red X will remove the recommendation from the current results. After either action, a new recommendation will automatically replace the removed card so that a consistent number of recommendations remain visible.

### Event Listener

* `click`

---

# Stretch Goals

## Stretch Goal 1 - Filter by Show Status

User Story: As a user, I want to filter recommendations by whether a show is currently running or has ended so that I can find content that matches my viewing preferences.

Details: Users will be able to filter recommendations using the status property returned by the TVMaze API.

Examples:

* Running
* Ended

---

## Stretch Goal 2 - Sort Recommendations by Rating

User Story: As a user, I want to sort recommendations by rating so that I can quickly identify highly rated shows.

Details: Users will be able to sort recommendation results using rating information returned by the TVMaze API.

Examples:

* Highest Rated First(set a limit for shows considred highly rated)

---

## Stretch Goal 3 - Filter Recommendations by Language

User Story: As a user, I want to filter recommendations by language so that I can find shows in languages I prefer to watch.

Details: Users will be able to filter recommendations using the language property returned by the TVMaze API.

Examples:

* English
* Spanish
* Arabic
* Korean

---

## Stretch Goal 4 - Clear

User Story: As a user, I want to reset my recommendations so that I can begin a new search from scratch.

Details: A Start Over button will clear the watchlist, reset any active filters, and return the user to the initial mood selection state.