const photographs = [
  {
    title: 'Golden Fields',
    category: 'nature',
    size: 'wide',
    src: 'assets/golden-fields.jpeg'
  },
  {
    title: 'Open Horizon',
    category: 'landscapes',
    size: 'wide',
    src: 'assets/open-horizon.jpeg'
  },
  {
    title: 'Quiet Light',
    category: 'portraits',
    size: 'tall',
    src: 'assets/quiet-light.jpeg'
  },
  {
    title: 'City Echo',
    category: 'street',
    size: 'square',
    src: 'assets/city-echo.jpeg'
  },
  {
    title: 'Soft Echo',
    category: 'creative',
    size: 'tall',
    src: 'assets/soft-echo.jpeg'
  },
  {
    title: 'Stone Path',
    category: 'landscapes',
    size: 'wide',
    src: 'assets/soft-light-detail.jpeg'
  },
  {
    title: 'Daydream',
    category: 'creative',
    size: 'square',
    src: 'assets/daydream.jpeg'
  },
  {
    title: 'Afterglow',
    category: 'portraits',
    size: 'square',
    src: 'assets/afterglow.jpeg'
  },
  {
    title: 'Wild Silence',
    category: 'nature',
    size: 'wide',
    src: 'assets/quiet-afternoon.jpeg'
  },
  {
    title: 'Golden Memory',
    category: 'portraits',
    size: 'tall',
    src: 'assets/golden-memory.jpeg'
  },
  {
    title: 'Velvet Shade',
    category: 'creative',
    size: 'square',
    src: 'assets/velvet-shade.jpg'
  },
  {
    title: 'Cinematic Frame',
    category: 'street',
    size: 'tall',
    src: 'assets/cinematic-frame.jpeg'
  },
  {
    title: 'Morning Calm',
    category: 'landscapes',
    size: 'wide',
    src: 'assets/morning-calm.jpeg'
  },
  {
    title: 'The Long Walk',
    category: 'landscapes',
    size: 'square',
    src: 'assets/long-walk.jpg'
  },
  {
    title: 'Sunset Line',
    category: 'creative',
    size: 'wide',
    src: 'assets/sunset-line.jpg'
  },
  {
    title: 'Moon in Stillness',
    category: 'nature',
    size: 'square',
    src: 'assets/moon-in-stillness.jpeg'
  },
  {
    title: 'Lunar Edge',
    category: 'creative',
    size: 'tall',
    src: 'assets/lunar-edge.jpeg'
  },
  {
    title: 'Egret in the Green',
    category: 'nature',
    size: 'tall',
    src: 'assets/egret-in-the-green.jpeg'
  },
  {
    title: 'Road to Dusk',
    category: 'landscapes',
    size: 'wide',
    src: 'assets/road-to-dusk.jpeg'
  },
  {
    title: 'Petal in Shadow',
    category: 'creative',
    size: 'square',
    src: 'assets/petal-in-shadow.jpeg'
  },
  {
    title: 'Nocturne Bloom',
    category: 'creative',
    size: 'square',
    src: 'assets/nocturne-bloom.jpeg'
  },
  {
    title: 'Golden Petal',
    category: 'creative',
    size: 'square',
    src: 'assets/golden-petal.jpeg'
  },
  {
    title: 'Dusk Reflection',
    category: 'landscapes',
    size: 'wide',
    src: 'assets/dusk-reflection.jpg'
  },
  {
    title: 'Moonlit Bloom',
    category: 'creative',
    size: 'square',
    src: 'assets/moonlit-bloom.jpeg'
  },
];

const nav = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');
const topbar = document.getElementById('header');
const galleryGrid = document.getElementById('galleryGrid');
const filterButtons = document.querySelectorAll('.filter-button');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const yearNode = document.getElementById('year');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

let currentFilter = 'all';
let visiblePhotos = [...photographs];
let activeLightboxIndex = 0;

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

function setHeaderState() {
  if (window.scrollY > 20) {
    topbar.classList.add('scrolled');
  } else {
    topbar.classList.remove('scrolled');
  }
}

function toggleMenu() {
  nav.classList.toggle('is-open');
  const expanded = nav.classList.contains('is-open');
  navToggle.setAttribute('aria-expanded', String(expanded));
}

function closeMenu() {
  nav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
}

navToggle.addEventListener('click', toggleMenu);
nav.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => closeMenu());
});

function getVisiblePhotos() {
  return currentFilter === 'all'
    ? photographs
    : photographs.filter((photo) => photo.category === currentFilter);
}

function renderGallery() {
  visiblePhotos = getVisiblePhotos();
  galleryGrid.innerHTML = visiblePhotos
    .map(
      (photo, index) => `
        <article
          class="gallery-item"
          data-index="${index}"
          data-category="${photo.category}"
          data-size="${photo.size}"
          tabindex="0"
          role="button"
          aria-label="Open ${photo.title}"
        >
          <img src="${photo.src}" alt="${photo.title}" loading="lazy" />
          <div class="gallery-overlay"><span>${photo.title}</span></div>
        </article>
      `
    )
    .join('');

  galleryGrid.querySelectorAll('.gallery-item').forEach((card) => {
    card.addEventListener('click', () => openLightbox(Number(card.dataset.index)));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(Number(card.dataset.index));
      }
    });
  });
}

function openLightbox(index) {
  activeLightboxIndex = index;
  const photo = visiblePhotos[index];
  if (!photo) return;

  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.title;
  lightboxCaption.textContent = photo.title;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
}

function showNextPhoto() {
  if (!visiblePhotos.length) return;
  activeLightboxIndex = (activeLightboxIndex + 1) % visiblePhotos.length;
  const photo = visiblePhotos[activeLightboxIndex];
  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.title;
  lightboxCaption.textContent = photo.title;
}

function showPreviousPhoto() {
  if (!visiblePhotos.length) return;
  activeLightboxIndex = (activeLightboxIndex - 1 + visiblePhotos.length) % visiblePhotos.length;
  const photo = visiblePhotos[activeLightboxIndex];
  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.title;
  lightboxCaption.textContent = photo.title;
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('active', item === button));
    renderGallery();
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPreviousPhoto);
lightboxNext.addEventListener('click', showNextPhoto);

window.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('is-open')) return;

  if (event.key === 'Escape') {
    closeLightbox();
  }

  if (event.key === 'ArrowRight') {
    showNextPhoto();
  }

  if (event.key === 'ArrowLeft') {
    showPreviousPhoto();
  }
});

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = contactForm.querySelector('.submit-button');
  submitButton.disabled = true;
  formStatus.className = 'form-status';
  formStatus.textContent = 'Sending…';

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Form submission failed with status ${response.status}.`);
    }

    formStatus.classList.add('is-success');
    formStatus.textContent = 'Message sent successfully.';
    contactForm.reset();
  } catch (error) {
    console.error('Contact form submission failed:', error);
    formStatus.classList.add('is-error');
    formStatus.textContent = 'Could not send your message. Please try again.';
  } finally {
    submitButton.disabled = false;
  }
});

window.addEventListener('scroll', setHeaderState);
window.addEventListener('load', () => {
  setHeaderState();
  renderGallery();
});

const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  let currentSection = 'home';

  sections.forEach((section) => {
    const top = section.offsetTop - 140;
    const bottom = top + section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    const target = link.getAttribute('href').replace('#', '');
    link.classList.toggle('active-link', target === currentSection);
  });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);
