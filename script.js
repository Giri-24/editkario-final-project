// Function to open the lightbox
function openLightbox(videoSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxVideo = document.getElementById('lightbox-video');
    
    lightbox.style.display = 'flex'; 
    lightboxVideo.src = videoSrc; 
}
const scriptURL = "https://script.google.com/macros/s/AKfycbzwtsXecAI2epZs0Cegu-Ym3ydYsN34EufkNDJOmdFjFwppvnhh1ImYMCJgYBPf4svU/exec"
const form = document.forms['html data']


form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! your form is submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})

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
function showSignup() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("signup-form").style.display = "block";
}

function showLogin() {
  document.getElementById("signup-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

// SIGNUP
function signupUser() {
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  if (!username || !password) {
    alert("Please fill in all fields!");
    return;
  }

  if (localStorage.getItem(username)) {
    alert("Username already exists!");
    return;
  }

  localStorage.setItem(username, password);
  alert("Signup successful! Please login.");
  showLogin();
}

// LOGIN

