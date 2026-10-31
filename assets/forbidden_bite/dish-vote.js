(() => {
  const host = document.getElementById('dish-vote-options');
  const results = document.getElementById('dish-vote-results');
  const bars = document.getElementById('dish-vote-bars');
  const status = document.getElementById('dish-vote-status');
  const totalLabel = document.getElementById('dish-vote-total');
  if (!host || !results || !bars || !status || !totalLabel) return;

  const dishes = [
    { id: 'popcorn', name: 'Forbidden Popcorn Chicken', image: 'recipe-popcorn-05.webp', note: 'Five-spice crunch' },
    { id: 'dumplings', name: 'Pork & Chive Dumplings', image: 'recipe-dumplings-05.webp', note: 'Hand-folded favorite' },
    { id: 'pan-seared', name: 'Pan-Seared Dumplings', image: 'recipe-pan-seared-05.webp', note: 'Crispy-bottom classic' },
    { id: 'cucumbers', name: 'Smashed Cucumbers', image: 'recipe-cucumbers-05.webp', note: 'Cool, tangy crunch' }
  ];
  const storageKey = 'forbidden-bite-dish-vote-v1';
  let vote = null;
  let counts = Object.fromEntries(dishes.map(dish => [dish.id, 0]));
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (saved && typeof saved === 'object' && counts[saved.vote] !== undefined) {
      vote = saved.vote;
      for (const dish of dishes) counts[dish.id] = Math.max(0, Number(saved.counts?.[dish.id]) || 0);
      counts[vote] = Math.max(1, counts[vote]);
    }
  } catch {}

  function render() {
    host.replaceChildren();
    for (const dish of dishes) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'dish-vote-option';
      button.setAttribute('aria-pressed', String(vote === dish.id));
      const image = document.createElement('img');
      image.src = `/assets/forbidden_bite/${dish.image}`;
      image.alt = '';
      image.loading = 'lazy';
      image.decoding = 'async';
      const copy = document.createElement('span');
      copy.className = 'dish-vote-option-copy';
      const name = document.createElement('strong');
      name.textContent = dish.name;
      const note = document.createElement('small');
      note.textContent = dish.note;
      copy.append(name, note);
      const mark = document.createElement('span');
      mark.className = 'dish-vote-mark';
      mark.setAttribute('aria-hidden', 'true');
      mark.textContent = vote === dish.id ? '✓' : '＋';
      button.append(image, copy, mark);
      button.addEventListener('click', () => {
        if (vote === dish.id) {
          status.textContent = `Your pick is already ${dish.name}. Tap another dish to change your vote.`;
          return;
        }
        if (vote) counts[vote] = Math.max(0, counts[vote] - 1);
        vote = dish.id;
        counts[vote] += 1;
        try { localStorage.setItem(storageKey, JSON.stringify({ vote, counts })); } catch {}
        status.textContent = `Your vote is in for ${dish.name}. You can change it by choosing another dish.`;
        render();
      });
      host.append(button);
    }

    if (!vote) {
      results.hidden = true;
      return;
    }
    results.hidden = false;
    const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
    totalLabel.textContent = `${total} ${total === 1 ? 'vote' : 'votes'}`;
    bars.replaceChildren();
    for (const dish of dishes) {
      const row = document.createElement('div');
      row.className = 'dish-vote-result-row';
      const label = document.createElement('div');
      label.className = 'dish-vote-result-label';
      const name = document.createElement('strong');
      name.textContent = dish.name;
      const amount = document.createElement('span');
      amount.textContent = `${counts[dish.id]} ${counts[dish.id] === 1 ? 'vote' : 'votes'}`;
      label.append(name, amount);
      const track = document.createElement('div');
      track.className = 'dish-vote-track';
      track.setAttribute('role', 'progressbar');
      track.setAttribute('aria-label', `${dish.name} vote share`);
      track.setAttribute('aria-valuemin', '0');
      track.setAttribute('aria-valuemax', String(total));
      track.setAttribute('aria-valuenow', String(counts[dish.id]));
      const fill = document.createElement('span');
      fill.style.width = `${Math.round(counts[dish.id] / total * 100)}%`;
      track.append(fill);
      row.append(label, track);
      bars.append(row);
    }
  }
  status.textContent = vote ? `Your saved pick is ${dishes.find(dish => dish.id === vote).name}. Tap another dish to change it.` : 'Pick one dish to cast your vote.';
  render();
})();
