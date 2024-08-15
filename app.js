const slides = document.querySelectorAll('.slides');
const mainImage = document.getElementById('main-image');
const mainContent = document.querySelector('.main-slide .content');
let currentIndex = 0;

function updateMainSlide(index) {
    const slide = slides[index];
    const imgSrc = slide.getAttribute('data-img');
    const text = slide.getAttribute('data-text');
    const style = slide.getAttribute('data-style');

    if (style === 'happy-birthday') {
        // Special case for the final slide
        mainImage.src = ''; // No image needed for the final slide
        mainContent.innerHTML = `<p>${text}</p>`;
        mainContent.className = `happy-birthday show`;
    } else {
        mainImage.src = imgSrc;
        mainContent.innerHTML = `<p class="${style === 'surprise' ? 'destroy-create' : ''}">${text}</p>`;
        mainContent.className = `content ${style} show`;
    }

    setTimeout(() => {
        mainContent.classList.remove('show'); // Hide text after a few seconds
    }, 3000); // Change this time to control how long the text is shown
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateMainSlide(currentIndex);
}

let slideInterval = setInterval(nextSlide, 5000); // Increased slide changing time

slides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
        clearInterval(slideInterval); // Stop automatic slide change on click
        currentIndex = index;
        updateMainSlide(currentIndex);
        slideInterval = setInterval(nextSlide, 5000); // Restart automatic slide change
    });
});

// Initialize the main slide with the first slide
updateMainSlide(currentIndex);

// Ensure final slide shows properly
function showFinalSurprise() {
    currentIndex = slides.length - 1;
    updateMainSlide(currentIndex);
    setTimeout(() => {
        // Optional: loop through or fade out final slide if desired
    }, 5000); // Duration of the final surprise
}

setTimeout(showFinalSurprise, 5000 * (slides.length - 1)); // Show final surprise after all slides
