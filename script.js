/*  ============================================
    BULLISH EVENTS ROI — Landing Page Script
    ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('contactModal');
  const modalClose = document.getElementById('modalClose');
  const form = document.getElementById('contactForm');

  // Open modal from any calc trigger button
  document.querySelectorAll('.calc-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  // Form submit — save info and redirect to calculator
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();

    if (!name || !email) return;

    // Store in localStorage (can also send to webhook/CRM here later)
    localStorage.setItem('bullish_roi_name', name);
    localStorage.setItem('bullish_roi_email', email);

    // Redirect to calculator page
    window.location.href = 'calculator.html';
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
});
