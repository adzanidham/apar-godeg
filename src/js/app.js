// import { v4 as uuidv4 } from 'uuid'
// console.log(uuidv4())

import pembelian from './pembelian.js'
import setTotalForm from './setTotalForm.js'


// SELL AS SECTION
// Sell As DOM Select
const bjtSelect = document.querySelector('#bjt')
const adimasSelect = document.querySelector('#adimas')

bjtSelect.addEventListener('click', event => {
  event.target.checked = true
  pembelian.sellAs = event.target.value
  setTotalForm()
})

adimasSelect.addEventListener('click', event => {
  event.target.checked = true
  pembelian.sellAs = event.target.value
  setTotalForm()
})
