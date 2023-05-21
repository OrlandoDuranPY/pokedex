window.onload = init;
let headers = {};
let url = 'http://localhost:3000';

function init() {
  if (localStorage.getItem('token')) {
    headers = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    loadPokemon();
  } else {
    window.location.href = 'index.html';
  }
}

function loadPokemon() {
  axios
    .get(url + '/pokemon', headers)
    .then(function (res) {
    //   console.log(res);
      displayPokemon(res.data.message);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function displayPokemon(pokemon){
    let body = document.querySelector('body');
    for(let i = 0; i < pokemon.length; i++){
        body.innerHTML += `<h3>${pokemon[i].pok_id} ${pokemon[i].pok_name}</h3>`
    }
}