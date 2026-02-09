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

  // Form submit — send to GoHighLevel and redirect to calculator
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!name || !email) return;

    // Disable button while sending
    submitBtn.disabled = true;
    submitBtn.textContent = 'Loading...';

    // Send contact info to GoHighLevel webhook
    fetch('https://services.leadconnectorhq.com/hooks/codardVbuW0tyYjFKTLN/webhook-trigger/9e4c4c26-0128-4bdf-b648-6d37258d51be', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        source: 'ROI Calculator'
      })
    })
    .then(() => {
      window.location.href = 'calculator.html';
    })
    .catch(() => {
      // Still redirect even if webhook fails — don't block the user
      window.location.href = 'calculator.html';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
});
