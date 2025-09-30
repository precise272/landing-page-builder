let config = null;

// DOM references
const newBtn = document.getElementById("newProject");
const loadBtn = document.getElementById("loadProject");
const saveBtn = document.getElementById("saveProject");
const editorForm = document.getElementById("editorForm");
const previewMessage = document.getElementById("previewMessage");
const pagePreview = document.getElementById("pagePreview");

// New Project
newBtn.addEventListener("click", () => {
  config = {
    hero: { headline: "", subheadline: "", ctaText: "" },
    features: [],
    testimonials: [],
    contact: {}
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

// Editor Form Submit
editorForm.addEventListener("submit", e => {
  e.preventDefault();
  config.hero.headline = document.getElementById("heroHeadline").value;
  config.hero.subheadline = document.getElementById("heroSubheadline").value;
  config.hero.ctaText = document.getElementById("heroCTA").value;
  renderAll();
});

// Helpers
function showEditor() {
  editorForm.classList.remove("hidden");
  previewMessage.classList.add("hidden");
  pagePreview.classList.remove("hidden");
  saveBtn.disabled = false;
  populateForm();
}

function populateForm() {
  document.getElementById("heroHeadline").value = config.hero.headline;
  document.getElementById("heroSubheadline").value = config.hero.subheadline;
  document.getElementById("heroCTA").value = config.hero.ctaText;
}

function renderAll() {
  renderHero(config.hero);
  // Features, testimonials, contact will be added later
}

function renderHero(hero) {
  document.getElementById("hero").innerHTML = `
    <div class="hero">
      <h1>${hero.headline || ""}</h1>
      <p>${hero.subheadline || ""}</p>
      ${hero.ctaText ? `<button>${hero.ctaText}</button>` : ""}
    </div>
  `;
}
