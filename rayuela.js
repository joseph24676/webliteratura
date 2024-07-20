document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.square');
    const piedra = document.querySelector('.piedra');
    const resetButton = document.querySelector('.reset-button');
    let dragging = false;

    piedra.addEventListener('mousedown', (e) => {
        dragging = true;
        piedra.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (dragging) {
            piedra.style.left = `${e.pageX - 15}px`;
            piedra.style.top = `${e.pageY - 15}px`;
        }
    });

    document.addEventListener('mouseup', (e) => {
        if (dragging) {
            dragging = false;
            piedra.style.cursor = 'pointer';

            squares.forEach(square => {
                const rect = square.getBoundingClientRect();
                const piedraRect = piedra.getBoundingClientRect();

                if (
                    piedraRect.left >= rect.left &&
                    piedraRect.right <= rect.right &&
                    piedraRect.top >= rect.top &&
                    piedraRect.bottom <= rect.bottom
                ) {
                    square.classList.add('selected');
                    square.innerHTML = `<span>${square.getAttribute('data-name')}</span>`;
                }
            });
        }
    });

    resetButton.addEventListener('click', () => {
        squares.forEach(square => {
            square.classList.remove('selected');
            square.innerHTML = '';
        });
        piedra.style.left = '50px';
        piedra.style.top = '50px';
    });
});
