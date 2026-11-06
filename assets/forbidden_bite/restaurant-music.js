(() => {
  const themes = {
    browse: { name: 'Dining room', bpm: 76, root: 196, voice: 'sine', melody: [0, 4, 7, 9, 7, 4, 2, 4, 0, 4, 7, 11, 9, 7, 4, 2] },
    noodle: { name: 'Noodle Pal', bpm: 112, root: 220, voice: 'triangle', melody: [0, 2, 4, 7, 9, 7, 4, 2, 0, 4, 7, 9, 12, 9, 7, 4] },
    match: { name: 'Dish Match', bpm: 88, root: 247, voice: 'sine', melody: [0, 7, 4, 9, 7, 4, 2, 7, 0, 9, 7, 4, 11, 9, 4, 2] },
    roadster: { name: 'Flavor Roadster', bpm: 128, root: 174.61, voice: 'triangle', melody: [0, 4, 7, 12, 9, 7, 4, 9, 0, 4, 9, 12, 14, 12, 9, 7] },
    trailblazer: { name: 'Trailblazer', bpm: 96, root: 207.65, voice: 'sine', melody: [0, 2, 7, 9, 12, 9, 7, 4, 2, 4, 7, 11, 9, 7, 4, 0] },
    ace: { name: 'Arcade Ace', bpm: 120, root: 220, voice: 'triangle', melody: [0, 7, 9, 12, 7, 9, 14, 12, 4, 7, 12, 16, 14, 12, 9, 7] },
    wok: { name: 'Lantern Flight', bpm: 132, root: 196, voice: 'triangle', melody: [0, 4, 7, 12, 9, 12, 7, 4, 2, 7, 11, 14, 12, 9, 7, 2] },
    lantern: { name: 'Jade Garden', bpm: 94, root: 246.94, voice: 'sine', melody: [0, 7, 4, 2, 9, 7, 4, 11, 12, 7, 4, 2, 9, 11, 7, 4] },
    teatoss: { name: 'Tea House Bounce', bpm: 122, root: 220, voice: 'triangle', melody: [0, 7, 12, 9, 7, 4, 9, 12, 2, 9, 14, 12, 7, 4, 11, 7] },
    sugar: { name: 'Sugar Sprint', bpm: 116, root: 261.63, voice: 'triangle', melody: [0, 4, 7, 12, 9, 7, 12, 16, 14, 12, 9, 7, 4, 9, 7, 0] },
    dumpling: { name: 'Dumpling Dash', bpm: 116, root: 196, voice: 'sine', melody: [0, 4, 7, 9, 12, 9, 7, 4, 2, 7, 9, 14, 12, 9, 7, 2] }
  };
  const arcadeTheme = { noodle: 'noodle', match: 'match', roadster: 'roadster', trailblazer: 'trailblazer', ace: 'ace', wok: 'wok', lantern: 'lantern', teatoss: 'teatoss', sugar: 'sugar' };
  const arcadeThemeFor = game => Object.prototype.hasOwnProperty.call(arcadeTheme, game) ? arcadeTheme[game] : 'noodle';
  const isArcade = document.body.classList.contains('avatar-arcade-page');
  const isDash = document.body.classList.contains('game-page');
  const requestedMode = new URLSearchParams(location.search).get('game');
  let themeKey = isArcade ? arcadeThemeFor(requestedMode) : isDash ? 'dumpling' : 'browse';
  let audio, timer, beat = 0, enabled = false;

  const player = document.createElement('div');
  player.className = 'restaurant-music';
  player.innerHTML = '<span class="restaurant-music-note" aria-hidden="true">♫</span><span class="restaurant-music-name" aria-live="polite"></span><button type="button" class="restaurant-music-toggle" aria-pressed="false"></button>';
  document.body.append(player);
  const name = player.querySelector('.restaurant-music-name');
  const toggle = player.querySelector('button');

  function updateLabel() {
    name.textContent = themes[themeKey].name;
    name.title = `Current game soundtrack: ${themes[themeKey].name}`;
    toggle.textContent = enabled ? (isArcade ? 'Sound on · Pause' : 'Music on · Pause') : (isArcade ? 'Sound off · Play' : 'Music off · Play');
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.setAttribute('aria-label', enabled ? (isArcade ? 'Pause game soundtrack and sound effects' : 'Pause restaurant music') : (isArcade ? 'Play the game soundtrack and sound effects' : 'Play restaurant music'));
    toggle.title = isArcade ? 'Each arcade game has its own soundtrack and sound effects.' : 'Original Forbidden Bite background music.';
    player.classList.toggle('is-playing', enabled);
  }
  function tone(frequency, start, duration, type, volume, endFrequency = frequency) {
    if (!audio) return;
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), start + duration);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + Math.min(.035, duration / 3));
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + .02);
  }
  window.forbiddenBiteArcadeEffect = (kind, game) => {
    if (!audio || !enabled) return;
    const theme = themes[arcadeThemeFor(game)];
    const now = audio.currentTime + .015;
    const motifs = { noodle: [0, 4, 7, 12], match: [0, 7, 12], roadster: [0, 2, 7, 9], trailblazer: [0, 5, 9, 12], ace: [0, 7, 9, 16], wok: [2, 7, 12, 19], lantern: [0, 5, 12, 16], teatoss: [0, 4, 12, 7], sugar: [0, 7, 12, 16] };
    const motif = motifs[game] || motifs.noodle;
    const stepsByKind = { start: [motif[0], motif[1]], pickup: [motif.at(-1)], power: motif, gate: [motif[0], motif[1] + 7, motif[2] + 12, motif.at(-1) + 12], hit: [motif[1], 1], boss: [motif[0] + 12, motif[2] + 12, motif.at(-1) + 19], clear: [...motif, motif[0] + 12], record: [...motif, motif.at(-1) + 12] };
    const steps = stepsByKind[kind] || [motif[1]];
    steps.forEach((step, index) => {
      const freq = theme.root * Math.pow(2, step / 12);
      tone(freq, now + index * .075, kind === 'clear' || kind === 'record' ? .2 : .12, theme.voice, kind === 'hit' ? .022 : .026, kind === 'hit' ? freq * .82 : freq * 1.015);
    });
  };
  function playBeat() {
    if (!audio || !enabled) return;
    const theme = themes[themeKey];
    const now = audio.currentTime + .025;
    const step = beat % 16;
    const beatSeconds = 60 / theme.bpm;
    const semitone = theme.melody[step];
    if (semitone !== null && (step % 2 === 0 || themeKey === 'match' || themeKey === 'browse')) {
      const note = theme.root * Math.pow(2, semitone / 12);
      tone(note, now, beatSeconds * (step % 4 === 0 ? 1.25 : .72), theme.voice, themeKey === 'browse' ? .026 : .035);
      if (step === 0 || step === 8) tone(theme.root / 2, now, beatSeconds * 1.7, 'sine', .025);
    }
    if (step === 0 || step === 8) {
      [0, 4, 7].forEach((interval, index) => tone(theme.root * Math.pow(2, interval / 12), now, beatSeconds * 3.8, 'sine', .009 - index * .001));
    }
    if ((themeKey === 'roadster' || themeKey === 'noodle' || themeKey === 'dumpling' || themeKey === 'wok' || themeKey === 'sugar') && step % 4 === 0) tone(95, now, .075, 'sine', .018, 48);
    if (themeKey === 'teatoss' && step % 4 === 2) tone(150, now, .06, 'triangle', .012, 105);
    if (themeKey === 'browse' && step % 4 === 2) tone(theme.root * 2.01, now, .11, 'sine', .009);
    beat++;
  }
  function startMusic() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) { enabled = false; updateLabel(); return; }
    audio ||= new AudioContext();
    audio.resume().then(() => {
      clearInterval(timer);
      beat = 0;
      playBeat();
      timer = setInterval(playBeat, (60 / themes[themeKey].bpm) * 1000);
    });
  }
  function selectTheme(key) {
    if (!themes[key] || key === themeKey) return;
    themeKey = key;
    updateLabel();
    if (enabled) startMusic();
  }
  toggle.addEventListener('click', () => {
    enabled = !enabled;
    if (enabled) startMusic(); else { clearInterval(timer); audio?.suspend(); }
    updateLabel();
  });
  if (isArcade) {
    document.querySelectorAll('.mode-card').forEach(card => card.addEventListener('click', () => selectTheme(arcadeTheme[card.dataset.mode])));
  }
  updateLabel();
})();
