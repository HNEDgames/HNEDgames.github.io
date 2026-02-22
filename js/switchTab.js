const tabs = document.querySelectorAll(".tab");
const page = document.getElementById("page");

// 탭 클릭
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    const tmpHtml = '<object type="text/html" data="./html/' + target + '.html"></object>';
    page.innerHTML = tmpHtml;
  });
});
