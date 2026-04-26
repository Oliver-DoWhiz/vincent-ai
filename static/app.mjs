import { CONSENT_ITEMS, NON_DIAGNOSTIC_STATEMENTS, SCREENING_SECTIONS, STORAGE_KEY } from "./adhd-data.mjs";
import { countAnsweredCorePrompts, getCorePromptIds, scoreScreening } from "./adhd-scoring.mjs";
import { buildMarkdownReport } from "./adhd-report.mjs";

const page = document.body.dataset.page;

if (page === "screening") {
  initScreening();
}

function initScreening() {
  const elements = {
    taskEyebrow: document.getElementById("taskEyebrow"),
    taskTitle: document.getElementById("taskTitle"),
    taskLead: document.getElementById("taskLead"),
    progressLabel: document.getElementById("progressLabel"),
    progressPercent: document.getElementById("progressPercent"),
    progressBar: document.getElementById("progressBar"),
    progressAnswered: document.getElementById("progressAnswered"),
    saveProgressToggle: document.getElementById("saveProgressToggle"),
    clearLocalDataButton: document.getElementById("clearLocalDataButton"),
    questionCard: document.getElementById("questionCard"),
    questionIndex: document.getElementById("questionIndex"),
    dimensionBadge: document.getElementById("dimensionBadge"),
    stepMeta: document.getElementById("stepMeta"),
    questionPrompt: document.getElementById("questionPrompt"),
    questionHelp: document.getElementById("questionHelp"),
    optionList: document.getElementById("optionList"),
    fieldList: document.getElementById("fieldList"),
    previousButton: document.getElementById("previousButton"),
    nextButton: document.getElementById("nextButton"),
    crisisCard: document.getElementById("crisisCard"),
    clearAfterSafetyButton: document.getElementById("clearAfterSafetyButton"),
    resultCard: document.getElementById("resultCard"),
    resultHeadline: document.getElementById("resultHeadline"),
    resultName: document.getElementById("resultName"),
    resultSubtitle: document.getElementById("resultSubtitle"),
    resultSettingsCount: document.getElementById("resultSettingsCount"),
    resultOverlapCount: document.getElementById("resultOverlapCount"),
    resultEssence: document.getElementById("resultEssence"),
    resultReflection: document.getElementById("resultReflection"),
    dimensionBars: document.getElementById("dimensionBars"),
    nonDiagnosticList: document.getElementById("nonDiagnosticList"),
    clinicianChecklist: document.getElementById("clinicianChecklist"),
    overlapFallback: document.getElementById("overlapFallback"),
    overlapPills: document.getElementById("overlapPills"),
    reportPreview: document.getElementById("reportPreview"),
    resultFracture: document.getElementById("resultFracture"),
    resultCaution: document.getElementById("resultCaution"),
    clearAnswersButton: document.getElementById("clearAnswersButton"),
    copyReportButton: document.getElementById("copyReportButton"),
    downloadReportButton: document.getElementById("downloadReportButton"),
    printReportButton: document.getElementById("printReportButton"),
    actionStatus: document.getElementById("actionStatus"),
  };

  const steps = buildSteps();
  const restored = readSavedState();
  const state = normalizeState(restored);

  bindEvents();
  render();

  function bindEvents() {
    elements.previousButton.addEventListener("click", () => {
      state.index = Math.max(0, state.index - 1);
      persistIfEnabled();
      render();
    });

    elements.nextButton.addEventListener("click", async () => {
      const step = steps[state.index];
      if (!canContinue(step)) {
        return;
      }

      if (step.id === "safetyImmediateRisk" && state.responses.safetyImmediateRisk === "yes") {
        showCrisis();
        return;
      }

      if (state.index >= steps.length - 1) {
        showResult();
        return;
      }

      state.index += 1;
      persistIfEnabled();
      render();
    });

    elements.saveProgressToggle.addEventListener("change", () => {
      state.saveProgressEnabled = elements.saveProgressToggle.checked;
      if (state.saveProgressEnabled) {
        persistState();
      } else {
        clearSavedState();
      }
    });

    elements.clearLocalDataButton.addEventListener("click", () => {
      state.saveProgressEnabled = false;
      elements.saveProgressToggle.checked = false;
      clearSavedState();
      elements.actionStatus.textContent = "Saved local data cleared.";
    });

    elements.clearAfterSafetyButton.addEventListener("click", resetAll);
    elements.clearAnswersButton.addEventListener("click", resetAll);

    elements.copyReportButton.addEventListener("click", async () => {
      if (!state.report) {
        return;
      }
      try {
        await navigator.clipboard.writeText(state.report);
        elements.actionStatus.textContent = "Clinician summary copied to clipboard.";
      } catch (_error) {
        elements.actionStatus.textContent = "Copy failed. Your browser may block clipboard access here.";
      }
    });

    elements.downloadReportButton.addEventListener("click", () => {
      if (!state.report) {
        return;
      }
      const blob = new Blob([state.report], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "vincent-adhd-summary.md";
      link.click();
      URL.revokeObjectURL(url);
      elements.actionStatus.textContent = "Markdown report downloaded.";
    });

    elements.printReportButton.addEventListener("click", () => {
      window.print();
    });
  }

  function render() {
    const step = steps[state.index];
    elements.questionCard.classList.remove("hidden");
    elements.crisisCard.classList.add("hidden");
    elements.resultCard.classList.add("hidden");
    elements.actionStatus.textContent = "";
    elements.saveProgressToggle.checked = Boolean(state.saveProgressEnabled);

    renderHeader(step);
    renderStep(step);
  }

  function renderHeader(step) {
    const total = steps.length;
    const stepNumber = state.index + 1;
    const percent = Math.round((stepNumber / total) * 100);

    elements.taskEyebrow.textContent = step.eyebrow;
    elements.taskTitle.textContent = step.title;
    elements.taskLead.textContent = step.lead;
    elements.progressLabel.textContent = `Step ${stepNumber} of ${total}`;
    elements.progressPercent.textContent = `${percent}% done`;
    elements.progressBar.style.width = `${percent}%`;
    elements.progressAnswered.textContent = `${countAnsweredCorePrompts(state.responses)} of ${
      getCorePromptIds().length
    } core prompts answered`;
  }

  function renderStep(step) {
    elements.questionIndex.textContent = String(state.index + 1).padStart(2, "0");
    elements.dimensionBadge.textContent = step.badge;
    elements.stepMeta.textContent = step.required ? "Required" : "Optional";
    elements.questionPrompt.textContent = step.prompt;
    elements.questionHelp.textContent = step.help || "";
    elements.optionList.innerHTML = "";
    elements.fieldList.innerHTML = "";
    elements.questionHelp.classList.toggle("hidden", !step.help);
    elements.previousButton.disabled = state.index === 0;
    elements.nextButton.textContent = state.index === steps.length - 1 ? "Generate summary" : "Continue";
    elements.nextButton.disabled = !canContinue(step);

    if (step.type === "gate") {
      renderGate(step);
      return;
    }

    if (step.type === "single") {
      renderSingleChoice(step);
      return;
    }

    if (step.type === "multi") {
      renderMultiChoice(step);
      return;
    }

    if (step.type === "text-group") {
      renderTextGroup(step);
    }
  }

  function renderGate(step) {
    step.items.forEach((item) => {
      const label = document.createElement("label");
      label.className = "check-option";
      label.classList.toggle("active", state.scope.includes(item.id));

      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = state.scope.includes(item.id);
      input.addEventListener("change", () => {
        const next = new Set(state.scope);
        if (input.checked) {
          next.add(item.id);
        } else {
          next.delete(item.id);
        }
        state.scope = Array.from(next);
        persistIfEnabled();
        render();
      });

      const text = document.createElement("span");
      text.textContent = item.label;
      label.appendChild(input);
      label.appendChild(text);
      elements.optionList.appendChild(label);
    });
  }

  function renderSingleChoice(step) {
    const currentValue = state.responses[step.responseKey];
    step.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option-button button-reset";
      button.classList.toggle("active", currentValue === option.value);

      const indexLabel = document.createElement("span");
      indexLabel.className = "option-index";
      indexLabel.textContent = `Option ${index + 1}`;

      const text = document.createElement("span");
      text.className = "option-text";
      text.textContent = option.label;

      button.appendChild(indexLabel);
      button.appendChild(text);
      button.addEventListener("click", () => {
        state.responses[step.responseKey] = option.value;
        persistIfEnabled();
        render();
      });
      elements.optionList.appendChild(button);
    });
  }

  function renderMultiChoice(step) {
    const selections = new Set(Array.isArray(state.responses[step.responseKey]) ? state.responses[step.responseKey] : []);
    step.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option-button button-reset";
      button.classList.toggle("active", selections.has(option));

      const indexLabel = document.createElement("span");
      indexLabel.className = "option-index";
      indexLabel.textContent = `Select ${index + 1}`;

      const text = document.createElement("span");
      text.className = "option-text";
      text.textContent = option;

      button.appendChild(indexLabel);
      button.appendChild(text);
      button.addEventListener("click", () => {
        if (selections.has(option)) {
          selections.delete(option);
        } else {
          selections.add(option);
        }
        state.responses[step.responseKey] = Array.from(selections);
        persistIfEnabled();
        render();
      });
      elements.optionList.appendChild(button);
    });
  }

  function renderTextGroup(step) {
    step.fields.forEach((field) => {
      const wrapper = document.createElement("label");
      wrapper.className = "field-group";

      const label = document.createElement("strong");
      label.textContent = field.label;
      const help = document.createElement("span");
      help.textContent = field.help;

      const textarea = document.createElement("textarea");
      textarea.className = "text-area";
      textarea.rows = field.rows;
      textarea.value = state.responses[field.id] || "";
      textarea.addEventListener("input", () => {
        state.responses[field.id] = textarea.value;
        persistIfEnabled();
      });

      wrapper.appendChild(label);
      wrapper.appendChild(help);
      wrapper.appendChild(textarea);
      elements.fieldList.appendChild(wrapper);
    });
  }

  function showCrisis() {
    elements.questionCard.classList.add("hidden");
    elements.resultCard.classList.add("hidden");
    elements.crisisCard.classList.remove("hidden");
    persistIfEnabled();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showResult() {
    const result = scoreScreening(state.responses);
    if (result.safetyFlag) {
      showCrisis();
      return;
    }

    state.report = buildMarkdownReport(state.responses, result);
    elements.questionCard.classList.add("hidden");
    elements.crisisCard.classList.add("hidden");
    elements.resultCard.classList.remove("hidden");

    elements.resultHeadline.textContent = "Screening signal";
    elements.resultName.textContent = result.signal.label;
    elements.resultSubtitle.textContent = result.signal.modifier;
    elements.resultSettingsCount.textContent = String(result.summary.crossSettingCount);
    elements.resultOverlapCount.textContent = String(result.summary.overlappingCount);
    elements.resultEssence.textContent =
      "This is a self-report screening summary to help you decide whether it may be worth seeking formal evaluation.";
    elements.resultReflection.textContent =
      "Vincent does not diagnose ADHD, rule ADHD in or out, or replace a licensed clinician. It organizes your self-report into a more usable appointment summary.";

    renderReasons(result);
    renderList(elements.nonDiagnosticList, NON_DIAGNOSTIC_STATEMENTS);
    renderList(elements.clinicianChecklist, result.clinicianChecklist);
    renderOverlaps(result);

    elements.reportPreview.textContent = state.report;
    elements.resultFracture.textContent =
      state.responses.reasonForUsingVincent?.trim() ||
      "Reason for using Vincent was not written. The report uses the default summary instead.";
    elements.resultCaution.textContent =
      "Other factors such as sleep, anxiety, depression, trauma, substance use, medical issues, or burnout can overlap with ADHD-like symptoms.";

    persistIfEnabled();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderReasons(result) {
    elements.dimensionBars.innerHTML = "";
    const metrics = [
      {
        label: "Attention and executive function",
        total: Math.round((result.summary.attentionAverage / 4) * 100),
        note: result.reasons[0].body,
      },
      {
        label: "Restlessness and impulsivity",
        total: Math.round((result.summary.restlessnessAverage / 4) * 100),
        note: result.reasons[1].body,
      },
      {
        label: "Functional impact",
        total: Math.round((result.summary.impairmentAverage / 4) * 100),
        note: result.reasons[2].body,
      },
      {
        label: "Childhood history",
        total: Math.round((result.summary.childhoodAverage / 3) * 100),
        note: result.reasons[3].body,
      },
      {
        label: "Cross-setting pattern",
        total: Math.min(100, result.summary.crossSettingCount * 20),
        note: result.reasons[4].body,
      },
    ];

    metrics.forEach((metric) => {
      const row = document.createElement("div");
      row.className = "dimension-item";
      row.innerHTML = `
        <div class="dimension-label">
          <strong>${escapeHtml(metric.label)}</strong>
          <span>${metric.total}%</span>
        </div>
        <div class="dimension-meter"><span style="width:${metric.total}%"></span></div>
        <p class="dimension-note">${escapeHtml(metric.note)}</p>
      `;
      elements.dimensionBars.appendChild(row);
    });
  }

  function renderOverlaps(result) {
    elements.overlapPills.innerHTML = "";
    if (!result.overlapFactors.length) {
      elements.overlapFallback.textContent = result.overlapFallback;
      return;
    }

    elements.overlapFallback.textContent = "";
    result.overlapFactors.forEach((factor) => {
      const pill = document.createElement("span");
      pill.className = "info-pill";
      pill.textContent = factor;
      elements.overlapPills.appendChild(pill);
    });
  }

  function renderList(container, values) {
    container.innerHTML = "";
    values.forEach((value) => {
      const item = document.createElement("li");
      item.textContent = value;
      container.appendChild(item);
    });
  }

  function canContinue(step) {
    if (step.type === "gate") {
      return state.scope.length === CONSENT_ITEMS.length;
    }
    if (step.type === "single") {
      return state.responses[step.responseKey] !== undefined;
    }
    return true;
  }

  function resetAll() {
    state.index = 0;
    state.scope = [];
    state.responses = {
      crossSettings: [],
      overlappingFactors: [],
    };
    state.report = "";
    elements.actionStatus.textContent = "";
    if (state.saveProgressEnabled) {
      persistState();
    } else {
      clearSavedState();
    }
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function persistIfEnabled() {
    if (state.saveProgressEnabled) {
      persistState();
    }
  }

  function persistState() {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          index: state.index,
          scope: state.scope,
          responses: state.responses,
          report: state.report,
          saveProgressEnabled: state.saveProgressEnabled,
        })
      );
    } catch (_error) {
      elements.actionStatus.textContent = "Local save failed in this browser session.";
    }
  }

  function clearSavedState() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (_error) {
      elements.actionStatus.textContent = "Local saved data could not be cleared automatically.";
    }
  }
}

function buildSteps() {
  const steps = [
    {
      id: "scope",
      type: "gate",
      eyebrow: "Private screening",
      title: "Review the limits before you begin.",
      lead: "Vincent is adult-only, non-diagnostic, local-first, and not a crisis or treatment tool.",
      badge: "Scope",
      prompt: "Before starting, confirm the product boundary.",
      help: "You cannot begin the screening until every acknowledgement is checked.",
      items: CONSENT_ITEMS,
      required: true,
    },
  ];

  SCREENING_SECTIONS.forEach((section) => {
    if (section.kind === "single" || section.kind === "scaled") {
      section.questions.forEach((question, index) => {
        steps.push({
          id: question.id,
          type: "single",
          eyebrow: section.title,
          title: section.title,
          lead: section.description,
          badge: badgeForSection(section.id),
          prompt: question.prompt,
          help: index === 0 ? section.description : "",
          options: section.scale,
          responseKey: question.id,
          required: true,
        });
      });
    }

    if (section.kind === "multi") {
      steps.push({
        id: section.id,
        type: "multi",
        eyebrow: section.title,
        title: section.title,
        lead: section.description,
        badge: badgeForSection(section.id),
        prompt: section.description,
        help: section.id === "crossSetting" ? "Select every setting that applies. You can leave this blank if you are unsure." : "Select every overlapping factor you want to discuss with a clinician.",
        options: section.options,
        responseKey: section.id === "crossSetting" ? "crossSettings" : "overlappingFactors",
        required: false,
      });
    }

    if (section.textFields?.length) {
      steps.push({
        id: `${section.id}-notes`,
        type: "text-group",
        eyebrow: section.title,
        title: section.title,
        lead: section.description,
        badge: badgeForSection(section.id),
        prompt: section.id === "prep" ? "Add optional notes for yourself or a clinician." : "Add optional notes if they would help the summary.",
        help: "Optional. These notes stay in your browser unless you choose to export, copy, download, or print them.",
        fields: section.textFields,
        required: false,
      });
    }
  });

  return steps;
}

function badgeForSection(sectionId) {
  const map = {
    safety: "Safety",
    attention: "Attention",
    restlessness: "Restlessness",
    impairment: "Impact",
    childhood: "History",
    crossSetting: "Settings",
    overlaps: "Overlap",
    prep: "Prep",
  };
  return map[sectionId] || "Screening";
}

function normalizeState(saved) {
  const maxIndex = buildSteps().length - 1;
  return {
    index: Math.min(maxIndex, Math.max(0, Number.isInteger(saved?.index) ? saved.index : 0)),
    scope: Array.isArray(saved?.scope) ? saved.scope : [],
    responses: {
      crossSettings: Array.isArray(saved?.responses?.crossSettings) ? saved.responses.crossSettings : [],
      overlappingFactors: Array.isArray(saved?.responses?.overlappingFactors)
        ? saved.responses.overlappingFactors
        : [],
      ...saved?.responses,
    },
    report: typeof saved?.report === "string" ? saved.report : "",
    saveProgressEnabled: Boolean(saved?.saveProgressEnabled),
  };
}

function readSavedState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_error) {
    return null;
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
