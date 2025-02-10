document.addEventListener('DOMContentLoaded', () => {
    const continueBtn = document.getElementById('continue-btn');
    const landingPage = document.getElementById('landing-page');
    const quizPage = document.getElementById('quiz-page');
    const footer = document.querySelector('footer');
    const progressFill = document.querySelector('.progress-fill');
    const quizQuestion = document.querySelector('.quiz-question');
    const quizOptionsContainer = document.querySelector('.quiz-options');
    const loading = document.querySelector('.loading');

    // Oculta a tela de carregamento inicialmente
    loading.style.display = 'none';

    // Garante que o quiz reinicia ao carregar a página
    window.addEventListener('popstate', () => {
        loading.style.display = 'none';
        landingPage.style.display = 'block';
        quizPage.style.display = 'none';
        footer.style.display = 'block';
        resetQuiz();
    });

    const questions = [
        {
            question: "Você tem acesso a internet?",
            options: [
                { text: "SIM", emoji: "👍" },
                { text: "NÃO", emoji: "😢" }
            ]
        },
        {
            question: "Imagine ganhando R$4.000,00 extras por mês trabalhando de casa. O que você faria com esse dinheiro?",
            options: [
                { text: "Pagaria minhas contas", emoji: "💳" },
                { text: "Ajudar minha família", emoji: "👨‍👩‍👧‍👦" },
                { text: "Comprar um carro novo", emoji: "🚗" },
                { text: "Outras coisas...", emoji: "😃" }
            ]
        },
        {
            question: "O que você faria com mais tempo livre, já que pode trabalhar de casa e organizar seu próprio horário?",
            options: [
                { text: "Ficar mais com a família", emoji: "👨‍👩‍👧‍👦" },
                { text: "Descansaria mais", emoji: "😃" },
                { text: "Economizar dinheiro", emoji: "🤑" }
            ]
        },
        {
            question: "Ótimo! Este é o momento de mostrar seu comprometimento. Assista ao vídeo de 2 minutos para liberar sua vaga. Pronto?",
            options: [
                { text: "SIM, eu vou assistir todo o vídeo!", emoji: "😃" },
                { text: "NÃO", emoji: "😥" }
            ]
        }
    ];

    let currentQuestion = 0;

    function updateQuestion() {
        const question = questions[currentQuestion];
        quizQuestion.textContent = question.question;

        // Atualiza a barra de progresso
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        progressFill.style.width = `${progress}%`;

        // Renderiza as opções de resposta
        quizOptionsContainer.innerHTML = question.options.map(option => `
            <button class="quiz-option" data-value="${option.text.toLowerCase()}">
                <span class="option-text">${option.text}</span>
                <span class="option-emoji">${option.emoji}</span>
            </button>
        `).join('');

        attachOptionListeners();
    }

    function attachOptionListeners() {
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');

                const answer = option.dataset.value;
                console.log('Selected answer:', answer);

                setTimeout(() => {
                    if (currentQuestion < questions.length - 1) {
                        currentQuestion++;
                        updateQuestion();
                    } else {
                        handleQuizCompletion();
                    }
                }, 500);
            });
        });
    }

    function handleQuizCompletion() {
        loading.style.display = 'flex';
        quizPage.style.display = 'none';

        // Reinicia o quiz no momento do loading
        resetQuiz();

        history.pushState({ page: 'loading' }, '', window.location.href);

        setTimeout(() => {
            loading.style.display = 'none';
            landingPage.style.display = 'block';
            footer.style.display = 'block';

            setTimeout(() => {
                window.location.href = 'vsl.html';
            }, 200);
        }, 3000);
    }

    function resetQuiz() {
        currentQuestion = 0;
        updateQuestion();
    }

    continueBtn.addEventListener('click', () => {
        landingPage.style.display = 'none';
        quizPage.style.display = 'block';
        footer.style.display = 'none';

        history.pushState({ page: 'quiz' }, '', window.location.href);
        resetQuiz();
    });

    // Reinicia o quiz ao carregar a página
    resetQuiz();
});
