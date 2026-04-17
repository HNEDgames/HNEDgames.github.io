const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeSidebar");

const themeMap = {
  index: "#ffcc00",
};

function openSidebar() {
  sidebar.classList.add("open");
  overlay.classList.add("show");
}

function closeSidebar() {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
}

function applyTheme(page) {
  const color = themeMap[page] || "#ffcc00";
  document.documentElement.style.setProperty("--theme-color", color);
}

const tabs = document.querySelectorAll(".side-tab");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    const page = tab.dataset.page;

    // 👉 페이지 이동 (멀티 HTML 방식)
    applyTheme(page);
    closeSidebar();
    window.location.href = page + ".html";
  });
});

const path = location.pathname;

tabs.forEach((tab) => {
  if (path.includes(tab.dataset.page)) {
    tab.classList.add("active");
  }
});

const currentPage = location.pathname.split("/").pop().replace(".html", "");

applyTheme(currentPage);

menuBtn.addEventListener("click", openSidebar);
overlay.addEventListener("click", closeSidebar);
closeBtn.addEventListener("click", closeSidebar);
