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

const sampleData = [
  {
    title: "아이콘배치 1",
    grid: [
      ["A", "A", "B", "A", "A", "B", "A", "A", "A"],
      ["A", "A", "A", "A", "A", "A", "A", "A", "A"],
    ],
  },
  {
    title: "아이콘배치 2",
    grid: [
      ["B", "A", "B", "A", "B", "A", "B", "A", "B"],
      ["A", "A", "A", "A", "A", "A", "A", "A", "A"],
    ],
  },
  {
    title: "아이콘배치 3",
    grid: [
      ["B", "A", "B", "A", "B", "A", "B", "A", "B"],
      ["A", "A", "A", "A", "A", "A", "A", "A", "A"],
      ["A", "A", "A", "A", "A", "A", "A", "A", "A"],
    ],
  },
  {
    title: "테스트글자길이테스트글자길이테스트글자길이",
    grid: [
      ["B", "A", "B", "A", "B", "A", "B", "A", "B"],
      ["A", "A", "A", "A", "A", "A", "A", "A", "A"],
      ["A", "A", "A", "A", "A", "A", "A", "A", "A"],
    ],
  },

  {
    title: "테스트글자길이테스트글자길이테스트글자길이",
    grid: [
      ["B", "A", "B", "A", "B", "A", "B", "A", "B"],
      ["A", "A", "A", "A", "A", "A", "A", "A", "A"],
      ["A", "A", "A", "A", "A", "A", "A", "A", "A"],
    ],
  },
];

renderCards(sampleData);
