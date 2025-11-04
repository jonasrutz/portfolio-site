      // Set current year for copyright
document.getElementById("current-year").textContent = new Date().getFullYear();

// Calculate and display age dynamically
function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  // Subtract 1 if birthday hasn't occurred yet this year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

// Calculate years at IMS (started summer 2023)
function calculateYearsAtIMS() {
  const today = new Date();
  const startDate = new Date(2023, 7, 1); // August 2023 (month is 0-indexed)
  const yearDiff = today.getFullYear() - startDate.getFullYear();
  const monthDiff = today.getMonth() - startDate.getMonth();
  
  // Calculate years with decimals
  let years = yearDiff;
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < startDate.getDate())) {
    years--;
  }
  
  return Math.max(1, years); // At least 1 year
}

// Set age values on page load
document.addEventListener('DOMContentLoaded', function() {
  const birthDate = '2008-06-16'; // Jonas' birthdate
  const age = calculateAge(birthDate);
  const yearsAtIMS = calculateYearsAtIMS();
  
  // Update age in text
  const ageTextElement = document.getElementById('age-text');
  if (ageTextElement) {
    ageTextElement.textContent = age;
  }
  
  // Update age in stats
  const ageStatElement = document.getElementById('age-stat');
  if (ageStatElement) {
    ageStatElement.textContent = age;
  }
  
  // Update years at IMS
  const yearsAtIMSElement = document.getElementById('years-at-ims');
  if (yearsAtIMSElement) {
    yearsAtIMSElement.textContent = yearsAtIMS;
  }
});

// Toggle navigation on hamburger menu click
document.addEventListener('DOMContentLoaded', function() {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const navLinks = document.querySelector(".nav-links");
  
  if (hamburgerMenu && navLinks) {
    hamburgerMenu.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      hamburgerMenu.classList.toggle("active");
      
      // Update hamburger icon
      const icon = hamburgerMenu.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
    
    // Close menu when clicking nav links
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        hamburgerMenu.classList.remove('active');
        const icon = hamburgerMenu.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });
  }
});

      // Contact form submission
      const contactForm = document.getElementById("contactForm");
      const formSubmitMessage = document.getElementById("formSubmitMessage");

      if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
          e.preventDefault();

          const formData = new FormData(contactForm);

          fetch(contactForm.action, {
            method: "POST",
            body: formData,
            headers: {
              Accept: "application/json",
            },
          })
            .then((response) => {
              if (response.ok) {
                // Clear the form
                contactForm.reset();
                // Show the thank you message
                formSubmitMessage.classList.add("show");
                // Hide the form
                contactForm.style.display = "none";
              } else {
                throw new Error("Form submission failed");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              alert(
                "There was a problem submitting your form. Please try again."
              );
            });
        });
      }

      // CV Password Protection
      const cvDownloadBtn = document.getElementById("cvDownloadBtn");
      const passwordModal = document.getElementById("passwordModal");
      const closeModal = document.querySelector(".close-modal");
      const submitPasswordBtn = document.getElementById("submitPassword");
      const passwordInput = document.getElementById("cvPassword");
      const passwordError = document.getElementById("passwordError");

      // Password verification
      function checkPassword() {
        const input = passwordInput.value;

        if (input === "ims_2025") {
          // Password is correct, download the CV
          passwordModal.style.display = "none";
          window.location.href = "CV/Lebenslauf_Jonas.pdf";
        } else {
          // Password is incorrect, show error
          passwordError.textContent =
            "Falsches Passwort. Bitte versuchen Sie es erneut.";
          passwordInput.value = "";
        }
      }

      // Show the modal when the download button is clicked
      cvDownloadBtn.addEventListener("click", function (e) {
        e.preventDefault();
        passwordModal.style.display = "flex";
        passwordInput.value = ""; // Clear any previous input
        passwordError.textContent = ""; // Clear any previous error
      });

      // Close the modal when the X is clicked
      closeModal.addEventListener("click", function () {
        passwordModal.style.display = "none";
      });

      // Close the modal when clicking outside of it
      window.addEventListener("click", function (e) {
        if (e.target === passwordModal) {
          passwordModal.style.display = "none";
        }
      });

      // Handle password submission
      submitPasswordBtn.addEventListener("click", checkPassword);
      passwordInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          checkPassword();
        }
      });

      // Scroll animation observer
      const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px",
      };

      // Observer for when elements enter the viewport
      const appearOnScroll = new IntersectionObserver(function (
        entries,
        appearOnScroll
      ) {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          } else {
            entry.target.classList.add("appear");
          }
        });
      },
      appearOptions);

      // Observer for when elements leave the viewport
      const disappearOnScroll = new IntersectionObserver(
        function (entries) {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              // Reset animation when element is out of view
              entry.target.classList.remove("appear");
            }
          });
        },
        {
          threshold: 0,
          rootMargin: "0px 0px 0px 0px",
        }
      );

      // Get all elements with animation classes
      const animatedElements = document.querySelectorAll(
        ".fade-in, .slide-in-left, .slide-in-right, .scale-in"
      );

      // Observe elements for both appearing and disappearing
      animatedElements.forEach((element) => {
        appearOnScroll.observe(element);
        disappearOnScroll.observe(element);
      });

      // Add appear class to initial visible elements
      function handleInitialAnimations() {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;

        animatedElements.forEach((element) => {
          const elementTop = element.getBoundingClientRect().top + scrollTop;
          if (elementTop < scrollTop + windowHeight * 0.85) {
            element.classList.add("appear");
          }
        });
      }

      // Run on page load after a small delay
      setTimeout(handleInitialAnimations, 100);

      // Reset animations when scrolling back to top
      window.addEventListener("scroll", function () {
        if (window.scrollY < 100) {
          // When near the top of the page, ensure home section animations are visible
          const homeElements = document.querySelectorAll(
            "#home .fade-in, #home .slide-in-left, #home .slide-in-right, #home .scale-in"
          );
          homeElements.forEach((element) => {
            element.classList.add("appear");
          });
        }
      });

      // Dropdown functionality for portfolio sections
      const dropdownHeaders = document.querySelectorAll(".dropdown-header");

      dropdownHeaders.forEach((header) => {
        header.addEventListener("click", function () {
          const section = this.parentElement;

          section.classList.toggle("active");

          const icon = this.querySelector("i");

          if (section.classList.contains("active")) {
            icon.style.transform = "rotate(180deg)";
          } else {
            icon.style.transform = "rotate(0deg)";
          }
        });
      });

      // Card click functionality
      document.addEventListener("DOMContentLoaded", function () {
        const cards = document.querySelectorAll(".card");

        cards.forEach((card) => {
          card.addEventListener("click", function () {
            // Remove active class from all cards
            cards.forEach((c) => c.classList.remove("active"));

            // Add active class to the clicked card
            this.classList.add("active");
          });
        });
      });

      // Lightbox Gallery Functionality
      document.addEventListener("DOMContentLoaded", function () {
        const galleryItems = document.querySelectorAll(".gallery-item");
        const lightbox = document.getElementById("lightbox");
        const lightboxImg = document.getElementById("lightbox-img");
        const lightboxClose = document.querySelector(".lightbox-close");
        const prevBtn = document.querySelector(".lightbox-prev");
        const nextBtn = document.querySelector(".lightbox-next");
        const thumbnails = document.querySelectorAll(".thumbnail-item");
        
        let currentIndex = 0;
        const totalImages = 4; // Number of navigation thumbnails

        // Array of images to show in lightbox (can be different from gallery)
        const lightboxImages = [
          "https://via.placeholder.com/1200x800/2563eb/ffffff?text=Large+Photo+1",
          "https://via.placeholder.com/1200x800/10b981/ffffff?text=Large+Photo+2",
          "https://via.placeholder.com/1200x800/8b5cf6/ffffff?text=Large+Photo+3",
          "https://via.placeholder.com/1200x800/f59e0b/ffffff?text=Large+Photo+4"
        ];

        // Open lightbox when clicking on gallery item
        galleryItems.forEach((item) => {
          item.addEventListener("click", function () {
            const index = parseInt(this.getAttribute("data-index"));
            // Map gallery index to lightbox index (0-3)
            currentIndex = index % totalImages;
            openLightbox(currentIndex);
          });
        });

        // Open lightbox function
        function openLightbox(index) {
          lightbox.classList.add("active");
          showImage(index);
          document.body.style.overflow = "hidden"; // Prevent background scrolling
        }

        // Close lightbox function
        function closeLightbox() {
          lightbox.classList.remove("active");
          document.body.style.overflow = ""; // Restore scrolling
        }

        // Show image at specific index
        function showImage(index) {
          currentIndex = index;
          lightboxImg.src = lightboxImages[currentIndex];
          
          // Update thumbnail active state
          thumbnails.forEach((thumb, i) => {
            if (i === currentIndex) {
              thumb.classList.add("active");
            } else {
              thumb.classList.remove("active");
            }
          });
        }

        // Navigate to previous image
        function prevImage() {
          currentIndex = (currentIndex - 1 + totalImages) % totalImages;
          showImage(currentIndex);
        }

        // Navigate to next image
        function nextImage() {
          currentIndex = (currentIndex + 1) % totalImages;
          showImage(currentIndex);
        }

        // Event listeners
        lightboxClose.addEventListener("click", closeLightbox);
        prevBtn.addEventListener("click", prevImage);
        nextBtn.addEventListener("click", nextImage);

        // Close on background click
        lightbox.addEventListener("click", function (e) {
          if (e.target === lightbox) {
            closeLightbox();
          }
        });

        // Thumbnail click
        thumbnails.forEach((thumb, index) => {
          thumb.addEventListener("click", function () {
            showImage(index);
          });
        });

        // Keyboard navigation
        document.addEventListener("keydown", function (e) {
          if (!lightbox.classList.contains("active")) return;

          if (e.key === "Escape") {
            closeLightbox();
          } else if (e.key === "ArrowLeft") {
            prevImage();
          } else if (e.key === "ArrowRight") {
            nextImage();
          }
        });

        // Touch/Swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;

        lightboxImg.addEventListener("touchstart", function (e) {
          touchStartX = e.changedTouches[0].screenX;
          touchStartY = e.changedTouches[0].screenY;
        });

        lightboxImg.addEventListener("touchend", function (e) {
          touchEndX = e.changedTouches[0].screenX;
          touchEndY = e.changedTouches[0].screenY;
          handleSwipe();
        });

        function handleSwipe() {
          const swipeThreshold = 50; // Minimum distance for swipe
          const xDiff = touchStartX - touchEndX;
          const yDiff = Math.abs(touchStartY - touchEndY);

          // Only trigger if horizontal swipe is more significant than vertical
          if (Math.abs(xDiff) > swipeThreshold && Math.abs(xDiff) > yDiff) {
            if (xDiff > 0) {
              // Swipe left - next image
              nextImage();
            } else {
              // Swipe right - previous image
              prevImage();
            }
          }
        }

        // Prevent image drag on desktop
        lightboxImg.addEventListener("dragstart", function (e) {
          e.preventDefault();
        });

        // Double tap to close on mobile
        let lastTap = 0;
        lightboxImg.addEventListener("touchend", function (e) {
          const currentTime = new Date().getTime();
          const tapLength = currentTime - lastTap;
          
          if (tapLength < 300 && tapLength > 0) {
            // Double tap detected
            closeLightbox();
          }
          lastTap = currentTime;
        });
      });

      // Portfolio Filter Functionality - OPTIMIZED
      document.addEventListener("DOMContentLoaded", function () {
        const filterButtons = document.querySelectorAll(".filter-btn");
        const projectCards = document.querySelectorAll(".project-card");
        let isFiltering = false; // Prevent multiple clicks during animation

        // Add click event to each filter button
        filterButtons.forEach((button) => {
          button.addEventListener("click", function () {
            // Prevent rapid clicking
            if (isFiltering) return;
            
            const filterValue = this.getAttribute("data-filter");

            // Update active button
            filterButtons.forEach((btn) => btn.classList.remove("active"));
            this.classList.add("active");

            // Filter projects
            filterProjects(filterValue);
          });
        });

        function filterProjects(category) {
          isFiltering = true;

          // Use requestAnimationFrame for smooth animations
          requestAnimationFrame(() => {
            projectCards.forEach((card, index) => {
              const cardCategories = card.getAttribute("data-category");
              const shouldShow = category === "all" || cardCategories.includes(category);

              if (shouldShow) {
                // Remove hidden class immediately
                card.classList.remove("hidden");
                // Force reflow
                card.offsetHeight;
                // Add show class for animation
                card.classList.add("show");
                // Stagger animation slightly
                card.style.transitionDelay = `${index * 30}ms`;
              } else {
                // Hide card immediately - no delay
                card.classList.remove("show");
                card.classList.add("hidden");
                card.style.transitionDelay = "0ms";
              }
            });

            // Re-enable filtering after animation
            setTimeout(() => {
              isFiltering = false;
            }, 150);
          });
        }

        // Initialize - show all cards
        projectCards.forEach((card) => {
          card.classList.add("show");
        });
      });