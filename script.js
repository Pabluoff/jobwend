document.addEventListener('DOMContentLoaded', () => {
    const continueBtn = document.getElementById('continue-btn');
    const landingPage = document.getElementById('landing-page');
    const quizPage = document.getElementById('quiz-page');
    const footer = document.querySelector('footer');
    const progressFill = document.querySelector('.progress-fill');
    const quizQuestion = document.querySelector('.quiz-question');
    const quizOptionsContainer = document.querySelector('.quiz-options');
    const loading = document.querySelector('.loading');

    // Hide loading screen on page load and when navigating back
    loading.style.display = 'none';
    
    // Handle browser back button
    window.addEventListener('popstate', () => {
        loading.style.display = 'none';
        landingPage.style.display = 'block';
        quizPage.style.display = 'none';
        footer.style.display = 'block';
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
            question: "O que você faria com mais tempo livre, já que pode trabalhar de casa e organizar seu próprio horário",
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
        
        // Update progress bar
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        progressFill.style.width = `${progress}%`;

        // Update options
        quizOptionsContainer.innerHTML = question.options.map(option => `
            <button class="quiz-option" data-value="${option.text.toLowerCase()}">
                <span class="option-text">${option.text}</span>
                <span class="option-emoji">${option.emoji}</span>
            </button>
        `).join('');

        // Reattach event listeners to new options
        attachOptionListeners();
    }

    function attachOptionListeners() {
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                
                // Store the answer
                const answer = option.dataset.value;
                console.log('Selected answer:', answer);

                // Move to next question after a short delay
                setTimeout(() => {
                    if (currentQuestion < questions.length - 1) {
                        currentQuestion++;
                        updateQuestion();
                    } else {
                        // Handle quiz completion
                        handleQuizCompletion();
                    }
                }, 500);
            });
        });
    }

    function handleQuizCompletion() {
        // Show loading screen
        loading.style.display = 'flex';
        
        // Add a state to the browser history before redirecting
        history.pushState({ page: 'loading' }, '', window.location.href);
        
        // Simulate processing time (3 seconds)
        setTimeout(() => {
            // Redirect to the next page
            window.location.href = 'vsl.html';
        }, 3000);
    }

    // Show quiz when clicking continue button
    continueBtn.addEventListener('click', () => {
        landingPage.style.display = 'none';
        quizPage.style.display = 'block';
        footer.style.display = 'none';
        // Add a state to the browser history
        history.pushState({ page: 'quiz' }, '', window.location.href);
        updateQuestion();
    });
});