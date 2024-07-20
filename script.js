// script.js

// Referencias a los elementos
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('close-btn');

// Función para abrir el menú
function openMenu() {
    sidebar.style.width = '250px';
}

// Función para cerrar el menú
function closeMenu() {
    sidebar.style.width = '0';
}

// Asignar eventos para abrir y cerrar el menú
menuToggle.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
