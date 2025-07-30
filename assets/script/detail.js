
const params = new URLSearchParams(window.location.search)
const name = params.get("name")
const container = document.getElementById("detailsContainer")
const title = document.getElementById("title")
const pageTitle = document.getElementById("pageTitle")

if (!name) {
  container.innerHTML = "<p>Nome do Pokémon não informado.</p>"
} else {
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Pokémon não encontrado")
      }
      return res.json()
    })
    .then((data) => {
      const types = data.types.map((t) => t.type.name).join(", ")
      container.innerHTML = `
        <img src="${data.sprites.other.dream_world.front_default}" alt="${data.name}" />
        <ul>
          <li><strong>Nome:</strong> ${data.name}</li>
          <li><strong>Número:</strong> #${data.id}</li>
          <li><strong>Altura:</strong> ${data.height / 10} m</li>
          <li><strong>Peso:</strong> ${data.weight / 10} kg</li>
          <li><strong>Tipos:</strong> ${types}</li>
        </ul>
      `
      title.innerText = data.name
      pageTitle.innerText = data.name
    })
    .catch((err) => {
      container.innerHTML = "<p>Erro ao carregar os dados.</p>"
      console.error(err)
    })
}
