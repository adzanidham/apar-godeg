const items = []

function showListBarang(listBarang) {
  const newRow = document.createElement('tr')
  newRow.innerHTML = `
    <td class="td-center">${listBarang.nmBarang}</td>
    <td class="td-center">${listBarang.jmlBarang}</td>
    <td class="td-right">${listBarang.hrgSatuan}</td>
    <td class="td-right">${listBarang.jmlBarang * listBarang.hrgSatuan}</td>
    <td class="td-center">
      <button class="btn btn-action btn-del">hapus</button>
    </td>
  `
  document.querySelector('tBody').appendChild(newRow)

  const btnDelRow = document.querySelectorAll('.btn-del')
  // console.log(btnDelRow)
  // btnDelRow[0].addEventListener('click', event => { alert('tombol1') })
  btnDelRow.forEach((btn, i) => {
    btn.addEventListener('click', event => {
      // alert(`Btn ke-${i}`)
      // console.log(btn.parentElement.parentElement.children)
      const element = btn.parentElement.parentElement
      element.remove()
      items.splice(i, 1)
      // console.log(items)

      // console.log(element)
      // console.log(element.parentElement)
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
  // console.log(listBarang)
  // console.log(items)
  // console.log(listBarang.nmBarang)
  // console.log(listBarang.jmlBarang)
  // console.log(listBarang.hrgSatuan)
  // console.log(listBarang.jumlah)

  showListBarang(listBarang)
  console.log(items)
})

