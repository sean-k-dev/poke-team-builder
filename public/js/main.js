const levelDown = document.querySelector('#levelDown')
const levelUp = document.querySelector('#levelUp')
let levelVal = document.querySelector('#levelVal').innerText

levelDown.addEventListener('click', () => { levelVal == 0 ? levelVal == 0 : levelVal -= 1 })
levelUp.addEventListener('click', () => { levelVal == 100 ? levelVal == 100 : levelVal += 1 })
