function checkAnswer(img) {
    var correctImages = ["bolivar3.jpg", "bolivar10.jpg"]; // Imágenes correctas

    if (correctImages.includes(img.getAttribute("src"))) {
        document.getElementById("result").textContent = "¡Correcto! Esta es una imagen de Simón Bolívar.";
        document.getElementById("result").classList.remove("incorrect");
        document.getElementById("result").classList.add("correct");
    } else {
        document.getElementById("result").textContent = "Incorrecto. Intenta de nuevo.";
        document.getElementById("result").classList.remove("correct");
        document.getElementById("result").classList.add("incorrect");
    }
}
