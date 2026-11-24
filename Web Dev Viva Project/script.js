let expenses = [];
const form = document.getElementById('expenseForm');
const list = document.getElementById('expenseList');
const totalEl = document.getElementById('total');
const filterEl = document.getElementById('filterCategory');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;

  if (!name || isNaN(amount) || amount <= 0) {
    alert('Please enter a valid expense name and a positive amount.');
    return;
  }

  expenses.push({ id: Date.now(), name, amount, category });
  form.reset();
  render();
});

filterEl.addEventListener('change', render);

function deleteExpense(id) {
  expenses = expenses.filter(item => item.id !== id);
  render();
}

function render() {
  const selected = filterEl.value;
  const filtered = selected === 'All' ? expenses : expenses.filter(e => e.category === selected);

  list.innerHTML = filtered.map(e => `
    <tr>
      <td>${e.name}</td>
      <td>${e.category}</td>
      <td>₹${e.amount.toFixed(2)}</td>
      <td><button class="del-btn" onclick="deleteExpense(${e.id})">Delete</button></td>
    </tr>
  `).join('');

  const total = filtered.reduce((sum, e) => sum + e.amount, 0);
  totalEl.textContent = total.toFixed(2);
}