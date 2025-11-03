export default function cadastro() {
  return `
    <h2>Formulário de Cadastro</h2>
    <form id="formCadastro">
      <input type="text" id="nome" placeholder="Nome" required />
      <input type="email" id="email" placeholder="E-mail" required />
      <input type="number" id="idade" placeholder="Idade" min="0" max="120" required />
      <button type="submit">Enviar</button>
      <p class="error" id="erro"></p>
    </form>
    <div id="lista-usuarios">
      <h3>Usuários Cadastrados</h3>
      <ul id="lista"></ul>
    </div>
  `;
}