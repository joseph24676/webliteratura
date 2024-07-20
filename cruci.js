function checkAnswers() {
    const answers = document.querySelectorAll('.question');
    let correct = 0;

    answers.forEach(question => {
        const selectedAnswer = question.querySelector('input:checked');
        const correctAnswer = getCorrectAnswer(question);

        if (selectedAnswer && selectedAnswer.value === correctAnswer) {
            correct++;
            selectedAnswer.parentNode.style.backgroundColor = "#8bc34a"; // Cambia el color de fondo de la respuesta correcta
        } else if (selectedAnswer) {
            selectedAnswer.parentNode.style.backgroundColor = "#ff5722"; // Cambia el color de fondo de la respuesta incorrecta
        }
    });

    document.getElementById('result').innerHTML = `Respuestas correctas: ${correct} de ${answers.length}`;
}

function getCorrectAnswer(question) {
    // Obtiene el nombre del grupo de botones de radio asociado con la pregunta
    const groupName = question.querySelector('input[type="radio"]').name;
    // Obtiene la respuesta correcta correspondiente al grupo de botones de radio
    switch (groupName) {
        case "q1":
            return "Para celebrar la victoria del Libertador Simón Bolivar en la Batalla de Junín";
        case "q2":
            return "Triunfo, admiración y motivación";
        case "q3":
            return"José Joaquín de Olmedo";
        case "q4":
            return "Su visión de la unidad latinoamericana";
        case "q5":
            return "Como un héroe libertador";
        // Agrega más casos según sea necesario
        default:
            return "";
    }
}
