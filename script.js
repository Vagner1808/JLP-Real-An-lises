const EXAMES = [
  { nome: 'Hemograma completo', categoria: 'Hematologia', descricao: 'Avaliação das células do sangue.' },
  { nome: 'Glicemia de jejum', categoria: 'Bioquímica', descricao: 'Análise da glicose no sangue.' },
  { nome: 'Perfil lipídico', categoria: 'Bioquímica', descricao: 'Avaliação de colesterol e triglicerídeos.' },
  { nome: 'Ureia', categoria: 'Bioquímica', descricao: 'Marcador utilizado na avaliação da função renal.' },
  { nome: 'Creatinina', categoria: 'Bioquímica', descricao: 'Exame associado à avaliação dos rins.' },
  { nome: 'TGO', categoria: 'Bioquímica', descricao: 'Enzima utilizada na avaliação laboratorial.' },
  { nome: 'TGP', categoria: 'Bioquímica', descricao: 'Enzima associada à avaliação do fígado.' },
  { nome: 'Gama-GT', categoria: 'Bioquímica', descricao: 'Análise enzimática do perfil hepático.' },
  { nome: 'Ferritina', categoria: 'Vitaminas e hormônios', descricao: 'Avaliação das reservas de ferro do organismo.' },
  { nome: 'Ferro sérico', categoria: 'Vitaminas e hormônios', descricao: 'Medição do ferro circulante.' },
  { nome: 'Vitamina B12', categoria: 'Vitaminas e hormônios', descricao: 'Dosagem laboratorial de vitamina B12.' },
  { nome: 'Vitamina D', categoria: 'Vitaminas e hormônios', descricao: 'Dosagem laboratorial de vitamina D.' },
  { nome: 'Ácido fólico', categoria: 'Vitaminas e hormônios', descricao: 'Dosagem de folato no organismo.' },
  { nome: 'TSH', categoria: 'Vitaminas e hormônios', descricao: 'Hormônio utilizado na avaliação da tireoide.' },
  { nome: 'PSA total', categoria: 'Saúde do homem', descricao: 'Marcador laboratorial da saúde da próstata.' },
  { nome: 'PSA livre', categoria: 'Saúde do homem', descricao: 'Dosagem complementar do PSA.' },
  { nome: 'Urina Tipo I', categoria: 'Urina', descricao: 'Análise física, química e microscópica da urina.' },
  { nome: 'Painel respiratório', categoria: 'Painéis', descricao: 'Investigação laboratorial de agentes respiratórios.' },
  { nome: 'Sexagem fetal', categoria: 'Gestação', descricao: 'Exame para identificação do sexo fetal.' },
  { nome: 'HIV', categoria: 'Sorologias', descricao: 'Teste laboratorial realizado com orientação adequada.' },
  { nome: 'Check-up masculino', categoria: 'Pacotes', descricao: 'Conjunto de exames para acompanhamento da saúde masculina.' },
  { nome: 'Check-up Lactante Saudável', categoria: 'Pacotes', descricao: 'Conjunto de exames para acompanhamento durante a amamentação.' }
];

const semAcento = texto => texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

document.querySelectorAll('.menu-botao').forEach(botao => {
  botao.addEventListener('click', () => {
    const menu = document.querySelector('.menu');
    const aberto = menu.classList.toggle('aberto');
    botao.setAttribute('aria-expanded', String(aberto));
  });
});

const lista = document.querySelector('#lista-exames');
if (lista) {
  const busca = document.querySelector('#busca');
  const categoriasBox = document.querySelector('#categorias');
  const quantidade = document.querySelector('#quantidade');
  const semResultado = document.querySelector('#sem-resultado');
  const categorias = ['Todos', ...new Set(EXAMES.map(exame => exame.categoria))];
  let categoriaAtual = 'Todos';

  function linkWhatsApp(nome) {
    const mensagem = `Olá, vim pelo site da JLP Real Análises Clínicas e gostaria de confirmar a disponibilidade, o preparo e o prazo para: ${nome}.`;
    return `https://wa.me/5546999178212?text=${encodeURIComponent(mensagem)}`;
  }

  function desenharCategorias() {
    categoriasBox.innerHTML = categorias.map(categoria => `<button type="button" class="${categoria === categoriaAtual ? 'ativo' : ''}" data-categoria="${categoria}">${categoria}</button>`).join('');
    categoriasBox.querySelectorAll('button').forEach(botao => botao.addEventListener('click', () => {
      categoriaAtual = botao.dataset.categoria;
      desenharCategorias();
      desenharExames();
    }));
  }

  function desenharExames() {
    const termo = semAcento(busca.value.trim());
    const filtrados = EXAMES.filter(exame => {
      const correspondeCategoria = categoriaAtual === 'Todos' || exame.categoria === categoriaAtual;
      const texto = semAcento(`${exame.nome} ${exame.categoria} ${exame.descricao}`);
      return correspondeCategoria && (!termo || texto.includes(termo));
    });

    quantidade.textContent = `${filtrados.length} ${filtrados.length === 1 ? 'resultado' : 'resultados'}`;
    lista.innerHTML = filtrados.map(exame => `
      <article class="exame">
        <span class="exame-categoria">${exame.categoria}</span>
        <h2>${exame.nome}</h2>
        <p>${exame.descricao}</p>
        <a href="${linkWhatsApp(exame.nome)}" target="_blank" rel="noopener">Falar com o JLP →</a>
      </article>`).join('');
    semResultado.hidden = filtrados.length !== 0;
  }

  busca.addEventListener('input', desenharExames);
  document.querySelector('#limpar').addEventListener('click', () => {
    busca.value = '';
    categoriaAtual = 'Todos';
    desenharCategorias();
    desenharExames();
  });

  desenharCategorias();
  desenharExames();
}
