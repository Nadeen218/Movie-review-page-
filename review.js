// Search box toggle functionality
const btnSearch = document.querySelector('.btn-search');
const inputSearch = document.querySelector('.input-search');
const searchBox = document.querySelector('.search-box');

btnSearch.addEventListener('click', () => {
    searchBox.classList.toggle('active');
    if (searchBox.classList.contains('active')) {
        inputSearch.focus();
    }
});

// Mobile menu toggle functionality
const menuBtn = document.querySelector('.navbar-menu-btn');
const navbarNav = document.querySelector('.navbar-nav');

menuBtn.addEventListener('click', () => {
    navbarNav.classList.toggle('active');
    menuBtn.classList.toggle('active');
});

// Form validation and submission
document.getElementById('reviewForm')?.addEventListener('submit', function(event) {
    // Client-side validation
    const username = document.getElementById('username').value.trim();
    const movieTitle = document.getElementById('movieTitle').value.trim();
    const releaseYear = parseInt(document.getElementById('releaseYear').value);
    const rating = parseInt(document.getElementById('rating').value);
    const review = document.getElementById('review').value.trim();
    const currentYear = new Date().getFullYear();

    // Reset error messages
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
    
    try {
        if (!username) throw new Error('Please enter your name', 'usernameError');
        if (username.length < 2) throw new Error('Name must be at least 2 characters', 'usernameError');
        
        if (!movieTitle) throw new Error('Please enter a movie title', 'movieTitleError');
        
        if (isNaN(releaseYear)) throw new Error('Release year must be a number', 'releaseYearError');
        if (releaseYear < 1900) throw new Error('Release year must be 1900 or later', 'releaseYearError');
        if (releaseYear > currentYear) throw new Error(`Release year cannot be after ${currentYear}`, 'releaseYearError');
        
        if (isNaN(rating)) throw new Error('Rating must be a number', 'ratingError');
        if (rating < 1 || rating > 5) throw new Error('Rating must be between 1 and 5', 'ratingError');
        
        if (!review) throw new Error('Please write your review', 'reviewError');
        if (review.length < 5) throw new Error('Review must be at least 5 characters', 'reviewError');

        // Show success message
        document.getElementById('successMessage').style.display = 'block';
        setTimeout(() => {
            document.getElementById('successMessage').style.display = 'none';
        }, 3000);
    } catch (error) {
        event.preventDefault();
        const errorParts = error.message.split(', ');
        const errorMessage = errorParts[0];
        const errorField = errorParts[1] || 'usernameError';
        document.getElementById(errorField).textContent = errorMessage;
    }
});

// Search function
function myFunction() {
    const input = document.getElementById('myFilter');
    const filter = input.value.toUpperCase();
    const reviewBoxes = document.querySelectorAll('.review-box');
    
    reviewBoxes.forEach(box => {
        const title = box.querySelector('h3').textContent.toUpperCase();
        if (title.includes(filter)) {
            box.style.display = '';
        } else {
            box.style.display = 'none';
        }
    });
}

// Helper function for random avatars
function getRandomAvatar() {
    const avatars = ['🎥', '🎬', '🍿', '📽️', '🎞️', '👤'];
    return avatars[Math.floor(Math.random() * avatars.length)];
}