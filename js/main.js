/* ===== Postavke – mijenjajte ovdje ===== */
const CONFIG = {
  // Velika fotografija iza naslova (prazno = tamna pozadina bez slike)
  heroImage: "slike/hero.jpg",
  // Galerija: datoteke u slike/galerija/
  gallery: ["1-1", "7", "5", "10", "2-1", "3-1", "4-1", "6", "8", "9", "11", "12", "13", "14", "15", "17", "19", "20"]
    .map(n => "slike/galerija/" + n + ".jpg"),
  // Proizvodi: naslov (ključ prijevoda) i slike u slike/proizvodi/. Prikazuje se prvih "show" slika, ostale u povećanju.
  products: [
    { t: "pr1", show: 7, imgs: ["glava4-4","glava1-1","glava2-3","glava3-4","glava4-2","glava5-2","glava6-1","glava1-2","glava1-3","glava1-4","glava2-1","glava2-2","glava2-4","glava2-5","glava2-6","glava3-1","glava3-2","glava3-3","glava3-5","glava4-1","glava4-3","glava4-5","glava4-6","glava4-7","glava5-1","glava5-3","glava5-4","glava5-5","glava5-6","glava6-2","glava6-3","glava6-4","glava6-5","glava6-6","glava6-7"] },
    { t: "pr2", show: 4, imgs: ["turbina1-1","turbina1-3","turbina1-5","turbina1-6","turbina1-2","turbina1-4","turbina1-7"] },
    { t: "pr3", show: 4, imgs: ["dijelovi10","dijelovi14","dijelovi6","dijelovi12","dijelovi13","dijelovi17","dijelovi5","dijelovi8"] },
    { t: "pr4", show: 2, imgs: ["dijelovi2","dijelovi1"] }
  ]
};

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const K_LANG = "ttm-web-lang";

/* ----- Jezici ----- */
const HR = {};
$$("[data-t]").forEach(el => { HR[el.dataset.t] = el.hasAttribute("data-html") ? el.innerHTML : el.textContent; });
HR._title = document.title;
HR._desc = $('meta[name="description"]').content;

function tr(lang, key) { return (T[lang] && T[lang][key]) || HR[key] || ""; }

function setLang(lang) {
  if (!LANGS.some(l => l.code === lang)) lang = "hr";
  document.documentElement.lang = lang;
  $$("[data-t]").forEach(el => {
    const v = tr(lang, el.dataset.t);
    if (el.hasAttribute("data-html")) el.innerHTML = v; else el.textContent = v;
  });
  document.title = tr(lang, "_title");
  $('meta[name="description"]').content = tr(lang, "_desc");
  $$("#langs button").forEach(b => b.setAttribute("aria-pressed", b.dataset.lang === lang));
  try { localStorage.setItem(K_LANG, lang); } catch (e) {}
}

$("#langs").innerHTML = LANGS.map(l =>
  `<button type="button" data-lang="${l.code}" title="${l.name}" aria-label="${l.name}"><img src="${l.flag}" alt=""></button>`).join("");
$("#langs").addEventListener("click", e => { const b = e.target.closest("button"); if (b) setLang(b.dataset.lang); });

/* ----- Hero slika ----- */
if (CONFIG.heroImage) $(".hero-bg").style.setProperty("--hero-img", `url("${new URL(CONFIG.heroImage, location.href).href}")`);

/* ----- Proizvodi ----- */
const P_TITLE = { pr1: "Nove glave motora", pr2: "Nove turbine", pr3: "Racing ležajevi", pr4: "Čahure dizni" };
Object.assign(HR, P_TITLE);
$("#products").innerHTML = CONFIG.products.map((p, gi) => {
  const more = p.imgs.length - p.show;
  return `<div class="pgroup"><h3 data-t="${p.t}">${P_TITLE[p.t]}</h3><div class="pgrid">` +
    p.imgs.slice(0, p.show).map((n, i) =>
      `<button type="button" data-g="p${gi}" data-i="${i}"><img src="slike/proizvodi/${n}.jpg" alt="" loading="lazy">` +
      (i === p.show - 1 && more > 0 ? `<span class="more">+${more}</span>` : "") + `</button>`).join("") +
    `</div></div>`;
}).join("");

/* ----- Galerija ----- */
$("#gallery").innerHTML = CONFIG.gallery.map((src, i) =>
  `<button type="button" data-g="gal" data-i="${i}"><img src="${src}" alt="" loading="lazy"></button>`).join("");

/* ----- Povećanje slike s listanjem ----- */
const SETS = { gal: CONFIG.gallery };
CONFIG.products.forEach((p, gi) => { SETS["p" + gi] = p.imgs.map(n => `slike/proizvodi/${n}.jpg`); });
const lb = $("#lb"), lbImg = lb.querySelector("img");
let cur = null, idx = 0;
function show(i) {
  const set = SETS[cur]; idx = (i + set.length) % set.length;
  lbImg.src = set[idx];
  lb.querySelector(".lb-c").textContent = `${idx + 1} / ${set.length}`;
  lb.classList.toggle("single", set.length < 2);
}
document.addEventListener("click", e => {
  const b = e.target.closest("button[data-g]"); if (!b) return;
  cur = b.dataset.g; show(+b.dataset.i); lb.hidden = false; lb.querySelector(".lb-x").focus();
});
lb.addEventListener("click", e => {
  if (e.target.closest(".lb-p")) return show(idx - 1);
  if (e.target.closest(".lb-n")) return show(idx + 1);
  if (e.target === lbImg) return show(idx + 1);
  lb.hidden = true;
});
document.addEventListener("keydown", e => {
  if (lb.hidden) return;
  if (e.key === "Escape") lb.hidden = true;
  if (e.key === "ArrowLeft") show(idx - 1);
  if (e.key === "ArrowRight") show(idx + 1);
});

/* ----- Izbornik na mobitelu ----- */
const burger = $("#burger"), menu = $("#menu");
burger.addEventListener("click", () => {
  const open = burger.getAttribute("aria-expanded") !== "true";
  burger.setAttribute("aria-expanded", open); menu.classList.toggle("open", open);
});
menu.addEventListener("click", e => {
  if (e.target.closest("a")) { burger.setAttribute("aria-expanded", "false"); menu.classList.remove("open"); }
});

/* ----- Označi aktivnu sekciju u izborniku ----- */
const links = $$(".menu a");
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) links.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + en.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
links.forEach(a => { const s = $(a.getAttribute("href")); if (s) io.observe(s); });

$("#year").textContent = new Date().getFullYear();

let start = "hr";
try { start = localStorage.getItem(K_LANG) || "hr"; } catch (e) {}
setLang(start);
