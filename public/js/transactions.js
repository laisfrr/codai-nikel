const myModal = new bootstrap.Modal('#transaction-modal')
let logged = sessionStorage.getItem('logged')
const session = localStorage.getItem('session')

let data = {
  transactions: []
}

document.getElementById('button-logout').addEventListener('click', logout)
//adicionar Lançamento//

document
  .getElementById('transaction-form')
  .addEventListener('submit', function (e) {
    e.preventDefault()

    const value = parseFloat(document.getElementById('value-input').value)
    const description = document.getElementById('description-input').value
    const date = document.getElementById('date-input').value
    const type = document.querySelector('input[name=type-input]:checked').value

    data.transactions.unshift({
      value: value,
      type: type,
      description: description,
      date: date
    })
    saveData(data)
    e.target.reset() //reseta o formulário
    myModal.hide() //fecha o modal
    getTransactions()
    if (type === '2' && getTotalValue(data.transactions) < 0) {
      alert(
        'Atenção! Seu saldo após cadastrar essa despesa será negativo, deseja continuar?'
      )
    } else {
      alert('Lançamento adicionado com sucesso!')
    }
  })

checkLogged()

function checkLogged() {
  if (session) {
    sessionStorage.setItem('logged', session) //se tiver uma sessão salva no localstorage, salva no sessionStorage
    logged = session
  }

  if (!logged) {
    window.location.href = 'index.html'
  }

  const dataUser = localStorage.getItem(logged)
  if (dataUser) {
    data = JSON.parse(dataUser)
  }

  getTransactions()
}

function logout() {
  sessionStorage.removeItem('logged')
  localStorage.removeItem('session')
  window.location.href = 'index.html'
}

function getTransactions() {
  const transactions = data.transactions

  let transactionsHtml = ``

  if (transactions.length) {
    transactions.forEach(item => {
      let type = 'Entrada'
      if (item.type === '2') {
        type = 'Saída'
      }

      transactionsHtml += ` 
      <tr>
        <th scope="row">${item.date}</th>
        <td>${item.value.toFixed(2)}</td>
        <td>${type}</td>
        <td>${item.description}</td>
      </tr>
      `
    })
  }

  document.getElementById('transactions-list').innerHTML = transactionsHtml
}

function saveData(data) {
  localStorage.setItem(data.login, JSON.stringify(data))
}

function getTotalValue(transactions) {
  let total = 0
  transactions.forEach(item => {
    if (item.type === '1') {
      total += item.value
    } else {
      total -= item.value
    }
  })
  return total
}
