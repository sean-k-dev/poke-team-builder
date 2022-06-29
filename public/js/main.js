const quantityColour = () => pokeList.length < 6 ? teamQuantity.style.color = 'green' : teamQuantity.style.color = 'red'

window.onload = function() {
    updateQuantity();
    quantityColour()
}

const pokeList = document.querySelectorAll(".current_team li")
const updateQuantity = () => teamQuantity.innerText = `(${pokeList.length} of 6)`
const teamQuantity = document.querySelector('#teamQuantity')
const submitForm = document.querySelector('#submit').addEventListener('click', updateQuantity, quantityColour)


// Delete and Favourite Buttons

const deleteRow = document.querySelectorAll('.fa-trash-can')
const addToFavourites = document.querySelectorAll('.fa-star')

Array.from(deleteRow).forEach(x => {
    x.addEventListener('click', deletePokemon)
})

Array.from(addToFavourites).forEach(x => {
    x.addEventListener('click', addFave)
})

function addFave() {
    const pName = this.parentNode.childNodes[2].innerText
    const pLevel = this.parentNode.childNodes[8].innerText
    fetch('/favourite', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'name': pName,
              'level': pLevel,
              'favourite': true
            })
          })
        .then(res => {
            res.json("Added to favourites")
        })
        .then(data => {
            console.log(data)
            location.reload()
        })
        .catch(error => console.log(error))
}

function deletePokemon() {
    const pName = this.parentNode.childNodes[2].innerText
    const pLevel = this.parentNode.childNodes[8].innerText
    fetch('/deletePoke', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'name': pName,
                'level': pLevel
            })
        })
        .then(res => {
            res.json("Pokémon deleted")
        })
        .then(data => {
            location.reload()
        })
        .catch(error => console.log(error))
}

// PokéAPI fetch

let activeSpecies = ""
let searchQuery = document.querySelector('.search input')

function findSpecies() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${activeSpecies}`)
        .then(res => res.json())
        .then (data => {
            console.log(data)
            clearDropdown(document.getElementById('abilityField'))
            document.querySelector('#pokeNameField').value = data.name.charAt(0).toUpperCase() + data.name.slice(1,data.name.length)
            for (let i = 0; i < data.abilities.length; i++){
                let opt = document.createElement('option')
                opt.value = data.abilities[i].ability.name.replace(/[-]/g," ").replace(/\b\w/g, x => x.toUpperCase())
                console.log(opt.value)
                opt.innerHTML = data.abilities[i].ability.name.replace(/[-]/g," ").replace(/\b\w/g, x => x.toUpperCase())
                opt.classList = "ability-dropdown"
                document.querySelector('#abilityField').appendChild(opt)
            }
            document.querySelector("#previewSprite").src = data.sprites.front_default
            document.querySelector("#previewSprite").name = data.sprites.front_default
        })
        .catch(err => {console.log(`error ${err}`)})
}



document.querySelector('#search').addEventListener('click', () => {
  activeSpecies = searchQuery.value.toLowerCase()
  findSpecies()
})

// Activate search upon pressing Enter key
document.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("search").click();
  }
});

 function clearDropdown(opt) {
    let length = opt.options.length -1
    for(let i = length; i >= 0; i--) {
        opt.remove(i)
    }
 }
 

// function checkLength() {
//     document.querySelectorAll(".current_team li")
//     if (pokeList.length === 6) {
//         pokeList.parentNode.removeChild(li[7])
//     } else {
//         updateQuantity()
//     }
// }