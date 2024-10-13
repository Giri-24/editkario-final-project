// Function to open the lightbox
function openLightbox(videoSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxVideo = document.getElementById('lightbox-video');
    
    lightbox.style.display = 'flex'; 
    lightboxVideo.src = videoSrc; 
}

// Function to close the lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxVideo = document.getElementById('lightbox-video');
    
    lightbox.style.display = 'none'; 
    lightboxVideo.pause(); 
    lightboxVideo.src = ''; 
}

// Function to filter videos based on category
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.categories button');
    const videoCards = document.querySelectorAll('.video-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            videoCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block'; 
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});
