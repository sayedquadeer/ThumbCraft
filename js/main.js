/**
 * Main Application Logic & Global Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle logic
  const mobileNavBtn = document.getElementById('mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileNavBtn && navMenu) {
    mobileNavBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // FAQ Accordion Handler
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach((q) => {
    q.addEventListener('click', () => {
      const parent = q.parentElement;
      const isActive = parent.classList.contains('active');
      
      document.querySelectorAll('.faq-item').forEach((item) => {
        item.classList.remove('active');
      });

      if (!isActive) {
        parent.classList.add('active');
      }
    });
  });

  // Register PWA Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.warn('Service Worker registration failed:', err);
      });
    });
  }
});

