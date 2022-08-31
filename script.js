fetch('http://www.omdbapi.com/?apikey=a0861315&t=avengers')
    .then((response) => console.log(response))
    .catch((error) => console.log(error));