const detailsList = document.getElementById('info');
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const backButton = document.getElementById('backButton');
const limit = 4;
let offset = 0;

function loadPokemonItens(offset, limit) {
    pokeAPI.getPokemons(offset, limit).then((pokemons = []) =>  {
        const newHTML = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name"> ${pokemon.name} </span>
                
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                    </ol>

                   <a href="./details.html?name=${pokemon.name}"> <img src="${pokemon.photo}" alt="${pokemon.name}"> </a>
                </div>
            </li> 
`).join('')
        pokemonList.innerHTML += newHTML
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    loadPokemonItens(offset, limit)
})

