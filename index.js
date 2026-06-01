fetch("https://api.tvmaze.com/shows")
  .then(response => response.json())
  .then(data => console.log(data))