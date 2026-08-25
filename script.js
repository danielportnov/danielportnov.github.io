(function () {
  const fill = document.getElementById('bar-fill');
  const pct = document.getElementById('status-pct');
  const label = document.getElementById('status-label');
  if (!fill || !pct || !label) return;

  const phases = [
    'assembling scaffolding',
    'pouring foundation',
    'raising the crane',
    'routing the grid',
    'hanging work lights',
    'almost there',
  ];

  let value = 18;
  let phase = 0;

  function tick() {
    const bump = Math.random() * 4 + 0.6;
    value = Math.min(94, value + bump);
    if (value > (phase + 1) * 15 && phase < phases.length - 1) {
      phase += 1;
      label.textContent = phases[phase];
    }
    fill.style.width = value + '%';
    pct.textContent = Math.round(value) + '%';
    setTimeout(tick, 900 + Math.random() * 1400);
  }

  tick();
})();
