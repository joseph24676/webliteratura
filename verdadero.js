const questions = [
    {
        text: '¿La obra "La casa del que dirán" fue escrita por Rubén Darío?',
        answer: true
    },
    {
        text: '¿La casa del que dirán es una novela de estilo realista?',
        answer: false
    },
    {
        text: '¿En el año 2020 fue publicada por primera vez la obra "La casa del que dirán"?',
        answer: false
    },
    {
        text: '¿"La casa del que dirán" explora temas como la hipocresía, el honor y las críticas sociales."?',
        answer: true
    },
    {
        text: '¿Rubén Darío es conocido principalmente por su poesía modernista?',
        answer: true
    }
    // Puedes agregar más preguntas según necesites
];




let currentQuestionIndex = 0;

function displayQuestion() {
    const questionText = document.getElementById('question-text');
    questionText.textContent = questions[currentQuestionIndex].text;
}

function checkAnswer(userAnswer) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const resultContainer = document.getElementById('result');
    
    if (userAnswer === correctAnswer) {
        resultContainer.textContent = '¡Correcto!';
    } else {
        resultContainer.textContent = 'Incorrecto. La respuesta correcta es ' + (correctAnswer ? 'Verdadero' : 'Falso');
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        document.getElementById('result').textContent = '';
    } else {
        alert('¡Has completado todas las preguntas Felicidades!');
        currentQuestionIndex = 0;
        displayQuestion();
        document.getElementById('result').textContent = '';
    }
}

// Mostrar la primera pregunta al cargar la página
displayQuestion();
