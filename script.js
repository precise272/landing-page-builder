async function loadConfig() {
  const res = await fetch("config.json");
  const config = await res.json();
  renderHero(config.hero, config.brand);
  renderFeatures(config.features);
  renderTestimonials(config.testimonials);
  renderContact(config.contact);
}

function renderHero(hero, brand) {
  document.getElementById("hero").innerHTML = `
    <div class="hero" style="background:${brand.primaryColor}">
      <h1>${hero.headline}</h1>
      <p>${hero.subheadline}</p>
      <button>${hero.ctaText}</button>
    </div>
  `;
}

function renderFeatures(features) {
  const container = document.getElementById("features");
  container.innerHTML = `<h2>Features</h2><div class="grid">
    ${features.map(f => `
      <div class="card">
        <h3>${f.title}</h3>
        <p>${f.desc}</p>
      </div>
    `).join("")}
  </div>`;
}

function renderTestimonials(testimonials) {
  const container = document.getElementById("testimonials");
  container.innerHTML = `<h2>Testimonials</h2>
    ${testimonials.map(t => `
      <blockquote>"${t.quote}"<footer>- ${t.author}</footer></blockquote>
    `).join("")}`;
}

function renderContact(contact) {
  document.getElementById("contact").innerHTML = `
    <h2>${contact.headline}</h2>
    <form>
      <input type="email" placeholder="${contact.emailPlaceholder}" required />
      <button type="submit">${contact.buttonText}</button>
    </form>
  `;
}

loadConfig();
