const pembelian = {
  sellAs: '',
  date: '',
  faktur: '',
  nmClient: '',
  alamat: '',
  kota: '',
  telepon: '',
  items: []
}

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
        <button class="btn btn-submit">Cetak Faktur</button>
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
})

// set total table for binaJayaTeknika
bjt.addEventListener('click', event => {
  bjt.checked = true
  sellAs = bjt.value

  // set total table for adimas
  tfoot.innerHTML = `
    <tr>
      <td colspan="3" class="td-right">Total</td>
      <td class="td-right">XX</td>
      <td class="td-center">
        <button class="btn btn-submit">Cetak Faktur</button>
      </td>
    </tr>
  `
})

function showListBarang(listBarang) {
  const newRow = document.createElement('tr')
  newRow.setAttribute('data-key', listBarang.idBarang)
  newRow.innerHTML = `
    <td>${listBarang.nmBarang}</td>
    <td class="td-center">${listBarang.jmlBarang}</td>
    <td class="td-right">${listBarang.hrgSatuan}</td>
    <td class="td-right">${listBarang.jmlBarang * listBarang.hrgSatuan}</td>
    <td class="td-center">
      <button class="btn btn-action btn-del" onclick="hapusItem()">hapus</button>
    </td>
  `
  document.querySelector('tBody').appendChild(newRow)
}

const btnAddBarang = document.querySelector('.btn-add-barang')
btnAddBarang.addEventListener('click', event => {
  event.preventDefault()
  const listBarang = {}
  listBarang['idBarang'] = String(Date.now())
  listBarang['nmBarang'] = document.getElementById('form-nm_barang').value.trim()
  listBarang['jmlBarang'] = parseInt(document.getElementById('form-jml_barang').value.trim())
  listBarang['hrgSatuan'] = parseInt(document.getElementById('form-hrg_satuan').value.trim())

  pembelian.items.push(listBarang)

  document.querySelector('#form-barang').reset()

  showListBarang(listBarang)
})

function hapusItem() {
  const parentTarget = document.querySelector('tbody')
  const targetTr = event.target.parentElement.parentElement
  const targetId = targetTr.getAttribute('data-key')
  parentTarget.removeChild(targetTr)

  // new items after remove
  pembelian.items = pembelian.items.filter((item) => item.idBarang !== targetId)
}

