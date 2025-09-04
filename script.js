// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".custom-navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Fade-in sections
const faders = document.querySelectorAll(".fade-section");
const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};
const appearOnScroll = new IntersectionObserver(function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Autoplay for Planimetria
let planCarousel = document.querySelector('#planimetriaCarousel');
if (planCarousel) {
  new bootstrap.Carousel(planCarousel, {
    interval: 4000,
    wrap: true
  });
}

// Autoplay for Gallery
let galleryCarousel = document.querySelector('#galleryCarousel');
if (galleryCarousel) {
  new bootstrap.Carousel(galleryCarousel, {
    interval: 4000,
    wrap: true
  });
}

// Curly line "drawing" animation
function animateCurlyLine() {
  const path = document.querySelector('.hero .curly-line path');
  if (!path) return;

  // Reset before animation
  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;

  // Animate draw
  setTimeout(() => {
    path.style.transition = "stroke-dashoffset 4s ease-out";
    path.style.strokeDashoffset = "0";
  }, 100);
}

// Run once on load
window.addEventListener("load", animateCurlyLine);

// Redraw when hero section comes into view
const heroObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCurlyLine();
    }
  });
}, { threshold: 0.6 });

const heroSection = document.querySelector('.hero');
if (heroSection) heroObserver.observe(heroSection);


// Handle Contact Form Submit with AJAX
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const responseBox = document.getElementById("formResponse");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      try {
        const response = await fetch("sendmail.php", {
          method: "POST",
          body: formData
        });

        const result = await response.text();
        responseBox.style.color = "#d4af37";
        responseBox.textContent = result;
        form.reset();
      } catch (error) {
        responseBox.style.color = "red";
        responseBox.textContent = "Dështoi dërgimi. Provo përsëri.";
      }
    });
  }
});


gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".section").forEach((panel, i) => {
  ScrollTrigger.create({
    trigger: panel,
    start: "top top",
    pin: true,
    pinSpacing: false
  });
});
