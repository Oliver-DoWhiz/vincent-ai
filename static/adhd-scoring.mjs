import { CLINICIAN_CHECKLIST, CROSS_SETTING_OPTIONS, OVERLAPPING_FACTORS, SCREENING_SECTIONS } from "./adhd-data.mjs";

const ATTENTION_IDS = SCREENING_SECTIONS.find((section) => section.id === "attention").questions.map(
  (question) => question.id
);
const RESTLESSNESS_IDS = SCREENING_SECTIONS.find((section) => section.id === "restlessness").questions.map(
  (question) => question.id
);
const IMPAIRMENT_IDS = SCREENING_SECTIONS.find((section) => section.id === "impairment").questions.map(
  (question) => question.id
);
const CHILDHOOD_IDS = SCREENING_SECTIONS.find((section) => section.id === "childhood").questions.map(
  (question) => question.id
);

export function getCorePromptIds() {
  return [
    "safetyImmediateRisk",
    ...ATTENTION_IDS,
    ...RESTLESSNESS_IDS,
    ...IMPAIRMENT_IDS,
    ...CHILDHOOD_IDS,
  ];
}

export function countAnsweredCorePrompts(responses) {
  return getCorePromptIds().filter((id) => responses[id] !== undefined && responses[id] !== "").length;
}

export function validateResponses(responses) {
  const missing = getCorePromptIds().filter((id) => responses[id] === undefined || responses[id] === "");
  return {
    valid: missing.length === 0,
    missing,
  };
}

function averageFor(ids, responses) {
  const values = ids.map((id) => Number(responses[id])).filter((value) => Number.isFinite(value));
  if (!values.length) {
    return 0;
  }
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function labelChildhood(avg) {
  if (avg >= 2.2) {
    return "Childhood-history evidence appears clearly present based on self-report.";
  }
  if (avg >= 1.4) {
    return "Childhood-history evidence appears partially present based on self-report.";
  }
  if (avg >= 0.8) {
    return "Childhood-history evidence is mixed or uncertain based on self-report.";
  }
  return "Childhood-history evidence appears limited based on self-report.";
}

function labelCurrentPatterns(avg, heading) {
  if (avg >= 3) {
    return `${heading} were reported as frequent to very frequent.`;
  }
  if (avg >= 2) {
    return `${heading} were reported as recurring and meaningful.`;
  }
  if (avg >= 1.2) {
    return `${heading} were reported as occasional or situational.`;
  }
  return `${heading} were reported as low-frequency overall.`;
}

function labelImpairment(avg) {
  if (avg >= 3) {
    return "Functional impact was rated as significant to severe across multiple adult responsibilities.";
  }
  if (avg >= 2) {
    return "Functional impact was rated as moderate or higher in adult responsibilities.";
  }
  if (avg >= 1.2) {
    return "Functional impact was present but uneven or milder.";
  }
  return "Functional impact was rated as low overall.";
}

function labelCrossSetting(count) {
  if (count >= 4) {
    return `A cross-setting pattern was reported in ${count} settings.`;
  }
  if (count >= 2) {
    return `A cross-setting pattern was reported in ${count} settings.`;
  }
  if (count === 1) {
    return "A meaningful pattern was reported in one setting.";
  }
  return "No clear cross-setting pattern was selected.";
}

function buildSignal({
  safetyFlag,
  symptomAverage,
  impairmentAverage,
  childhoodAverage,
  crossSettingCount,
  overlappingCount,
}) {
  const lowSymptoms = symptomAverage < 1.25;
  const lowImpairment = impairmentAverage < 1;
  const elevatedCore =
    symptomAverage >= 2.5 &&
    impairmentAverage >= 2 &&
    crossSettingCount >= 2 &&
    childhoodAverage >= 1.4;
  const meaningfulButIncomplete =
    symptomAverage >= 1.8 &&
    (impairmentAverage >= 1.5 || crossSettingCount >= 2 || childhoodAverage >= 1);
  const heavyOverlap = overlappingCount >= 5;
  const weakHistory = childhoodAverage < 1;

  if (safetyFlag) {
    return {
      label: "Inconclusive / more context needed",
      modifier: "Safety support should take priority over this screening.",
    };
  }

  if (lowSymptoms && lowImpairment) {
    return {
      label: "Low ADHD-related screening signal",
      modifier: "Current self-report did not show a strong ADHD-like pattern.",
    };
  }

  if (elevatedCore) {
    return {
      label: "Elevated ADHD-related screening signal",
      modifier:
        heavyOverlap
          ? "Elevated signal, with overlapping factors to discuss."
          : "Multiple evidence areas moved in the same direction.",
    };
  }

  if (heavyOverlap && symptomAverage >= 2 && weakHistory && crossSettingCount < 2) {
    return {
      label: "Inconclusive / more context needed",
      modifier: "Several overlapping factors and limited history make interpretation less clear.",
    };
  }

  if (meaningfulButIncomplete) {
    return {
      label: "Moderate ADHD-related screening signal",
      modifier: "Some evidence areas were meaningful, but the pattern was incomplete or mixed.",
    };
  }

  return {
    label: "Low ADHD-related screening signal",
    modifier: "Some isolated concerns were present, but the overall pattern stayed below the stronger bands.",
  };
}

export function scoreScreening(responses) {
  const validation = validateResponses(responses);
  const safetyFlag = responses.safetyImmediateRisk === "yes";
  const attentionAverage = averageFor(ATTENTION_IDS, responses);
  const restlessnessAverage = averageFor(RESTLESSNESS_IDS, responses);
  const impairmentAverage = averageFor(IMPAIRMENT_IDS, responses);
  const childhoodAverage = averageFor(CHILDHOOD_IDS, responses);
  const symptomAverage =
    averageFor([...ATTENTION_IDS, ...RESTLESSNESS_IDS], responses);
  const crossSettingSelections = Array.isArray(responses.crossSettings) ? responses.crossSettings : [];
  const overlapSelections = Array.isArray(responses.overlappingFactors) ? responses.overlappingFactors : [];
  const signal = buildSignal({
    safetyFlag,
    symptomAverage,
    impairmentAverage,
    childhoodAverage,
    crossSettingCount: crossSettingSelections.length,
    overlappingCount: overlapSelections.length,
  });

  return {
    validation,
    signal,
    safetyFlag,
    summary: {
      attentionAverage,
      restlessnessAverage,
      impairmentAverage,
      childhoodAverage,
      symptomAverage,
      crossSettingCount: crossSettingSelections.length,
      overlappingCount: overlapSelections.length,
    },
    reasons: [
      {
        heading: "Attention and executive function",
        body: labelCurrentPatterns(attentionAverage, "Attention and executive-function patterns"),
      },
      {
        heading: "Restlessness and impulsivity",
        body: labelCurrentPatterns(restlessnessAverage, "Restlessness and impulsivity patterns"),
      },
      {
        heading: "Functional impact",
        body: labelImpairment(impairmentAverage),
      },
      {
        heading: "Childhood history",
        body: labelChildhood(childhoodAverage),
      },
      {
        heading: "Cross-setting pattern",
        body: labelCrossSetting(crossSettingSelections.length),
      },
    ],
    overlapFactors: overlapSelections,
    overlapFallback:
      "No overlapping factors were selected. That does not rule anything in or out; it only means nothing was checked here.",
    clinicianChecklist: CLINICIAN_CHECKLIST,
    crossSettingSelections,
  };
}

export function getReportContext(responses, result) {
  const crossSettings = Array.isArray(responses.crossSettings) ? responses.crossSettings : [];
  const overlaps = Array.isArray(responses.overlappingFactors) ? responses.overlappingFactors : [];

  return {
    signal: `${result.signal.label}${result.signal.modifier ? ` (${result.signal.modifier})` : ""}`,
    reasonForUsingVincent:
      responses.reasonForUsingVincent?.trim() ||
      "User wanted a structured way to organize ADHD-related concerns before deciding whether to seek a formal evaluation.",
    recentExamples: responses.recentExamples?.trim() || responses.impairmentExamples?.trim() || "No specific examples were written.",
    currentPatterns: {
      attention: labelCurrentPatterns(result.summary.attentionAverage, "Attention and executive-function patterns"),
      restlessness: labelCurrentPatterns(result.summary.restlessnessAverage, "Restlessness and impulsivity patterns"),
    },
    functionalImpact: responses.impairmentExamples?.trim() || labelImpairment(result.summary.impairmentAverage),
    childhoodHistory: labelChildhood(result.summary.childhoodAverage),
    crossSettingPattern:
      crossSettings.length > 0
        ? `${crossSettings.length} settings selected: ${crossSettings.join(", ")}.`
        : "No clear cross-setting pattern was selected.",
    overlapFactors:
      overlaps.length > 0 ? overlaps : ["No overlapping factors were selected."],
    clinicianQuestions:
      responses.questionsForClinician?.trim() ||
      "What would a formal adult ADHD evaluation include, and what overlapping factors should be reviewed?",
    safetyNote: result.safetyFlag
      ? "Safety flag triggered. Vincent stopped normal screening flow and directed the user to urgent support resources."
      : "No immediate safety flag was reported in the screening.",
  };
}

export function getCrossSettingOptions() {
  return [...CROSS_SETTING_OPTIONS];
}

export function getOverlappingFactors() {
  return [...OVERLAPPING_FACTORS];
}
