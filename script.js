/**
 * Editkaro.in — Production-Ready Agency Operating Platform
 * Full-featured interactive engine: Real-time search, category filtering,
 * frame-accurate video review studio, admin operations dashboard, and auth simulation.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Persistent State (localStorage)
       ========================================================================== */
    const DEFAULT_INQUIRIES = [
        {
            id: 'inq-101',
            client: 'David Miller',
            service: 'YouTube Long-Form Video Essay',
            budget: '$1,520',
            status: 'In Progress',
            date: 'Today, 2:15 PM'
        },
        {
            id: 'inq-102',
            client: 'Zack Taylor (Glow Brand)',
            service: 'Short-Form Reels (TikTok / Instagram)',
            budget: '$960',
            status: 'New',
            date: 'Today, 11:30 AM'
        },
        {
            id: 'inq-103',
            client: 'Elena Rostova',
            service: 'eCommerce & Brand Commercials',
            budget: '$2,400',
            status: 'Completed',
            date: 'Yesterday'
        }
    ];

    const DEFAULT_COMMENTS = {
        'short-video.mp4': [
            { author: 'Sarah Chen (Client)', time: '00:03', seconds: 3, text: 'Love the zoom cut here! Keep this transition fast.' },
            { author: 'Marcus (Lead Editor)', time: '00:08', seconds: 8, text: 'Sound impact foley added on the beat drop.' }
        ],
        'long-vedio.mp4': [
            { author: 'Alex Vance', time: '00:12', seconds: 12, text: 'Can we enhance the audio ducking under the narrator here?' }
        ],
        'football-video.mp4': [
            { author: 'Ryan Jackson', time: '00:06', seconds: 6, text: 'Slow-motion speed ramp here looks incredible.' }
        ]
    };

    let inquiries = JSON.parse(localStorage.getItem('editkaro_inquiries')) || DEFAULT_INQUIRIES;
    let videoComments = JSON.parse(localStorage.getItem('editkaro_comments')) || DEFAULT_COMMENTS;
    let currentUser = JSON.parse(localStorage.getItem('editkaro_user')) || { name: 'Guest', role: 'guest' };

    function saveInquiries() {
        localStorage.setItem('editkaro_inquiries', JSON.stringify(inquiries));
        updateDashboardUI();
    }

    function saveComments() {
        localStorage.setItem('editkaro_comments', JSON.stringify(videoComments));
    }

    /* ==========================================================================
       2. Sticky Navigation & Mobile Toggle
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
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
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            });
        });
    }

    /* ==========================================================================
       3. Real-time Video Search & Category Filtering
       ========================================================================== */
    const searchInput = document.getElementById('video-search-input');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const videoCards = document.querySelectorAll('.video-card');
    const noResultsMsg = document.getElementById('no-results-message');
    const resetFilterBtn = document.getElementById('reset-filter-btn');

    let currentCategory = 'all';
    let searchQuery = '';

    function applyFilterAndSearch() {
        let visibleCount = 0;

        videoCards.forEach(card => {
            const cardCat = card.getAttribute('data-category');
            const cardTitle = (card.getAttribute('data-title') || '').toLowerCase();
            const cardDesc = (card.getAttribute('data-desc') || '').toLowerCase();
            const cardTags = (card.getAttribute('data-tags') || '').toLowerCase();

            const matchesCategory = (currentCategory === 'all' || cardCat === currentCategory);
            const matchesSearch = !searchQuery || 
                cardTitle.includes(searchQuery) || 
                cardDesc.includes(searchQuery) || 
                cardTags.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (noResultsMsg) {
            noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.getAttribute('data-category');
            applyFilterAndSearch();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim().toLowerCase();
            if (clearSearchBtn) {
                clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
            }
            applyFilterAndSearch();
        });
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            searchQuery = '';
            clearSearchBtn.style.display = 'none';
            applyFilterAndSearch();
        });
    }

    if (resetFilterBtn) {
        resetFilterBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            searchQuery = '';
            if (clearSearchBtn) clearSearchBtn.style.display = 'none';
            currentCategory = 'all';
            filterButtons.forEach(btn => {
                btn.classList.toggle('active', btn.getAttribute('data-category') === 'all');
            });
            applyFilterAndSearch();
        });
    }

    /* ==========================================================================
       4. Hover Video Mini-Preview
       ========================================================================== */
    videoCards.forEach(card => {
        const previewVideo = card.querySelector('.hover-video-preview');
        if (previewVideo) {
            card.addEventListener('mouseenter', () => {
                previewVideo.currentTime = 0;
                previewVideo.play().catch(() => {});
            });

            card.addEventListener('mouseleave', () => {
                previewVideo.pause();
                previewVideo.currentTime = 0;
            });
        }
    });

    /* ==========================================================================
       5. Cinematic Video Lightbox & Review Studio
       ========================================================================== */
    const lightbox = document.getElementById('lightbox');
    const lightboxBackdrop = document.getElementById('lightbox-backdrop');
    const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCategory = document.getElementById('lightbox-category');
    const lightboxDesc = document.getElementById('lightbox-description');
    const lightboxTimecode = document.getElementById('lightbox-timecode');
    const reviewCommentsList = document.getElementById('review-comments-list');
    const addCommentForm = document.getElementById('add-comment-form');
    const newCommentInput = document.getElementById('new-comment-input');

    let activeVideoFile = '';

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function renderReviewComments(videoFile) {
        if (!reviewCommentsList) return;
        reviewCommentsList.innerHTML = '';

        const comments = videoComments[videoFile] || [];
        if (comments.length === 0) {
            reviewCommentsList.innerHTML = '<div style="color:#6b7280; font-size:0.75rem; text-align:center; padding:20px 0;">No comments yet. Pause video & add notes below.</div>';
            return;
        }

        comments.forEach(c => {
            const item = document.createElement('div');
            item.className = 'review-comment-item';
            item.innerHTML = `
                <div class="comment-meta">
                    <span class="comment-author">${c.author}</span>
                    <span class="comment-time"><i class="fa-regular fa-clock"></i> ${c.time}</span>
                </div>
                <div class="comment-text">${c.text}</div>
            `;
            item.addEventListener('click', () => {
                if (lightboxVideo) {
                    lightboxVideo.currentTime = c.seconds;
                }
            });
            reviewCommentsList.appendChild(item);
        });
    }

    function openLightbox(videoSrc, title, category, description) {
        if (!lightbox || !lightboxVideo) return;

        activeVideoFile = videoSrc;
        lightboxVideo.src = videoSrc;
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxCategory) lightboxCategory.textContent = category.toUpperCase();
        if (lightboxDesc) lightboxDesc.textContent = description;

        renderReviewComments(videoSrc);

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

    if (lightboxVideo && lightboxTimecode) {
        lightboxVideo.addEventListener('timeupdate', () => {
            lightboxTimecode.textContent = formatTime(lightboxVideo.currentTime);
        });
    }

    // Add Comment in Review Studio
    if (addCommentForm && newCommentInput) {
        addCommentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = newCommentInput.value.trim();
            if (!text || !activeVideoFile) return;

            const timeSeconds = Math.floor(lightboxVideo ? lightboxVideo.currentTime : 0);
            const timeStr = formatTime(timeSeconds);

            if (!videoComments[activeVideoFile]) {
                videoComments[activeVideoFile] = [];
            }

            videoComments[activeVideoFile].push({
                author: currentUser.name !== 'Guest' ? currentUser.name : 'Client Reviewer',
                time: timeStr,
                seconds: timeSeconds,
                text: text
            });

            saveComments();
            renderReviewComments(activeVideoFile);
            newCommentInput.value = '';
        });
    }

    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

    window.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === ' ' && document.activeElement !== newCommentInput) {
            e.preventDefault();
            if (lightboxVideo.paused) lightboxVideo.play();
            else lightboxVideo.pause();
        }
    });

    /* ==========================================================================
       6. Interactive Scope & Pricing Calculator
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
    const bookWithScopeBtn = document.getElementById('book-with-scope-btn');
    const contactBudgetInput = document.getElementById('contact-budget');
    const contactServiceSelect = document.getElementById('contact-service');

    let currentFormatRate = 120;
    let currentFormatName = 'Short-Form Reel';
    let lastCalculatedTotal = 960;

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

        lastCalculatedTotal = subtotal + rushTotal;
        const deposit = Math.round(lastCalculatedTotal * 0.5);

        if (summaryFormatLabel) summaryFormatLabel.textContent = `${currentFormatName} (${qty}x)`;
        if (summaryBasePrice) summaryBasePrice.textContent = `$${baseTotal}`;
        if (summaryAddonsPrice) summaryAddonsPrice.textContent = `$${addonsTotal}`;
        if (summaryRushPrice) summaryRushPrice.textContent = `$${rushTotal}`;
        if (totalPriceDisplay) totalPriceDisplay.textContent = `$${lastCalculatedTotal}`;
        if (depositDisplay) depositDisplay.textContent = `$${deposit}`;
        if (contactBudgetInput) contactBudgetInput.value = `$${lastCalculatedTotal}`;
    }

    formatButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            formatButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentFormatRate = parseInt(btn.getAttribute('data-price'), 10) || 120;
            currentFormatName = btn.querySelector('.format-name').textContent;

            if (contactServiceSelect) {
                const type = btn.getAttribute('data-type');
                if (type === 'short') contactServiceSelect.value = 'Short-Form Reels (TikTok / Instagram)';
                else if (type === 'long') contactServiceSelect.value = 'YouTube Long-Form Video Essay';
                else if (type === 'ad') contactServiceSelect.value = 'eCommerce & Brand Commercials';
            }

            recalculatePricing();
        });
    });

    if (quantitySlider) quantitySlider.addEventListener('input', recalculatePricing);
    if (addonMotion) addonMotion.addEventListener('change', recalculatePricing);
    if (addonSound) addonSound.addEventListener('change', recalculatePricing);
    if (addonRush) addonRush.addEventListener('change', recalculatePricing);

    if (bookWithScopeBtn) {
        bookWithScopeBtn.addEventListener('click', () => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                const nameInput = document.getElementById('contact-name');
                if (nameInput) setTimeout(() => nameInput.focus(), 600);
            }
        });
    }

    recalculatePricing();

    /* ==========================================================================
       7. Agency Operations Admin Dashboard Modal
       ========================================================================== */
    const adminModal = document.getElementById('admin-modal');
    const adminModalBtn = document.getElementById('admin-modal-btn');
    const heroAdminBtn = document.getElementById('hero-admin-btn');
    const closeAdminModal = document.getElementById('close-admin-modal');
    const inquiriesTableBody = document.getElementById('inquiries-table-body');
    const inquiriesBadgeCount = document.getElementById('inquiries-badge-count');
    const inquiryCounter = document.getElementById('inquiry-counter');
    const clearInquiriesBtn = document.getElementById('clear-inquiries-btn');

    function updateDashboardUI() {
        if (inquiriesBadgeCount) inquiriesBadgeCount.textContent = inquiries.length;
        if (inquiryCounter) inquiryCounter.textContent = inquiries.length;

        const dashInquiriesCount = document.getElementById('dash-inquiries-count');
        if (dashInquiriesCount) dashInquiriesCount.textContent = inquiries.length;

        if (!inquiriesTableBody) return;
        inquiriesTableBody.innerHTML = '';

        if (inquiries.length === 0) {
            inquiriesTableBody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:#6b7280; padding:24px;">No inquiries in pipeline. Submit one through the Hire Us form!</td></tr>';
            return;
        }

        inquiries.forEach((item, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${item.client}</strong><br><span style="font-size:0.7rem; color:#6b7280;">${item.date}</span></td>
                <td><span style="font-size:0.75rem;">${item.service}</span></td>
                <td><strong style="color:#10b981;">${item.budget}</strong></td>
                <td><span class="status-badge ${item.status === 'Completed' ? 'completed' : 'new'}">${item.status}</span></td>
                <td>
                    <button class="btn-xs toggle-status-btn" data-index="${index}" title="Toggle status">
                        <i class="fa-solid fa-arrows-rotate"></i>
                    </button>
                    <button class="btn-xs delete-inq-btn" data-index="${index}" style="color:#f43f5e;" title="Delete">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
            inquiriesTableBody.appendChild(tr);
        });

        // Attach action handlers
        inquiriesTableBody.querySelectorAll('.toggle-status-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
                inquiries[idx].status = inquiries[idx].status === 'Completed' ? 'In Progress' : 'Completed';
                saveInquiries();
            });
        });

        inquiriesTableBody.querySelectorAll('.delete-inq-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
                inquiries.splice(idx, 1);
                saveInquiries();
            });
        });
    }

    function openAdminModal() {
        if (!adminModal) return;
        updateDashboardUI();
        adminModal.classList.add('active');
        adminModal.setAttribute('aria-hidden', 'false');
    }

    function closeAdmin() {
        if (!adminModal) return;
        adminModal.classList.remove('active');
        adminModal.setAttribute('aria-hidden', 'true');
    }

    if (adminModalBtn) adminModalBtn.addEventListener('click', openAdminModal);
    if (heroAdminBtn) heroAdminBtn.addEventListener('click', openAdminModal);
    if (closeAdminModal) closeAdminModal.addEventListener('click', closeAdmin);
    if (adminModal) {
        adminModal.addEventListener('click', (e) => {
            if (e.target === adminModal) closeAdmin();
        });
    }

    if (clearInquiriesBtn) {
        clearInquiriesBtn.addEventListener('click', () => {
            inquiries = inquiries.filter(i => i.status !== 'Completed');
            saveInquiries();
        });
    }

    updateDashboardUI();

    /* ==========================================================================
       8. Authentication Modal (Client vs Admin Login)
       ========================================================================== */
    const authModal = document.getElementById('auth-modal');
    const authModalBtn = document.getElementById('auth-modal-btn');
    const closeAuthModal = document.getElementById('close-auth-modal');
    const authBtnLabel = document.getElementById('auth-btn-label');
    const loginClientDemo = document.getElementById('login-client-demo');
    const loginAdminDemo = document.getElementById('login-admin-demo');
    const manualAuthForm = document.getElementById('manual-auth-form');

    function updateAuthHeaderUI() {
        if (!authBtnLabel) return;
        if (currentUser.role !== 'guest') {
            authBtnLabel.textContent = `${currentUser.name.split(' ')[0]} (${currentUser.role.toUpperCase()})`;
        } else {
            authBtnLabel.textContent = 'Sign In';
        }
    }

    function openAuthModal() {
        if (!authModal) return;
        authModal.classList.add('active');
        authModal.setAttribute('aria-hidden', 'false');
    }

    function closeAuth() {
        if (!authModal) return;
        authModal.classList.remove('active');
        authModal.setAttribute('aria-hidden', 'true');
    }

    if (authModalBtn) authModalBtn.addEventListener('click', openAuthModal);
    if (closeAuthModal) closeAuthModal.addEventListener('click', closeAuth);
    if (authModal) {
        authModal.addEventListener('click', (e) => {
            if (e.target === authModal) closeAuth();
        });
    }

    if (loginClientDemo) {
        loginClientDemo.addEventListener('click', () => {
            currentUser = { name: 'Sarah Chen', role: 'client' };
            localStorage.setItem('editkaro_user', JSON.stringify(currentUser));
            updateAuthHeaderUI();
            closeAuth();
            alert('Welcome, Sarah Chen! You are now authenticated in the Client Review space.');
        });
    }

    if (loginAdminDemo) {
        loginAdminDemo.addEventListener('click', () => {
            currentUser = { name: 'Marcus Vance', role: 'admin' };
            localStorage.setItem('editkaro_user', JSON.stringify(currentUser));
            updateAuthHeaderUI();
            closeAuth();
            openAdminModal();
        });
    }

    if (manualAuthForm) {
        manualAuthForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('auth-email').value;
            currentUser = { name: email.split('@')[0], role: 'client' };
            localStorage.setItem('editkaro_user', JSON.stringify(currentUser));
            updateAuthHeaderUI();
            closeAuth();
        });
    }

    updateAuthHeaderUI();

    /* ==========================================================================
       9. Contact & Project Hire Form
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const service = document.getElementById('contact-service').value;
            const budget = document.getElementById('contact-budget').value || `$${lastCalculatedTotal}`;
            const message = document.getElementById('contact-message').value.trim();

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Syncing to Dashboard...';
            }

            // Push to live dynamic Inquiries state
            const newInquiry = {
                id: `inq-${Date.now().toString().slice(-4)}`,
                client: name,
                service: service,
                budget: budget,
                status: 'New',
                date: 'Just now'
            };

            inquiries.unshift(newInquiry);
            saveInquiries();

            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Project Synced Successfully!';
                }

                if (formFeedback) {
                    formFeedback.className = 'form-feedback success';
                    formFeedback.innerHTML = `<strong>Thank you, ${name}!</strong> Your project brief has been synced with our Agency Dashboard. You can view it live in the <a href="#admin-modal" id="feedback-admin-link" style="text-decoration:underline; font-weight:bold; color:#fff;">Admin Portal</a>.`;
                    
                    const adminLink = document.getElementById('feedback-admin-link');
                    if (adminLink) {
                        adminLink.addEventListener('click', (e) => {
                            e.preventDefault();
                            openAdminModal();
                        });
                    }
                }

                contactForm.reset();
                if (contactBudgetInput) contactBudgetInput.value = `$${lastCalculatedTotal}`;
            }, 500);
        });
    }

});
