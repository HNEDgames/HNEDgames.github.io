import gridData from "./assets/gridData.json" with { type: "json" };

// fetch("./assets/gridData.json")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   });

const input = document.getElementById("valueInput");
const binaryText = document.getElementById("binary");
const gridA = document.getElementById("gridA");
const gridB = document.getElementById("gridB");
const warning = document.getElementById("warning");

////////////////////////////// 유틸 함수

function toBinary9(n) {
  return n.toString(2).padStart(9, "0");
}

function clearDisplay(msg = "") {
  warning.innerText = msg;
  gridA.innerHTML = "";
  gridB.innerHTML = "";
  binaryText.innerText = "";
}

function editSectorBForPage(page, inner) {
  let patterns = JSON.parse(JSON.stringify(gridData.sectorB)); // 깊은 복사
  const idx = Math.floor(page / 5);

  if (page % 5 > 0) {
    patterns[1][0] = "Bzg";
  }
  if (page % 5 > 1) {
    patterns[1][2] = "Bzg";
  }
  if (page % 5 > 2) {
    patterns[3][4] = "Bzg";
  }
  if (page % 5 > 3) {
    patterns[4][3] = "Bzg";
  }

  if (idx % 5 > 0) {
    patterns[7][0] = "Bzg";
  }
  if (idx % 5 > 1) {
    patterns[7][2] = "Bzg";
  }
  if (idx % 5 > 2) {
    patterns[9][4] = "Bzg";
  }
  if (idx % 5 > 3) {
    patterns[10][3] = "Bzg";
  }

  if (inner === 0) {
    patterns = patterns.slice(6, 11);
  }

  return patterns;
}

////////////////////////////// 렌더링 함수

function renderRowForGridA(n) {
  const patterns = gridData.sectorA[n];

  const row = document.createElement("div");
  row.className = "row";
  patterns.forEach((type) => {
    const icon = document.createElement("div");
    icon.className = "icon " + type;
    row.appendChild(icon);
  });

  gridA.appendChild(row);
}

function render(W, fromInput = false) {
  if (W === 1557) {
    clearDisplay("⚠ 헤이헤이헤이");
    return;
  } else if (W <= 200) {
    clearDisplay("⚠ 배터리가 필요하지 않습니다.");
    return;
  } else if (W > 64200) {
    clearDisplay("⚠ 64000 이하의 전력량만 분할 가능합니다.");
    return;
  } else if (W % 5 !== 0) {
    clearDisplay("⚠ 5 단위로 입력해주세요.\n 모든 설비는 5단위 전력을 소모합니다.");
    return;
  }

  let realW = W - 200;

  warning.innerText = "";

  let page = Math.floor(realW / 2560);
  let inner = realW % 2560;

  ///// 구역B
  {
    gridB.innerHTML = "";

    let patterns = editSectorBForPage(page, inner);

    patterns.forEach((rows) => {
      const row = document.createElement("div");
      row.className = "row";

      rows.forEach((type) => {
        const icon = document.createElement("div");
        icon.className = "icon " + type;
        row.appendChild(icon);
      });

      gridB.appendChild(row);
    });
  }
  ///// 구역A
  {
    const n = Math.floor(inner / 5);
    const bin = toBinary9(n);
    binaryText.innerText = `
    5분할 사용량: ${W} - 200 → [ ${realW} // 2560 = ${page} ] → ${page}₅\n
    2분할 사용량: ${W} - 200 → [ ${realW} % 2560 = ${inner} ] → [ ÷5 = ${n} ] → ${bin}₂
    `;

    gridA.innerHTML = "";

    if (inner !== 0) {
      renderRowForGridA(3);
      const reversed = bin.split("").reverse();

      reversed.forEach((bit) => {
        if (bit === "0") {
          renderRowForGridA(0);
        } else {
          renderRowForGridA(1);
        }
      });

      renderRowForGridA(2);
    }
  }
}

////////////////////////////// 리스너 추가

// 입력창 변경
input.addEventListener("change", () => {
  const W = parseInt(input.value);
  render(W, true);
});

// 초기 실행
render(205);
