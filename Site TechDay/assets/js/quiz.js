const quizForm = document.querySelector("#self-check-quiz");
const quizProgress = document.querySelector("#quiz-progress");
const quizResult = document.querySelector("#quiz-result");
const quizResultScore = document.querySelector("#quiz-result-score");
const quizResultTitle = document.querySelector("#quiz-result-title");
const quizResultDescription = document.querySelector("#quiz-result-description");
const quizResultTips = document.querySelector("#quiz-result-tips");
const quizResetButton = document.querySelector("#quiz-reset");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const quizOutcomes = [
  {
    maximum: 15,
    title: "Seu uso parece estar relativamente sob controle",
    description: "Suas respostas indicam poucos momentos de uso automático ou de impacto na rotina durante as últimas duas semanas. Continue percebendo como o celular se encaixa no seu dia.",
    tips: [
      "Mantenha ativas apenas as notificações que realmente ajudam você.",
      "Preserve momentos de descanso, conversa ou refeição sem tela.",
      "Reavalie seus hábitos quando sua rotina ou suas necessidades mudarem.",
    ],
  },
  {
    maximum: 30,
    title: "Alguns automatismos podem estar aparecendo",
    description: "Você relatou alguns momentos em que o celular chama sua atenção sem uma decisão consciente. Pequenas mudanças podem ajudar a retomar a escolha.",
    tips: [
      "Observe qual situação costuma levar você a abrir um aplicativo.",
      "Desative alertas não essenciais e tire os aplicativos mais tentadores da tela inicial.",
      "Escolha uma atividade curta para fazer quando surgir a vontade de rolar a tela.",
    ],
  },
  {
    maximum: 45,
    title: "O celular pode estar ocupando mais espaço do que você gostaria",
    description: "Suas respostas indicam que a checagem ou o tempo on-line aparecem com frequência. Isso não define quem você é; pode ser um convite para experimentar limites que façam sentido para sua rotina.",
    tips: [
      "Escolha uma mudança para esta semana, como deixar o celular longe durante uma tarefa.",
      "Defina um horário para encerrar o uso antes de dormir e observe se isso ajuda seu descanso.",
      "Conte a alguém de confiança qual hábito você quer mudar e peça apoio, se desejar.",
    ],
  },
  {
    maximum: 60,
    title: "Suas respostas apontam um impacto frequente",
    description: "Você relatou dificuldade recorrente para controlar o uso ou efeitos na rotina. Este resultado não diagnostica dependência, mas sugere que vale cuidar disso com atenção e sem culpa.",
    tips: [
      "Comece por um limite pequeno e específico, em vez de tentar mudar tudo de uma vez.",
      "Converse com alguém de confiança sobre como o uso tem afetado seu dia a dia.",
      "Se isso estiver causando sofrimento ou prejuízo persistente, considere procurar um profissional de saúde.",
    ],
  },
];

quizForm?.addEventListener("change", () => {
  const answeredCount = quizForm.querySelectorAll('input[type="radio"]:checked').length;
  if (quizProgress) quizProgress.textContent = `${answeredCount} de 15 perguntas respondidas`;
});

quizForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!quizForm.reportValidity() || !quizResult || !quizResultScore || !quizResultTitle || !quizResultDescription || !quizResultTips) return;

  const score = [...quizForm.querySelectorAll('input[type="radio"]:checked')]
    .reduce((total, answer) => total + Number(answer.value), 0);
  const outcome = quizOutcomes.find(({ maximum }) => score <= maximum);
  if (!outcome) return;

  quizResultScore.textContent = `Seu resultado: ${score} de 60 pontos`;
  quizResultTitle.textContent = outcome.title;
  quizResultDescription.textContent = outcome.description;
  quizResultTips.replaceChildren(...outcome.tips.map((tip) => {
    const item = document.createElement("li");
    item.textContent = tip;
    return item;
  }));
  quizResult.hidden = false;
  quizResult.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  window.setTimeout(() => quizResultTitle.focus({ preventScroll: true }), prefersReducedMotion ? 0 : 350);
});

quizResetButton?.addEventListener("click", () => {
  quizForm?.reset();
  if (quizProgress) quizProgress.textContent = "0 de 15 perguntas respondidas";
  if (quizResult) quizResult.hidden = true;
  quizForm?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  quizForm?.querySelector('input[type="radio"]')?.focus({ preventScroll: true });
});

document.querySelector("#current-year")?.replaceChildren(String(new Date().getFullYear()));
