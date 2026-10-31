(() => {
  const ids = ['kids-appetizer', 'kids-main', 'kids-dessert'];
  const selects = ids.map(id => document.getElementById(id)).filter(Boolean);
  const addButton = document.getElementById('kids-meal-add');
  const priceLabel = document.getElementById('kids-meal-price');
  const status = document.getElementById('kids-menu-status');
  if (selects.length !== 3 || !addButton || !priceLabel || !status) return;
  const money = value => new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(value);
  const updateMeal = () => {
    const chosen = selects.map(select => select.selectedOptions[0]);
    const complete = chosen.every(option => option && option.value);
    addButton.disabled = !complete;
    if (!complete) {
      priceLabel.textContent = 'Choose all three to see your total';
      delete addButton.dataset.orderItem;
      return;
    }
    const total = chosen.reduce((sum, option) => sum + Number(option.dataset.price || 0), 0);
    priceLabel.textContent = money(total);
    addButton.dataset.orderItem = JSON.stringify({ name: `Little Bites Kids Meal · ${chosen.map(option => option.value).join(' + ')}`, price: total });
  };
  selects.forEach(select => select.addEventListener('change', updateMeal));
  addButton.addEventListener('click', () => {
    if (addButton.disabled) return;
    status.textContent = 'Your Little Bites mini meal was added to the pretend cart.';
  });
  updateMeal();
})();
