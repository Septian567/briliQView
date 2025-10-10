let questions = [];
let currentIndex = 0;
let score = 0;

// Upload file CSV
document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const text = e.target.result;
      questions = parseCSV(text);
      currentIndex = 0;
      score = 0;
      showQuestion();
    };
    reader.readAsText(file);
  });

// Parse CSV ke array soal
function parseCSV(text) {
  const lines = text.trim().split("\n");
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = splitCSVLine(lines[i]);
    const q = {
      no: cols[0],
      soal: cols[1],
      a: cols[2],
      b: cols[3],
      c: cols[4],
      d: cols[5],
      jawaban: cols[6]?.trim().toUpperCase(),
    };
    result.push(q);
  }
  return result;
}

// Pisahkan baris CSV (aman jika ada tanda kutip)
function splitCSVLine(line) {
  const result = [];
  let current = "";
  let insideQuotes = false;

  for (let ch of line) {
    if (ch === '"') {
      insideQuotes = !insideQuotes;
    } else if (ch === "," && !insideQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

// Tampilkan soal
function showQuestion() {
  const container = document.getElementById("quizContainer");
  container.innerHTML = "";

  if (currentIndex >= questions.length) {
    container.innerHTML = `
      <div class="card">
        <p id="result">✅ Ujian selesai!<br>Skor kamu: ${score} / ${questions.length}</p>
      </div>`;
    return;
  }

  const q = questions[currentIndex];
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="question"><b>${q.no}.</b> ${q.soal}</div>
    <div class="options">
      <button onclick="checkAnswer('A')">A. ${q.a}</button>
      <button onclick="checkAnswer('B')">B. ${q.b}</button>
      <button onclick="checkAnswer('C')">C. ${q.c}</button>
      <button onclick="checkAnswer('D')">D. ${q.d}</button>
    </div>
  `;
  container.appendChild(card);
}

function checkAnswer(answer) {
  const q = questions[currentIndex];
  if (answer === q.jawaban) score++;
  currentIndex++;
  showQuestion();
}
