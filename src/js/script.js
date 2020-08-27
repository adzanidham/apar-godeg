const pembelian = {
  date: '',
  faktur: '',

}

const items = []

// Set Faktur By Date Input
const formDate = document.querySelector('#form-tanggal')
formDate.addEventListener('change', event => {
  const dateArr = formDate.value
  const [y, m, d] = dateArr.split('-')

  const faktur = `FKTR${y}${m}${d}`
  document.querySelector('#form-faktur').value = faktur
})


// SELL AS
let sellAs = ''
const bjt = document.querySelector('#bjt')
const adimas = document.querySelector('#adimas')
const tfoot = document.querySelector('tfoot')
adimas.addEventListener('click', event => {
  adimas.checked = true
  sellAs = adimas.value

  // set total table for adimas
  tfoot.innerHTML = `
    <tr>
      <td colspan="3" class="td-right">Total</td>
      <td class="td-right">XX</td>
      <td class="td-center" rowspan="3">
        <button class="btn btn-submit">Submit</button>
      </td>
    </tr>
    <tr>
      <td colspan="3" class="td-right">PPN 10%</td>
      <td class="td-right">XX</td>
    </tr>
    <tr>
      <td colspan="3" class="td-right">Total Seletah Pajak</td>
      <td class="td-right">XX</td>
    </tr>
  `
  console.log(sellAs)
})

bjt.addEventListener('click', event => {
  bjt.checked = true
  sellAs = bjt.value

  // set total table for adimas
  tfoot.innerHTML = `
    <tr>
      <td colspan="3" class="td-right">Total</td>
      <td class="td-right">XX</td>
      <td class="td-center">
        <button class="btn btn-submit">Submit</button>
      </td>
    </tr>
  `
  console.log(sellAs)
})

// if (bjt.checked) {
//   sellAs = bjt.value
//   console.log(sellAs)
// }
// if (adimas.checked) {
//   sellAs = adimas.value
//   console.log(sellAs)
// }
// const seller = document.querySelectorAll('[name=seller]')


function showListBarang(listBarang) {
  const newRow = document.createElement('tr')
  newRow.innerHTML = `
    <td>${listBarang.nmBarang}</td>
    <td class="td-center">${listBarang.jmlBarang}</td>
    <td class="td-right">${listBarang.hrgSatuan}</td>
    <td class="td-right">${listBarang.jmlBarang * listBarang.hrgSatuan}</td>
    <td class="td-center">
      <button class="btn btn-action btn-del">hapus</button>
    </td>
  `
  document.querySelector('tBody').appendChild(newRow)

  const btnDelRow = document.querySelectorAll('.btn-del')
  btnDelRow.forEach((btn, i) => {
    btn.addEventListener('click', event => {
      const element = btn.parentElement.parentElement
      element.remove()
      items.splice(i, 1)
    })
  })

}

const btnAddBarang = document.querySelector('.btn-add-barang')
btnAddBarang.addEventListener('click', event => {
  event.preventDefault()
  const listBarang = {}
  listBarang['idBarang'] = Date.now()
  listBarang['nmBarang'] = document.getElementById('form-nm_barang').value.trim()
  listBarang['jmlBarang'] = parseInt(document.getElementById('form-jml_barang').value.trim())
  listBarang['hrgSatuan'] = parseInt(document.getElementById('form-hrg_satuan').value.trim())
  listBarang['jumlah'] = listBarang.jmlBarang * listBarang.hrgSatuan

  items.push(listBarang)

  document.querySelector('#form-barang').reset()

  showListBarang(listBarang)
})

