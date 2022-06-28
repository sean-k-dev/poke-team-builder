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
    const star = addToFavourites
    fetch('/favourite', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'name': pName,
              'level': pLevel,
              'favourite': star
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

// function checkLength() {
//     document.querySelectorAll(".current_team li")
//     if (pokeList.length === 6) {
//         pokeList.parentNode.removeChild(li[7])
//     } else {
//         updateQuantity()
//     }
// }