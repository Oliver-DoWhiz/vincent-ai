(function () {
  const page = document.body.dataset.page;

  if (page !== "assessment") {
    return;
  }

  const state = {
    questions: [],
    answers: {},
    index: 0,
  };

  const elements = {
    dimensionBadge: document.getElementById("dimensionBadge"),
    questionIndex: document.getElementById("questionIndex"),
    questionPrompt: document.getElementById("questionPrompt"),
    optionList: document.getElementById("optionList"),
    previousButton: document.getElementById("previousButton"),
    nextButton: document.getElementById("nextButton"),
    progressLabel: document.getElementById("progressLabel"),
    progressPercent: document.getElementById("progressPercent"),
    progressBar: document.getElementById("progressBar"),
    dimensionChips: document.getElementById("dimensionChips"),
    questionCard: document.getElementById("questionCard"),
    resultCard: document.getElementById("resultCard"),
    resultTone: document.getElementById("resultTone"),
    shadowBadge: document.getElementById("shadowBadge"),
    resultName: document.getElementById("resultName"),
    resultSubtitle: document.getElementById("resultSubtitle"),
    resultEssence: document.getElementById("resultEssence"),
    resultSimilarity: document.getElementById("resultSimilarity"),
    resultSignature: document.getElementById("resultSignature"),
    dimensionBars: document.getElementById("dimensionBars"),
    resultGifts: document.getElementById("resultGifts"),
    resultSupport: document.getElementById("resultSupport"),
    resultFracture: document.getElementById("resultFracture"),
    resultCaution: document.getElementById("resultCaution"),
    restartButton: document.getElementById("restartButton"),
  };

  const dimensionNames = {
    DRIVE: "Ambition",
    BOUNDARY: "Boundary",
    EXPOSURE: "Visibility",
    VOLATILITY: "Intensity",
    DISCIPLINE: "Discipline",
    INTERPRETATION: "Meaning-Making",
    ATTACHMENT: "Attachment",
    INITIATIVE: "Initiative",
  };

  async function init() {
    const response = await fetch("/api/questions");
    state.questions = await response.json();
    bindEvents();
    render();
  }

  function bindEvents() {
    elements.previousButton.addEventListener("click", () => {
      state.index = Math.max(0, state.index - 1);
      render();
    });

    elements.nextButton.addEventListener("click", async () => {
      const current = state.questions[state.index];
      if (!state.answers[current.id]) {
        elements.nextButton.textContent = "Choose an answer first";
        setTimeout(() => {
          elements.nextButton.textContent = labelForNextButton();
        }, 900);
        return;
      }

      if (state.index === state.questions.length - 1) {
        await submit();
        return;
      }

      state.index += 1;
      render();
    });

    elements.restartButton.addEventListener("click", () => {
      state.answers = {};
      state.index = 0;
      elements.resultCard.classList.add("hidden");
      elements.questionCard.classList.remove("hidden");
      render();
    });
  }

  function render() {
    const question = state.questions[state.index];
    if (!question) {
      return;
    }

    const answeredCount = Object.keys(state.answers).length;
    const progress = Math.max(1, Math.round(((state.index + 1) / state.questions.length) * 100));

    elements.dimensionBadge.textContent = dimensionNames[question.dimension] || question.dimension;
    elements.questionIndex.textContent = String(state.index + 1).padStart(2, "0");
    elements.questionPrompt.textContent = question.prompt;
    elements.progressLabel.textContent = `Question ${state.index + 1} of ${state.questions.length}`;
    elements.progressPercent.textContent = `${progress}%`;
    elements.progressBar.style.width = `${progress}%`;
    elements.previousButton.disabled = state.index === 0;
    elements.nextButton.textContent = labelForNextButton();
    elements.optionList.innerHTML = "";

    question.options.forEach((option, idx) => {
      const button = document.createElement("button");
      button.className = "option-button button-reset";
      if (state.answers[question.id] === option.value) {
        button.classList.add("active");
      }
      button.type = "button";
      button.innerHTML = `<small>Option ${idx + 1}</small>${option.label}`;
      button.addEventListener("click", () => {
        state.answers[question.id] = option.value;
        render();
      });
      elements.optionList.appendChild(button);
    });

    renderDimensionChips(answeredCount);
  }

  function renderDimensionChips(answeredCount) {
    const grouped = {};

    state.questions.forEach((question) => {
      if (!grouped[question.dimension]) {
        grouped[question.dimension] = { total: 0, answered: 0 };
      }
      grouped[question.dimension].total += 1;
      if (state.answers[question.id]) {
        grouped[question.dimension].answered += 1;
      }
    });

    elements.dimensionChips.innerHTML = "";
    Object.entries(grouped).forEach(([key, value]) => {
      const div = document.createElement("div");
      div.className = "chip";
      div.innerHTML = `<strong>${dimensionNames[key] || key}</strong><span>${value.answered}/${value.total} answered</span>`;
      elements.dimensionChips.appendChild(div);
    });

    if (answeredCount === state.questions.length) {
      elements.progressPercent.textContent = "Ready";
    }
  }

  function labelForNextButton() {
    return state.index === state.questions.length - 1 ? "Reveal Result" : "Next";
  }

  async function submit() {
    elements.nextButton.textContent = "Scoring…";

    const response = await fetch("/api/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: state.answers }),
    });

    const payload = await response.json();
    if (!response.ok) {
      elements.nextButton.textContent = payload.error || "Try Again";
      return;
    }

    renderResult(payload);
  }

  function renderResult(payload) {
    const { archetype, similarity, signature, shadow_triggered, dimensions, narrative } = payload;

    elements.questionCard.classList.add("hidden");
    elements.resultCard.classList.remove("hidden");

    elements.resultTone.textContent = archetype.tone;
    elements.resultName.textContent = archetype.name;
    elements.resultSubtitle.textContent = archetype.subtitle;
    elements.resultEssence.textContent = archetype.essence;
    elements.resultSimilarity.textContent = `${similarity}%`;
    elements.resultSignature.textContent = signature;
    elements.resultFracture.textContent = archetype.fracture;
    elements.resultCaution.textContent = narrative.caution;

    if (shadow_triggered) {
      elements.shadowBadge.classList.remove("hidden");
    } else {
      elements.shadowBadge.classList.add("hidden");
    }

    elements.resultGifts.innerHTML = "";
    archetype.gifts.forEach((gift) => {
      const item = document.createElement("li");
      item.textContent = gift;
      elements.resultGifts.appendChild(item);
    });

    elements.resultSupport.innerHTML = "";
    archetype.support.forEach((entry) => {
      const item = document.createElement("li");
      item.textContent = entry;
      elements.resultSupport.appendChild(item);
    });

    elements.dimensionBars.innerHTML = "";
    dimensions.forEach((dimension) => {
      const row = document.createElement("div");
      row.className = "dimension-row";
      const width = Math.max(12, Math.min(100, (dimension.total / 9) * 100));
      row.innerHTML = `
        <label>${dimension.label} · ${dimension.band}</label>
        <div class="dimension-meter"><span style="width:${width}%"></span></div>
        <p>${dimension.interpretation}</p>
      `;
      elements.dimensionBars.appendChild(row);
    });
  }

  init().catch(() => {
    elements.questionPrompt.textContent = "Vincent could not load the assessment right now.";
    elements.optionList.innerHTML = "";
  });
})();
