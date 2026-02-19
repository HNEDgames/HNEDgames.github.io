const input = document.getElementById("valueInput");
const binaryText = document.getElementById("binary");
const gridA = document.getElementById("gridA");
const gridB = document.getElementById("gridB");
const warning = document.getElementById("warning");

function toBinary9(n) {
  return n.toString(2).padStart(9, "0");
}

function clearDisplay(msg = "") {
  warning.innerText = msg;
  gridA.innerHTML = "";
  gridB.innerHTML = "";
  binaryText.innerText = "";
}

const patterns = [["A"], ["A", "A"], ["A", "A", "A"]];

function render(W, fromInput = false) {
  if (W === 1557) {
    clearDisplay("⚠ 헤이헤이헤이");
    return;
  }
  if (W < 5 || W > 64000) {
    clearDisplay("⚠ 5~64000 사이의 값만 입력 가능합니다.");
    return;
  } else if (W % 5 !== 0) {
    clearDisplay("⚠ 5 단위로 입력해주세요.\n 모든 설비는 5단위 전력을 소모합니다.");
    return;
  }

  warning.innerText = "";

  let page = Math.floor(W / 2560);
  let inner = W % 2560;

  // 구역B
  gridB.innerHTML = "";

  const pattern = patterns[page] || [];

  const rowB = document.createElement("div");
  rowB.className = "row";

  pattern.forEach((type) => {
    const icon = document.createElement("div");
    icon.className = "icon " + type;
    rowB.appendChild(icon);
  });

  gridB.appendChild(rowB);

  // 구역A
  if (inner === 0) {
    gridA.innerHTML = "";
  } else {
    const n = Math.floor(inner / 5);

    const bin = toBinary9(n);
    binaryText.innerText = `${W} → (${W} % 2560 = ${inner}) → ${n} → ${bin}`;

    gridA.innerHTML = "";

    const reversed = bin.split("").reverse();

    reversed.forEach((bit) => {
      const row = document.createElement("div");
      row.className = "row";

      const base = document.createElement("div");
      base.className = "icon base";
      row.appendChild(base);

      if (bit === "0") {
        const A = document.createElement("div");
        A.className = "icon A";
        row.appendChild(A);
      } else {
        const B = document.createElement("div");
        B.className = "icon B";

        const A = document.createElement("div");
        A.className = "icon A r180";

        row.appendChild(B);
        row.appendChild(A);
      }

      gridA.appendChild(row);
    });
  }
}

// 입력창 변경
input.addEventListener("change", () => {
  const W = parseInt(input.value);
  render(W, true);
});

// 초기 실행
render(5);
