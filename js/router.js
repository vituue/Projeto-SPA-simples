const routes = {
  '/': 'home',
  '/cadastro': 'cadastro'
};

async function loadPage(page) {
  try {
    const module = await import(`./pages/${page}.js`);
    document.getElementById('app').innerHTML = module.default();
    
    if (page === 'cadastro') {
      setTimeout(() => initCadastro(), 0);
    }
  } catch (error) {
    console.error('Erro ao carregar página:', error);
    document.getElementById('app').innerHTML = '<h2>Página não encontrada</h2>';
  }
}

function navigate() {
  const path = window.location.hash.replace('#', '') || '/';
  const page = routes[path] || 'home';
  loadPage(page);
}

// CORREÇÃO: Receber form como parâmetro
function initCadastro() {
  const form = document.getElementById('formCadastro');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      validarFormulario(this); // CORREÇÃO: Passar o form como argumento
    });
  }
}

// CORREÇÃO: Receber form como parâmetro
function validarFormulario(form) {
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const idade = document.getElementById('idade').value.trim();
  const erro = document.getElementById('erro');

  // Limpar mensagem anterior
  erro.textContent = '';

  // Validações
  if (!nome || !email || !idade) {
    erro.textContent = 'Por favor, preencha todos os campos.';
    return false;
  }
  
  if (!email.includes('@')) {
    erro.textContent = 'E-mail inválido.';
    return false;
  }
  
  if (idade < 0 || idade > 120) {
    erro.textContent = 'Idade deve ser entre 0 e 120 anos.';
    return false;
  }

  // Sucesso
  erro.style.color = 'green';
  erro.textContent = 'Cadastro enviado com sucesso!';
  
  // Salvar no localStorage
  const usuario = { nome, email, idade };
  salvarUsuario(usuario);
  
  form.reset(); // AGORA funciona!
  return true;
}

function salvarUsuario(usuario) {
  let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  usuarios.push(usuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

window.addEventListener('hashchange', navigate);
window.addEventListener('load', navigate);