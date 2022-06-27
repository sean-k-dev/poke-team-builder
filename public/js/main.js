const quantityColour = () => li_length < 6 ? teamQuantity.style.color = 'green' : teamQuantity.style.color = 'red'

window.onload = function() {
    updateQuantity();
    quantityColour()
}

const li_length = document.querySelectorAll(".current_team li").length
const updateQuantity = () => teamQuantity.innerText = `(${li_length} of 6)`
const teamQuantity = document.querySelector('#teamQuantity')
const deletePokemon = document.querySelector('#deletePokemon')
const submitForm = document.querySelector('#submit').addEventListener('click', updateQuantity, quantityColour)


deletePokemon.addEventListener('click', () => {
    const pName = this.parentNode.childNodes[3].innerText
    fetch('/poke', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'name': pName
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(data => {
        window.location.reload()
    })
})

