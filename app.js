const content = document.getElementById("content");
const tabs = document.querySelectorAll("#tabs a");

function setActiveTab(page) {
  tabs.forEach(t => t.classList.toggle("active", t.dataset.page === page));
}

async function loadPage(page) {
  setActiveTab(page);
  content.classList.add("loading");
  content.innerHTML = "Načítám…";

  try {
    const res = await fetch(`pages/${page}.html`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    content.innerHTML = html;
  } catch (e) {
    content.innerHTML = `
      <div class="error">
        <strong>Nepodařilo se načíst stránku:</strong> pages/${page}.html<br/>
        <small>${e.message}</small><br/><br/>
        Tip: pokud to otevíráš jako soubor (file://), spusť to přes lokální server.
      </div>`;
  } finally {
    content.classList.remove("loading");
  }
}

function getPageFromHash() {
  const hash = location.hash.replace("#", "").trim();
  return hash || "uvod";
}

window.addEventListener("hashchange", () => {
  loadPage(getPageFromHash());
});

// první načtení
loadPage(getPageFromHash());
