document.getElementById("current-year").textContent = new Date().getFullYear();

function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

function calculateYearsAtIMS() {
  const today = new Date();
  const startDate = new Date(2023, 7, 1);
  const yearDiff = today.getFullYear() - startDate.getFullYear();
  const monthDiff = today.getMonth() - startDate.getMonth();
  let years = yearDiff;
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < startDate.getDate())) {
    years--;
  }
  return Math.max(1, years);
}

const appearOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("appear");
    }
  });
}, appearOptions);

const disappearOnScroll = new IntersectionObserver(function(entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      entry.target.classList.remove("appear");
    }
  });
}, {
  threshold: 0,
  rootMargin: "0px 0px 0px 0px"
});

const animatedElements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .scale-in");

animatedElements.forEach((element) => {
  appearOnScroll.observe(element);
  disappearOnScroll.observe(element);
});

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

setTimeout(handleInitialAnimations, 100);

window.addEventListener("scroll", function() {
  if (window.scrollY < 100) {
    const homeElements = document.querySelectorAll("#home .fade-in, #home .slide-in-left, #home .slide-in-right, #home .scale-in");
    homeElements.forEach((element) => {
      element.classList.add("appear");
    });
  }
});

const dropdownHeaders = document.querySelectorAll(".dropdown-header");
dropdownHeaders.forEach((header) => {
  header.addEventListener("click", function() {
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

const contactForm = document.getElementById("contactForm");
const formSubmitMessage = document.getElementById("formSubmitMessage");

if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(contactForm);
    fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
      }
    })
    .then((response) => {
      if (response.ok) {
        contactForm.reset();
        formSubmitMessage.classList.add("show");
        contactForm.style.display = "none";
      } else {
        throw new Error("Form submission failed");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("There was a problem submitting your form. Please try again.");
    });
  });
}

document.addEventListener("DOMContentLoaded", function() {
  const birthDate = "2008-06-16";
  const age = calculateAge(birthDate);
  const yearsAtIMS = calculateYearsAtIMS();
  
  const ageTextElement = document.getElementById("age-text");
  if (ageTextElement) {
    ageTextElement.textContent = age;
  }
  
  const ageStatElement = document.getElementById("age-stat");
  if (ageStatElement) {
    ageStatElement.textContent = age;
  }
  
  const yearsAtIMSElement = document.getElementById("years-at-ims");
  if (yearsAtIMSElement) {
    yearsAtIMSElement.textContent = yearsAtIMS;
  }

  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const navLinks = document.querySelector(".nav-links");
  
  if (hamburgerMenu && navLinks) {
    hamburgerMenu.addEventListener("click", function() {
      navLinks.classList.toggle("active");
      hamburgerMenu.classList.toggle("active");
      const icon = hamburgerMenu.querySelector("i");
      if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
    
    const navLinkItems = document.querySelectorAll(".nav-links a");
    navLinkItems.forEach(link => {
      link.addEventListener("click", function() {
        navLinks.classList.remove("active");
        hamburgerMenu.classList.remove("active");
        const icon = hamburgerMenu.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      });
    });
  }

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", function() {
      cards.forEach((c) => c.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Enhanced Gallery Lightbox Functionality
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxDescription = document.getElementById("lightbox-description");
  const lightboxClose = document.querySelector(".lightbox-close");

  // Gallery data with descriptions
  const galleryData = [
    {
      src: "img/gallery/gaming.jpg",
      title: "Gaming Setup",
      description: "My personal gaming setup featuring a dual monitor configuration, RGB lighting, and high-performance gaming peripherals. This is where I spend my free time playing competitive games and enjoying e-sports."
    },
    {
      src: "img/gallery/chapel.jpg",
      title: "Chapel View",
      description: "A beautiful chapel captured during one of my photography walks. The architecture and peaceful atmosphere make it a perfect subject for photography practice."
    },
    {
      src: "https://via.placeholder.com/400x600/8b5cf6/ffffff?text=Photo+3",
      title: "Creative Design",
      description: "A creative design project showcasing modern aesthetics and color theory. This represents my interest in combining technology with visual arts."
    },
    {
      src: "img/gallery/mountain.jpg",
      title: "Mountain Adventure",
      description: "A breathtaking view from a hiking trip in the Swiss Alps. The fresh mountain air and stunning landscapes always provide the perfect escape from the digital world."
    },
    {
      src: "img/gallery/programming.jpg",
      title: "Programming Workspace",
      description: "My coding environment where I work on school projects and personal development. Clean desk setup with multiple monitors for maximum productivity during coding sessions."
    },
    {
      src: "img/gallery/cat.jpg",
      title: "My Cat",
      description: "Meet my adorable cat companion who loves to sit on my keyboard during coding sessions. Best debugging partner and stress reliever after long programming marathons."
    }
  ];

  // Open lightbox when clicking on gallery item
  if (galleryItems && lightbox && lightboxImg && lightboxTitle && lightboxDescription && lightboxClose) {
    galleryItems.forEach((item) => {
      item.addEventListener("click", function() {
        const imageIndex = parseInt(this.getAttribute("data-index"));
        openLightbox(imageIndex);
      });
    });

    function openLightbox(index) {
      const data = galleryData[index];
      if (data) {
        lightboxImg.src = data.src;
        lightboxImg.alt = data.title;
        lightboxTitle.textContent = data.title;
        lightboxDescription.textContent = data.description;

        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    }

    function closeLightbox() {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }

    // Close lightbox on X button click
    lightboxClose.addEventListener("click", closeLightbox);

    // Close lightbox when clicking outside the content
    lightbox.addEventListener("click", function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Close lightbox on Escape key
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && lightbox.classList.contains("active")) {
        closeLightbox();
      }
    });
  }

  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  let isFiltering = false;

  filterButtons.forEach((button) => {
    button.addEventListener("click", function() {
      if (isFiltering) return;
      const filterValue = this.getAttribute("data-filter");
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      filterProjects(filterValue);
    });
  });

  function filterProjects(category) {
    isFiltering = true;
    requestAnimationFrame(() => {
      projectCards.forEach((card, index) => {
        const cardCategories = card.getAttribute("data-category");
        const shouldShow = category === "all" || cardCategories.includes(category);
        if (shouldShow) {
          card.classList.remove("hidden");
          card.offsetHeight;
          card.classList.add("show");
          card.style.transitionDelay = `${index * 30}ms`;
        } else {
          card.classList.remove("show");
          card.classList.add("hidden");
          card.style.transitionDelay = "0ms";
        }
      });
      setTimeout(() => {
        isFiltering = false;
      }, 150);
    });
  }

  projectCards.forEach((card) => {
    card.classList.add("show");
  });
});

