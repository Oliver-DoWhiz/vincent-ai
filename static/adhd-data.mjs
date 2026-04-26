export const STORAGE_KEY = "vincent.adhd.local-first.v1";

export const CONSENT_ITEMS = [
  {
    id: "adult",
    label: "I am 18 or older.",
  },
  {
    id: "nonDiagnostic",
    label: "I understand Vincent does not diagnose ADHD or any other condition.",
  },
  {
    id: "noCare",
    label:
      "I understand this tool does not provide therapy, crisis support, medication guidance, or treatment advice.",
  },
  {
    id: "localPrivacy",
    label:
      "I understand my answers stay in my browser unless I choose to export, copy, print, or save them on this device.",
  },
];

export const SCALES = {
  frequency: [
    { value: 0, label: "Never" },
    { value: 1, label: "Rarely" },
    { value: 2, label: "Sometimes" },
    { value: 3, label: "Often" },
    { value: 4, label: "Very often" },
  ],
  impact: [
    { value: 0, label: "No impact" },
    { value: 1, label: "Mild impact" },
    { value: 2, label: "Moderate impact" },
    { value: 3, label: "Significant impact" },
    { value: 4, label: "Severe impact" },
  ],
  childhood: [
    { value: 0, label: "No" },
    { value: 1, label: "Not sure" },
    { value: 2, label: "Some evidence" },
    { value: 3, label: "Clear evidence" },
  ],
  safety: [
    { value: "no", label: "No" },
    { value: "yes", label: "Yes" },
  ],
};

export const CROSS_SETTING_OPTIONS = [
  "Work or school",
  "Home responsibilities",
  "Relationships",
  "Social situations",
  "Finances or admin",
  "Errands and daily logistics",
  "Hobbies or long-term personal projects",
];

export const OVERLAPPING_FACTORS = [
  "Insufficient sleep",
  "Possible sleep apnea signs such as loud snoring, waking gasping, or strong daytime sleepiness",
  "Anxiety symptoms",
  "Depressive symptoms",
  "Major burnout or chronic stress",
  "Trauma or PTSD symptoms",
  "Periods of unusually high energy with reduced need for sleep or risky behavior",
  "Substance use including cannabis, alcohol, non-prescribed stimulants, or sedatives",
  "Autism-related social or sensory rigidity, if relevant",
  "Learning difficulties",
  "Medical factors such as thyroid issues, anemia, chronic pain, or medication side effects",
];

export const SCREENING_SECTIONS = [
  {
    id: "safety",
    title: "Safety screen",
    description:
      "Vincent is not a crisis tool. If you are in immediate danger or worried you may harm yourself or someone else, answer honestly so the app can stop and direct you to urgent support.",
    kind: "single",
    scale: SCALES.safety,
    questions: [
      {
        id: "safetyImmediateRisk",
        prompt: "Are you currently in immediate danger or worried you may harm yourself or someone else?",
      },
    ],
  },
  {
    id: "attention",
    title: "Current attention and executive-function signals",
    description: "Think about roughly the past 6 months.",
    kind: "scaled",
    scale: SCALES.frequency,
    questions: [
      { id: "attentionSustain", prompt: "How often do you have trouble staying with reading, paperwork, or other sustained mental work?" },
      { id: "attentionTrack", prompt: "How often do you lose track of conversations, meetings, or instructions unless you actively pull yourself back?" },
      { id: "attentionOrganize", prompt: "How often do disorganization or clutter slow you down?" },
      { id: "attentionForget", prompt: "How often do you forget routine obligations, follow-ups, or errands unless you set strong reminders?" },
      { id: "attentionStart", prompt: "How often is starting an important task much harder than the task itself?" },
      { id: "attentionFinish", prompt: "How often do you begin tasks with good intentions but leave them unfinished once the novelty wears off?" },
      { id: "attentionTime", prompt: "How often do you misjudge how long something will take or lose awareness of time passing?" },
      { id: "attentionDeadline", prompt: "How often do you wait for deadline pressure before you can fully engage?" },
      { id: "attentionItems", prompt: "How often do you misplace important items like keys, wallets, chargers, paperwork, or prescriptions?" },
      { id: "attentionEffort", prompt: "How often do you avoid or postpone tasks that require sustained effort, planning, or detail work?" },
    ],
  },
  {
    id: "restlessness",
    title: "Restlessness and impulsivity signals",
    description: "Focus on internal restlessness, impatience, and acting too fast.",
    kind: "scaled",
    scale: SCALES.frequency,
    questions: [
      { id: "restlessnessInternal", prompt: "How often do you feel internally restless even when you are trying to stay still?" },
      { id: "restlessnessFidget", prompt: "How often do you fidget, tap, pace, or need movement to stay regulated?" },
      { id: "restlessnessWait", prompt: "How often do waiting, slow processes, or delays feel unusually hard to tolerate?" },
      { id: "restlessnessInterrupt", prompt: "How often do you interrupt, finish other people's sentences, or jump in before they are done?" },
      { id: "restlessnessImpulse", prompt: "How often do you make purchases, commitments, or replies before thinking through the downstream effects?" },
      { id: "restlessnessConsequences", prompt: "How often do you act first and review consequences afterward?" },
      { id: "restlessnessTalk", prompt: "How often do you notice yourself talking more than intended or feeling like your thoughts are racing ahead?" },
    ],
  },
  {
    id: "impairment",
    title: "Functional impairment",
    description:
      "Rate how much these patterns interfere when they show up. Optional examples stay local unless you export them.",
    kind: "scaled",
    scale: SCALES.impact,
    questions: [
      { id: "impairmentWork", prompt: "Work or school responsibilities" },
      { id: "impairmentHome", prompt: "Home responsibilities" },
      { id: "impairmentFinances", prompt: "Finances, paperwork, or admin tasks" },
      { id: "impairmentRelationships", prompt: "Relationships or communication reliability" },
      { id: "impairmentTime", prompt: "Time management and punctuality" },
      { id: "impairmentProjects", prompt: "Long-term projects or follow-through" },
      { id: "impairmentHealth", prompt: "Health routines such as sleep, meals, exercise, appointments, or medications" },
      { id: "impairmentSafety", prompt: "Driving or safety-related attention, if relevant" },
    ],
    textFields: [
      {
        id: "impairmentExamples",
        label: "Optional recent examples",
        help: "Example: missed deadlines, overdue forms, forgotten bills, driving lapses, relationship friction, or repeated task backlogs.",
        rows: 5,
      },
    ],
  },
  {
    id: "childhood",
    title: "Childhood history",
    description: "Think about before age 12. Self-report is enough for this step; certainty is not required.",
    kind: "scaled",
    scale: SCALES.childhood,
    questions: [
      { id: "childhoodItems", prompt: "Frequent lost items or misplaced school materials" },
      { id: "childhoodHomework", prompt: "Homework or chores often left unfinished without close follow-up" },
      { id: "childhoodTeacher", prompt: "Teacher comments about attention, restlessness, carelessness, not listening, or distraction" },
      { id: "childhoodSupervision", prompt: "Needing unusually high parent or caregiver supervision to complete tasks" },
      { id: "childhoodDisorganization", prompt: "Chronic disorganization, messy backpack or room, or trouble tracking responsibilities" },
      { id: "childhoodInterrupt", prompt: "Impulsive talking, blurting out, or interrupting others" },
      { id: "childhoodUneven", prompt: "Uneven school performance despite ability, especially when interest or structure changed" },
    ],
  },
  {
    id: "crossSetting",
    title: "Cross-setting pattern",
    description:
      "Select every setting where these patterns meaningfully show up. Leave blank if you are unsure.",
    kind: "multi",
    options: CROSS_SETTING_OPTIONS,
  },
  {
    id: "overlaps",
    title: "Other factors to discuss with a clinician",
    description:
      "This list does not explain or rule out ADHD. It highlights overlapping factors that may be worth discussing.",
    kind: "multi",
    options: OVERLAPPING_FACTORS,
    textFields: [
      {
        id: "otherFactorsNotes",
        label: "Optional notes for a clinician",
        help: "Include anything you think may affect interpretation, such as medication changes, sleep concerns, or major stressors.",
        rows: 4,
      },
    ],
  },
  {
    id: "prep",
    title: "Visit preparation notes",
    description: "These notes stay in your browser unless you decide to export them.",
    kind: "text",
    textFields: [
      {
        id: "reasonForUsingVincent",
        label: "Reason for using Vincent",
        help: "Example: I have wondered about ADHD after repeated problems with deadlines, paperwork, and staying organized.",
        rows: 4,
      },
      {
        id: "recentExamples",
        label: "Specific recent examples",
        help: "Optional. Write short examples you may want to mention in an appointment.",
        rows: 5,
      },
      {
        id: "questionsForClinician",
        label: "Questions to ask a clinician",
        help: "Optional. Example: What does a formal adult ADHD evaluation usually include? How do you assess overlapping factors?",
        rows: 5,
      },
    ],
  },
];

export const NON_DIAGNOSTIC_STATEMENTS = [
  "This does not diagnose ADHD.",
  "This does not rule ADHD in or out.",
  "A licensed clinician must make a formal diagnosis.",
  "Other factors such as sleep, anxiety, depression, trauma, substance use, medical issues, or burnout can overlap with ADHD-like symptoms.",
];

export const CLINICIAN_CHECKLIST = [
  "Specific recent examples of attention or executive-function difficulties",
  "Childhood examples, report cards, or family observations if available",
  "Work, school, home, and relationship impact",
  "Sleep patterns and any signs of sleep disruption",
  "Mood, anxiety, stress, or trauma history",
  "Current substances, medications, supplements, and caffeine use",
  "Questions about what a formal ADHD evaluation would involve",
];
