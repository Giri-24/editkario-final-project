/**
 * Editkaro.in — Premier Video Production Agency
 * Interactive Client-Side Engine
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Sticky Navigation & Mobile Toggle
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking any nav link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    /* ==========================================================================
       2. Category Filter for Video Gallery
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const videoCards = document.querySelectorAll('.video-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedCategory = button.getAttribute('data-category');

            videoCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* ==========================================================================
       3. Hover Video Preview
       ========================================================================== */
    videoCards.forEach(card => {
        const previewVideo = card.querySelector('.hover-video-preview');
        if (previewVideo) {
            card.addEventListener('mouseenter', () => {
                previewVideo.currentTime = 0;
                previewVideo.play().catch(() => {
                    // Autoplay with sound or unmuted might be restricted, but muted works
                });
            });

            card.addEventListener('mouseleave', () => {
                previewVideo.pause();
                previewVideo.currentTime = 0;
            });
        }
    });

    /* ==========================================================================
       4. Cinematic Video Lightbox Modal
       ========================================================================== */
    const lightbox = document.getElementById('lightbox');
    const lightboxBackdrop = document.getElementById('lightbox-backdrop');
    const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCategory = document.getElementById('lightbox-category');
    const lightboxDesc = document.getElementById('lightbox-description');

    function openLightbox(videoSrc, title, category, description) {
        if (!lightbox || !lightboxVideo) return;

        lightboxVideo.src = videoSrc;
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxCategory) lightboxCategory.textContent = category.toUpperCase();
        if (lightboxDesc) lightboxDesc.textContent = description;

        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        lightboxVideo.currentTime = 0;
        lightboxVideo.play().catch(e => console.log('Autoplay handled', e));
    }

    function closeLightbox() {
        if (!lightbox || !lightboxVideo) return;

        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        lightboxVideo.pause();
        lightboxVideo.src = '';
    }

    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoSrc = card.getAttribute('data-video');
            const title = card.getAttribute('data-title') || card.querySelector('h3').textContent;
            const category = card.getAttribute('data-category') || 'Portfolio';
            const desc = card.getAttribute('data-desc') || card.querySelector('p').textContent;

            openLightbox(videoSrc, title, category, desc);
        });
    });

    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

    // Keyboard shortcuts for Lightbox
    window.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === ' ' || e.code === 'Space') {
            // Prevent scrolling on spacebar when modal is open
            e.preventDefault();
            if (lightboxVideo.paused) {
                lightboxVideo.play();
            } else {
                lightboxVideo.pause();
            }
        }
    });

    /* ==========================================================================
       5. Interactive Scope & Pricing Calculator
       ========================================================================== */
    const formatButtons = document.querySelectorAll('.format-btn');
    const quantitySlider = document.getElementById('quantity-slider');
    const quantityDisplay = document.getElementById('quantity-display');
    const addonMotion = document.getElementById('addon-motion');
    const addonSound = document.getElementById('addon-sound');
    const addonRush = document.getElementById('addon-rush');

    const summaryFormatLabel = document.getElementById('summary-format-label');
    const summaryBasePrice = document.getElementById('summary-base-price');
    const summaryAddonsPrice = document.getElementById('summary-addons-price');
    const summaryRushPrice = document.getElementById('summary-rush-price');
    const totalPriceDisplay = document.getElementById('total-price-display');
    const depositDisplay = document.getElementById('deposit-display');

    let currentFormatRate = 120;
    let currentFormatName = 'Short-Form Reel';

    function recalculatePricing() {
        if (!quantitySlider) return;

        const qty = parseInt(quantitySlider.value, 10);
        if (quantityDisplay) quantityDisplay.textContent = `${qty} ${qty === 1 ? 'Video' : 'Videos'}`;

        const baseTotal = currentFormatRate * qty;

        let addonsTotal = 0;
        if (addonMotion && addonMotion.checked) {
            addonsTotal += (parseInt(addonMotion.getAttribute('data-price'), 10) || 75) * qty;
        }
        if (addonSound && addonSound.checked) {
            addonsTotal += (parseInt(addonSound.getAttribute('data-price'), 10) || 45) * qty;
        }

        const subtotal = baseTotal + addonsTotal;
        let rushTotal = 0;
        if (addonRush && addonRush.checked) {
            rushTotal = Math.round(subtotal * 0.25);
        }

        const finalTotal = subtotal + rushTotal;
        const deposit = Math.round(finalTotal * 0.5);

        if (summaryFormatLabel) summaryFormatLabel.textContent = `${currentFormatName} (${qty}x)`;
        if (summaryBasePrice) summaryBasePrice.textContent = `$${baseTotal}`;
        if (summaryAddonsPrice) summaryAddonsPrice.textContent = `$${addonsTotal}`;
        if (summaryRushPrice) summaryRushPrice.textContent = `$${rushTotal}`;
        if (totalPriceDisplay) totalPriceDisplay.textContent = `$${finalTotal}`;
        if (depositDisplay) depositDisplay.textContent = `$${deposit}`;
    }

    formatButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            formatButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentFormatRate = parseInt(btn.getAttribute('data-price'), 10) || 120;
            currentFormatName = btn.querySelector('.format-name').textContent;
            recalculatePricing();
        });
    });

    if (quantitySlider) quantitySlider.addEventListener('input', recalculatePricing);
    if (addonMotion) addonMotion.addEventListener('change', recalculatePricing);
    if (addonSound) addonSound.addEventListener('change', recalculatePricing);
    if (addonRush) addonRush.addEventListener('change', recalculatePricing);

    // Initial calculation run
    recalculatePricing();

    /* ==========================================================================
       6. Contact Form Submission
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const service = document.getElementById('contact-service').value;
            const message = document.getElementById('contact-message').value;

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting Brief...';
            }

            // Google Apps Script endpoint fallback or simulated async post
            const scriptURL = "https://script.google.com/macros/s/AKfycbzwtsXecAI2epZs0Cegu-Ym3ydYsN34EufkNDJOmdFjFwppvnhh1ImYMCJgYBPf4svU/exec";

            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('service', service);
            formData.append('message', message);

            fetch(scriptURL, { method: 'POST', body: formData, mode: 'no-cors' })
                .then(() => {
                    handleSuccess(name);
                })
                .catch(() => {
                    // Even if Google script fails or CORS warns, show friendly confirmation
                    handleSuccess(name);
                });
        });
    }

    function handleSuccess(clientName) {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Project Brief Received!';
        }

        if (formFeedback) {
            formFeedback.className = 'form-feedback success';
            formFeedback.innerHTML = `<strong>Thank you, ${clientName}!</strong> Your project brief has been received. Our lead editor will review your requirements and reach out within 2 hours.`;
        }

        if (contactForm) contactForm.reset();
    }

});
