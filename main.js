let participantes = [
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 19, 23),
    dataCheckIn: new Date(2024, 2, 1, 20, 20),
  },
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 19, 23),
    dataCheckIn: new Date(2024, 2, 25, 20, 20),
  },
  {
    nome: "Ana Souza",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 0, 3, 19, 23),
    dataCheckIn: null,
  },
  {
    nome: "João Silva",
    email: "joao@gmail.com",
    dataInscricao: new Date(2023, 11, 4, 19, 23),
    dataCheckIn: null,
  },
  {
    nome: "Maria Oliveira",
    email: "maria@gmail.com",
    dataInscricao: new Date(2023, 10, 5, 19, 23),
    dataCheckIn: new Date(2023, 10, 6, 20, 20),
  },
  {
    nome: "Pedro Santos",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2023, 9, 6, 19, 23),
    dataCheckIn: new Date(2023, 9, 7, 20, 20),
  },
  {
    nome: "Carla Lima",
    email: "carla@gmail.com",
    dataInscricao: new Date(2023, 8, 7, 19, 23),
    dataCheckIn: new Date(2023, 8, 8, 20, 20),
  },
  {
    nome: "Lucas Sousa",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2023, 7, 8, 19, 23),
    dataCheckIn: null,
  },
  {
    nome: "Paula Costa",
    email: "paula@gmail.com",
    dataInscricao: new Date(2023, 6, 9, 19, 23),
    dataCheckIn: new Date(2023, 6, 10, 20, 20),
  },
  {
    nome: "Gabriel Almeida",
    email: "gabriel@gmail.com",
    dataInscricao: new Date(2023, 5, 10, 19, 23),
    dataCheckIn: null,
  },
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao);

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn);

  if (participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)"
      >
      Confirmar check-in
      </button> `;
  }

  return `
    <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
    `;
};

const atualizarLista = (participantes) => {
  let output = "";
  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante);
  }

  // substituir informação do HTML
  document.querySelector("tbody").innerHTML = output;
};

const adicionarParticipante = (event) => {
  event.preventDefault();

  const dadosDoFormulario = new FormData(event.target);

  const participante = {
    nome: dadosDoFormulario.get("nome"),
    email: dadosDoFormulario.get("email"),
    dataInscricao: new Date(),
    dataCheckIn: null,
  };

  //verificar se o participante ja existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  );

  if (participanteExiste) {
    alert("Email já cadastrado!");
    return;
  }

  // add paticipante no começo -> as duas maneiras funcionam
  // participantes = [participante, ...participantes]
  participantes.unshift(participante);
  atualizarLista(participantes);

  //limpar fomulario
  event.target.querySelector('[name="nome"]').value = "";
  event.target.querySelector('[name="email"]').value = "";
};

atualizarLista(participantes);

const fazerCheckIn = (event) => {
  //confirmar se realmente deseja fazer o checkin
  const mensagemConfirmacao = "Tem certeza que deseja fazer o check-in?";
  if (confirm(mensagemConfirmacao) == false) {
    return;
  }

  //encontrar o parcipante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  );

  //atualizar a data de checkin do participante
  participante.dataCheckIn = new Date();

  atualizarLista(participantes);
};
