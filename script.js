// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all dropdowns
    initializeDropdowns();
    
    // Initialize search functionality
    initializeSearch();
    
    // Initialize FAQ accordion
    initializeFAQ();

    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const indicators = carousel.querySelectorAll('.indicator');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    let currentSlide = 0;
    let slideInterval;

    // Function to show slide
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }

    // Function to go to next slide
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    // Function to go to previous slide
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    // Start automatic slideshow
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Stop automatic slideshow
    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlideshow();
        startSlideshow();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlideshow();
        startSlideshow();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            stopSlideshow();
            startSlideshow();
        });
    });

    // Pause slideshow on hover
    carousel.addEventListener('mouseenter', stopSlideshow);
    carousel.addEventListener('mouseleave', startSlideshow);

    // Start the slideshow
    startSlideshow();
});

// Dropdown functionality
function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.dropbtn');
        const content = dropdown.querySelector('.dropdown-content');
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                content.style.display = 'none';
            }
        });
        
        // Toggle dropdown on button click
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = content.style.display === 'block';
            
            // Close all other dropdowns
            dropdowns.forEach(other => {
                if (other !== dropdown) {
                    other.querySelector('.dropdown-content').style.display = 'none';
                }
            });
            
            // Toggle current dropdown
            content.style.display = isOpen ? 'none' : 'block';
        });
    });
}

// Search functionality
function initializeSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchModal = document.createElement('div');
    searchModal.className = 'search-modal';
    searchModal.innerHTML = `
        <div class="search-content">
            <input type="text" placeholder="Search products..." class="search-input">
            <button class="close-search"><i class="fas fa-times"></i></button>
        </div>
    `;
    
    searchBtn.addEventListener('click', () => {
        document.body.appendChild(searchModal);
        searchModal.querySelector('.search-input').focus();
    });
    
    // Close search modal when clicking outside or on close button
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal || e.target.closest('.close-search')) {
            searchModal.remove();
        }
    });
}

// FAQ Accordion
function initializeFAQ() {
    const faqItems = [
        {
            question: "What types of products do you offer?",
            answer: "We offer a wide selection of premium Japanese liquor including sake, wine, beer, and spirits. Our collection features both traditional and modern varieties."
        },
        {
            question: "Do you ship internationally?",
            answer: "Currently, we only serve customers in Japan. However, we welcome international visitors to our store in Tokyo."
        },
        {
            question: "Can I make reservations for tastings?",
            answer: "Yes, we offer tasting events and reservations. Please contact us for more information about upcoming events."
        }
    ];
    
    const faqContainer = document.querySelector('.faq-container');
    
    faqItems.forEach(item => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.innerHTML = `
            <div class="faq-question">
                <h3>${item.question}</h3>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="faq-answer">
                <p>${item.answer}</p>
            </div>
        `;
        
        faqContainer.appendChild(faqItem);
        
        // Add click event to toggle answer
        faqItem.querySelector('.faq-question').addEventListener('click', () => {
            const answer = faqItem.querySelector('.faq-answer');
            const icon = faqItem.querySelector('.fa-chevron-down');
            
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
            icon.style.transform = answer.style.display === 'block' ? 'rotate(180deg)' : 'rotate(0)';
        });
    });
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Back to Top Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('backToTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    // Smooth scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
