import cardData from "../assets/cardData.json" with { type: "json" };

const DELAY_NUM = 30; // 카드 등장 딜레이 (ms)

function createCard(title, gridData) {
  const card = document.createElement("div");
  card.className = "card";

  const titleEl = document.createElement("div");
  titleEl.className = "card-title";
  titleEl.innerText = title;

  const grid = document.createElement("div");
  grid.className = "card-grid";

  gridData.forEach((rows) => {
    rows.forEach((type) => {
      const icon = document.createElement("div");
      icon.className = "icon " + type;
      grid.appendChild(icon);
    });
  });

  card.appendChild(titleEl);
  card.appendChild(grid);

  return card;
}

function renderCards(dataList) {
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";

  dataList.forEach((data, index) => {
    const card = createCard(data.title, data.grid);
    container.appendChild(card);

    setTimeout(() => {
      card.classList.add("show");
    }, index * DELAY_NUM); // delay num
  });
}

const sampleData = JSON.parse(JSON.stringify(cardData)); // 깊은 복사

renderCards(sampleData);
