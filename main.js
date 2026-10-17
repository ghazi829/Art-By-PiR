const photographs = [
  {
    title: 'Golden Drift',
    category: 'nature',
    size: 'wide',
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Still Water',
    category: 'landscapes',
    size: 'square',
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'Portrait Light',
    category: 'portraits',
    size: 'tall',
    src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'City Notes',
    category: 'street',
    size: 'square',
    src: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'Soft Echo',
    category: 'creative',
    size: 'tall',
    src: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'Morning Grain',
    category: 'nature',
    size: 'square',
    src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'Open Road',
    category: 'landscapes',
    size: 'wide',
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Frames in Motion',
    category: 'creative',
    size: 'square',
    src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'Afterglow',
    category: 'portraits',
    size: 'square',
    src: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80'
  }
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
