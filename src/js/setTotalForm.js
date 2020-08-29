import pembelian from './pembelian.js'

export default function setTotalForm() {
  if (pembelian.sellAs === 'CV. BINA JAYA TEKNIKA') {
    document.querySelector('tfoot').innerHTML = `
      <tr>
        <td colspan="3" class="td-right">Total</td>
        <td class="td-right">XX</td>
        <td class="td-center">
          <button class="btn btn-submit">Cetak Faktur</button>
        </td>
      </tr>
    `
  }
  if (pembelian.sellAs === 'CV. ADIMAS PUTRA') {
    document.querySelector('tfoot').innerHTML = `
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
  }
}
