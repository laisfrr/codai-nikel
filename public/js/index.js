const myModal = new bootstrap.Modal('#register-modal')
let logged = sessionStorage.getItem('logged')
const session = localStorage.getItem('session')

checkLogged()
//LOGAR NO SISTEMA//
document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault() // Evita que o formulário seja enviado

  const email = document.getElementById('email-input').value
  const password = document.getElementById('password-input').value
  const checkSession = document.getElementById('session-check').checked

  const account = getAccount(email) //busca o usuario no localstorage pelo email

  if (!account) {
    return alert('Ops! Verifique o usuário e senha.')
  }

  if (account) {
    if (account.password !== password) {
      return alert('Ops! Verifique o usuário e senha.')
    }
    saveSession(email, checkSession)
    window.location.href = 'home.html' //redireciona para a pagina home se o login for feito com sucesso
  }
})

// Criar Conta //
document.getElementById('create-form').addEventListener('submit', function (e) {
  e.preventDefault() // Evita que o formulário seja enviado
  const email = document.getElementById('email-create-input').value
  const password = document.getElementById('password-create-input').value

  if (email.length < 5) {
    return alert('Preencha o campo com um e-mail válido')
  }

  if (password.length < 4) {
    return alert('A senha deve conter no mínimo 4 caracteres')
  }
  saveAccount({ login: email, password: password, transactions: [] })
  myModal.hide()
  return alert('Conta criada com sucesso!')
})

function checkLogged() {
  if (session) {
    sessionStorage.setItem('logged', session) //se tiver uma sessão salva no localstorage, salva no sessionStorage
    logged = session
  }

  if (logged) {
    saveSession(logged, session)
    window.location.href = 'home.html'
  }
}

function saveAccount(data) {
  localStorage.setItem(data.login, JSON.stringify(data)) //salvar o usuario no localstorage
}

function saveSession(data, saveSession) {
  if (saveSession) {
    localStorage.setItem('session', data)
  }

  sessionStorage.setItem('logged', data) // sessionStorage apaga os dados quando o navegador é fechado
}

function getAccount(key) {
  const account = localStorage.getItem(key)

  if (account) {
    return JSON.parse(account) //transforma novamente em objeto
  }
  return ''
}
