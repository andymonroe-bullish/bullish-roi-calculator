/*  ============================================
    BULLISH EVENTS — ROI Calculator Logic
    All calculations update in real time
    ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const budgetItems = document.getElementById('budgetItems');
  const addBtn = document.getElementById('addBudgetItem');

  // Add new budget line item
  addBtn.addEventListener('click', () => {
    const row = document.createElement('div');
    row.className = 'budget-row';
    row.innerHTML = `
      <input type="text" class="budget-name" placeholder="Item name">
      <div class="input-with-prefix">
        <span class="prefix">$</span>
        <input type="number" class="budget-cost" value="0" min="0">
      </div>
      <button class="btn-remove-item" title="Remove">&times;</button>
    `;
    budgetItems.appendChild(row);
    row.querySelector('.budget-cost').addEventListener('input', calculate);
    row.querySelector('.btn-remove-item').addEventListener('click', () => {
      row.remove();
      calculate();
    });
  });

  // Remove budget item (for initial row)
  budgetItems.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-remove-item')) {
      const rows = budgetItems.querySelectorAll('.budget-row');
      if (rows.length > 1) {
        e.target.closest('.budget-row').remove();
        calculate();
      }
    }
  });

  // Listen for input changes on all inputs
  document.querySelectorAll('#ticketPrice, #numAttendees, #offerPrice, #conversionRate, #sponsorshipRevenue').forEach(input => {
    input.addEventListener('input', calculate);
  });

  // Listen for budget cost changes (delegated)
  budgetItems.addEventListener('input', (e) => {
    if (e.target.classList.contains('budget-cost')) {
      calculate();
    }
  });

  // Format currency
  function fmt(num) {
    if (num >= 1000000) {
      return '$' + num.toLocaleString('en-US', { maximumFractionDigits: 0 });
    }
    return '$' + num.toLocaleString('en-US', { maximumFractionDigits: 0 });
  }

  function calculate() {
    // Budget
    const costs = document.querySelectorAll('.budget-cost');
    let totalBudget = 0;
    costs.forEach(c => { totalBudget += parseFloat(c.value) || 0; });

    // Inputs
    const ticketPrice = parseFloat(document.getElementById('ticketPrice').value) || 0;
    const numAttendees = parseFloat(document.getElementById('numAttendees').value) || 0;
    const offerPrice = parseFloat(document.getElementById('offerPrice').value) || 0;
    const conversionRate = parseFloat(document.getElementById('conversionRate').value) || 0;
    const sponsorship = parseFloat(document.getElementById('sponsorshipRevenue').value) || 0;

    // Projections
    const ticketRevenue = numAttendees * ticketPrice;
    const buyers = Math.floor(numAttendees * (conversionRate / 100));
    const eventSales = buyers * offerPrice;
    const grossRevenue = ticketRevenue + eventSales + sponsorship;
    const netRevenue = grossRevenue - totalBudget;
    const roiPercent = totalBudget > 0 ? ((netRevenue / totalBudget) * 100) : 0;
    const roiMultiplier = totalBudget > 0 ? (grossRevenue / totalBudget) : 0;

    // Update DOM
    document.getElementById('totalBudget').textContent = fmt(totalBudget);
    document.getElementById('ticketRevenue').textContent = fmt(ticketRevenue);
    document.getElementById('ticketRevenueSub').textContent = `${numAttendees.toLocaleString()} x ${fmt(ticketPrice)}`;
    document.getElementById('buyers').textContent = buyers.toLocaleString();
    document.getElementById('buyersSub').textContent = `${numAttendees.toLocaleString()} x ${conversionRate}%`;
    document.getElementById('eventSales').textContent = fmt(eventSales);
    document.getElementById('eventSalesSub').textContent = `${buyers.toLocaleString()} x ${fmt(offerPrice)}`;
    document.getElementById('projSponsor').textContent = fmt(sponsorship);
    document.getElementById('grossRevenue').textContent = fmt(grossRevenue);
    document.getElementById('netRevenue').textContent = fmt(netRevenue);
    document.getElementById('roiPercent').textContent = roiPercent.toFixed(1) + '%';
    document.getElementById('roiMultiplier').textContent = roiMultiplier.toFixed(2) + 'x';
  }

  // Initial calculation
  calculate();
});
