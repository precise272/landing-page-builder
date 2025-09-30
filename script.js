let config = null;

// DOM references
const newBtn = document.getElementById("newProject");
const loadBtn = document.getElementById("loadProject");
const saveBtn = document.getElementById("saveProject");
const editorForm = document.getElementById("editorForm");
const previewMessage = document.getElementById("previewMessage");
const pagePreview = document.getElementById("pagePreview");

// === PROJECT CONTROLS ===

// New Project
newBtn.addEventListener("click", () => {
  config = {
    hero: { headline: "", subheadline: "", ctaText: "" },
    features: [],
    testimonials: [],
    contact: { headline: "", emailPlaceholder: "", buttonText: "" }
  };
  showEditor();
  renderAll();
});

// Load Project
loadBtn.addEventListener("click", () => {
  const saved = localStorage.getItem("landingConfig");
  if (saved) {
    config = JSON.parse(saved);
    showEditor();
    renderAll();
  } else {
    alert("No saved project found.");
  }
});

// Save Project
saveBtn.addEventListener("click", () => {
  if (config) {
    localStorage.setItem("landingConfig", JSON.stringify(config));
    alert("Project saved!");
  }
});

// === HERO EDITOR ===
editorForm.addEventListener("submit", e => {
  e.preventDefault();
  config.hero.headline = document.getElementById("heroHeadline").value;
  config.hero.subheadline = document.getElementById("heroSubheadline").value;
  config.hero.ctaText = document.getElementById("heroCTA").value;
  renderAll();
});

// === CONTACT EDITOR ===
document.getElementById("updateContact").addEventListener("click", e => {
  e.preventDefault();
  config.contact.headline = document.getElementById("contactHeadline").value;
  config.contact.emailPlaceholder = document.getElementById("contactPlaceholder").value;
  config.contact.buttonText = document.getElementById("contactButton").value;
  renderAll();
});

// === SHOW EDITOR ===
function showEditor() {
  editorForm.classList.remove("hidden");
  document.getElementById("featuresEditor").classList.remove("hidden");
  document.getElementById("testimonialsEditor").classList.remove("hidden");
  document.getElementById("contactEditor").classList.remove("hidden");
  previewMessage.classList.add("hidden");
  pagePreview.classList.remove("hidden");
  saveBtn.disabled = false;
  populateForm();
  renderFeaturesEditor();
  renderTestimonialsEditor();
  populateContactForm();
}

// Populate Hero form
function populateForm() {
  document.getElementById("heroHeadline").value = config.hero.headline;
  document.getElementById("heroSubheadline").value = config.hero.subheadline;
  document.getElementById("heroCTA").value = config.hero.ctaText;
}

// Populate Contact form
function populateContactForm() {
  document.getElementById("contactHeadline").value = config.contact.headline;
  document.getElementById("contactPlaceholder").value = config.contact.emailPlaceholder;
  document.getElementById("contactButton").value = config.contact.buttonText;
}

// === RENDER ALL SECTIONS ===
function renderAll() {
  renderHero(config.hero);
  renderFeatures(config.features);
  renderTestimonials(config.testimonials);
  renderContact(config.contact);
}

// === HERO RENDER ===
function renderHero(hero) {
  document.getElementById("hero").innerHTML = `
    <div class="hero">
      <h1>${hero.headline || ""}</h1>
      <p>${hero.subheadline || ""}</p>
      ${hero.ctaText ? `<button>${hero.ctaText}</button>` : ""}
    </div>
  `;
}

// === FEATURES RENDER ===
function renderFeatures(features) {
  const container = document.getElementById("features");
  if (!features.length) {
    container.innerHTML = "";
    return;
  }
  container.innerHTML = `
    <h2>Features</h2>
    <div class="grid">
      ${features.map(f => `
        <div class="card">
          <h3>${f.title}</h3>
          <p>${f.desc}</p>
        </div>
      `).join("")}
    </div>
  `;
}

// === FEATURES EDITOR ===
function renderFeaturesEditor() {
  const list = document.getElementById("featuresList");
  list.innerHTML = "";
  config.features.forEach((f, index) => {
    const div = document.createElement("div");
    div.className = "feature-item";
    div.innerHTML = `
      <input type="text" value="${f.title}" placeholder="Feature title" data-index="${index}" data-field="title"/>
      <input type="text" value="${f.desc}" placeholder="Feature description" data-index="${index}" data-field="desc"/>
      <button data-index="${index}" class="removeFeature">Remove</button>
    `;
    list.appendChild(div);
  });
}

document.getElementById("addFeature").addEventListener("click", () => {
  config.features.push({ title: "", desc: "" });
  renderFeaturesEditor();
  renderAll();
});

document.getElementById("featuresList").addEventListener("input", e => {
  const index = e.target.dataset.index;
  const field = e.target.dataset.field;
  if (index !== undefined && field) {
    config.features[index][field] = e.target.value;
    renderAll();
  }
});

document.getElementById("featuresList").addEventListener("click", e => {
  if (e.target.classList.contains("removeFeature")) {
    const index = e.target.dataset.index;
    config.features.splice(index, 1);
    renderFeaturesEditor();
    renderAll();
  }
});

// === TESTIMONIALS RENDER ===
function renderTestimonials(testimonials) {
  const container = document.getElementById("testimonials");
  if (!testimonials.length) {
    container.innerHTML = "";
    return;
  }
  container.innerHTML = `
    <h2>Testimonials</h2>
    <div class="testimonials">
      ${testimonials.map(t => `
        <blockquote>
          "${t.quote}"
          <footer>- ${t.author}</footer>
        </blockquote>
      `).join("")}
    </div>
  `;
}

// === TESTIMONIALS EDITOR ===
function renderTestimonialsEditor() {
  const list = document.getElementById("testimonialsList");
  list.innerHTML = "";
  config.testimonials.forEach((t, index) => {
    const div = document.createElement("div");
    div.className = "testimonial-item";
    div.innerHTML = `
      <input type="text" value="${t.quote}" placeholder="Testimonial quote" data-index="${index}" data-field="quote"/>
      <input type="text" value="${t.author}" placeholder="Author" data-index="${index}" data-field="author"/>
      <button data-index="${index}" class="removeTestimonial">Remove</button>
    `;
    list.appendChild(div);
  });
}

document.getElementById("addTestimonial").addEventListener("click", () => {
  config.testimonials.push({ quote: "", author: "" });
  renderTestimonialsEditor();
  renderAll();
});

document.getElementById("testimonialsList").addEventListener("input", e => {
  const index = e.target.dataset.index;
  const field = e.target.dataset.field;
  if (index !== undefined && field) {
    config.testimonials[index][field] = e.target.value;
    renderAll();
  }
});

document.getElementById("testimonialsList").addEventListener("click", e => {
  if (e.target.classList.contains("removeTestimonial")) {
    const index = e.target.dataset.index;
    config.testimonials.splice(index, 1);
    renderTestimonialsEditor();
    renderAll();
  }
});

// === CONTACT RENDER ===
function renderContact(contact) {
  const container = document.getElementById("contact");
  if (!contact.headline && !contact.emailPlaceholder && !contact.buttonText) {
    container.innerHTML = "";
    return;
  }
  container.innerHTML = `
    <h2>${contact.headline || ""}</h2>
    <form id="contactForm">
      <input type="email" placeholder="${contact.emailPlaceholder || "Enter your email"}" required />
      <button type="submit">${contact.buttonText || "Submit"}</button>
    </form>
  `;
}
