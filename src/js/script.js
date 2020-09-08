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

document.querySelectorAll('#form-barang input, .btn-add-barang').forEach((node) => node.setAttribute('disabled', true))

// Kalkulasi
function kalkulasiTotal() {
  console.log(pembelian.items)
  if (pembelian.items.length !== 0) {
    let total = pembelian.items
      .map((item) => item.jmlBarang * item.hrgSatuan)
      .reduce((acc, cur) => acc + cur)
    let tax = total * (10 / 100)
    let tst = total + tax
    document.querySelector('.td-total').innerHTML = total
    document.querySelector('.td-tax').innerHTML = tax
    document.querySelector('.td-tst').innerHTML = tst

  } else {
    document.querySelector('.td-total').innerHTML = 0
    document.querySelector('.td-tax').innerHTML = 0
    document.querySelector('.td-tst').innerHTML = 0
  }
}

// SELL AS
function setTotalForm(sellAs) {
  if (sellAs === 'CV. BINA JAYA TEKNIKA') {
    document.querySelector('tfoot').innerHTML = `
    <tr>
      <td colspan="3" class="td-right">Total</td>
      <td class="td-right td-total">0</td>
      <td class="td-center">
        <button class="btn btn-submit" onclick="submitPembelian()">Cetak Faktur</button>
      </td>
    </tr>
    `
    pembelian.sellAs = sellAs
    kalkulasiTotal()
  }

  if (sellAs === 'CV. ADIMAS PUTRA') {
    document.querySelector('tfoot').innerHTML = `
    <tr>
      <td colspan="3" class="td-right">Total</td>
      <td class="td-right td-total">0</td>
      <td class="td-center" rowspan="3">
        <button class="btn btn-submit" onclick="submitPembelian()">Cetak Faktur</button>
      </td>
    </tr>
    <tr>
      <td colspan="3" class="td-right">PPN 10%</td>
      <td class="td-right td-tax">0</td>
    </tr>
    <tr>
      <td colspan="3" class="td-right">Total Seletah Pajak</td>
      <td class="td-right td-tst">0</td>
    </tr>
    `
    pembelian.sellAs = sellAs
    kalkulasiTotal()
  }
}

const bjt = document.querySelector('#bjt')
bjt.addEventListener('click', event => {
  event.target.checked = true
  setTotalForm(event.target.value)
  document.querySelectorAll('#form-barang input, .btn-add-barang').forEach((node) => node.removeAttribute('disabled'))
})

const adimas = document.querySelector('#adimas')
adimas.addEventListener('click', event => {
  event.target.checked = true
  setTotalForm(event.target.value)
  document.querySelectorAll('#form-barang input, .btn-add-barang').forEach((node) => node.removeAttribute('disabled'))
})

// Set Faktur By Date Input
const formDate = document.querySelector('#form-tanggal')
formDate.addEventListener('change', event => {
  const dateArr = formDate.value
  const [y, m, d] = dateArr.split('-')

  const faktur = `FKTR${y}${m}${d}`
  document.querySelector('#form-faktur').value = faktur
})

// SHOW TABLE BARANG
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

  kalkulasiTotal()
})

function hapusItem() {
  const parentTarget = document.querySelector('tbody')
  const targetTr = event.target.parentElement.parentElement
  const targetId = targetTr.getAttribute('data-key')
  parentTarget.removeChild(targetTr)

  // new items after remove
  pembelian.items = pembelian.items.filter((item) => item.idBarang !== targetId)
  kalkulasiTotal()
}


// Button Cetak Faktur
function submitPembelian() {
  pembelian.date = document.querySelector('#form-tanggal').value
  pembelian.faktur = document.querySelector('#form-faktur').value
  pembelian.nmClient = document.querySelector('#form-nm_client').value
  pembelian.alamat = document.querySelector('#form-alamat_client').value
  pembelian.kota = document.querySelector('#form-kota_client').value
  pembelian.telepon = document.querySelector('#form-phone_client').value

  console.log(pembelian)
}
