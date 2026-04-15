(function () {
  const root = document.documentElement;
  const body = document.body;

  if (!body) {
    return;
  }

  const page = body.dataset.page;
  const DAY_START_HOUR = 6;
  const NIGHT_START_HOUR = 18;
  const DEFAULT_LANG = "en";
  const SUPPORTED_LANGS = new Set(["en", "zh"]);
  const LANG_STORAGE_KEY = "vincent.lang";
  const ASSESSMENT_STORAGE_KEY = "vincent.assessment.v3";

  const COPY = {
    en: {
      title: {
        landing: "Vincent AI",
        personas: "Vincent Personas",
        persona: "Vincent Persona",
        framework: "Vincent Framework",
        assessment: "Vincent AI Assessment",
      },
      description: {
        landing: "Vincent is a personal companion for early mental health reflection.",
        personas: "Explore the Vincent persona directory built on top of the construct-first assessment.",
        persona: "Explore a Vincent persona detail page and its underlying construct tendencies.",
        framework: "Learn how Vincent combines continuous construct scores with an editorial persona layer.",
        assessment:
          "Take the Vincent assessment and receive a construct-first profile plus an editorial persona lens.",
      },
      shared: {
        brandTagline: "construct-first personality mirror",
        navAssessment: "Assessment",
        navPersonas: "Personas",
        navFramework: "Framework",
        startAssessment: "Start assessment",
        home: "Home",
        footerNote:
          "Reflective personality and attachment check-in with an editorial persona layer.",
      },
      landing: {
        summary: "Personal mental health companion",
        title: "Meet Vincent",
        purpose: "A personal companion for early mental health reflection.",
        cta: "Start with assessment",
        note: "Private by default. Not for crisis support.",
      },
      personas: {
        eyebrow: "Persona directory",
        title: "Every Vincent result lens, all in one place.",
        lead:
          "These personas are editorial overlays built from broader construct patterns. They are meant to make results easier to remember, not more clinical.",
      },
      persona: {
        eyebrow: "Vincent persona",
        constructsEyebrow: "Construct tendencies",
        constructsTitle: "How this lens usually leans on the Vincent model.",
        assessmentCta: "Take the assessment",
        directoryCta: "Back to directory",
        metrics: {
          family: "Family",
          presence: "Presence",
          method: "Method",
          relating: "Relating",
        },
        sections: {
          core: "Core operating style",
          collaboration: "When working with others",
          pressure: "When pressure rises",
          growth: "Growth edge",
        },
        tendencyHigh: "Usually higher",
        tendencyLow: "Usually lower",
        tendencyVariable: "Context-dependent",
        stressNote:
          "Stress intensity and attachment anxiety still vary from person to person. This lens is an editorial summary, not a fixed psychological type.",
        notFound:
          "That Vincent persona was not found. Showing a nearby default lens instead.",
      },
      framework: {
        eyebrow: "Framework",
        title: "A construct-first model, with a clearly labeled persona layer.",
        lead:
          "Vincent’s main score is continuous. The persona is a memory-friendly editorial lens placed on top of that score, not a diagnostic identity.",
        constructsEyebrow: "Seven constructs",
        constructsTitle: "The model underneath the styling.",
        scoringEyebrow: "Scoring",
        scoringTitle: "How Vincent moves from answers to output.",
        steps: [
          {
            title: "1. One shared response scale",
            body: "Users answer 28 first-person items on the same 5-point agreement scale, which keeps the interface easy to read and the scoring logic consistent.",
          },
          {
            title: "2. Reverse-key where needed",
            body: "A small number of items are reverse-keyed, then all items are summed by construct before the mean score is calculated.",
          },
          {
            title: "3. Continuous scores first",
            body: "Each construct is returned as a mean score with a conservative display band and a short interpretation.",
          },
          {
            title: "4. Persona layer second",
            body: "A Vincent persona is derived from broader axis patterns across the construct profile and shown as an editorial lens, not as a scientific type claim.",
          },
        ],
        guardrailsEyebrow: "Guardrails",
        guardrailsTitle: "What the result should never be mistaken for.",
        guardrails: [
          {
            title: "Not a diagnosis",
            body: "Vincent is not a clinical screener, treatment tool, or crisis service.",
          },
          {
            title: "Not a percentile engine",
            body: "The site does not claim probabilities, percentiles, or ranking without calibration data.",
          },
          {
            title: "Persona is not measurement",
            body: "The figure and title exist to make patterns easier to remember. The measured layer is still the construct profile.",
          },
          {
            title: "Stress varies over time",
            body: "Negative emotionality and attachment anxiety can move with context and are never treated as a fixed identity label.",
          },
        ],
        bannerEyebrow: "Next step",
        bannerTitle: "See the model in action on your own result.",
        bannerLead:
          "Take the assessment, then compare the continuous construct readout to the editorial persona it generates.",
        bannerCta: "Take the assessment",
      },
      assessment: {
        eyebrow: "Assessment",
        title: "Reflective personality and attachment check-in",
        lead:
          "28 items across 7 constructs. You get continuous scores first, then a Vincent persona lens layered on top.",
        asideEyebrow: "Answer tips",
        asideTitle: "Use your recent pattern, not your ideal self.",
        promiseEyebrow: "What you get",
        answerTips: [
          {
            title: "Think recent, not extreme",
            body: "Answer from how you have generally been lately, not from the best or worst single moment.",
          },
          {
            title: "Pick the closest option",
            body: "Nothing needs to fit perfectly. Choose the response that feels nearest.",
          },
          {
            title: "Trust first instinct",
            body: "A quick honest answer is usually more useful than over-calibrating every item.",
          },
        ],
        scaleOptions: [
          "Strongly disagree",
          "Disagree",
          "Neither / unsure",
          "Agree",
          "Strongly agree",
        ],
        promises: [
          {
            title: "Continuous construct profile",
            body: "Primary output across seven personality and attachment constructs.",
          },
          {
            title: "Vincent persona lens",
            body: "A memorable editorial identity with its own block-style figure and detail page.",
          },
          {
            title: "Clear scope limits",
            body: "No diagnosis, no fake precision, and no collapse of everything into a single label.",
          },
        ],
        previous: "Previous",
        continue: "Continue",
        seeResult: "See result",
        takeAgain: "Take again",
        loading: "Loading the assessment…",
        loadingLabel: "Preparing questions",
        unavailableQuestion: "Vincent could not load the assessment right now.",
        unavailableStatus: "Unavailable",
        unavailableHelp: "Reload or try again in a moment.",
        scoring: "Scoring…",
        tryAgain: "Try again",
        progressLabel: (current, total) => `Question ${current} of ${total}`,
        progressPercent: (percent) => `${percent}% answered`,
        progressAnswered: (answered, total) => `${answered} of ${total} answered`,
        resultEyebrow: "Vincent persona lens",
        personaLink: "Explore persona",
        metricPrimaryLabel: "Items completed",
        metricSecondaryLabel: "Response format",
        resultHeadline: "Construct-first readout",
        resultName: "Your measured profile",
        resultSubtitle: (constructCount, itemCount) =>
          `${constructCount} constructs across ${itemCount} self-report items`,
        resultSummary: (highest, second, lowest) =>
          `In this check-in, ${highest} and ${second} were the strongest endorsed areas, while ${lowest} was the least-endorsed part of the profile.`,
        resultReflection:
          "These scores summarize how strongly you agreed with each 4-item construct. They are not probabilities, percentiles, or clinical risk estimates.",
        resultNote:
          "Vincent now returns continuous construct scores first. Any label layered on top should stay a reflective summary rather than a diagnostic category.",
        resultCaution:
          "This assessment is reflective only. It is not a diagnosis, treatment plan, or crisis service.",
      },
      tendencies: {
        pressureSteady: "Steadier under pressure",
        pressureMixed: "Situational pressure load",
        pressureVigilant: "Higher vigilance under strain",
      },
    },
    zh: {
      title: {
        landing: "Vincent AI",
        personas: "Vincent 人格目录",
        persona: "Vincent 人格详情",
        framework: "Vincent 方法框架",
        assessment: "Vincent AI 测评",
      },
      description: {
        landing: "Vincent 是一个用于早期心理健康反思的个人陪伴者。",
        personas: "浏览 Vincent 的人格目录，它建立在构念优先的测评之上。",
        persona: "查看某个 Vincent 人格详情页，以及它通常对应的构念倾向。",
        framework: "了解 Vincent 如何把连续构念分数与编辑型人格镜像层结合起来。",
        assessment: "完成 Vincent 测评，获得构念优先的结果画像与人格镜像层。",
      },
      shared: {
        brandTagline: "构念优先的人格镜像",
        navAssessment: "测评",
        navPersonas: "人格目录",
        navFramework: "方法框架",
        startAssessment: "开始测评",
        home: "首页",
        footerNote: "反思型人格与依恋风格测评，外加一层编辑型人格镜像。",
      },
      landing: {
        summary: "个人心理健康陪伴者",
        title: "认识 Vincent",
        purpose: "一个用于早期心理健康反思的个人陪伴者。",
        cta: "从测评开始",
        note: "默认私密。不适用于危机支持。",
      },
      personas: {
        eyebrow: "人格目录",
        title: "Vincent 的所有结果人格，都在这里。",
        lead:
          "这些人格是建立在构念模式之上的编辑型总结，用来增强记忆与讨论价值，而不是制造更强的临床权威感。",
      },
      persona: {
        eyebrow: "Vincent 人格",
        constructsEyebrow: "构念倾向",
        constructsTitle: "这个人格镜像通常会怎样落在 Vincent 模型上。",
        assessmentCta: "开始测评",
        directoryCta: "返回目录",
        metrics: {
          family: "所属家族",
          presence: "呈现方式",
          method: "行动方式",
          relating: "关系姿态",
        },
        sections: {
          core: "核心运作方式",
          collaboration: "与他人协作时",
          pressure: "当压力升高",
          growth: "成长边界",
        },
        tendencyHigh: "通常更高",
        tendencyLow: "通常更低",
        tendencyVariable: "更依情境",
        stressNote:
          "压力强度与依恋焦虑仍然会随人和情境变化。这个人格镜像只是编辑型总结，不是固定心理类型。",
        notFound: "没有找到这个 Vincent 人格，下面先显示一个相近的默认人格。",
      },
      framework: {
        eyebrow: "方法框架",
        title: "先有连续构念模型，再有被明确标注的人格镜像层。",
        lead:
          "Vincent 的主结果是连续构念分数。人格镜像只是帮助记忆的编辑型外层，不是诊断性身份。",
        constructsEyebrow: "七个构念",
        constructsTitle: "视觉表达下面真正的模型。",
        scoringEyebrow: "计分方式",
        scoringTitle: "Vincent 如何从作答走到结果。",
        steps: [
          {
            title: "1. 同一套作答尺度",
            body: "28 个第一人称条目都使用同一套 5 点同意度量表，界面更易理解，计分也更一致。",
          },
          {
            title: "2. 必要时反向计分",
            body: "少量反向条目会先被翻转，然后再按构念汇总并计算均分。",
          },
          {
            title: "3. 连续分数优先",
            body: "每个构念都会返回均分、保守的展示标签和简短解释。",
          },
          {
            title: "4. 人格镜像后置",
            body: "Vincent 人格由更高层的模式轴组合得到，只作为编辑型镜像层展示，而不是科学类型宣称。",
          },
        ],
        guardrailsEyebrow: "边界",
        guardrailsTitle: "结果不应该被误解成什么。",
        guardrails: [
          {
            title: "不是诊断",
            body: "Vincent 不是临床筛查工具，也不是治疗或危机干预服务。",
          },
          {
            title: "不是百分位系统",
            body: "在没有常模和校准数据前，网站不会假装自己能提供概率或排名。",
          },
          {
            title: "人格镜像不是测量本身",
            body: "人物和名字只是帮助记忆。真正被测量的，依然是构念层。",
          },
          {
            title: "压力会变化",
            body: "负性情绪性和依恋焦虑会随情境变化，不会被硬塞进一个固定身份。",
          },
        ],
        bannerEyebrow: "下一步",
        bannerTitle: "去看一遍自己的结果，是怎么把两层结合起来的。",
        bannerLead: "完成测评后，你可以直接比较构念分数和上层人格镜像之间的关系。",
        bannerCta: "开始测评",
      },
      assessment: {
        eyebrow: "测评",
        title: "人格与依恋风格反思测评",
        lead:
          "共 28 题，覆盖 7 个构念。你会先得到连续构念结果，然后再看到一层 Vincent 人格镜像。",
        asideEyebrow: "作答提示",
        asideTitle: "按最近状态和第一反应作答。",
        promiseEyebrow: "你会得到",
        answerTips: [
          {
            title: "按近期常态回答",
            body: "以最近一段时间更常见的自己为准，不用按最好或最糟的一次来答。",
          },
          {
            title: "选最接近的一项",
            body: "不需要完全精准，选最贴近你感受的选项即可。",
          },
          {
            title: "优先第一反应",
            body: "快速而诚实的回答，通常比反复推敲更有参考价值。",
          },
        ],
        scaleOptions: ["非常不同意", "不同意", "中立 / 不确定", "同意", "非常同意"],
        promises: [
          {
            title: "连续构念画像",
            body: "主结果基于 7 个连续人格与依恋构念。",
          },
          {
            title: "Vincent 人格镜像",
            body: "一层更容易记住的编辑型人格结果，带有独立造型和详情页。",
          },
          {
            title: "清晰的边界声明",
            body: "没有诊断、没有伪精度，也不会把一个标签当成全部结果。",
          },
        ],
        previous: "上一题",
        continue: "继续",
        seeResult: "查看结果",
        takeAgain: "重新测一次",
        loading: "正在载入测评…",
        loadingLabel: "正在准备题目",
        unavailableQuestion: "Vincent 暂时无法载入测评。",
        unavailableStatus: "暂不可用",
        unavailableHelp: "请刷新页面，或稍后再试。",
        scoring: "生成结果中…",
        tryAgain: "重试",
        progressLabel: (current, total) => `第 ${current} / ${total} 题`,
        progressPercent: (percent) => `已回答 ${percent}%`,
        progressAnswered: (answered, total) => `已回答 ${answered} / ${total} 题`,
        resultEyebrow: "Vincent 人格镜像",
        personaLink: "查看人格详情",
        metricPrimaryLabel: "完成题数",
        metricSecondaryLabel: "作答格式",
        resultHeadline: "构念优先结果",
        resultName: "你的测量画像",
        resultSubtitle: (constructCount, itemCount) =>
          `${constructCount} 个构念，${itemCount} 个自评条目`,
        resultSummary: (highest, second, lowest) =>
          `这次作答里，「${highest}」和「${second}」是相对最强的部分；「${lowest}」是相对较弱的部分。`,
        resultReflection:
          "这些分数只表示你对各构念条目的认同强度，不代表概率、常模百分位或临床风险。",
        resultNote:
          "Vincent 现在首先返回连续构念分数。任何额外叠加的标签，都应该被理解为反思性总结，而不是诊断类别。",
        resultCaution: "这份结果用于自我反思，不构成医疗、临床或危机处理建议。",
      },
      tendencies: {
        pressureSteady: "压力下较稳定",
        pressureMixed: "压力负荷因情境而异",
        pressureVigilant: "压力下更易警觉",
      },
    },
  };

  const CONSTRUCTS = [
    {
      key: "ASSERTIVE_EXTRAVERSION",
      label: { en: "Assertive Extraversion", zh: "自信外向" },
      blurb: {
        en: "How readily someone moves toward visibility, initiation, and social direction.",
        zh: "一个人有多容易走向可见度、主动发起和社会性影响。",
      },
    },
    {
      key: "TRUSTING_AGREEABLENESS",
      label: { en: "Trusting Agreeableness", zh: "信任型宜人性" },
      blurb: {
        en: "The tendency to start from goodwill, warmth, and cooperative intent.",
        zh: "一个人是否更倾向于从善意、温和与合作意图出发。",
      },
    },
    {
      key: "PRODUCTIVE_CONSCIENTIOUSNESS",
      label: { en: "Productive Conscientiousness", zh: "高执行尽责性" },
      blurb: {
        en: "How strongly planning, follow-through, and self-directed structure support behavior.",
        zh: "计划、持续执行和自我结构感在多大程度上支撑行为。",
      },
    },
    {
      key: "NEGATIVE_EMOTIONALITY",
      label: { en: "Negative Emotionality", zh: "负性情绪性" },
      blurb: {
        en: "How easily worry, emotional shifts, or stress reactivity become salient.",
        zh: "担忧、情绪波动与压力反应有多容易变得显著。",
      },
    },
    {
      key: "OPEN_MINDEDNESS",
      label: { en: "Open-Mindedness", zh: "开放心态" },
      blurb: {
        en: "Interest in novelty, multiple perspectives, and conceptual variety.",
        zh: "对新意、多重视角和概念变化的兴趣与吸引。",
      },
    },
    {
      key: "ATTACHMENT_ANXIETY",
      label: { en: "Attachment Anxiety", zh: "依恋焦虑" },
      blurb: {
        en: "Sensitivity to ambiguity, distance, or reassurance in close relationships.",
        zh: "在亲密关系里，对模糊、距离与确认需求的敏感程度。",
      },
    },
    {
      key: "ATTACHMENT_AVOIDANCE",
      label: { en: "Attachment Avoidance", zh: "依恋回避" },
      blurb: {
        en: "The tendency to protect autonomy by reducing emotional dependence or closeness.",
        zh: "通过减少依赖或情感靠近来保护自主性的倾向。",
      },
    },
  ];

  const FAMILY_META = {
    vectors: {
      name: { en: "Vectors", zh: "向量家族" },
      kicker: { en: "Visible + structured", zh: "高可见 + 高结构" },
      description: {
        en: "Vectors turn clarity into coordinated motion. They like to make direction legible and then move others through it.",
        zh: "向量家族会把清晰度变成可协同的行动。他们喜欢先把方向说明白，再推动局面移动。",
      },
    },
    signals: {
      name: { en: "Signals", zh: "信号家族" },
      kicker: { en: "Visible + fluid", zh: "高可见 + 高流动" },
      description: {
        en: "Signals create movement through presence, timing, and interpersonal energy rather than strict structure alone.",
        zh: "信号家族更依赖存在感、时机感和人际能量来推动事情，而不只依赖硬结构。",
      },
    },
    studios: {
      name: { en: "Studios", zh: "工作室家族" },
      kicker: { en: "Reserved + structured", zh: "内敛 + 高结构" },
      description: {
        en: "Studios build depth through systems, preparation, and quiet pattern recognition.",
        zh: "工作室家族更擅长通过系统、准备和安静的模式识别来制造深度。",
      },
    },
    harbors: {
      name: { en: "Harbors", zh: "港湾家族" },
      kicker: { en: "Reserved + fluid", zh: "内敛 + 高流动" },
      description: {
        en: "Harbors work through sensitivity, pacing, and possibility. They often reshape a room without needing to dominate it.",
        zh: "港湾家族依靠敏感度、节奏感和可能性工作，常常不必主导场面也能改变场域。",
      },
    },
  };

  const PERSONAS = [
    {
      slug: "beacon-architect",
      family: "vectors",
      axes: { presence: "signal", structure: "structured", warmth: "openhearted", range: "expansive" },
      names: { en: "Beacon Architect", zh: "灯塔架构者" },
      accessory: "prism",
      palette: { bg: "#d9f0ec", glow: "#f5c567", skin: "#efc3a0", hair: "#28555b", outfit: "#2d7c79", accent: "#efb248" },
    },
    {
      slug: "bridge-director",
      family: "vectors",
      axes: { presence: "signal", structure: "structured", warmth: "openhearted", range: "grounded" },
      names: { en: "Bridge Director", zh: "桥梁统筹者" },
      accessory: "banner",
      palette: { bg: "#e1efe4", glow: "#8fc09a", skin: "#f0c9a7", hair: "#34555a", outfit: "#367f6a", accent: "#8cae7d" },
    },
    {
      slug: "prism-strategist",
      family: "vectors",
      axes: { presence: "signal", structure: "structured", warmth: "guarded", range: "expansive" },
      names: { en: "Prism Strategist", zh: "棱镜策士" },
      accessory: "visor",
      palette: { bg: "#e3e9fb", glow: "#f4be5b", skin: "#efc4a3", hair: "#3f4365", outfit: "#6171d0", accent: "#efb248" },
    },
    {
      slug: "stone-captain",
      family: "vectors",
      axes: { presence: "signal", structure: "structured", warmth: "guarded", range: "grounded" },
      names: { en: "Stone Captain", zh: "磐石领航者" },
      accessory: "shield",
      palette: { bg: "#ece7de", glow: "#d89969", skin: "#ebc09e", hair: "#544846", outfit: "#7b665c", accent: "#d48a56" },
    },
    {
      slug: "openwave-host",
      family: "signals",
      axes: { presence: "signal", structure: "fluid", warmth: "openhearted", range: "expansive" },
      names: { en: "Openwave Host", zh: "开域引路者" },
      accessory: "halo",
      palette: { bg: "#ffe9e0", glow: "#ffc06c", skin: "#f2c9a7", hair: "#7c5a55", outfit: "#db7f5f", accent: "#efb248" },
    },
    {
      slug: "harbor-rallyer",
      family: "signals",
      axes: { presence: "signal", structure: "fluid", warmth: "openhearted", range: "grounded" },
      names: { en: "Harbor Rallyer", zh: "港湾召集者" },
      accessory: "scarf",
      palette: { bg: "#efe6d8", glow: "#e4a86e", skin: "#efc7a6", hair: "#5c584d", outfit: "#c97b55", accent: "#e0a36c" },
    },
    {
      slug: "neon-pathfinder",
      family: "signals",
      axes: { presence: "signal", structure: "fluid", warmth: "guarded", range: "expansive" },
      names: { en: "Neon Pathfinder", zh: "霓光探路者" },
      accessory: "antenna",
      palette: { bg: "#e7ebff", glow: "#88d0d5", skin: "#efc2a1", hair: "#3f4471", outfit: "#6c78d5", accent: "#59c2c7" },
    },
    {
      slug: "iron-maverick",
      family: "signals",
      axes: { presence: "signal", structure: "fluid", warmth: "guarded", range: "grounded" },
      names: { en: "Iron Maverick", zh: "铁脉行动者" },
      accessory: "torch",
      palette: { bg: "#efe4df", glow: "#efb248", skin: "#eec09b", hair: "#45414a", outfit: "#8b6262", accent: "#efb248" },
    },
    {
      slug: "quiet-cartographer",
      family: "studios",
      axes: { presence: "quiet", structure: "structured", warmth: "openhearted", range: "expansive" },
      names: { en: "Quiet Cartographer", zh: "静域制图者" },
      accessory: "scroll",
      palette: { bg: "#e5effc", glow: "#8cc4e9", skin: "#eec3a3", hair: "#415b77", outfit: "#587eb8", accent: "#8cc4e9" },
    },
    {
      slug: "cedar-keeper",
      family: "studios",
      axes: { presence: "quiet", structure: "structured", warmth: "openhearted", range: "grounded" },
      names: { en: "Cedar Keeper", zh: "雪松守序者" },
      accessory: "leaf",
      palette: { bg: "#e7efe4", glow: "#83bf86", skin: "#efc6a7", hair: "#445d4c", outfit: "#6a9b75", accent: "#7fb68a" },
    },
    {
      slug: "archive-analyst",
      family: "studios",
      axes: { presence: "quiet", structure: "structured", warmth: "guarded", range: "expansive" },
      names: { en: "Archive Analyst", zh: "档案分析师" },
      accessory: "book",
      palette: { bg: "#ece8fb", glow: "#9ea5ef", skin: "#edc0a1", hair: "#4a4a66", outfit: "#7179c8", accent: "#9ea5ef" },
    },
    {
      slug: "granite-planner",
      family: "studios",
      axes: { presence: "quiet", structure: "structured", warmth: "guarded", range: "grounded" },
      names: { en: "Granite Planner", zh: "花岗规划者" },
      accessory: "clipboard",
      palette: { bg: "#ebe7e0", glow: "#b7a48a", skin: "#eec2a0", hair: "#544e49", outfit: "#7c736a", accent: "#b8a68a" },
    },
    {
      slug: "night-gardener",
      family: "harbors",
      axes: { presence: "quiet", structure: "fluid", warmth: "openhearted", range: "expansive" },
      names: { en: "Night Gardener", zh: "夜园培育者" },
      accessory: "sprout",
      palette: { bg: "#e7f1ee", glow: "#89c59f", skin: "#eec2a0", hair: "#455567", outfit: "#5f8f86", accent: "#7fbc95" },
    },
    {
      slug: "harbor-listener",
      family: "harbors",
      axes: { presence: "quiet", structure: "fluid", warmth: "openhearted", range: "grounded" },
      names: { en: "Harbor Listener", zh: "港湾倾听者" },
      accessory: "lantern",
      palette: { bg: "#efe9dc", glow: "#f2bf67", skin: "#eec2a2", hair: "#60524c", outfit: "#8f7b67", accent: "#efb248" },
    },
    {
      slug: "veil-dreamer",
      family: "harbors",
      axes: { presence: "quiet", structure: "fluid", warmth: "guarded", range: "expansive" },
      names: { en: "Veil Dreamer", zh: "帷幕造梦者" },
      accessory: "star",
      palette: { bg: "#ece9ff", glow: "#c1a1ff", skin: "#edc1a0", hair: "#554777", outfit: "#7e69ba", accent: "#c1a1ff" },
    },
    {
      slug: "still-sentinel",
      family: "harbors",
      axes: { presence: "quiet", structure: "fluid", warmth: "guarded", range: "grounded" },
      names: { en: "Still Sentinel", zh: "静默哨卫" },
      accessory: "compass",
      palette: { bg: "#e6ecea", glow: "#89a5a0", skin: "#ebbea0", hair: "#47504f", outfit: "#6f8581", accent: "#89a5a0" },
    },
  ];

  const QUESTION_TRANSLATIONS = {
    zh: {
      assertive_extraversion_1: "当一个群体需要有人带头时，我通常会很快发声。",
      assertive_extraversion_2: "和不熟悉的人开始交谈，对我来说通常不难。",
      assertive_extraversion_3: "即使我其实有有用的看法，我通常也会先收着不说。",
      assertive_extraversion_4: "在群体中被看见，通常会让我更有精神。",
      trusting_agreeableness_1: "在看到相反证据前，我通常先假定别人没有恶意。",
      trusting_agreeableness_2: "即使我很不同意，我也会尽量保持体谅。",
      trusting_agreeableness_3: "我会预期，只要有机会，人们就会利用别人的心软。",
      trusting_agreeableness_4: "我可以直接，但不需要变得刻薄。",
      productive_conscientiousness_1: "重要工作开始前，我会先制定具体计划。",
      productive_conscientiousness_2: "即使无聊，我也能把例行任务做完。",
      productive_conscientiousness_3: "我的优先级变化速度，常常快过我的后续执行。",
      productive_conscientiousness_4: "即使没人监督，我也会对自己许下的承诺负责。",
      negative_emotionality_1: "小挫折常常会在我心里停留得比我想要的更久。",
      negative_emotionality_2: "在压力下，我的情绪会很快起伏。",
      negative_emotionality_3: "一次不愉快的互动之后，我通常能很快恢复。",
      negative_emotionality_4: "问题还没真正发生前，我就会开始担心。",
      open_mindedness_1: "即使还不知道是否可行，新点子也会先让我兴奋起来。",
      open_mindedness_2: "我喜欢从几个不同角度去看同一个问题。",
      open_mindedness_3: "比起尝试新方法，我更偏好熟悉的做法。",
      open_mindedness_4: "艺术、语言或设计，常常会改变我的思考方式。",
      attachment_anxiety_1: "当我在乎的人突然安静下来时，我会开始担心这意味着什么。",
      attachment_anxiety_2: "在亲密关系里，我需要很多确认才会觉得安心。",
      attachment_anxiety_3: "我会担心我爱的人可能会毫无预警地疏远我。",
      attachment_anxiety_4: "亲密关系中的不确定性，通常不会让我太不安。",
      attachment_avoidance_1: "当别人想要比我更多的情感靠近时，我会觉得不太舒服。",
      attachment_avoidance_2: "对我来说，依赖别人是一件有风险的事。",
      attachment_avoidance_3: "即使在亲密关系里，我也会把重要感受留在心里。",
      attachment_avoidance_4: "让别人看到我的情感需要，对我来说是困难的。",
    },
  };

  const AXIS_LABELS = {
    presence: {
      signal: { en: "Visible", zh: "高可见" },
      quiet: { en: "Reserved", zh: "内敛" },
    },
    structure: {
      structured: { en: "Structured", zh: "重结构" },
      fluid: { en: "Fluid", zh: "重流动" },
    },
    warmth: {
      openhearted: { en: "Openhearted", zh: "开放联结" },
      guarded: { en: "Guarded", zh: "谨慎设防" },
    },
    range: {
      expansive: { en: "Expansive", zh: "开放探索" },
      grounded: { en: "Grounded", zh: "现实落地" },
    },
  };

  const AXIS_COPY = {
    core: {
      presence: {
        signal: {
          en: "This lens is comfortable becoming legible in a room and using visibility to create movement.",
          zh: "这个人格镜像更习惯在场域中被看见，并用可见度推动事情发生。",
        },
        quiet: {
          en: "This lens tends to enter a room with more observation than display and prefers to build signal before taking space.",
          zh: "这个人格镜像进入场域时更偏向观察而非展示，通常会先建立把握，再占据空间。",
        },
      },
      structure: {
        structured: {
          en: "It usually trusts planning, sequencing, and deliberate follow-through more than improvisation alone.",
          zh: "它通常更信任计划、节奏安排和有意识的后续执行，而不是只靠即兴。",
        },
        fluid: {
          en: "It usually relies on timing, responsiveness, and movement rather than strict systems alone.",
          zh: "它通常更依赖时机感、即时响应和流动性，而不是只依赖固定系统。",
        },
      },
    },
    collaboration: {
      warmth: {
        openhearted: {
          en: "With people, it tends to start from warmth, openness, and a willingness to build trust.",
          zh: "在与人相处时，它更容易从温和、开放和建立信任的意愿开始。",
        },
        guarded: {
          en: "With people, it often protects itself first and only opens more once reliability is demonstrated.",
          zh: "在与人相处时，它更常先保护自己，等到可靠性被证明后才会进一步打开。",
        },
      },
      range: {
        expansive: {
          en: "It is usually energized by conceptual range, multiple angles, and experimentation.",
          zh: "它通常会被概念空间、多重角度和实验性尝试所激活。",
        },
        grounded: {
          en: "It usually prefers applied clarity, concrete next steps, and proven routes when things matter.",
          zh: "当事情重要时，它通常更偏好清晰可执行的下一步和已验证的路径。",
        },
      },
    },
    pressure: {
      structure: {
        structured: {
          en: "Under strain, it often doubles down on scaffolding, standards, or tighter control.",
          zh: "压力升高时，它常会进一步加强结构、标准和控制感。",
        },
        fluid: {
          en: "Under strain, it may move faster between possibilities and rely more on instinctive adjustment.",
          zh: "压力升高时，它可能会更快地在不同可能性之间切换，并更依赖直觉式调整。",
        },
      },
      warmth: {
        openhearted: {
          en: "Its pressure point is overextending emotionally or carrying more of the room than it can metabolize.",
          zh: "它的压力点，往往是情感上承担过多，或者把整个场域的重量都接到自己身上。",
        },
        guarded: {
          en: "Its pressure point is tightening too early and letting defensiveness replace contact.",
          zh: "它的压力点，往往是过早收紧自己，让防御感代替真正接触。",
        },
      },
    },
    growth: {
      presence: {
        signal: {
          en: "Its growth edge is learning when not to over-drive a room simply because it can.",
          zh: "它的成长边界，是学会在有能力推动场面时，也知道什么时候不必过度驱动。",
        },
        quiet: {
          en: "Its growth edge is making itself legible earlier instead of waiting until certainty feels complete.",
          zh: "它的成长边界，是更早让自己被看见，而不是等到一切完全确定后才出现。",
        },
      },
      range: {
        expansive: {
          en: "It grows by translating possibility into commitment often enough for others to follow.",
          zh: "它需要学会把可能性更频繁地翻译成承诺，让他人可以跟随。",
        },
        grounded: {
          en: "It grows by leaving more room for novelty before deciding the practical answer is final.",
          zh: "它需要在把现实答案定死之前，给新意和变化留下更多空间。",
        },
      },
    },
  };

  const TENDENCY_COPY = {
    ASSERTIVE_EXTRAVERSION: {
      high: {
        en: "This lens generally leans toward visibility, participation, and stepping forward.",
        zh: "这个人格镜像通常更偏向可见度、参与感和主动站出来。",
      },
      low: {
        en: "This lens generally preserves social energy and steps in more selectively.",
        zh: "这个人格镜像通常更倾向于保留社交能量，并更有选择地介入。",
      },
    },
    TRUSTING_AGREEABLENESS: {
      high: {
        en: "It often begins from goodwill and tries to stay cooperative without losing definition.",
        zh: "它通常更容易从善意出发，并尽量在保持清晰的同时维持合作感。",
      },
      low: {
        en: "It often reads leverage and threat earlier, which can make trust slower to build.",
        zh: "它通常会更早读到权衡、威胁和风险，因此信任建立得更慢。",
      },
    },
    PRODUCTIVE_CONSCIENTIOUSNESS: {
      high: {
        en: "It usually trusts plans, commitments, and self-imposed structure.",
        zh: "它通常更信任计划、承诺以及对自己施加的结构。",
      },
      low: {
        en: "It usually gives more space to flexibility, timing, and adaptive movement.",
        zh: "它通常会给灵活性、时机感和适应性移动留出更大空间。",
      },
    },
    NEGATIVE_EMOTIONALITY: {
      variable: {
        en: "This construct is not what defines the persona. It is better read from the actual assessment result.",
        zh: "这个构念不会被用来定义人格镜像，更适合直接从当次测评结果中读取。",
      },
    },
    OPEN_MINDEDNESS: {
      high: {
        en: "It is generally more energized by novelty, perspective shifts, and experimentation.",
        zh: "它通常更容易被新意、视角切换和实验性尝试所激活。",
      },
      low: {
        en: "It generally prefers familiar tools and concrete routes when the stakes feel real.",
        zh: "当事情更具体、更有代价时，它通常更偏好熟悉工具和明确路径。",
      },
    },
    ATTACHMENT_ANXIETY: {
      variable: {
        en: "Attachment anxiety varies too much by person and context to turn into a persona identity.",
        zh: "依恋焦虑受个人与情境影响太大，不适合被硬做成人格身份的一部分。",
      },
    },
    ATTACHMENT_AVOIDANCE: {
      high: {
        en: "This lens more often protects autonomy by slowing closeness or emotional dependence.",
        zh: "这个人格镜像更常通过放慢亲近或减少依赖来保护自主性。",
      },
      low: {
        en: "This lens more often treats closeness and emotional access as workable rather than threatening.",
        zh: "这个人格镜像更常把亲近和情感可达性视为可处理的，而不是威胁性的。",
      },
    },
  };

  const PERSONA_BY_SLUG = Object.fromEntries(
    PERSONAS.map(function (persona) {
      return [persona.slug, persona];
    })
  );

  const PERSONA_BY_SIGNATURE = Object.fromEntries(
    PERSONAS.map(function (persona) {
      return [personaSignature(persona.axes), persona];
    })
  );

  const commonElements = {
    localeButtons: Array.from(document.querySelectorAll("[data-lang-target]")),
    descriptionMeta: document.querySelector('meta[name="description"]'),
    brandTagline: document.getElementById("brandTagline"),
    navAssessment: document.getElementById("navAssessment"),
    navPersonas: document.getElementById("navPersonas"),
    navFramework: document.getElementById("navFramework"),
    headerCta: document.getElementById("headerCta"),
    headerHomeLink: document.getElementById("headerHomeLink"),
    footerNote: document.getElementById("footerNote"),
    footerAssessment: document.getElementById("footerAssessment"),
    footerPersonas: document.getElementById("footerPersonas"),
    footerFramework: document.getElementById("footerFramework"),
  };

  const landingElements =
    page === "landing"
      ? {
          summary: document.getElementById("landingHeroSummary"),
          title: document.getElementById("landingHeroTitle"),
          purpose: document.getElementById("landingHeroPurpose"),
          cta: document.getElementById("landingHeroCta"),
          note: document.getElementById("landingHeroNote"),
        }
      : null;

  const personasElements =
    page === "personas"
      ? {
          eyebrow: document.getElementById("personasEyebrow"),
          title: document.getElementById("personasTitle"),
          lead: document.getElementById("personasLead"),
          familyGrid: document.getElementById("personasFamilyGrid"),
        }
      : null;

  const personaElements =
    page === "persona"
      ? {
          eyebrow: document.getElementById("personaEyebrow"),
          heroFigure: document.getElementById("personaHeroFigure"),
          familyBadge: document.getElementById("personaFamilyBadge"),
          name: document.getElementById("personaName"),
          subtitle: document.getElementById("personaSubtitle"),
          summary: document.getElementById("personaSummary"),
          axisPills: document.getElementById("personaAxisPills"),
          stressNote: document.getElementById("personaStressNote"),
          assessmentCta: document.getElementById("personaAssessmentCta"),
          directoryCta: document.getElementById("personaDirectoryCta"),
          metricGrid: document.getElementById("personaMetricGrid"),
          constructsEyebrow: document.getElementById("personaConstructsEyebrow"),
          constructsTitle: document.getElementById("personaConstructsTitle"),
          constructs: document.getElementById("personaConstructs"),
          sections: document.getElementById("personaSections"),
        }
      : null;

  const frameworkElements =
    page === "framework"
      ? {
          eyebrow: document.getElementById("frameworkEyebrow"),
          title: document.getElementById("frameworkTitle"),
          lead: document.getElementById("frameworkLead"),
          constructsEyebrow: document.getElementById("frameworkConstructsEyebrow"),
          constructsTitle: document.getElementById("frameworkConstructsTitle"),
          constructGrid: document.getElementById("frameworkConstructGrid"),
          scoringEyebrow: document.getElementById("frameworkScoringEyebrow"),
          scoringTitle: document.getElementById("frameworkScoringTitle"),
          stepGrid: document.getElementById("frameworkStepGrid"),
          guardrailsEyebrow: document.getElementById("frameworkGuardrailsEyebrow"),
          guardrailsTitle: document.getElementById("frameworkGuardrailsTitle"),
          guardrailGrid: document.getElementById("frameworkGuardrailGrid"),
          bannerEyebrow: document.getElementById("frameworkBannerEyebrow"),
          bannerTitle: document.getElementById("frameworkBannerTitle"),
          bannerLead: document.getElementById("frameworkBannerLead"),
          bannerCta: document.getElementById("frameworkBannerCta"),
        }
      : null;

  const assessmentElements =
    page === "assessment"
      ? {
          taskEyebrow: document.getElementById("taskEyebrow"),
          taskTitle: document.getElementById("taskTitle"),
          taskLead: document.getElementById("taskLead"),
          taskStatus: document.getElementById("taskStatus"),
          progressLabel: document.getElementById("progressLabel"),
          progressPercent: document.getElementById("progressPercent"),
          progressAnswered: document.getElementById("progressAnswered"),
          progressBar: document.getElementById("progressBar"),
          questionCard: document.getElementById("questionCard"),
          dimensionBadge: document.getElementById("dimensionBadge"),
          questionIndex: document.getElementById("questionIndex"),
          questionPrompt: document.getElementById("questionPrompt"),
          optionList: document.getElementById("optionList"),
          previousButton: document.getElementById("previousButton"),
          nextButton: document.getElementById("nextButton"),
          asideEyebrow: document.getElementById("assessmentAsideEyebrow"),
          asideTitle: document.getElementById("assessmentAsideTitle"),
          tipsList: document.getElementById("assessmentTipsList"),
          promiseEyebrow: document.getElementById("assessmentPromiseEyebrow"),
          promiseList: document.getElementById("assessmentPromiseList"),
          resultCard: document.getElementById("resultCard"),
          resultPersonaFigure: document.getElementById("resultPersonaFigure"),
          resultEyebrow: document.getElementById("resultEyebrow"),
          resultPersonaFamily: document.getElementById("resultPersonaFamily"),
          resultPersonaName: document.getElementById("resultPersonaName"),
          resultPersonaSubtitle: document.getElementById("resultPersonaSubtitle"),
          resultPersonaSummary: document.getElementById("resultPersonaSummary"),
          resultPersonaPills: document.getElementById("resultPersonaPills"),
          resultPersonaLink: document.getElementById("resultPersonaLink"),
          restartButton: document.getElementById("restartButton"),
          metricPrimaryLabel: document.getElementById("metricPrimaryLabel"),
          metricPrimaryValue: document.getElementById("metricPrimaryValue"),
          metricSecondaryLabel: document.getElementById("metricSecondaryLabel"),
          metricSecondaryValue: document.getElementById("metricSecondaryValue"),
          resultHeadline: document.getElementById("resultHeadline"),
          resultName: document.getElementById("resultName"),
          resultSubtitle: document.getElementById("resultSubtitle"),
          resultEssence: document.getElementById("resultEssence"),
          resultReflection: document.getElementById("resultReflection"),
          dimensionBars: document.getElementById("dimensionBars"),
          resultNote: document.getElementById("resultNote"),
          resultCaution: document.getElementById("resultCaution"),
        }
      : null;

  const state =
    page === "assessment"
      ? {
          questions: [],
          answers: {},
          index: 0,
          result: null,
          showingResult: false,
          loadingQuestions: false,
          submittingScore: false,
          status: "",
        }
      : null;

  let currentLang = resolveLanguage();

  applyAutoTheme();
  window.setInterval(applyAutoTheme, 60 * 1000);
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) {
      applyAutoTheme();
    }
  });

  bindLanguageControls();

  if (page === "assessment") {
    restoreAssessmentState();
    bindAssessmentEvents();
  }

  applyLanguage();

  if (page === "assessment") {
    loadQuestions();
  }

  function resolveLanguage() {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get("lang");
    if (SUPPORTED_LANGS.has(fromQuery)) {
      persistLanguage(fromQuery);
      return fromQuery;
    }

    const fromStorage = readLocalStorage(LANG_STORAGE_KEY);
    if (SUPPORTED_LANGS.has(fromStorage)) {
      return fromStorage;
    }

    return navigator.language && navigator.language.toLowerCase().startsWith("zh")
      ? "zh"
      : DEFAULT_LANG;
  }

  function persistLanguage(lang) {
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (_error) {
      // no-op
    }
  }

  function readLocalStorage(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (_error) {
      return null;
    }
  }

  function writeLocalStorage(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (_error) {
      // no-op
    }
  }

  function removeLocalStorage(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (_error) {
      // no-op
    }
  }

  function themeForLocalTime(date) {
    const hour = date.getHours();
    return hour >= DAY_START_HOUR && hour < NIGHT_START_HOUR ? "day" : "night";
  }

  function applyAutoTheme() {
    const theme = themeForLocalTime(new Date());
    root.dataset.theme = theme;
    root.style.colorScheme = theme === "night" ? "dark" : "light";
  }

  function bindLanguageControls() {
    commonElements.localeButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const nextLang = button.dataset.langTarget;
        if (!SUPPORTED_LANGS.has(nextLang) || nextLang === currentLang) {
          return;
        }
        currentLang = nextLang;
        persistLanguage(nextLang);
        applyLanguage();
      });
    });
  }

  function applyLanguage() {
    const locale = COPY[currentLang];
    const pageTitle = locale.title[page] || locale.title.landing;
    const pageDescription = locale.description[page] || locale.description.landing;

    root.lang = currentLang === "zh" ? "zh-CN" : "en";
    root.dataset.lang = currentLang;
    document.title = pageTitle;

    if (commonElements.descriptionMeta) {
      commonElements.descriptionMeta.setAttribute("content", pageDescription);
    }

    applySharedCopy(locale.shared);
    renderCurrentPage();
    syncLanguageButtons();
    updatePreserveLangLinks();
    syncLanguageQuery();
  }

  function applySharedCopy(sharedCopy) {
    if (commonElements.brandTagline) {
      commonElements.brandTagline.textContent = sharedCopy.brandTagline;
    }
    if (commonElements.navAssessment) {
      commonElements.navAssessment.textContent = sharedCopy.navAssessment;
    }
    if (commonElements.navPersonas) {
      commonElements.navPersonas.textContent = sharedCopy.navPersonas;
    }
    if (commonElements.navFramework) {
      commonElements.navFramework.textContent = sharedCopy.navFramework;
    }
    if (commonElements.headerCta) {
      commonElements.headerCta.textContent = sharedCopy.startAssessment;
    }
    if (commonElements.headerHomeLink) {
      commonElements.headerHomeLink.textContent = sharedCopy.home;
    }
    if (commonElements.footerNote) {
      commonElements.footerNote.textContent = sharedCopy.footerNote;
    }
    if (commonElements.footerAssessment) {
      commonElements.footerAssessment.textContent = sharedCopy.navAssessment;
    }
    if (commonElements.footerPersonas) {
      commonElements.footerPersonas.textContent = sharedCopy.navPersonas;
    }
    if (commonElements.footerFramework) {
      commonElements.footerFramework.textContent = sharedCopy.navFramework;
    }
  }

  function renderCurrentPage() {
    switch (page) {
      case "landing":
        renderLandingPage();
        break;
      case "personas":
        renderPersonasPage();
        break;
      case "persona":
        renderPersonaPage();
        break;
      case "framework":
        renderFrameworkPage();
        break;
      case "assessment":
        applyAssessmentChrome();
        renderAssessment();
        break;
      default:
        break;
    }
  }

  function syncLanguageButtons() {
    commonElements.localeButtons.forEach(function (button) {
      button.classList.toggle("active", button.dataset.langTarget === currentLang);
    });
  }

  function syncLanguageQuery() {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", currentLang);
    window.history.replaceState({}, "", url);
  }

  function updatePreserveLangLinks() {
    Array.from(document.querySelectorAll("[data-preserve-lang]")).forEach(function (link) {
      const raw = link.getAttribute("href");
      if (!raw) {
        return;
      }
      link.setAttribute("href", localizedPath(raw));
    });
  }

  function localizedPath(path) {
    const url = new URL(path, window.location.origin);
    url.searchParams.set("lang", currentLang);
    return url.pathname + url.search;
  }

  function renderLandingPage() {
    const copy = COPY[currentLang].landing;

    landingElements.summary.textContent = copy.summary;
    landingElements.title.textContent = copy.title;
    landingElements.purpose.textContent = copy.purpose;
    landingElements.cta.textContent = copy.cta;
    landingElements.note.textContent = copy.note;
  }

  function renderPersonasPage() {
    const copy = COPY[currentLang].personas;

    personasElements.eyebrow.textContent = copy.eyebrow;
    personasElements.title.textContent = copy.title;
    personasElements.lead.textContent = copy.lead;
    renderFamilyBands(personasElements.familyGrid, true);
  }

  function renderPersonaPage() {
    const copy = COPY[currentLang].persona;
    const slug = window.location.pathname.split("/").pop() || "";
    const persona = PERSONA_BY_SLUG[slug] || PERSONAS[0];
    const family = FAMILY_META[persona.family];
    const notFound = !PERSONA_BY_SLUG[slug];

    document.title = localizeText(persona.names) + " | Vincent AI";
    if (commonElements.descriptionMeta) {
      commonElements.descriptionMeta.setAttribute(
        "content",
        localizeText(persona.names) + " • Vincent persona detail page"
      );
    }

    personaElements.eyebrow.textContent = copy.eyebrow;
    personaElements.familyBadge.textContent = localizeText(family.name);
    personaElements.name.textContent = localizeText(persona.names);
    personaElements.subtitle.textContent = buildPersonaSubtitle(persona);
    personaElements.summary.textContent = buildPersonaSummary(persona, notFound ? copy.notFound : "");
    personaElements.constructsEyebrow.textContent = copy.constructsEyebrow;
    personaElements.constructsTitle.textContent = copy.constructsTitle;
    personaElements.assessmentCta.textContent = copy.assessmentCta;
    personaElements.directoryCta.textContent = copy.directoryCta;
    personaElements.stressNote.textContent = copy.stressNote;

    renderFigure(personaElements.heroFigure, persona, false);
    renderPills(personaElements.axisPills, buildPersonaAxisPills(persona));
    renderPersonaMetricGrid(personaElements.metricGrid, persona);
    renderPersonaTendencies(personaElements.constructs, persona);
    renderPersonaSections(personaElements.sections, persona);
  }

  function renderFrameworkPage() {
    const copy = COPY[currentLang].framework;

    frameworkElements.eyebrow.textContent = copy.eyebrow;
    frameworkElements.title.textContent = copy.title;
    frameworkElements.lead.textContent = copy.lead;
    frameworkElements.constructsEyebrow.textContent = copy.constructsEyebrow;
    frameworkElements.constructsTitle.textContent = copy.constructsTitle;
    frameworkElements.scoringEyebrow.textContent = copy.scoringEyebrow;
    frameworkElements.scoringTitle.textContent = copy.scoringTitle;
    frameworkElements.guardrailsEyebrow.textContent = copy.guardrailsEyebrow;
    frameworkElements.guardrailsTitle.textContent = copy.guardrailsTitle;
    frameworkElements.bannerEyebrow.textContent = copy.bannerEyebrow;
    frameworkElements.bannerTitle.textContent = copy.bannerTitle;
    frameworkElements.bannerLead.textContent = copy.bannerLead;
    frameworkElements.bannerCta.textContent = copy.bannerCta;

    frameworkElements.constructGrid.innerHTML = "";
    CONSTRUCTS.forEach(function (construct) {
      frameworkElements.constructGrid.appendChild(
        createFeatureCard(localizeText(construct.label), localizeText(construct.blurb))
      );
    });

    renderFeatureGrid(frameworkElements.stepGrid, copy.steps);
    renderFeatureGrid(frameworkElements.guardrailGrid, copy.guardrails);
  }

  function renderStatGrid(container, items) {
    container.innerHTML = "";
    items.forEach(function (item) {
      const card = document.createElement("article");
      card.className = "stat-card";
      card.innerHTML =
        "<strong>" +
        escapeHtml(item.value) +
        "</strong>" +
        "<h3>" +
        escapeHtml(item.label) +
        "</h3>" +
        "<p>" +
        escapeHtml(item.copy) +
        "</p>";
      container.appendChild(card);
    });
  }

  function renderFeatureGrid(container, items) {
    container.innerHTML = "";
    items.forEach(function (item) {
      container.appendChild(createFeatureCard(item.title, item.body));
    });
  }

  function createFeatureCard(title, body) {
    const card = document.createElement("article");
    card.className = "feature-card";
    card.innerHTML =
      "<strong>" + escapeHtml(title) + "</strong>" + "<p>" + escapeHtml(body) + "</p>";
    return card;
  }

  function renderSurfaceGrid(container, items) {
    container.innerHTML = "";
    items.forEach(function (item) {
      const card = document.createElement("a");
      card.className = "surface-card";
      card.href = localizedPath(item.path);
      card.innerHTML =
        '<p class="eyebrow">' +
        escapeHtml(item.kicker) +
        "</p>" +
        "<strong>" +
        escapeHtml(item.title) +
        "</strong>" +
        "<p>" +
        escapeHtml(item.body) +
        "</p>" +
        '<div class="pill-row"><span class="pill">' +
        escapeHtml(item.action) +
        "</span></div>";
      container.appendChild(card);
    });
  }

  function renderFamilyBands(container, denseMode) {
    container.innerHTML = "";

    Object.keys(FAMILY_META).forEach(function (familyKey) {
      const family = FAMILY_META[familyKey];
      const band = document.createElement("section");
      const header = document.createElement("div");
      const meta = document.createElement("div");
      const grid = document.createElement("div");

      band.className = "family-band family-" + familyKey;
      header.className = "family-band-header";
      meta.className = "family-meta";
      grid.className = "family-grid";

      meta.innerHTML =
        '<p class="family-kicker">' +
        escapeHtml(localizeText(family.kicker)) +
        "</p>" +
        "<h3>" +
        escapeHtml(localizeText(family.name)) +
        "</h3>" +
        "<p>" +
        escapeHtml(localizeText(family.description)) +
        "</p>";

      header.appendChild(meta);
      band.appendChild(header);

      PERSONAS.filter(function (persona) {
        return persona.family === familyKey;
      }).forEach(function (persona) {
        grid.appendChild(createPersonaCard(persona, denseMode));
      });

      band.appendChild(grid);
      container.appendChild(band);
    });
  }

  function createPersonaCard(persona, denseMode) {
    const family = FAMILY_META[persona.family];
    const link = document.createElement("a");
    const figure = document.createElement("div");
    const copy = document.createElement("div");

    link.className = "persona-card family-" + persona.family;
    link.href = localizedPath("/personas/" + persona.slug);

    figure.className = "persona-card-figure";
    renderFigure(figure, persona, true);

    copy.className = "persona-card-copy";
    copy.innerHTML =
      '<div class="family-badge">' +
      escapeHtml(localizeText(family.name)) +
      "</div>" +
      "<h3>" +
      escapeHtml(localizeText(persona.names)) +
      "</h3>" +
      "<p>" +
      escapeHtml(buildPersonaCardSummary(persona, denseMode)) +
      "</p>";

    link.appendChild(figure);
    link.appendChild(copy);
    link.appendChild(createPillRowElement(buildPersonaAxisPills(persona).slice(0, 2)));
    return link;
  }

  function renderPersonaMetricGrid(container, persona) {
    const copy = COPY[currentLang].persona;
    const items = [
      { label: copy.metrics.family, value: localizeText(FAMILY_META[persona.family].name) },
      { label: copy.metrics.presence, value: localizeAxisLabel("presence", persona.axes.presence) },
      { label: copy.metrics.method, value: localizeAxisLabel("structure", persona.axes.structure) },
      { label: copy.metrics.relating, value: localizeAxisLabel("warmth", persona.axes.warmth) },
    ];

    container.innerHTML = "";
    items.forEach(function (item) {
      const card = document.createElement("article");
      card.className = "metric-card";
      card.innerHTML =
        "<label>" +
        escapeHtml(item.label) +
        "</label>" +
        "<strong>" +
        escapeHtml(item.value) +
        "</strong>";
      container.appendChild(card);
    });
  }

  function renderPersonaTendencies(container, persona) {
    const copy = COPY[currentLang].persona;
    const tendencies = buildPersonaTendencies(persona);

    container.innerHTML = "";
    tendencies.forEach(function (item) {
      const card = document.createElement("article");
      card.className = "tendency-card";
      card.innerHTML =
        "<strong>" +
        escapeHtml(constructLabel(item.key)) +
        "</strong>" +
        '<div class="pill-row"><span class="pill">' +
        escapeHtml(item.levelLabel) +
        "</span></div>" +
        "<p>" +
        escapeHtml(item.body) +
        "</p>";
      container.appendChild(card);
    });
  }

  function renderPersonaSections(container, persona) {
    const copy = COPY[currentLang].persona;
    const sections = [
      {
        title: copy.sections.core,
        body:
          localizeAxisCopy("core", "presence", persona.axes.presence) +
          " " +
          localizeAxisCopy("core", "structure", persona.axes.structure),
      },
      {
        title: copy.sections.collaboration,
        body:
          localizeAxisCopy("collaboration", "warmth", persona.axes.warmth) +
          " " +
          localizeAxisCopy("collaboration", "range", persona.axes.range),
      },
      {
        title: copy.sections.pressure,
        body:
          localizeAxisCopy("pressure", "structure", persona.axes.structure) +
          " " +
          localizeAxisCopy("pressure", "warmth", persona.axes.warmth),
      },
      {
        title: copy.sections.growth,
        body:
          localizeAxisCopy("growth", "presence", persona.axes.presence) +
          " " +
          localizeAxisCopy("growth", "range", persona.axes.range),
      },
    ];

    container.innerHTML = "";
    sections.forEach(function (section) {
      container.appendChild(createFeatureCard(section.title, section.body));
    });
  }

  function buildPersonaTendencies(persona) {
    const copy = COPY[currentLang].persona;
    const items = [
      {
        key: "ASSERTIVE_EXTRAVERSION",
        level: persona.axes.presence === "signal" ? "high" : "low",
      },
      {
        key: "TRUSTING_AGREEABLENESS",
        level: persona.axes.warmth === "openhearted" ? "high" : "low",
      },
      {
        key: "PRODUCTIVE_CONSCIENTIOUSNESS",
        level: persona.axes.structure === "structured" ? "high" : "low",
      },
      {
        key: "NEGATIVE_EMOTIONALITY",
        level: "variable",
      },
      {
        key: "OPEN_MINDEDNESS",
        level: persona.axes.range === "expansive" ? "high" : "low",
      },
      {
        key: "ATTACHMENT_ANXIETY",
        level: "variable",
      },
      {
        key: "ATTACHMENT_AVOIDANCE",
        level: persona.axes.warmth === "openhearted" ? "low" : "high",
      },
    ];

    return items.map(function (item) {
      return {
        key: item.key,
        levelLabel:
          item.level === "high"
            ? copy.tendencyHigh
            : item.level === "low"
              ? copy.tendencyLow
              : copy.tendencyVariable,
        body: localizeTendencyCopy(item.key, item.level),
      };
    });
  }

  function buildPersonaCardSummary(persona, denseMode) {
    const family = FAMILY_META[persona.family];
    if (currentLang === "zh") {
      return (
        localizeText(family.name) +
        "中的一员，通常呈现为" +
        localizeAxisLabel("presence", persona.axes.presence) +
        "、" +
        localizeAxisLabel("structure", persona.axes.structure) +
        "，并带有" +
        localizeAxisLabel("range", persona.axes.range) +
        "的思考方式。"
      );
    }

    return denseMode
      ? localizeText(family.name) +
          " lens with a " +
          localizeAxisLabel("presence", persona.axes.presence).toLowerCase() +
          ", " +
          localizeAxisLabel("structure", persona.axes.structure).toLowerCase() +
          " style."
      : localizeText(family.name) +
          " lens with a " +
          localizeAxisLabel("presence", persona.axes.presence).toLowerCase() +
          ", " +
          localizeAxisLabel("structure", persona.axes.structure).toLowerCase() +
          ", " +
          localizeAxisLabel("range", persona.axes.range).toLowerCase() +
          " edge.";
  }

  function buildPersonaSubtitle(persona) {
    return [
      localizeAxisLabel("presence", persona.axes.presence),
      localizeAxisLabel("structure", persona.axes.structure),
      localizeAxisLabel("warmth", persona.axes.warmth),
      localizeAxisLabel("range", persona.axes.range),
    ].join(" • ");
  }

  function buildPersonaSummary(persona, prefix) {
    const family = FAMILY_META[persona.family];
    const parts = [];
    if (prefix) {
      parts.push(prefix);
    }
    parts.push(localizeText(family.description));
    parts.push(localizeAxisCopy("collaboration", "warmth", persona.axes.warmth));
    parts.push(localizeAxisCopy("collaboration", "range", persona.axes.range));
    return parts.join(" ");
  }

  function buildPersonaAxisPills(persona) {
    return [
      localizeAxisLabel("presence", persona.axes.presence),
      localizeAxisLabel("structure", persona.axes.structure),
      localizeAxisLabel("warmth", persona.axes.warmth),
      localizeAxisLabel("range", persona.axes.range),
    ];
  }

  function applyAssessmentChrome() {
    const copy = COPY[currentLang].assessment;

    assessmentElements.taskEyebrow.textContent = copy.eyebrow;
    assessmentElements.taskTitle.textContent = copy.title;
    assessmentElements.taskLead.textContent = copy.lead;
    assessmentElements.asideEyebrow.textContent = copy.asideEyebrow;
    assessmentElements.asideTitle.textContent = copy.asideTitle;
    assessmentElements.promiseEyebrow.textContent = copy.promiseEyebrow;
    assessmentElements.resultEyebrow.textContent = copy.resultEyebrow;
    assessmentElements.resultPersonaLink.textContent = copy.personaLink;
    assessmentElements.restartButton.textContent = copy.takeAgain;
    assessmentElements.metricPrimaryLabel.textContent = copy.metricPrimaryLabel;
    assessmentElements.metricSecondaryLabel.textContent = copy.metricSecondaryLabel;
    assessmentElements.resultHeadline.textContent = copy.resultHeadline;
    assessmentElements.resultName.textContent = copy.resultName;
    assessmentElements.resultSubtitle.textContent = copy.resultSubtitle(7, 28);
    assessmentElements.resultReflection.textContent = copy.resultReflection;
    assessmentElements.resultNote.textContent = copy.resultNote;
    assessmentElements.resultCaution.textContent = copy.resultCaution;

    renderAnswerTips();
    renderPromiseList();
  }

  function renderAnswerTips() {
    const copy = COPY[currentLang].assessment;
    assessmentElements.tipsList.innerHTML = "";
    copy.answerTips.forEach(function (tip, index) {
      const row = document.createElement("div");
      row.className = "tip-item";
      row.innerHTML =
        "<strong>" +
        String(index + 1) +
        '</strong><div><h3>' +
        escapeHtml(tip.title) +
        "</h3><p>" +
        escapeHtml(tip.body) +
        "</p></div>";
      assessmentElements.tipsList.appendChild(row);
    });
  }

  function renderPromiseList() {
    const copy = COPY[currentLang].assessment;
    assessmentElements.promiseList.innerHTML = "";
    copy.promises.forEach(function (item, index) {
      const row = document.createElement("div");
      row.className = "promise-item";
      row.innerHTML =
        "<strong>" +
        String(index + 1) +
        "</strong>" +
        '<div><h3>' +
        escapeHtml(item.title) +
        "</h3><p>" +
        escapeHtml(item.body) +
        "</p></div>";
      assessmentElements.promiseList.appendChild(row);
    });
  }

  function restoreAssessmentState() {
    const raw = readLocalStorage(ASSESSMENT_STORAGE_KEY);
    if (!raw) {
      return;
    }

    try {
      const saved = JSON.parse(raw);
      if (saved && typeof saved === "object") {
        state.answers = saved.answers && typeof saved.answers === "object" ? saved.answers : {};
        state.index = Number.isInteger(saved.index) ? saved.index : 0;
        state.result =
          saved.result && Array.isArray(saved.result.constructs) ? saved.result : null;
        state.showingResult = Boolean(saved.showingResult && state.result);
      }
    } catch (_error) {
      removeLocalStorage(ASSESSMENT_STORAGE_KEY);
    }
  }

  function persistAssessmentState() {
    writeLocalStorage(
      ASSESSMENT_STORAGE_KEY,
      JSON.stringify({
        answers: state.answers,
        index: state.index,
        result: state.result,
        showingResult: state.showingResult,
      })
    );
  }

  function clearAssessmentState() {
    state.answers = {};
    state.index = 0;
    state.result = null;
    state.showingResult = false;
    state.submittingScore = false;
    state.status = "";
    removeLocalStorage(ASSESSMENT_STORAGE_KEY);
  }

  function bindAssessmentEvents() {
    assessmentElements.previousButton.addEventListener("click", function () {
      if (state.submittingScore || state.loadingQuestions || state.index === 0) {
        return;
      }
      state.index -= 1;
      state.status = "";
      persistAssessmentState();
      renderAssessment();
    });

    assessmentElements.nextButton.addEventListener("click", function () {
      if (state.loadingQuestions) {
        return;
      }
      if (!state.questions.length) {
        loadQuestions();
        return;
      }
      if (state.submittingScore) {
        return;
      }

      const question = state.questions[state.index];
      if (!question || !isValidAnswer(state.answers[question.id])) {
        return;
      }

      if (state.index < state.questions.length - 1) {
        state.index += 1;
        state.status = "";
        persistAssessmentState();
        renderAssessment();
        return;
      }

      submitAssessment();
    });

    assessmentElements.restartButton.addEventListener("click", function () {
      clearAssessmentState();
      renderAssessment();
    });
  }

  async function loadQuestions() {
    if (state.loadingQuestions) {
      return;
    }

    state.loadingQuestions = true;
    state.status = COPY[currentLang].assessment.loading;
    renderAssessment();

    try {
      const response = await fetch("/api/questions", { headers: { accept: "application/json" } });
      if (!response.ok) {
        throw new Error(COPY[currentLang].assessment.unavailableQuestion);
      }
      const payload = await response.json();
      if (!Array.isArray(payload) || !payload.length) {
        throw new Error(COPY[currentLang].assessment.unavailableQuestion);
      }
      state.questions = payload;
      sanitizeAssessmentState();
      state.status = "";
    } catch (error) {
      state.questions = [];
      state.status =
        error instanceof Error
          ? error.message
          : COPY[currentLang].assessment.unavailableQuestion;
    } finally {
      state.loadingQuestions = false;
      renderAssessment();
    }
  }

  function sanitizeAssessmentState() {
    const validIds = new Set(
      state.questions.map(function (question) {
        return question.id;
      })
    );
    const nextAnswers = {};

    Object.keys(state.answers).forEach(function (id) {
      const value = Number(state.answers[id]);
      if (validIds.has(id) && isValidAnswer(value)) {
        nextAnswers[id] = value;
      }
    });

    state.answers = nextAnswers;
    if (!Number.isInteger(state.index) || state.index < 0) {
      state.index = 0;
    }
    if (state.index >= state.questions.length) {
      state.index = Math.max(state.questions.length - 1, 0);
    }
    persistAssessmentState();
  }

  function renderAssessment() {
    if (!assessmentElements) {
      return;
    }

    if (state.showingResult && state.result) {
      assessmentElements.questionCard.classList.add("hidden");
      assessmentElements.resultCard.classList.remove("hidden");
      renderResult(state.result);
      return;
    }

    assessmentElements.questionCard.classList.remove("hidden");
    assessmentElements.resultCard.classList.add("hidden");

    if (!state.questions.length) {
      renderAssessmentLoadingState();
      return;
    }

    renderQuestion();
  }

  function renderAssessmentLoadingState() {
    const copy = COPY[currentLang].assessment;
    const isLoading = state.loadingQuestions || !state.status;
    setTaskStatus(isLoading ? copy.loading : state.status || copy.unavailableHelp);
    assessmentElements.progressLabel.textContent = copy.loadingLabel;
    assessmentElements.progressPercent.textContent = copy.progressPercent(0);
    assessmentElements.progressAnswered.textContent = copy.progressAnswered(0, 0);
    assessmentElements.progressBar.style.width = "0%";
    assessmentElements.questionIndex.textContent = "--";
    assessmentElements.dimensionBadge.textContent = isLoading
      ? copy.loadingLabel
      : copy.unavailableStatus;
    assessmentElements.questionPrompt.textContent = isLoading
      ? copy.loading
      : state.status || copy.unavailableQuestion;
    assessmentElements.optionList.innerHTML = "";
    assessmentElements.previousButton.textContent = copy.previous;
    assessmentElements.previousButton.disabled = true;
    assessmentElements.nextButton.textContent = isLoading ? copy.loading : copy.tryAgain;
    assessmentElements.nextButton.disabled = isLoading;
  }

  function renderQuestion() {
    const copy = COPY[currentLang].assessment;
    const question = state.questions[state.index];
    const total = state.questions.length;
    const answeredCount = countAnsweredQuestions();
    const percent = Math.round((answeredCount / total) * 100);

    setTaskStatus(state.status);
    assessmentElements.progressLabel.textContent = copy.progressLabel(state.index + 1, total);
    assessmentElements.progressPercent.textContent = copy.progressPercent(percent);
    assessmentElements.progressAnswered.textContent = copy.progressAnswered(answeredCount, total);
    assessmentElements.progressBar.style.width = percent + "%";
    assessmentElements.questionIndex.textContent = String(state.index + 1).padStart(2, "0");
    assessmentElements.dimensionBadge.textContent = constructLabel(question.dimension);
    assessmentElements.questionPrompt.textContent = localizeQuestionPrompt(question);

    renderQuestionOptions(question);

    assessmentElements.previousButton.textContent = copy.previous;
    assessmentElements.previousButton.disabled =
      state.loadingQuestions || state.submittingScore || state.index === 0;
    assessmentElements.nextButton.textContent = state.submittingScore
      ? copy.scoring
      : state.index === total - 1
        ? copy.seeResult
        : copy.continue;
    assessmentElements.nextButton.disabled =
      state.loadingQuestions ||
      state.submittingScore ||
      !isValidAnswer(state.answers[question.id]);
  }

  function renderQuestionOptions(question) {
    const labels = COPY[currentLang].assessment.scaleOptions;
    const selected = state.answers[question.id];

    assessmentElements.optionList.innerHTML = "";

    question.options.forEach(function (option) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option-button button-reset";
      if (selected === option.value) {
        button.classList.add("active");
      }

      button.innerHTML =
        '<span class="option-index">' +
        option.value +
        " / 5</span>" +
        '<span class="option-text">' +
        escapeHtml(labels[option.value - 1] || option.label) +
        "</span>";

      button.addEventListener("click", function () {
        state.answers[question.id] = option.value;
        state.status = "";
        persistAssessmentState();
        renderAssessment();
      });

      assessmentElements.optionList.appendChild(button);
    });
  }

  async function submitAssessment() {
    if (state.submittingScore) {
      return;
    }

    const missingIndex = findFirstUnansweredIndex();
    if (missingIndex !== -1) {
      state.index = missingIndex;
      persistAssessmentState();
      renderAssessment();
      return;
    }

    state.submittingScore = true;
    state.status = "";
    renderAssessment();

    try {
      const response = await fetch("/api/score", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ answers: state.answers }),
      });

      const payload = await response.json().catch(function () {
        return null;
      });

      if (!response.ok) {
        throw new Error(
          payload && typeof payload.error === "string"
            ? payload.error
            : COPY[currentLang].assessment.tryAgain
        );
      }

      state.result = payload;
      state.showingResult = true;
      state.status = "";
      persistAssessmentState();
    } catch (error) {
      state.status =
        error instanceof Error ? error.message : COPY[currentLang].assessment.tryAgain;
    } finally {
      state.submittingScore = false;
      renderAssessment();
    }
  }

  function renderResult(result) {
    const copy = COPY[currentLang].assessment;
    const constructs = Array.isArray(result.constructs) ? result.constructs.slice() : [];

    if (!constructs.length) {
      state.showingResult = false;
      state.status = copy.tryAgain;
      renderAssessment();
      return;
    }

    const byKey = mapConstructs(constructs);
    const personaState = derivePersona(constructs);
    const sorted = constructs
      .slice()
      .sort(function (left, right) {
        if (right.mean_score !== left.mean_score) {
          return right.mean_score - left.mean_score;
        }
        return String(left.label).localeCompare(String(right.label));
      });

    const highest = sorted[0];
    const second = sorted[Math.min(1, sorted.length - 1)];
    const lowest = sorted[sorted.length - 1];
    const itemCount = Number(result.item_count) || state.questions.length || 28;

    setTaskStatus("");
    assessmentElements.progressLabel.textContent = copy.progressLabel(itemCount, itemCount);
    assessmentElements.progressPercent.textContent = copy.progressPercent(100);
    assessmentElements.progressAnswered.textContent = copy.progressAnswered(itemCount, itemCount);
    assessmentElements.progressBar.style.width = "100%";

    renderFigure(assessmentElements.resultPersonaFigure, personaState.persona, false);
    assessmentElements.resultPersonaFamily.textContent = localizeText(
      FAMILY_META[personaState.persona.family].name
    );
    assessmentElements.resultPersonaName.textContent = localizeText(personaState.persona.names);
    assessmentElements.resultPersonaSubtitle.textContent = buildPersonaSubtitle(
      personaState.persona
    );
    assessmentElements.resultPersonaSummary.textContent = buildRuntimePersonaSummary(
      personaState.persona,
      byKey
    );
    renderPills(
      assessmentElements.resultPersonaPills,
      buildPersonaAxisPills(personaState.persona).concat([personaState.pressureLabel])
    );
    assessmentElements.resultPersonaLink.href = localizedPath(
      "/personas/" + personaState.persona.slug
    );
    assessmentElements.resultPersonaLink.textContent = copy.personaLink;
    assessmentElements.metricPrimaryLabel.textContent = copy.metricPrimaryLabel;
    assessmentElements.metricPrimaryValue.textContent = String(itemCount);
    assessmentElements.metricSecondaryLabel.textContent = copy.metricSecondaryLabel;
    assessmentElements.metricSecondaryValue.textContent = localizeResponseScale(
      result.response_scale
    );
    assessmentElements.resultHeadline.textContent = copy.resultHeadline;
    assessmentElements.resultName.textContent = copy.resultName;
    assessmentElements.resultSubtitle.textContent = copy.resultSubtitle(constructs.length, itemCount);
    assessmentElements.resultEssence.textContent = copy.resultSummary(
      constructLabel(highest.key),
      constructLabel(second.key),
      constructLabel(lowest.key)
    );
    assessmentElements.resultReflection.textContent = copy.resultReflection;
    assessmentElements.resultNote.textContent =
      currentLang === "zh" ? copy.resultNote : result.note || copy.resultNote;
    assessmentElements.resultCaution.textContent = copy.resultCaution;

    renderConstructBreakdown(constructs);
  }

  function renderConstructBreakdown(constructs) {
    assessmentElements.dimensionBars.innerHTML = "";
    constructs
      .slice()
      .sort(function (left, right) {
        return right.mean_score - left.mean_score;
      })
      .forEach(function (construct) {
        const item = document.createElement("article");
        const label = document.createElement("div");
        const title = document.createElement("strong");
        const score = document.createElement("span");
        const meter = document.createElement("div");
        const fill = document.createElement("span");
        const note = document.createElement("p");

        item.className = "dimension-item";
        label.className = "dimension-label";
        meter.className = "dimension-meter";
        note.className = "dimension-note";

        title.textContent = constructLabel(construct.key);
        score.textContent =
          localizeBand(construct.display_band) + " • " + formatMeanScore(construct.mean_score);
        fill.style.width = scoreToPercent(construct.mean_score) + "%";
        note.textContent = localizeInterpretation(construct);

        label.appendChild(title);
        label.appendChild(score);
        meter.appendChild(fill);
        item.appendChild(label);
        item.appendChild(meter);
        item.appendChild(note);
        assessmentElements.dimensionBars.appendChild(item);
      });
  }

  function renderPills(container, items) {
    container.innerHTML = "";
    items.forEach(function (item) {
      const pill = document.createElement("span");
      pill.className = "pill";
      pill.textContent = item;
      container.appendChild(pill);
    });
  }

  function createPillRowElement(items) {
    const row = document.createElement("div");
    row.className = "pill-row";
    items.forEach(function (item) {
      const pill = document.createElement("span");
      pill.className = "pill";
      pill.textContent = item;
      row.appendChild(pill);
    });
    return row;
  }

  function setTaskStatus(message) {
    if (!assessmentElements || !assessmentElements.taskStatus) {
      return;
    }
    if (message) {
      assessmentElements.taskStatus.textContent = message;
      assessmentElements.taskStatus.classList.remove("hidden");
    } else {
      assessmentElements.taskStatus.textContent = "";
      assessmentElements.taskStatus.classList.add("hidden");
    }
  }

  function countAnsweredQuestions() {
    return state.questions.reduce(function (count, question) {
      return count + (isValidAnswer(state.answers[question.id]) ? 1 : 0);
    }, 0);
  }

  function findFirstUnansweredIndex() {
    for (let index = 0; index < state.questions.length; index += 1) {
      if (!isValidAnswer(state.answers[state.questions[index].id])) {
        return index;
      }
    }
    return -1;
  }

  function isValidAnswer(value) {
    return Number.isInteger(value) && value >= 1 && value <= 5;
  }

  function localizeQuestionPrompt(question) {
    if (currentLang === "zh" && QUESTION_TRANSLATIONS.zh[question.id]) {
      return QUESTION_TRANSLATIONS.zh[question.id];
    }
    return question.prompt;
  }

  function constructLabel(key) {
    const construct = CONSTRUCTS.find(function (item) {
      return item.key === key;
    });
    return construct ? localizeText(construct.label) : humanizeKey(key);
  }

  function mapConstructs(constructs) {
    return constructs.reduce(function (map, item) {
      map[item.key] = Number(item.mean_score);
      return map;
    }, {});
  }

  function derivePersona(constructs) {
    const byKey = mapConstructs(constructs);
    const presence = (byKey.ASSERTIVE_EXTRAVERSION || 3) >= 3 ? "signal" : "quiet";
    const structure =
      (byKey.PRODUCTIVE_CONSCIENTIOUSNESS || 3) >= 3 ? "structured" : "fluid";
    const range = (byKey.OPEN_MINDEDNESS || 3) >= 3 ? "expansive" : "grounded";
    const warmthScore =
      ((byKey.TRUSTING_AGREEABLENESS || 3) + (6 - (byKey.ATTACHMENT_AVOIDANCE || 3))) / 2;
    const warmth = warmthScore >= 3 ? "openhearted" : "guarded";
    const signature = personaSignature({
      presence: presence,
      structure: structure,
      warmth: warmth,
      range: range,
    });
    const persona = PERSONA_BY_SIGNATURE[signature] || PERSONAS[0];
    return {
      persona: persona,
      pressureLabel: buildPressureLabel(byKey),
    };
  }

  function buildRuntimePersonaSummary(persona, byKey) {
    const negative = byKey.NEGATIVE_EMOTIONALITY || 3;
    const anxiety = byKey.ATTACHMENT_ANXIETY || 3;
    const stressSummary =
      negative >= 3.8 && anxiety >= 3.6
        ? currentLang === "zh"
          ? "在压力和关系不确定性上，你这次也更容易进入高警觉模式。"
          : "In this check-in, stress and relational ambiguity also look more likely to trigger vigilance."
        : negative <= 2.4 && anxiety <= 2.4
          ? currentLang === "zh"
            ? "在压力和关系模糊上，你这次呈现得相对更稳。"
            : "In this check-in, stress and relational ambiguity look relatively steadier."
          : currentLang === "zh"
            ? "在压力和关系模糊上，你这次更像是情境型波动，而不是结果核心。"
            : "In this check-in, stress and relational ambiguity look more situational than defining.";

    return buildPersonaSummary(persona, "") + " " + stressSummary;
  }

  function buildPressureLabel(byKey) {
    const value = ((byKey.NEGATIVE_EMOTIONALITY || 3) + (byKey.ATTACHMENT_ANXIETY || 3)) / 2;
    const labels = COPY[currentLang].tendencies;
    if (value >= 3.7) {
      return labels.pressureVigilant;
    }
    if (value <= 2.5) {
      return labels.pressureSteady;
    }
    return labels.pressureMixed;
  }

  function localizeAxisLabel(axis, value) {
    return localizeText(AXIS_LABELS[axis][value]);
  }

  function localizeAxisCopy(section, axis, value) {
    return localizeText(AXIS_COPY[section][axis][value]);
  }

  function localizeTendencyCopy(key, level) {
    return localizeText(TENDENCY_COPY[key][level]);
  }

  function localizeText(value) {
    if (value && typeof value === "object") {
      return value[currentLang] || value.en || "";
    }
    return value || "";
  }

  function localizeResponseScale(scale) {
    if (currentLang === "zh") {
      return "5 点同意度量表";
    }
    return scale === "5-point agreement" ? "5-point agreement scale" : scale;
  }

  function localizeBand(band) {
    if (currentLang === "zh") {
      if (band === "Mostly disagree") {
        return "大多不同意";
      }
      if (band === "Somewhat disagree") {
        return "略偏不同意";
      }
      if (band === "Mixed") {
        return "中间 / 混合";
      }
      if (band === "Somewhat agree") {
        return "略偏同意";
      }
      if (band === "Mostly agree") {
        return "大多同意";
      }
    }
    return band;
  }

  function localizeInterpretation(construct) {
    if (currentLang === "zh") {
      switch (construct.key) {
        case "ASSERTIVE_EXTRAVERSION":
          return construct.mean_score >= 3
            ? "你这次更容易把自己放到前台，用可见度和参与感推动场面。"
            : "你这次更像是先保留社交能量，再决定何时走到前台。";
        case "TRUSTING_AGREEABLENESS":
          return construct.mean_score >= 3
            ? "你这次更倾向于从信任、体谅和合作感出发。"
            : "你这次更容易先读到风险、算计或需要自我保护的地方。";
        case "PRODUCTIVE_CONSCIENTIOUSNESS":
          return construct.mean_score >= 3
            ? "你这次更依赖计划、一致性和自我执行。"
            : "你这次更重视灵活度，而不是把所有事都交给结构。";
        case "NEGATIVE_EMOTIONALITY":
          return construct.mean_score >= 3
            ? "你这次更容易让担忧和情绪波动保持在线。"
            : "你这次相对不容易被压力和负面情绪完全带走。";
        case "OPEN_MINDEDNESS":
          return construct.mean_score >= 3
            ? "你这次更偏向新意、多角度和概念上的开放空间。"
            : "你这次更偏好熟悉做法和更确定的路径。";
        case "ATTACHMENT_ANXIETY":
          return construct.mean_score >= 3
            ? "你这次对关系里的沉默、模糊和距离更敏感。"
            : "你这次对关系中的不确定性相对更能承受。";
        case "ATTACHMENT_AVOIDANCE":
          return construct.mean_score >= 3
            ? "你这次更可能通过保持距离来保护自主性。"
            : "你这次更容易把亲近和依赖视为可处理的。";
        default:
          return construct.interpretation;
      }
    }

    return construct.interpretation;
  }

  function formatMeanScore(meanScore) {
    return Number(meanScore).toFixed(2) + " / 5";
  }

  function scoreToPercent(meanScore) {
    return Math.max(0, Math.min(100, Math.round(((Number(meanScore) - 1) / 4) * 100)));
  }

  function humanizeKey(key) {
    return String(key)
      .toLowerCase()
      .split("_")
      .map(function (part) {
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join(" ");
  }

  function personaSignature(axes) {
    return [axes.presence, axes.structure, axes.warmth, axes.range].join("|");
  }

  function renderFigure(container, persona, compact) {
    container.innerHTML = buildFigureSvg(persona, compact);
  }

  function buildFigureSvg(persona, compact) {
    const id = "persona-" + persona.slug.replace(/[^a-z0-9]/gi, "");
    const theme = buildFigureTheme(persona.palette);
    const pose = buildFigurePose(persona, compact);
    const name = escapeHtml(localizeText(persona.names));
    return [
      '<svg class="figure-svg" viewBox="0 0 320 320" role="img" aria-label="' +
        name +
        '">',
      "<defs>",
      '<linearGradient id="' +
        id +
        '-bg" x1="20%" y1="12%" x2="82%" y2="100%">' +
        '<stop offset="0%" stop-color="' +
        theme.bgTop +
        '"/>' +
        '<stop offset="100%" stop-color="' +
        theme.bgBottom +
        '"/>' +
        "</linearGradient>",
      '<linearGradient id="' +
        id +
        '-coat" x1="18%" y1="0%" x2="82%" y2="100%">' +
        '<stop offset="0%" stop-color="' +
        theme.outfitLight +
        '"/>' +
        '<stop offset="100%" stop-color="' +
        theme.outfitDeep +
        '"/>' +
        "</linearGradient>",
      '<linearGradient id="' +
        id +
        '-accent" x1="0%" y1="0%" x2="100%" y2="100%">' +
        '<stop offset="0%" stop-color="' +
        theme.accentPale +
        '"/>' +
        '<stop offset="100%" stop-color="' +
        theme.accentStrong +
        '"/>' +
        "</linearGradient>",
      "</defs>",
      '<rect x="18" y="18" width="284" height="284" rx="40" fill="url(#' + id + '-bg)"/>',
      buildFigureSceneSvg(persona, theme, pose, compact),
      '<ellipse cx="160" cy="' +
        (compact ? 270 : 274) +
        '" rx="' +
        (compact ? 74 : 84) +
        '" ry="' +
        (compact ? 14 : 16) +
        '" fill="' +
        theme.shadowSoft +
        '"/>',
      buildFigureCharacterSvg(persona, theme, pose, id),
      (compact
        ? ""
        : '<path d="M42 250C88 228 122 228 160 250C194 270 230 270 278 248" stroke="' +
          theme.line +
          '" stroke-width="2" fill="none"/>'),
      "</svg>",
    ].join("");
  }

  function buildFigureTheme(palette) {
    return {
      bgTop: mixHexColors(palette.bg, "#ffffff", 0.2),
      bgBottom: mixHexColors(palette.bg, "#f5f1ea", 0.64),
      glow: rgbaFromHex(palette.glow, 0.5),
      glowSoft: rgbaFromHex(palette.glow, 0.22),
      accentStrong: mixHexColors(palette.accent, "#111316", 0.12),
      accentPale: mixHexColors(palette.accent, "#ffffff", 0.42),
      accentSoft: rgbaFromHex(palette.accent, 0.16),
      outfitMid: palette.outfit,
      outfitLight: mixHexColors(palette.outfit, "#ffffff", 0.18),
      outfitDeep: mixHexColors(palette.outfit, "#111316", 0.24),
      outfitShade: rgbaFromHex(mixHexColors(palette.outfit, "#111316", 0.32), 0.22),
      trouser: mixHexColors(palette.outfit, "#111316", 0.3),
      skin: palette.skin,
      skinDeep: mixHexColors(palette.skin, "#8a6254", 0.2),
      hair: palette.hair,
      hairDeep: mixHexColors(palette.hair, "#111316", 0.3),
      hairLight: mixHexColors(palette.hair, "#ffffff", 0.12),
      shoe: mixHexColors(palette.outfit, "#111316", 0.42),
      line: rgbaFromHex("#111316", 0.08),
      white: rgbaFromHex("#ffffff", 0.72),
      paper: mixHexColors(palette.bg, "#ffffff", 0.62),
      metal: mixHexColors(palette.hair, "#d5dce3", 0.36),
      shadowSoft: rgbaFromHex("#111316", 0.08),
    };
  }

  function buildFigurePose(persona, compact) {
    const signal = persona.axes.presence === "signal";
    const structured = persona.axes.structure === "structured";
    const open = persona.axes.warmth === "openhearted";
    const expansive = persona.axes.range === "expansive";
    const keyByFamily = {
      vectors: "command",
      signals: "spark",
      studios: "study",
      harbors: "drift",
    };
    const poseMap = {
      command: {
        headX: 160,
        headY: 96,
        headTilt: -4,
        bodyTopY: 146,
        bodyBottomY: 236,
        topWidth: 88,
        bottomWidth: 104,
        leftShoulderX: 127,
        rightShoulderX: 193,
        shoulderY: 160,
        leftElbowX: 112,
        leftElbowY: 190,
        leftHandX: 104,
        leftHandY: 220,
        rightElbowX: 212,
        rightElbowY: 176,
        rightHandX: 224,
        rightHandY: 176,
        leftHipX: 149,
        rightHipX: 171,
        hipY: 236,
        leftKneeX: 147,
        leftKneeY: 264,
        rightKneeX: 174,
        rightKneeY: 264,
        leftFootX: 143,
        rightFootX: 178,
        footY: 292,
        propX: 224,
        propY: 176,
      },
      spark: {
        headX: 161,
        headY: 100,
        headTilt: -5,
        bodyTopY: 150,
        bodyBottomY: 234,
        topWidth: 92,
        bottomWidth: 116,
        leftShoulderX: 124,
        rightShoulderX: 196,
        shoulderY: 168,
        leftElbowX: 100,
        leftElbowY: 186,
        leftHandX: 88,
        leftHandY: 186,
        rightElbowX: 216,
        rightElbowY: 190,
        rightHandX: 224,
        rightHandY: 200,
        leftHipX: 146,
        rightHipX: 174,
        hipY: 236,
        leftKneeX: 138,
        leftKneeY: 268,
        rightKneeX: 180,
        rightKneeY: 258,
        leftFootX: 130,
        rightFootX: 188,
        footY: 292,
        propX: 222,
        propY: 198,
      },
      study: {
        headX: 160,
        headY: 100,
        headTilt: 2,
        bodyTopY: 148,
        bodyBottomY: 242,
        topWidth: 82,
        bottomWidth: 98,
        leftShoulderX: 130,
        rightShoulderX: 190,
        shoulderY: 164,
        leftElbowX: 144,
        leftElbowY: 186,
        leftHandX: 152,
        leftHandY: 204,
        rightElbowX: 202,
        rightElbowY: 194,
        rightHandX: 202,
        rightHandY: 220,
        leftHipX: 150,
        rightHipX: 170,
        hipY: 242,
        leftKneeX: 148,
        leftKneeY: 272,
        rightKneeX: 172,
        rightKneeY: 272,
        leftFootX: 144,
        rightFootX: 176,
        footY: 294,
        propX: 154,
        propY: 198,
      },
      drift: {
        headX: 158,
        headY: 102,
        headTilt: 3,
        bodyTopY: 152,
        bodyBottomY: 238,
        topWidth: 90,
        bottomWidth: 110,
        leftShoulderX: 128,
        rightShoulderX: 192,
        shoulderY: 170,
        leftElbowX: 114,
        leftElbowY: 198,
        leftHandX: 108,
        leftHandY: 220,
        rightElbowX: 204,
        rightElbowY: 190,
        rightHandX: 208,
        rightHandY: 206,
        leftHipX: 148,
        rightHipX: 172,
        hipY: 238,
        leftKneeX: 144,
        leftKneeY: 270,
        rightKneeX: 178,
        rightKneeY: 266,
        leftFootX: 140,
        rightFootX: 182,
        footY: 294,
        propX: 210,
        propY: 206,
      },
    };
    const base = poseMap[keyByFamily[persona.family]];

    return {
      key: keyByFamily[persona.family],
      compact: compact,
      signal: signal,
      structured: structured,
      open: open,
      expansive: expansive,
      headX: base.headX,
      headY: base.headY + (expansive ? -1 : 1),
      headTilt: base.headTilt + (open ? -1 : 1),
      bodyTopY: base.bodyTopY,
      bodyBottomY: base.bodyBottomY + (expansive ? -4 : 0),
      topWidth: base.topWidth + (open ? 4 : 0),
      bottomWidth: base.bottomWidth + (expansive ? 8 : 0),
      leftShoulderX: base.leftShoulderX,
      rightShoulderX: base.rightShoulderX,
      shoulderY: base.shoulderY,
      leftElbowX: base.leftElbowX + (open ? -4 : 4),
      leftElbowY: base.leftElbowY,
      leftHandX: base.leftHandX + (open ? -6 : 6),
      leftHandY: base.leftHandY - (open ? (signal ? 8 : 4) : 0),
      rightElbowX: base.rightElbowX + (expansive ? 4 : 0),
      rightElbowY: base.rightElbowY - (signal ? 2 : 0),
      rightHandX: base.rightHandX + (expansive ? 6 : -2),
      rightHandY: base.rightHandY - (open ? (signal ? 10 : 4) : 0),
      leftHipX: base.leftHipX - (expansive ? 4 : 0),
      rightHipX: base.rightHipX + (expansive ? 4 : 0),
      hipY: base.hipY,
      leftKneeX: base.leftKneeX - (expansive ? 6 : 0),
      leftKneeY: base.leftKneeY,
      rightKneeX: base.rightKneeX + (expansive ? 6 : 0),
      rightKneeY: base.rightKneeY - (keyByFamily[persona.family] === "spark" ? 10 : 0),
      leftFootX: base.leftFootX - (expansive ? 8 : 0),
      rightFootX: base.rightFootX + (expansive ? 8 : 0),
      footY: base.footY,
      chestX: 160,
      chestY: base.bodyTopY + 42,
      propX: base.propX,
      propY: base.propY,
      accessoryScale: compact ? 0.92 : 1,
    };
  }

  function buildFigureSceneSvg(persona, theme, pose, compact) {
    switch (persona.family) {
      case "vectors":
        return [
          '<circle cx="244" cy="74" r="' + (compact ? 30 : 40) + '" fill="' + theme.glow + '"/>',
          '<rect x="54" y="86" width="24" height="126" rx="12" fill="' + theme.accentSoft + '"/>',
          '<rect x="238" y="102" width="16" height="92" rx="8" fill="' + theme.accentSoft + '"/>',
          '<path d="M74 90L112 58H208L244 90" fill="' + theme.glowSoft + '"/>',
          '<path d="M84 236C114 214 146 212 178 226" stroke="' +
            theme.glowSoft +
            '" stroke-width="' +
            (compact ? 10 : 12) +
            '" fill="none" stroke-linecap="round"/>',
        ].join("");
      case "signals":
        return [
          '<circle cx="248" cy="78" r="' + (compact ? 28 : 38) + '" fill="' + theme.glow + '"/>',
          '<path d="M50 184C86 150 120 150 154 180" stroke="' +
            theme.accentSoft +
            '" stroke-width="' +
            (compact ? 10 : 12) +
            '" fill="none" stroke-linecap="round"/>',
          '<path d="M172 150C206 126 238 128 274 156" stroke="' +
            theme.glowSoft +
            '" stroke-width="' +
            (compact ? 12 : 14) +
            '" fill="none" stroke-linecap="round"/>',
          '<circle cx="88" cy="92" r="18" fill="' + theme.paper + '" opacity="0.8"/>',
          '<circle cx="110" cy="116" r="8" fill="' + theme.accentSoft + '"/>',
        ].join("");
      case "studios":
        return [
          '<circle cx="242" cy="76" r="' + (compact ? 26 : 34) + '" fill="' + theme.glowSoft + '"/>',
          '<rect x="46" y="66" width="76" height="56" rx="16" fill="' + theme.paper + '" opacity="0.82"/>',
          '<path d="M64 84H106M64 96H96M64 108H112" stroke="' +
            theme.line +
            '" stroke-width="4" stroke-linecap="round"/>',
          '<rect x="226" y="188" width="34" height="58" rx="12" fill="' + theme.accentSoft + '"/>',
          '<rect x="236" y="178" width="14" height="16" rx="6" fill="' + theme.paper + '" opacity="0.8"/>',
        ].join("");
      case "harbors":
        return [
          '<circle cx="246" cy="78" r="' + (compact ? 28 : 36) + '" fill="' + theme.glowSoft + '"/>',
          '<path d="M38 248C82 216 118 216 160 238C198 258 232 258 282 236V302H38Z" fill="' +
            theme.accentSoft +
            '"/>',
          '<path d="M56 208C92 188 124 190 150 212" stroke="' +
            theme.white +
            '" stroke-width="' +
            (compact ? 6 : 8) +
            '" fill="none" stroke-linecap="round"/>',
          '<path d="M180 204C204 188 228 188 258 204" stroke="' +
            theme.glowSoft +
            '" stroke-width="' +
            (compact ? 8 : 10) +
            '" fill="none" stroke-linecap="round"/>',
        ].join("");
      default:
        return "";
    }
  }

  function buildFigureCharacterSvg(persona, theme, pose, id) {
    return [
      pose.expansive ? buildFigureTrailSvg(theme, pose) : "",
      buildRearAccessorySvg(persona, theme, pose),
      buildFigureLegsSvg(theme, pose),
      buildFigureBodySvg(theme, pose, id),
      buildFigureArmSvg(theme, pose, "left"),
      buildFigureArmSvg(theme, pose, "right"),
      buildFigureHeadSvg(theme, pose),
      buildFrontAccessorySvg(persona, theme, pose, id),
    ].join("");
  }

  function buildFigureTrailSvg(theme, pose) {
    const top = pose.bodyTopY + 10;
    const bottom = pose.bodyBottomY - 4;
    return (
      '<path d="M118 ' +
      top +
      "C128 " +
      (top - 16) +
      " 192 " +
      (top - 18) +
      " 204 " +
      top +
      "L214 " +
      (bottom - 6) +
      "Q160 " +
      (bottom + 26) +
      " 106 " +
      (bottom - 8) +
      'Z" fill="' +
      theme.accentSoft +
      '" opacity="' +
      (pose.structured ? "0.9" : "0.72") +
      '"/>'
    );
  }

  function buildFigureLegsSvg(theme, pose) {
    return [
      '<path d="M' +
        pose.leftHipX +
        " " +
        pose.hipY +
        "Q" +
        pose.leftKneeX +
        " " +
        pose.leftKneeY +
        " " +
        pose.leftFootX +
        " " +
        pose.footY +
        '" stroke="' +
        theme.trouser +
        '" stroke-width="22" stroke-linecap="round" fill="none"/>',
      '<path d="M' +
        pose.rightHipX +
        " " +
        pose.hipY +
        "Q" +
        pose.rightKneeX +
        " " +
        pose.rightKneeY +
        " " +
        pose.rightFootX +
        " " +
        pose.footY +
        '" stroke="' +
        theme.trouser +
        '" stroke-width="22" stroke-linecap="round" fill="none"/>',
      '<ellipse cx="' +
        (pose.leftFootX - 4) +
        '" cy="' +
        (pose.footY + 5) +
        '" rx="18" ry="8" fill="' +
        theme.shoe +
        '"/>',
      '<ellipse cx="' +
        (pose.rightFootX + 4) +
        '" cy="' +
        (pose.footY + 5) +
        '" rx="18" ry="8" fill="' +
        theme.shoe +
        '"/>',
    ].join("");
  }

  function buildFigureBodySvg(theme, pose, id) {
    const top = pose.bodyTopY;
    const bottom = pose.bodyBottomY;
    const leftTop = 160 - pose.topWidth / 2;
    const rightTop = 160 + pose.topWidth / 2;
    const leftBottom = 160 - pose.bottomWidth / 2;
    const rightBottom = 160 + pose.bottomWidth / 2;
    const bodyPath = pose.structured
      ? "M" +
        leftTop +
        " " +
        top +
        "C" +
        (leftTop + 10) +
        " " +
        (top - 18) +
        " " +
        (rightTop - 10) +
        " " +
        (top - 18) +
        " " +
        rightTop +
        " " +
        top +
        "L" +
        (rightBottom - 8) +
        " " +
        (bottom - 4) +
        "Q160 " +
        (bottom + 16) +
        " " +
        (leftBottom + 8) +
        " " +
        (bottom - 4) +
        "Z"
      : "M" +
        (leftTop - 6) +
        " " +
        (top + 2) +
        "C" +
        (leftTop + 4) +
        " " +
        (top - 18) +
        " " +
        (rightTop - 4) +
        " " +
        (top - 14) +
        " " +
        (rightTop + 6) +
        " " +
        (top + 6) +
        "C" +
        (rightBottom + 8) +
        " " +
        (top + 60) +
        " " +
        rightBottom +
        " " +
        (bottom - 14) +
        " 160 " +
        (bottom + 14) +
        "C" +
        leftBottom +
        " " +
        (bottom - 14) +
        " " +
        (leftBottom - 8) +
        " " +
        (top + 58) +
        " " +
        (leftTop - 6) +
        " " +
        (top + 10) +
        "Z";
    const innerPath = pose.structured
      ? "M145 " +
        (top + 12) +
        "L160 " +
        (top + 30) +
        "L175 " +
        (top + 12) +
        "L168 " +
        (bottom - 16) +
        "Q160 " +
        (bottom - 6) +
        " 152 " +
        (bottom - 16) +
        "Z"
      : "M136 " +
        (top + 18) +
        "C146 " +
        (top + 8) +
        " 174 " +
        (top + 8) +
        " 184 " +
        (top + 18) +
        "L176 " +
        (bottom - 18) +
        "Q160 " +
        bottom +
        " 144 " +
        (bottom - 18) +
        "Z";
    return [
      '<path d="' + bodyPath + '" fill="url(#' + id + '-coat)"/>',
      '<path d="' + bodyPath + '" fill="none" stroke="' + theme.line + '" stroke-width="1.4"/>',
      '<path d="' + innerPath + '" fill="' + theme.outfitLight + '" opacity="0.92"/>',
      (pose.open
        ? '<path d="M136 ' +
          (top + 8) +
          "C144 " +
          (top + 18) +
          " 176 " +
          (top + 18) +
          " 184 " +
          (top + 8) +
          "L178 " +
          (top + 22) +
          "C172 " +
          (top + 30) +
          " 148 " +
          (top + 30) +
          " 142 " +
          (top + 22) +
          'Z" fill="url(#' +
          id +
          '-accent)" opacity="0.76"/>'
        : '<path d="M142 ' +
          (top + 4) +
          "C148 " +
          (top - 2) +
          " 172 " +
          (top - 2) +
          " 178 " +
          (top + 4) +
          "L182 " +
          (top + 24) +
          "C172 " +
          (top + 18) +
          " 148 " +
          (top + 18) +
          " 138 " +
          (top + 24) +
          '" fill="' +
          theme.outfitShade +
          '"/>'),
      (pose.expansive
        ? '<path d="M130 ' +
          (top + 60) +
          "C146 " +
          (top + 52) +
          " 174 " +
          (top + 52) +
          " 190 " +
          (top + 60) +
          '" stroke="' +
          theme.accentSoft +
          '" stroke-width="10" fill="none" stroke-linecap="round"/>'
        : '<rect x="' +
          (leftBottom + 16) +
          '" y="' +
          (bottom - 48) +
          '" width="14" height="22" rx="6" fill="' +
          theme.outfitShade +
          '"/><rect x="' +
          (rightBottom - 30) +
          '" y="' +
          (bottom - 48) +
          '" width="14" height="22" rx="6" fill="' +
          theme.outfitShade +
          '"/>'),
    ].join("");
  }

  function buildFigureArmSvg(theme, pose, side) {
    const isLeft = side === "left";
    const shoulderX = isLeft ? pose.leftShoulderX : pose.rightShoulderX;
    const elbowX = isLeft ? pose.leftElbowX : pose.rightElbowX;
    const elbowY = isLeft ? pose.leftElbowY : pose.rightElbowY;
    const handX = isLeft ? pose.leftHandX : pose.rightHandX;
    const handY = isLeft ? pose.leftHandY : pose.rightHandY;
    const midX = Math.round((elbowX + handX) / 2);
    const midY = Math.round((elbowY + handY) / 2);

    return [
      '<path d="M' +
        shoulderX +
        " " +
        pose.shoulderY +
        "Q" +
        elbowX +
        " " +
        elbowY +
        " " +
        (isLeft ? elbowX - 2 : elbowX + 2) +
        " " +
        (elbowY + 2) +
        '" stroke="' +
        (isLeft ? theme.outfitLight : theme.outfitMid) +
        '" stroke-width="' +
        (pose.structured ? 22 : 24) +
        '" stroke-linecap="round" fill="none"/>',
      '<path d="M' +
        elbowX +
        " " +
        elbowY +
        "Q" +
        midX +
        " " +
        midY +
        " " +
        handX +
        " " +
        handY +
        '" stroke="' +
        theme.skin +
        '" stroke-width="18" stroke-linecap="round" fill="none"/>',
      '<circle cx="' + handX + '" cy="' + handY + '" r="8" fill="' + theme.skin + '"/>',
    ].join("");
  }

  function buildFigureHeadSvg(theme, pose) {
    const eyeY = pose.headY + 3;
    const mouthY = pose.headY + 22;
    return [
      '<rect x="' +
        (pose.headX - 8) +
        '" y="' +
        (pose.headY + 28) +
        '" width="16" height="18" rx="8" fill="' +
        theme.skinDeep +
        '"/>',
      '<g transform="rotate(' + pose.headTilt + " " + pose.headX + " " + pose.headY + ')">',
      buildHairBackSvg(theme, pose),
      '<ellipse cx="' +
        pose.headX +
        '" cy="' +
        pose.headY +
        '" rx="36" ry="40" fill="' +
        theme.skin +
        '"/>',
      buildHairFrontSvg(theme, pose),
      '<ellipse cx="' + (pose.headX - 13) + '" cy="' + eyeY + '" rx="3.2" ry="3.2" fill="#1d1f22"/>',
      '<ellipse cx="' + (pose.headX + 13) + '" cy="' + eyeY + '" rx="3.2" ry="3.2" fill="#1d1f22"/>',
      (pose.open
        ? '<path d="M' +
          (pose.headX - 11) +
          " " +
          mouthY +
          "C" +
          (pose.headX - 5) +
          " " +
          (mouthY + 8) +
          " " +
          (pose.headX + 5) +
          " " +
          (mouthY + 8) +
          " " +
          (pose.headX + 11) +
          " " +
          mouthY +
          '" stroke="#7c554a" stroke-width="3.5" stroke-linecap="round" fill="none"/>'
        : '<path d="M' +
          (pose.headX - 8) +
          " " +
          (mouthY + 2) +
          "C" +
          (pose.headX - 2) +
          " " +
          (mouthY - 1) +
          " " +
          (pose.headX + 2) +
          " " +
          (mouthY - 1) +
          " " +
          (pose.headX + 8) +
          " " +
          (mouthY + 2) +
          '" stroke="#7c554a" stroke-width="3" stroke-linecap="round" fill="none"/>'),
      "</g>",
    ].join("");
  }

  function buildHairBackSvg(theme, pose) {
    if (pose.key === "spark" || pose.key === "drift") {
      return (
        '<path d="M' +
        (pose.headX - 28) +
        " " +
        (pose.headY + 18) +
        "C" +
        (pose.headX - 34) +
        " " +
        (pose.headY + 36) +
        " " +
        (pose.headX - 18) +
        " " +
        (pose.headY + 52) +
        " " +
        pose.headX +
        " " +
        (pose.headY + 52) +
        "C" +
        (pose.headX + 18) +
        " " +
        (pose.headY + 52) +
        " " +
        (pose.headX + 34) +
        " " +
        (pose.headY + 36) +
        " " +
        (pose.headX + 28) +
        " " +
        (pose.headY + 18) +
        '" fill="' +
        theme.hair +
        '" opacity="0.92"/>'
      );
    }
    return "";
  }

  function buildHairFrontSvg(theme, pose) {
    switch (pose.key) {
      case "command":
        return (
          '<path d="M' +
          (pose.headX - 34) +
          " " +
          (pose.headY - 6) +
          "C" +
          (pose.headX - 28) +
          " " +
          (pose.headY - 34) +
          " " +
          (pose.headX - 6) +
          " " +
          (pose.headY - 46) +
          " " +
          (pose.headX + 20) +
          " " +
          (pose.headY - 42) +
          "C" +
          (pose.headX + 38) +
          " " +
          (pose.headY - 38) +
          " " +
          (pose.headX + 50) +
          " " +
          (pose.headY - 18) +
          " " +
          (pose.headX + 48) +
          " " +
          (pose.headY + 10) +
          "C" +
          (pose.headX + 30) +
          " " +
          (pose.headY - 2) +
          " " +
          (pose.headX + 8) +
          " " +
          (pose.headY - 6) +
          " " +
          (pose.headX - 18) +
          " " +
          (pose.headY - 2) +
          "C" +
          (pose.headX - 26) +
          " " +
          pose.headY +
          " " +
          (pose.headX - 32) +
          " " +
          (pose.headY + 8) +
          " " +
          (pose.headX - 34) +
          " " +
          (pose.headY + 16) +
          "C" +
          (pose.headX - 42) +
          " " +
          (pose.headY + 4) +
          " " +
          (pose.headX - 42) +
          " " +
          pose.headY +
          " " +
          (pose.headX - 34) +
          " " +
          (pose.headY - 6) +
          'Z" fill="' +
          theme.hair +
          '"/><path d="M' +
          (pose.headX + 10) +
          " " +
          (pose.headY - 20) +
          "C" +
          (pose.headX + 18) +
          " " +
          (pose.headY - 12) +
          " " +
          (pose.headX + 20) +
          " " +
          (pose.headY - 2) +
          " " +
          (pose.headX + 16) +
          " " +
          (pose.headY + 8) +
          '" stroke="' +
          theme.hairLight +
          '" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.6"/>'
        );
      case "spark":
        return (
          '<path d="M' +
          (pose.headX - 38) +
          " " +
          (pose.headY - 8) +
          "C" +
          (pose.headX - 30) +
          " " +
          (pose.headY - 38) +
          " " +
          (pose.headX - 8) +
          " " +
          (pose.headY - 48) +
          " " +
          (pose.headX + 18) +
          " " +
          (pose.headY - 42) +
          "C" +
          (pose.headX + 40) +
          " " +
          (pose.headY - 36) +
          " " +
          (pose.headX + 48) +
          " " +
          (pose.headY - 10) +
          " " +
          (pose.headX + 44) +
          " " +
          (pose.headY + 16) +
          "C" +
          (pose.headX + 28) +
          " " +
          (pose.headY + 8) +
          " " +
          (pose.headX + 8) +
          " " +
          (pose.headY - 4) +
          " " +
          (pose.headX - 8) +
          " " +
          (pose.headY + 4) +
          "C" +
          (pose.headX - 16) +
          " " +
          (pose.headY + 10) +
          " " +
          (pose.headX - 24) +
          " " +
          (pose.headY + 16) +
          " " +
          (pose.headX - 30) +
          " " +
          (pose.headY + 22) +
          "C" +
          (pose.headX - 38) +
          " " +
          (pose.headY + 10) +
          " " +
          (pose.headX - 42) +
          " " +
          pose.headY +
          " " +
          (pose.headX - 38) +
          " " +
          (pose.headY - 8) +
          'Z" fill="' +
          theme.hair +
          '"/>'
        );
      case "study":
        return (
          '<path d="M' +
          (pose.headX - 34) +
          " " +
          (pose.headY - 6) +
          "C" +
          (pose.headX - 30) +
          " " +
          (pose.headY - 34) +
          " " +
          (pose.headX - 8) +
          " " +
          (pose.headY - 42) +
          " " +
          pose.headX +
          " " +
          (pose.headY - 42) +
          "C" +
          (pose.headX + 20) +
          " " +
          (pose.headY - 42) +
          " " +
          (pose.headX + 34) +
          " " +
          (pose.headY - 28) +
          " " +
          (pose.headX + 36) +
          " " +
          (pose.headY - 4) +
          "L" +
          (pose.headX + 28) +
          " " +
          (pose.headY + 10) +
          "C" +
          (pose.headX + 18) +
          " " +
          pose.headY +
          " " +
          (pose.headX + 4) +
          " " +
          (pose.headY - 2) +
          " " +
          (pose.headX - 12) +
          " " +
          pose.headY +
          "C" +
          (pose.headX - 20) +
          " " +
          (pose.headY + 2) +
          " " +
          (pose.headX - 28) +
          " " +
          (pose.headY + 8) +
          " " +
          (pose.headX - 30) +
          " " +
          (pose.headY + 16) +
          "C" +
          (pose.headX - 38) +
          " " +
          (pose.headY + 4) +
          " " +
          (pose.headX - 38) +
          " " +
          pose.headY +
          " " +
          (pose.headX - 34) +
          " " +
          (pose.headY - 6) +
          'Z" fill="' +
          theme.hair +
          '"/>'
        );
      case "drift":
        return (
          '<path d="M' +
          (pose.headX - 38) +
          " " +
          (pose.headY - 2) +
          "C" +
          (pose.headX - 34) +
          " " +
          (pose.headY - 34) +
          " " +
          (pose.headX - 12) +
          " " +
          (pose.headY - 48) +
          " " +
          (pose.headX + 14) +
          " " +
          (pose.headY - 44) +
          "C" +
          (pose.headX + 38) +
          " " +
          (pose.headY - 40) +
          " " +
          (pose.headX + 46) +
          " " +
          (pose.headY - 20) +
          " " +
          (pose.headX + 42) +
          " " +
          (pose.headY + 14) +
          "C" +
          (pose.headX + 26) +
          " " +
          (pose.headY + 10) +
          " " +
          (pose.headX + 10) +
          " " +
          (pose.headY + 8) +
          " " +
          (pose.headX - 6) +
          " " +
          (pose.headY + 10) +
          "C" +
          (pose.headX - 18) +
          " " +
          (pose.headY + 12) +
          " " +
          (pose.headX - 28) +
          " " +
          (pose.headY + 18) +
          " " +
          (pose.headX - 34) +
          " " +
          (pose.headY + 26) +
          "C" +
          (pose.headX - 40) +
          " " +
          (pose.headY + 14) +
          " " +
          (pose.headX - 42) +
          " " +
          pose.headY +
          " " +
          (pose.headX - 38) +
          " " +
          (pose.headY - 2) +
          'Z" fill="' +
          theme.hair +
          '"/>'
        );
      default:
        return "";
    }
  }

  function buildRearAccessorySvg(persona, theme, pose) {
    if (persona.accessory === "halo") {
      return (
        '<circle cx="' +
        pose.headX +
        '" cy="' +
        (pose.headY - 36) +
        '" r="22" fill="none" stroke="' +
        theme.accentStrong +
        '" stroke-width="8" opacity="0.72"/>'
      );
    }
    return "";
  }

  function buildFrontAccessorySvg(persona, theme, pose, id) {
    const scale = pose.accessoryScale;

    switch (persona.accessory) {
      case "prism":
        return (
          '<g transform="translate(' +
          (pose.rightHandX - 22) +
          " " +
          (pose.rightHandY - 38) +
          ") scale(" +
          scale +
          ')"><polygon points="22,0 42,22 22,44 2,22" fill="url(#' +
          id +
          '-accent)"/><polygon points="22,6 35,22 22,38 9,22" fill="' +
          theme.white +
          '" opacity="0.28"/></g>'
        );
      case "banner":
        return (
          '<g><path d="M' +
          (pose.rightHandX + 2) +
          " " +
          (pose.rightHandY - 6) +
          "V" +
          (pose.rightHandY - 82) +
          '" stroke="' +
          theme.hairDeep +
          '" stroke-width="6" stroke-linecap="round"/><path d="M' +
          (pose.rightHandX + 2) +
          " " +
          (pose.rightHandY - 78) +
          "H" +
          (pose.rightHandX + 46) +
          "L" +
          (pose.rightHandX + 30) +
          " " +
          (pose.rightHandY - 62) +
          "L" +
          (pose.rightHandX + 46) +
          " " +
          (pose.rightHandY - 46) +
          "H" +
          (pose.rightHandX + 2) +
          'Z" fill="url(#' +
          id +
          '-accent)"/></g>'
        );
      case "visor":
        return (
          '<rect x="' +
          (pose.headX - 26) +
          '" y="' +
          (pose.headY - 4) +
          '" width="52" height="14" rx="7" fill="' +
          theme.accentStrong +
          '" opacity="0.92"/><rect x="' +
          (pose.headX - 18) +
          '" y="' +
          (pose.headY - 1) +
          '" width="36" height="8" rx="4" fill="' +
          theme.white +
          '" opacity="0.22"/>'
        );
      case "shield":
        return (
          '<path d="M' +
          (pose.leftHandX - 6) +
          " " +
          (pose.leftHandY - 34) +
          "L" +
          (pose.leftHandX + 18) +
          " " +
          (pose.leftHandY - 24) +
          "L" +
          (pose.leftHandX + 14) +
          " " +
          (pose.leftHandY + 10) +
          "Q" +
          pose.leftHandX +
          " " +
          (pose.leftHandY + 28) +
          " " +
          (pose.leftHandX - 14) +
          " " +
          (pose.leftHandY + 10) +
          "L" +
          (pose.leftHandX - 18) +
          " " +
          (pose.leftHandY - 24) +
          'Z" fill="url(#' +
          id +
          '-accent)"/><path d="M' +
          (pose.leftHandX - 1) +
          " " +
          (pose.leftHandY - 12) +
          "L" +
          (pose.leftHandX + 5) +
          " " +
          (pose.leftHandY + 2) +
          "L" +
          (pose.leftHandX - 1) +
          " " +
          (pose.leftHandY + 16) +
          "L" +
          (pose.leftHandX - 7) +
          " " +
          (pose.leftHandY + 2) +
          'Z" fill="' +
          theme.white +
          '" opacity="0.28"/>'
        );
      case "scarf":
        return (
          '<path d="M132 ' +
          (pose.bodyTopY + 4) +
          "C144 " +
          (pose.bodyTopY + 18) +
          " 176 " +
          (pose.bodyTopY + 18) +
          " 188 " +
          (pose.bodyTopY + 4) +
          "L176 " +
          (pose.bodyTopY + 28) +
          'H144Z" fill="url(#' +
          id +
          '-accent)"/><path d="M170 ' +
          (pose.bodyTopY + 16) +
          "C186 " +
          (pose.bodyTopY + 42) +
          " 186 " +
          (pose.bodyTopY + 72) +
          " 176 " +
          (pose.bodyTopY + 104) +
          '" stroke="' +
          theme.accentStrong +
          '" stroke-width="12" stroke-linecap="round" fill="none"/>'
        );
      case "antenna":
        return (
          '<path d="M' +
          (pose.headX + 18) +
          " " +
          (pose.headY - 18) +
          "Q" +
          (pose.headX + 30) +
          " " +
          (pose.headY - 40) +
          " " +
          (pose.headX + 18) +
          " " +
          (pose.headY - 58) +
          '" stroke="' +
          theme.hairDeep +
          '" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="' +
          (pose.headX + 18) +
          '" cy="' +
          (pose.headY - 60) +
          '" r="8" fill="url(#' +
          id +
          '-accent)"/>'
        );
      case "torch":
        return (
          '<g><path d="M' +
          pose.rightHandX +
          " " +
          (pose.rightHandY + 2) +
          "V" +
          (pose.rightHandY - 42) +
          '" stroke="' +
          theme.hairDeep +
          '" stroke-width="7" stroke-linecap="round"/><path d="M' +
          (pose.rightHandX - 4) +
          " " +
          (pose.rightHandY - 50) +
          "C" +
          (pose.rightHandX + 6) +
          " " +
          (pose.rightHandY - 64) +
          " " +
          (pose.rightHandX + 18) +
          " " +
          (pose.rightHandY - 68) +
          " " +
          (pose.rightHandX + 20) +
          " " +
          (pose.rightHandY - 84) +
          "C" +
          (pose.rightHandX + 32) +
          " " +
          (pose.rightHandY - 70) +
          " " +
          (pose.rightHandX + 30) +
          " " +
          (pose.rightHandY - 50) +
          " " +
          (pose.rightHandX + 14) +
          " " +
          (pose.rightHandY - 42) +
          "C" +
          (pose.rightHandX + 6) +
          " " +
          (pose.rightHandY - 40) +
          " " +
          (pose.rightHandX + 1) +
          " " +
          (pose.rightHandY - 44) +
          " " +
          (pose.rightHandX - 4) +
          " " +
          (pose.rightHandY - 50) +
          'Z" fill="url(#' +
          id +
          '-accent)"/></g>'
        );
      case "scroll":
        return (
          '<g><rect x="' +
          (pose.chestX - 26) +
          '" y="' +
          (pose.chestY - 6) +
          '" width="52" height="18" rx="9" fill="' +
          theme.paper +
          '"/><circle cx="' +
          (pose.chestX - 22) +
          '" cy="' +
          (pose.chestY + 3) +
          '" r="6" fill="' +
          theme.line +
          '"/><circle cx="' +
          (pose.chestX + 22) +
          '" cy="' +
          (pose.chestY + 3) +
          '" r="6" fill="' +
          theme.line +
          '"/></g>'
        );
      case "leaf":
        return (
          '<g><path d="M' +
          pose.rightHandX +
          " " +
          pose.rightHandY +
          "C" +
          (pose.rightHandX + 20) +
          " " +
          (pose.rightHandY - 24) +
          " " +
          (pose.rightHandX + 44) +
          " " +
          (pose.rightHandY - 30) +
          " " +
          (pose.rightHandX + 54) +
          " " +
          (pose.rightHandY - 18) +
          "C" +
          (pose.rightHandX + 40) +
          " " +
          (pose.rightHandY + 2) +
          " " +
          (pose.rightHandX + 20) +
          " " +
          (pose.rightHandY + 10) +
          " " +
          pose.rightHandX +
          " " +
          pose.rightHandY +
          'Z" fill="url(#' +
          id +
          '-accent)"/><path d="M' +
          pose.rightHandX +
          " " +
          pose.rightHandY +
          "Q" +
          (pose.rightHandX + 18) +
          " " +
          (pose.rightHandY - 8) +
          " " +
          (pose.rightHandX + 34) +
          " " +
          (pose.rightHandY - 4) +
          '" stroke="' +
          theme.hairDeep +
          '" stroke-width="3" fill="none" opacity="0.35"/></g>'
        );
      case "book":
        return (
          '<g><rect x="' +
          (pose.chestX - 42) +
          '" y="' +
          (pose.chestY - 22) +
          '" width="34" height="44" rx="8" fill="' +
          theme.paper +
          '"/><rect x="' +
          (pose.chestX - 24) +
          '" y="' +
          (pose.chestY - 22) +
          '" width="4" height="44" fill="url(#' +
          id +
          '-accent)"/></g>'
        );
      case "clipboard":
        return (
          '<g><rect x="' +
          (pose.propX - 18) +
          '" y="' +
          (pose.propY - 26) +
          '" width="38" height="50" rx="8" fill="' +
          theme.paper +
          '"/><rect x="' +
          (pose.propX - 8) +
          '" y="' +
          (pose.propY - 34) +
          '" width="18" height="12" rx="5" fill="url(#' +
          id +
          '-accent)"/></g>'
        );
      case "sprout":
        return (
          '<g><rect x="' +
          (pose.chestX - 14) +
          '" y="' +
          (pose.chestY + 4) +
          '" width="28" height="16" rx="6" fill="' +
          theme.paper +
          '"/><path d="M' +
          pose.chestX +
          " " +
          (pose.chestY + 4) +
          "V" +
          (pose.chestY - 20) +
          '" stroke="' +
          theme.hairDeep +
          '" stroke-width="4" stroke-linecap="round"/><path d="M' +
          pose.chestX +
          " " +
          (pose.chestY - 12) +
          "C" +
          (pose.chestX + 16) +
          " " +
          (pose.chestY - 24) +
          " " +
          (pose.chestX + 24) +
          " " +
          (pose.chestY - 30) +
          " " +
          (pose.chestX + 26) +
          " " +
          (pose.chestY - 42) +
          "C" +
          (pose.chestX + 10) +
          " " +
          (pose.chestY - 34) +
          " " +
          pose.chestX +
          " " +
          (pose.chestY - 22) +
          " " +
          pose.chestX +
          " " +
          (pose.chestY - 12) +
          'Z" fill="url(#' +
          id +
          '-accent)"/><path d="M' +
          pose.chestX +
          " " +
          (pose.chestY - 12) +
          "C" +
          (pose.chestX - 16) +
          " " +
          (pose.chestY - 24) +
          " " +
          (pose.chestX - 24) +
          " " +
          (pose.chestY - 30) +
          " " +
          (pose.chestX - 26) +
          " " +
          (pose.chestY - 42) +
          "C" +
          (pose.chestX - 10) +
          " " +
          (pose.chestY - 34) +
          " " +
          pose.chestX +
          " " +
          (pose.chestY - 22) +
          " " +
          pose.chestX +
          " " +
          (pose.chestY - 12) +
          'Z" fill="url(#' +
          id +
          '-accent)"/></g>'
        );
      case "lantern":
        return (
          '<g><path d="M' +
          pose.rightHandX +
          " " +
          pose.rightHandY +
          "V" +
          (pose.rightHandY + 10) +
          '" stroke="' +
          theme.hairDeep +
          '" stroke-width="4" stroke-linecap="round"/><rect x="' +
          (pose.rightHandX - 10) +
          '" y="' +
          (pose.rightHandY + 10) +
          '" width="22" height="30" rx="8" fill="' +
          theme.paper +
          '"/><path d="M' +
          (pose.rightHandX - 6) +
          " " +
          (pose.rightHandY + 10) +
          "V" +
          pose.rightHandY +
          "C" +
          (pose.rightHandX - 6) +
          " " +
          (pose.rightHandY - 10) +
          " " +
          (pose.rightHandX + 8) +
          " " +
          (pose.rightHandY - 10) +
          " " +
          (pose.rightHandX + 8) +
          " " +
          pose.rightHandY +
          "V" +
          (pose.rightHandY + 10) +
          '" stroke="' +
          theme.hairDeep +
          '" stroke-width="3.5" fill="none"/><rect x="' +
          (pose.rightHandX - 4) +
          '" y="' +
          (pose.rightHandY + 18) +
          '" width="10" height="14" rx="5" fill="url(#' +
          id +
          '-accent)"/></g>'
        );
      case "star":
        return (
          '<polygon points="' +
          buildStarPoints(pose.rightHandX + 24, pose.rightHandY - 18, 16, 7, 5) +
          '" fill="url(#' +
          id +
          '-accent)"/>'
        );
      case "compass":
        return (
          '<g><circle cx="' +
          pose.propX +
          '" cy="' +
          pose.propY +
          '" r="18" fill="' +
          theme.paper +
          '"/><path d="M' +
          pose.propX +
          " " +
          (pose.propY - 12) +
          "L" +
          (pose.propX + 8) +
          " " +
          pose.propY +
          "L" +
          pose.propX +
          " " +
          (pose.propY + 12) +
          "L" +
          (pose.propX - 8) +
          " " +
          pose.propY +
          'Z" fill="url(#' +
          id +
          '-accent)"/><circle cx="' +
          pose.propX +
          '" cy="' +
          pose.propY +
          '" r="4" fill="' +
          theme.hairDeep +
          '"/></g>'
        );
      default:
        return "";
    }
  }

  function buildStarPoints(cx, cy, outerRadius, innerRadius, points) {
    const coords = [];
    for (let index = 0; index < points * 2; index += 1) {
      const angle = -Math.PI / 2 + (Math.PI * index) / points;
      const radius = index % 2 === 0 ? outerRadius : innerRadius;
      coords.push(
        (cx + Math.cos(angle) * radius).toFixed(1) +
          "," +
          (cy + Math.sin(angle) * radius).toFixed(1)
      );
    }
    return coords.join(" ");
  }

  function renderFigure(container, persona, compact) {
    container.innerHTML = buildFigureSvg(persona, compact);
  }

  function buildFigureSvg(persona, compact) {
    const id = "voxel-" + persona.slug.replace(/[^a-z0-9]/gi, "");
    const theme = buildVoxelTheme(persona.palette);
    const rig = buildVoxelRig(persona, compact);
    const name = escapeHtml(localizeText(persona.names));

    return [
      '<svg class="figure-svg" viewBox="0 0 320 320" role="img" aria-label="' +
        name +
        '">',
      "<defs>",
      '<linearGradient id="' +
        id +
        '-bg" x1="20%" y1="10%" x2="84%" y2="100%">' +
        '<stop offset="0%" stop-color="' +
        theme.bgTop +
        '"/>' +
        '<stop offset="100%" stop-color="' +
        theme.bgBottom +
        '"/>' +
        "</linearGradient>",
      '<linearGradient id="' +
        id +
        '-coat" x1="0%" y1="0%" x2="100%" y2="100%">' +
        '<stop offset="0%" stop-color="' +
        theme.outfitLight +
        '"/>' +
        '<stop offset="100%" stop-color="' +
        theme.outfitDark +
        '"/>' +
        "</linearGradient>",
      '<linearGradient id="' +
        id +
        '-accent" x1="0%" y1="0%" x2="100%" y2="100%">' +
        '<stop offset="0%" stop-color="' +
        theme.accentLight +
        '"/>' +
        '<stop offset="100%" stop-color="' +
        theme.accent +
        '"/>' +
        "</linearGradient>",
      "</defs>",
      '<rect x="18" y="18" width="284" height="284" rx="34" fill="url(#' + id + '-bg)"/>',
      buildVoxelSceneSvg(persona, theme, rig, compact),
      '<ellipse cx="160" cy="282" rx="' +
        (compact ? 70 : 82) +
        '" ry="' +
        (compact ? 12 : 14) +
        '" fill="' +
        theme.shadow +
        '"/>',
      buildVoxelCharacterSvg(persona, theme, rig, id),
      "</svg>",
    ].join("");
  }

  function buildVoxelTheme(palette) {
    return {
      bgTop: mixHexColors(palette.bg, "#ffffff", 0.32),
      bgBottom: mixHexColors(palette.bg, "#ece6dd", 0.74),
      platform: mixHexColors(palette.bg, "#111316", 0.1),
      platformLight: mixHexColors(palette.bg, "#ffffff", 0.2),
      block: mixHexColors(palette.bg, "#ffffff", 0.38),
      blockDark: mixHexColors(palette.bg, "#111316", 0.14),
      glow: rgbaFromHex(palette.glow, 0.36),
      glowSoft: rgbaFromHex(palette.glow, 0.18),
      accent: mixHexColors(palette.accent, "#111316", 0.1),
      accentLight: mixHexColors(palette.accent, "#ffffff", 0.26),
      accentSoft: rgbaFromHex(palette.accent, 0.18),
      accentGlow: rgbaFromHex(palette.accent, 0.26),
      outfit: palette.outfit,
      outfitLight: mixHexColors(palette.outfit, "#ffffff", 0.16),
      outfitDark: mixHexColors(palette.outfit, "#111316", 0.24),
      outfitShade: rgbaFromHex(mixHexColors(palette.outfit, "#111316", 0.44), 0.24),
      outfitPanel: mixHexColors(palette.outfit, "#ffffff", 0.1),
      skin: palette.skin,
      skinLight: mixHexColors(palette.skin, "#ffffff", 0.14),
      skinShade: mixHexColors(palette.skin, "#8a6254", 0.24),
      hair: palette.hair,
      hairLight: mixHexColors(palette.hair, "#ffffff", 0.12),
      hairDark: mixHexColors(palette.hair, "#111316", 0.26),
      paper: mixHexColors(palette.bg, "#ffffff", 0.7),
      metal: mixHexColors(palette.hair, "#dbe2e8", 0.46),
      cloud: mixHexColors(palette.bg, "#ffffff", 0.82),
      sun: mixHexColors("#f0cd66", palette.glow, 0.12),
      terrainGrass: mixHexColors("#79b85f", palette.accent, 0.24),
      terrainGrassDark: mixHexColors("#4f7d3e", palette.outfit, 0.16),
      terrainDirt: mixHexColors("#9b6f44", palette.outfit, 0.24),
      terrainDirtDark: mixHexColors("#6f5236", palette.hair, 0.18),
      terrainStone: mixHexColors("#d9dde2", palette.bg, 0.22),
      terrainStoneDark: mixHexColors("#99a2ad", palette.hair, 0.2),
      water: mixHexColors("#73b8e0", palette.glow, 0.2),
      wood: mixHexColors("#ad7b48", palette.outfit, 0.18),
      foliage: mixHexColors("#6ca857", palette.accent, 0.2),
      boot: mixHexColors(palette.outfit, "#111316", 0.42),
      line: rgbaFromHex("#111316", 0.16),
      shadow: rgbaFromHex("#111316", 0.08),
      white: rgbaFromHex("#ffffff", 0.82),
    };
  }

  function buildVoxelRig(persona, compact) {
    const poseByFamily = {
      vectors: "command",
      signals: "rally",
      studios: "study",
      harbors: "harbor",
    };
    const poseKey = poseByFamily[persona.family];
    const open = persona.axes.warmth === "openhearted";
    const expansive = persona.axes.range === "expansive";
    const structured = persona.axes.structure === "structured";
    const unit = compact ? 5 : 6;
    const slimArms = !structured;
    const headSize = unit * 8;
    const torsoW = unit * 8;
    const torsoH = unit * 12;
    const legW = unit * 4;
    const legH = unit * 12;
    const armW = unit * (slimArms ? 3 : 4);
    const armH = unit * 12;
    const handH = unit * 3;
    const sleeveH = armH - handH;
    const bootH = unit * 2;
    const pantH = legH - bootH;
    const headY = compact ? 82 : 76;
    const headX = Math.round(160 - headSize / 2);
    const torsoX = Math.round(160 - torsoW / 2);
    const torsoY = headY + headSize;
    const legBaseY = torsoY + torsoH;
    const leftArmX = torsoX - armW;
    const rightArmX = torsoX + torsoW;
    const leftLegX = torsoX;
    const rightLegX = torsoX + legW;

    function block(x, y, w, h) {
      return { x: x, y: y, w: w, h: h };
    }

    const rig = {
      poseKey: poseKey,
      accessory: persona.accessory,
      open: open,
      expansive: expansive,
      structured: structured,
      slimArms: slimArms,
      unit: unit,
      headX: headX,
      headY: headY,
      headSize: headSize,
      torsoX: torsoX,
      torsoY: torsoY,
      torsoW: torsoW,
      torsoH: torsoH,
      armW: armW,
      armH: armH,
      legW: legW,
      legH: legH,
      sleeveH: sleeveH,
      handH: handH,
      neckX: Math.round(160 - unit),
      neckY: torsoY - Math.round(unit * 0.5),
      neckW: unit * 2,
      neckH: Math.round(unit * 0.75),
      chestX: 160,
      chestY: torsoY + unit * 5,
      beltY: torsoY + torsoH - unit * 2,
      faceX: headX + unit,
      faceY: headY + unit * 2,
      faceW: headSize - unit * 2,
      faceH: headSize - unit * 3,
      leftArm: [],
      rightArm: [],
      leftLeg: [],
      rightLeg: [],
      leftHand: null,
      rightHand: null,
      leftBoot: null,
      rightBoot: null,
    };

    switch (poseKey) {
      case "command":
        rig.leftArm = [block(leftArmX, torsoY, armW, sleeveH)];
        rig.rightArm = [
          block(rightArmX, torsoY, armW, unit * 4),
          block(rightArmX + armW, torsoY + unit * 3, armW, sleeveH - unit * 3),
        ];
        rig.leftHand = block(leftArmX, torsoY + sleeveH, armW, handH);
        rig.rightHand = block(rightArmX + armW, torsoY + sleeveH, armW, handH);
        rig.leftLeg = [block(leftLegX, legBaseY, legW, pantH)];
        rig.rightLeg = [block(rightLegX, legBaseY, legW, pantH)];
        rig.leftBoot = block(leftLegX, legBaseY + pantH, legW, bootH);
        rig.rightBoot = block(rightLegX, legBaseY + pantH, legW, bootH);
        break;
      case "rally":
        rig.leftArm = [
          block(leftArmX - armW, torsoY + unit * 4, armW * 2, unit * 2),
          block(leftArmX - armW, torsoY + unit * 6, armW, sleeveH - unit * 6),
        ];
        rig.rightArm = [
          block(rightArmX, torsoY - unit * 5, armW, unit * 5),
          block(rightArmX, torsoY, armW, sleeveH - unit),
        ];
        rig.leftHand = block(leftArmX - armW, torsoY + sleeveH - unit * 2, armW, handH);
        rig.rightHand = block(rightArmX, torsoY - unit * 8, armW, handH);
        rig.leftLeg = [block(leftLegX, legBaseY, legW, pantH)];
        rig.rightLeg = [
          block(rightLegX, legBaseY, legW, unit * 6),
          block(rightLegX + legW, legBaseY + unit * 4, legW, pantH - unit * 4),
        ];
        rig.leftBoot = block(leftLegX, legBaseY + pantH, legW, bootH);
        rig.rightBoot = block(rightLegX + legW, legBaseY + pantH, legW, bootH);
        break;
      case "study":
        rig.leftArm = [
          block(leftArmX + armW - unit, torsoY + unit * 4, unit, unit * 2),
          block(torsoX, torsoY + unit * 4, torsoW / 2 - unit, unit * 2),
        ];
        rig.rightArm = [
          block(torsoX + torsoW / 2 + unit, torsoY + unit * 4, torsoW / 2 - unit, unit * 2),
          block(rightArmX, torsoY + unit * 4, unit, unit * 2),
        ];
        rig.leftHand = block(torsoX + unit * 2, torsoY + unit * 6, armW, handH);
        rig.rightHand = block(torsoX + torsoW - unit * 2 - armW, torsoY + unit * 6, armW, handH);
        rig.leftLeg = [block(leftLegX, legBaseY, legW, pantH)];
        rig.rightLeg = [block(rightLegX, legBaseY, legW, pantH)];
        rig.leftBoot = block(leftLegX, legBaseY + pantH, legW, bootH);
        rig.rightBoot = block(rightLegX, legBaseY + pantH, legW, bootH);
        break;
      default:
        rig.leftArm = [block(leftArmX, torsoY, armW, sleeveH)];
        rig.rightArm = [
          block(rightArmX, torsoY + unit * 2, armW, unit * 4),
          block(rightArmX + armW, torsoY + unit * 4, armW, sleeveH - unit * 4),
        ];
        rig.leftHand = block(leftArmX, torsoY + sleeveH, armW, handH);
        rig.rightHand = block(rightArmX + armW, torsoY + unit * 8, armW, handH);
        rig.leftLeg = [block(leftLegX, legBaseY, legW, pantH)];
        rig.rightLeg = [block(rightLegX, legBaseY + unit, legW, pantH - unit)];
        rig.leftBoot = block(leftLegX, legBaseY + pantH, legW, bootH);
        rig.rightBoot = block(rightLegX, legBaseY + pantH, legW, bootH);
        break;
    }

    if (open) {
      shiftVoxelBlocks(rig.leftArm, -unit, 0);
      shiftVoxelBlocks(rig.rightArm, unit, 0);
      rig.leftHand.x -= unit;
      rig.rightHand.x += unit;
    }

    if (expansive) {
      shiftVoxelBlocks(rig.leftLeg, -Math.round(unit / 2), 0);
      shiftVoxelBlocks(rig.rightLeg, Math.round(unit / 2), 0);
      rig.leftBoot.x -= Math.round(unit / 2);
      rig.rightBoot.x += Math.round(unit / 2);
    }

    rig.leftHandCenterX = rig.leftHand.x + rig.leftHand.w / 2;
    rig.leftHandCenterY = rig.leftHand.y + rig.leftHand.h / 2;
    rig.rightHandCenterX = rig.rightHand.x + rig.rightHand.w / 2;
    rig.rightHandCenterY = rig.rightHand.y + rig.rightHand.h / 2;
    rig.headCenterX = rig.headX + rig.headSize / 2;
    rig.headCenterY = rig.headY + rig.headSize / 2;

    return rig;
  }

  function buildVoxelSceneSvg(persona, theme, rig, compact) {
    return (
      '<g class="figure-scene" shape-rendering="crispEdges">' +
      [
        buildVoxelSceneSky(theme, compact),
        buildVoxelSceneBackdrop(theme, compact),
        buildVoxelSceneFamilyStructure(persona.family, theme, compact),
        buildVoxelSceneGround(theme),
      ].join("") +
      "</g>"
    );
  }

  function buildVoxelSceneSky(theme, compact) {
    const tile = compact ? 4 : 5;

    return [
      buildVoxelSprite(
        220,
        compact ? 56 : 50,
        tile,
        [
          [1, 0, 3, 1],
          [0, 1, 5, 3],
          [1, 4, 3, 1],
          [2, 2, 1, 1, theme.accentLight],
        ],
        theme.sun,
        1,
        null,
        "0.94"
      ),
      buildVoxelSprite(
        52,
        compact ? 72 : 66,
        tile,
        [
          [0, 1, 2, 1],
          [2, 0, 4, 2],
          [6, 1, 2, 1],
          [1, 2, 6, 1],
        ],
        theme.cloud,
        1,
        null,
        "0.82"
      ),
      buildVoxelSprite(
        164,
        compact ? 92 : 86,
        tile,
        [
          [0, 1, 2, 1],
          [2, 0, 5, 2],
          [7, 1, 2, 1],
          [1, 2, 6, 1],
        ],
        theme.cloud,
        1,
        null,
        "0.72"
      ),
    ].join("");
  }

  function buildVoxelSceneBackdrop(theme, compact) {
    const tile = compact ? 4 : 5;

    return [
      buildVoxelSprite(
        28,
        compact ? 174 : 166,
        tile,
        [
          [0, 4, 2, 1],
          [2, 3, 2, 2],
          [4, 2, 2, 3],
          [6, 1, 2, 4],
          [8, 0, 2, 5],
        ],
        theme.terrainStone,
        1,
        null,
        "0.5"
      ),
      buildVoxelSprite(
        242,
        compact ? 170 : 162,
        tile,
        [
          [0, 0, 2, 5],
          [2, 1, 2, 4],
          [4, 2, 2, 3],
          [6, 3, 2, 2],
          [8, 4, 2, 1],
        ],
        theme.terrainStone,
        1,
        null,
        "0.5"
      ),
      buildVoxelRect(72, compact ? 204 : 198, 176, 4, theme.white, 1, "0.16", null),
      buildVoxelTileBand(72, compact ? 210 : 204, 176, 6, tile * 2, theme.block, null, "0.24"),
    ].join("");
  }

  function buildVoxelSceneFamilyStructure(family, theme, compact) {
    switch (family) {
      case "vectors":
        return [
          buildVoxelScenePillar(52, 132, 28, 76, theme),
          buildVoxelScenePillar(240, 140, 24, 68, theme),
          buildVoxelTileBand(96, 120, 128, 8, 18, theme.terrainStone, theme.line, "0.44"),
          buildVoxelRect(112, 130, 96, 6, theme.terrainStoneDark, 1, "0.24", null),
        ].join("");
      case "signals":
        return [
          buildVoxelSceneTorch(64, 150, theme, compact),
          buildVoxelSceneTorch(248, 142, theme, compact),
          buildVoxelTileBand(78, 194, 52, 6, 14, theme.wood, null, "0.36"),
          buildVoxelTileBand(192, 186, 56, 6, 14, theme.wood, null, "0.36"),
        ].join("");
      case "studios":
        return [
          buildVoxelSceneHouse(46, 136, theme, compact),
          buildVoxelSceneWorkbench(230, 188, theme, compact),
          buildVoxelTileBand(56, 168, 38, 4, 10, theme.paper, null, "0.54"),
          buildVoxelTileBand(56, 178, 28, 4, 10, theme.paper, null, "0.46"),
        ].join("");
      default:
        return [
          buildVoxelSceneTree(52, 138, theme, compact),
          buildVoxelTileBand(208, 220, 50, 8, 12, theme.water, null, "0.86"),
          buildVoxelSceneDock(226, 212, theme, compact),
        ].join("");
    }
  }

  function buildVoxelSceneGround(theme) {
    return [
      buildVoxelSceneGroundPlatform(46, 62, theme),
      buildVoxelSceneGroundPlatform(110, 100, theme),
      buildVoxelSceneGroundPlatform(212, 62, theme),
    ].join("");
  }

  function buildVoxelSceneGroundPlatform(x, width, theme) {
    return [
      buildVoxelRect(x, 236, width, 6, theme.terrainGrass, 1, null, theme.line),
      buildVoxelRect(x, 242, width, 6, theme.terrainGrassDark, 1, null, null),
      buildVoxelTileBand(x, 248, width, 8, 18, theme.terrainDirt, null, null),
      buildVoxelTileBand(x, 256, width, 8, 18, theme.terrainStone, theme.line, null),
      buildVoxelTileBand(x, 264, width, 6, 18, theme.terrainStoneDark, null, "0.72"),
    ].join("");
  }

  function buildVoxelScenePillar(x, y, width, height, theme) {
    return [
      buildVoxelRect(x, y, width, height, theme.terrainStone, 1, "0.78", theme.line),
      buildVoxelRect(x + 4, y + 6, width - 8, 8, theme.terrainStoneDark, 1, "0.28", null),
      buildVoxelRect(x + 6, y + height - 14, width - 12, 8, theme.block, 1, "0.26", null),
    ].join("");
  }

  function buildVoxelSceneTorch(x, y, theme, compact) {
    const tile = compact ? 4 : 5;

    return [
      buildVoxelRect(x, y, 6, 56, theme.wood, 1, "0.86", null),
      buildVoxelRect(x - 4, y + 10, 14, 4, theme.terrainStoneDark, 1, "0.38", null),
      buildVoxelSprite(
        x - tile,
        y - tile * 2,
        tile,
        [
          [1, 0, 1, 1, theme.accentLight],
          [0, 1, 3, 1, theme.sun],
          [1, 2, 1, 1, theme.accent],
        ],
        theme.sun,
        1,
        null,
        "0.92"
      ),
    ].join("");
  }

  function buildVoxelSceneHouse(x, y, theme, compact) {
    const tile = compact ? 4 : 5;

    return [
      buildVoxelSprite(
        x,
        y,
        tile,
        [
          [1, 0, 8, 2, theme.wood],
          [0, 2, 10, 6, theme.terrainStone],
          [2, 4, 2, 4, theme.paper],
          [6, 4, 2, 4, theme.paper],
          [4, 5, 2, 3, theme.wood],
        ],
        theme.terrainStone,
        1,
        theme.line,
        "0.72"
      ),
      buildVoxelTileBand(x + tile * 2, y + tile * 3, tile * 5, 4, tile, theme.terrainStoneDark, null, "0.22"),
    ].join("");
  }

  function buildVoxelSceneWorkbench(x, y, theme, compact) {
    const tile = compact ? 4 : 5;

    return [
      buildVoxelSprite(
        x,
        y,
        tile,
        [
          [0, 0, 6, 1, theme.wood],
          [0, 1, 6, 4, theme.terrainDirt],
          [1, 2, 2, 1, theme.paper],
          [3, 2, 2, 1, theme.terrainStone],
          [1, 5, 1, 2, theme.wood],
          [4, 5, 1, 2, theme.wood],
        ],
        theme.terrainDirt,
        1,
        theme.line,
        "0.72"
      ),
      buildVoxelRect(x - 8, y + tile * 5, tile * 2, 8, theme.terrainStoneDark, 1, "0.18", null),
    ].join("");
  }

  function buildVoxelSceneTree(x, y, theme, compact) {
    const tile = compact ? 4 : 5;

    return [
      buildVoxelSprite(
        x,
        y,
        tile,
        [
          [2, 0, 4, 2, theme.foliage],
          [1, 2, 6, 2, theme.foliage],
          [2, 4, 4, 2, theme.foliage],
          [3, 6, 2, 4, theme.wood],
        ],
        theme.foliage,
        1,
        null,
        "0.76"
      ),
      buildVoxelTileBand(x + tile, y + tile * 9, tile * 6, 4, tile, theme.terrainGrassDark, null, "0.24"),
    ].join("");
  }

  function buildVoxelSceneDock(x, y, theme, compact) {
    const tile = compact ? 4 : 5;

    return [
      buildVoxelTileBand(x, y, tile * 6, 6, tile, theme.wood, null, "0.88"),
      buildVoxelRect(x + tile, y + 6, 4, tile * 2, theme.wood, 1, null, null),
      buildVoxelRect(x + tile * 4, y + 6, 4, tile * 2, theme.wood, 1, null, null),
      buildVoxelRect(x + tile * 2, y - tile * 2, 6, tile * 2, theme.wood, 1, null, null),
      buildVoxelRect(x + tile * 2 - 4, y - tile * 3, 14, 4, theme.paper, 1, "0.72", null),
    ].join("");
  }

  function buildVoxelCharacterSvg(persona, theme, rig, id) {
    return (
      '<g shape-rendering="crispEdges">' +
      [
        buildVoxelBackAccessorySvg(persona, theme, rig, id),
        buildVoxelRectList(rig.leftLeg, theme.outfitDark, 1, theme.line, null),
        buildVoxelRectList(rig.rightLeg, theme.outfitDark, 1, theme.line, null),
        buildVoxelRectList([rig.leftBoot, rig.rightBoot], theme.boot, 1, null, null),
        buildVoxelRect(rig.neckX, rig.neckY, rig.neckW, rig.neckH, theme.skinShade, 1, null, null),
        buildVoxelTorsoSvg(theme, rig, id),
        buildVoxelRectList(rig.leftArm, theme.outfit, 1, theme.line, null),
        buildVoxelRectList(rig.rightArm, theme.outfitLight, 1, theme.line, null),
        buildVoxelRect(rig.leftHand.x, rig.leftHand.y, rig.leftHand.w, rig.leftHand.h, theme.skin, 1, null, null),
        buildVoxelRect(rig.rightHand.x, rig.rightHand.y, rig.rightHand.w, rig.rightHand.h, theme.skin, 1, null, null),
        buildVoxelHeadSvg(theme, rig),
        buildVoxelFrontAccessorySvg(persona, theme, rig, id),
      ].join("") +
      "</g>"
    );
  }

  function buildVoxelTorsoSvg(theme, rig, id) {
    const unit = rig.unit;
    const inset = unit;
    const stripeY = rig.torsoY + unit * 4;
    const panelY = rig.torsoY + unit;
    return [
      buildVoxelRect(
        rig.torsoX,
        rig.torsoY,
        rig.torsoW,
        rig.torsoH,
        "url(#" + id + "-coat)",
        2,
        null,
        theme.line
      ),
      buildVoxelRect(
        rig.torsoX + inset,
        panelY,
        rig.torsoW - inset * 2,
        unit,
        theme.outfitPanel,
        1,
        "0.82",
        null
      ),
      buildVoxelRect(
        rig.torsoX + inset,
        stripeY,
        rig.torsoW - inset * 2,
        unit,
        rig.open ? "url(#" + id + "-accent)" : theme.outfitShade,
        1,
        rig.open ? "0.82" : "0.72",
        null
      ),
      rig.structured
        ? buildVoxelRect(
            rig.chestX - Math.round(unit / 2),
            rig.torsoY + unit,
            unit,
            rig.torsoH - unit * 2,
            theme.outfitShade,
            1,
            null,
            null
          )
        : buildVoxelRectList(
            [
              { x: rig.torsoX + unit, y: rig.torsoY + unit * 5, w: unit * 2, h: unit },
              { x: rig.torsoX + unit * 3, y: rig.torsoY + unit * 6, w: unit * 2, h: unit },
              { x: rig.torsoX + unit * 5, y: rig.torsoY + unit * 7, w: unit * 2, h: unit },
            ],
            theme.accentSoft,
            1,
            null,
            null
          ),
      buildVoxelRect(
        rig.torsoX + inset,
        rig.beltY,
        rig.torsoW - inset * 2,
        unit,
        theme.outfitDark,
        1,
        "0.22",
        null
      ),
      rig.expansive
        ? buildVoxelRect(
            rig.torsoX + rig.torsoW - unit * 2,
            rig.torsoY + unit * 5,
            unit,
            rig.torsoH - unit * 7,
            theme.accentSoft,
            1,
            null,
            null
          )
        : buildVoxelRectList(
            [
              { x: rig.torsoX + unit, y: rig.torsoY + rig.torsoH - unit * 3, w: unit * 2, h: unit * 2 },
              { x: rig.torsoX + rig.torsoW - unit * 3, y: rig.torsoY + rig.torsoH - unit * 3, w: unit * 2, h: unit * 2 },
            ],
            theme.outfitShade,
            1,
            null,
            null
          ),
      rig.open
        ? buildVoxelRect(
            rig.chestX - Math.round(unit / 2),
            rig.torsoY + unit * 5,
            unit,
            unit,
            theme.accentLight,
            1,
            "0.5",
            null,
            null
          )
        : "",
    ].join("");
  }

  function buildVoxelHeadSvg(theme, rig) {
    const unit = rig.unit;
    const eyeSize = Math.max(4, unit);
    const leftEyeX = rig.headX + unit * 2;
    const rightEyeX = rig.headX + rig.headSize - unit * 3;
    const eyeY = rig.faceY + unit * 2;
    const mouthX = rig.headX + unit * 2;
    const mouthY = rig.faceY + unit * 5;

    return [
      buildVoxelRect(rig.headX, rig.headY, rig.headSize, rig.headSize, theme.skin, 2, null, theme.line),
      buildVoxelRect(rig.faceX, rig.faceY, rig.faceW, rig.faceH, theme.skinLight, 1, "0.28", null),
      buildVoxelHairSvg(theme, rig),
      buildVoxelRect(leftEyeX, eyeY, eyeSize, eyeSize, "#1d1f22", 1, null, null),
      buildVoxelRect(rightEyeX, eyeY, eyeSize, eyeSize, "#1d1f22", 1, null, null),
      buildVoxelRect(rig.headCenterX - Math.round(unit / 3), eyeY + unit * 2, Math.max(2, Math.round(unit / 2)), unit, theme.skinShade, 1, "0.32", null),
      rig.open
        ? buildVoxelRect(mouthX, mouthY, unit * 3, Math.max(4, Math.round(unit * 0.75)), "#8a6254", 1, null, null)
        : buildVoxelRect(mouthX + Math.round(unit / 3), mouthY + 1, unit * 2, Math.max(3, Math.round(unit * 0.5)), "#8a6254", 1, null, null),
      rig.open
        ? buildVoxelRectList(
            [
              { x: leftEyeX - 1, y: eyeY - Math.max(3, Math.round(unit / 2)), w: eyeSize + 2, h: 2, fill: theme.hairDark, opacity: "0.34" },
              { x: rightEyeX, y: eyeY - Math.max(3, Math.round(unit / 2)), w: eyeSize + 2, h: 2, fill: theme.hairDark, opacity: "0.34" },
            ],
            theme.hairDark,
            1,
            null,
            null
          )
        : buildVoxelRectList(
            [
              { x: leftEyeX - 1, y: eyeY - Math.max(4, Math.round(unit * 0.75)), w: eyeSize + 2, h: 3 },
              { x: rightEyeX, y: eyeY - Math.max(4, Math.round(unit * 0.75)), w: eyeSize + 2, h: 3 },
            ],
            theme.hairDark,
            1,
            null,
            null
          ),
    ].join("");
  }

  function buildVoxelHairSvg(theme, rig) {
    const hasAntenna = rig.accessory === "antenna";
    switch (rig.poseKey) {
      case "command":
        return [
          buildVoxelRect(rig.headX - 2, rig.headY - 10, rig.headSize + 4, 16, theme.hair, 1, null, null),
          buildVoxelRect(rig.headX - 4, rig.headY + 4, 14, 20, theme.hair, 1, null, null),
          buildVoxelRect(
            rig.headX + rig.headSize - 18,
            rig.headY + 4,
            16,
            16,
            theme.hair,
            1,
            null,
            null
          ),
          buildVoxelRect(
            rig.headX + 12,
            rig.headY - 4,
            rig.headSize - 24,
            6,
            theme.hairLight,
            1,
            "0.2",
            null
          ),
          buildVoxelRect(rig.headX + rig.headSize - 24, rig.headY + 10, 14, 6, theme.hairDark, 1, "0.16", null),
        ].join("");
      case "rally":
        return [
          buildVoxelRect(rig.headX - 2, rig.headY - 10, rig.headSize + 4, 14, theme.hair, 1, null, null),
          hasAntenna
            ? ""
            : buildVoxelRect(rig.headX + rig.headSize - 18, rig.headY - 12, 14, 12, theme.hair, 1, null, null),
          buildVoxelRect(rig.headX + 4, rig.headY + 6, 16, 18, theme.hair, 1, null, null),
          buildVoxelRect(
            rig.headX + 16,
            rig.headY - 4,
            rig.headSize - 28,
            6,
            theme.hairLight,
            1,
            "0.18",
            null
          ),
        ].join("");
      case "study":
        return [
          buildVoxelRect(rig.headX - 2, rig.headY - 8, rig.headSize + 4, 14, theme.hair, 1, null, null),
          buildVoxelRect(rig.headX + 4, rig.headY + 4, rig.headSize - 8, 10, theme.hair, 1, null, null),
          buildVoxelRect(rig.headX - 2, rig.headY + 10, 10, 18, theme.hair, 1, null, null),
          buildVoxelRect(rig.headX + rig.headSize - 10, rig.headY + 8, 8, 14, theme.hairDark, 1, "0.18", null),
        ].join("");
      default:
        return [
          buildVoxelRect(rig.headX - 2, rig.headY - 10, rig.headSize + 4, 16, theme.hair, 1, null, null),
          buildVoxelRect(rig.headX - 4, rig.headY + 4, 14, 24, theme.hair, 1, null, null),
          buildVoxelRect(
            rig.headX + rig.headSize - 18,
            rig.headY + 4,
            14,
            18,
            theme.hair,
            1,
            null,
            null
          ),
          buildVoxelRect(
            rig.headX + 12,
            rig.headY - 2,
            rig.headSize - 24,
            6,
            theme.hairLight,
            1,
            "0.18",
            null
          ),
          buildVoxelRect(
            rig.headX + 10,
            rig.headY + rig.headSize - 14,
            rig.headSize - 20,
            8,
            theme.hair,
            1,
            "0.92",
            null
          ),
        ].join("");
    }
  }

  function buildVoxelBackAccessorySvg(persona, theme, rig, id) {
    if (persona.accessory !== "halo") {
      return "";
    }

    return buildVoxelSprite(
      rig.headCenterX - 20,
      rig.headY - 24,
      5,
      [
        [2, 0, 4, 1],
        [1, 1, 1, 1],
        [6, 1, 1, 1],
        [0, 2, 1, 4],
        [7, 2, 1, 4],
        [1, 6, 1, 1],
        [6, 6, 1, 1],
        [2, 7, 4, 1],
      ],
      "url(#" + id + "-accent)",
      1,
      null,
      "0.78"
    );
  }

  function buildVoxelFrontAccessorySvg(persona, theme, rig, id) {
    const accentFill = "url(#" + id + "-accent)";

    switch (persona.accessory) {
      case "prism":
        return buildVoxelSprite(
          rig.rightHandCenterX - 12,
          rig.rightHandCenterY - 18,
          6,
          [
            [1, 0, 1, 1, theme.accentLight],
            [0, 1, 3, 1, accentFill],
            [0, 2, 3, 1, theme.accent],
            [1, 3, 1, 1, theme.accentLight],
          ],
          accentFill,
          1,
          theme.line,
          null
        );
      case "banner":
        return (
          buildVoxelRect(
            rig.rightHandCenterX - 3,
            rig.rightHandCenterY - 66,
            6,
            76,
            theme.hairDark,
            1,
            null,
            null
          ) +
          buildVoxelSprite(
            rig.rightHandCenterX + 3,
            rig.rightHandCenterY - 64,
            6,
            [
              [0, 0, 6, 1, accentFill],
              [0, 1, 4, 1, theme.accent],
              [0, 2, 5, 1, accentFill],
              [0, 3, 3, 1, theme.accent],
            ],
            accentFill,
            1,
            null,
            null
          ) +
          buildVoxelRect(rig.rightHandCenterX + 30, rig.rightHandCenterY - 58, 6, 6, theme.accentLight, 1, null, null)
        );
      case "visor":
        return [
          buildVoxelRect(rig.headX + 10, rig.headY + 18, rig.headSize - 20, 10, accentFill, 1, null, theme.line),
          buildVoxelRect(
            rig.headX + 16,
            rig.headY + 20,
            rig.headSize - 32,
            4,
            theme.white,
            1,
            "0.3",
            null
          ),
        ].join("");
      case "shield":
        return (
          buildVoxelSprite(
            rig.leftHandCenterX - 14,
            rig.leftHandCenterY - 20,
            7,
            [
              [0, 0, 4, 1, accentFill],
              [0, 1, 4, 2, theme.accent],
              [0, 3, 3, 1, accentFill],
              [1, 4, 2, 1, theme.accentLight],
            ],
            accentFill,
            1,
            theme.line,
            null
          ) +
          buildVoxelRect(rig.leftHandCenterX - 4, rig.leftHandCenterY - 8, 8, 18, theme.accentLight, 1, "0.3", null)
        );
      case "halo":
        return "";
      case "scarf":
        return [
          buildVoxelRect(rig.torsoX + 10, rig.torsoY + 8, rig.torsoW - 20, 12, accentFill, 1, null, null),
          buildVoxelRect(rig.torsoX + rig.torsoW - 24, rig.torsoY + 18, 10, 36, theme.accent, 1, null, null),
          buildVoxelRect(rig.torsoX + rig.torsoW - 18, rig.torsoY + 34, 8, 18, theme.accentLight, 1, "0.34", null),
        ].join("");
      case "antenna":
        return (
          buildVoxelRect(rig.headX + rig.headSize + 6, rig.headY + 8, 4, 24, theme.hairDark, 1, null, null) +
          buildVoxelRect(rig.headX + rig.headSize + 2, rig.headY + 8, 8, 4, theme.hairDark, 1, null, null) +
          buildVoxelRect(rig.headX + rig.headSize + 2, rig.headY - 8, 12, 12, accentFill, 1, null, null)
        );
      case "torch":
        return [
          buildVoxelRect(rig.rightHandCenterX - 3, rig.rightHandCenterY - 36, 6, 46, theme.hairDark, 1, null, null),
          buildVoxelSprite(
            rig.rightHandCenterX - 9,
            rig.rightHandCenterY - 60,
            6,
            [
              [1, 0, 1, 1, theme.accentLight],
              [0, 1, 3, 1, accentFill],
              [1, 2, 1, 1, theme.accent],
            ],
            accentFill,
            1,
            null,
            null
          ),
        ].join("");
      case "scroll":
        return [
          buildVoxelRect(rig.chestX - 22, rig.chestY - 6, 44, 14, theme.paper, 1, null, theme.line),
          buildVoxelRect(rig.chestX - 26, rig.chestY - 4, 6, 10, theme.metal, 1, null, null),
          buildVoxelRect(rig.chestX + 20, rig.chestY - 4, 6, 10, theme.metal, 1, null, null),
        ].join("");
      case "leaf":
        return (
          buildVoxelRect(rig.rightHandCenterX + 8, rig.rightHandCenterY - 4, 4, 24, theme.hairDark, 1, null, null) +
          buildVoxelSprite(
            rig.rightHandCenterX + 10,
            rig.rightHandCenterY - 28,
            6,
            [
              [1, 0, 2, 1, theme.accentLight],
              [0, 1, 3, 1, accentFill],
              [0, 2, 2, 1, theme.accent],
              [1, 3, 1, 1, theme.accentLight],
            ],
            accentFill,
            1,
            null,
            null
          )
        );
      case "book":
        return [
          buildVoxelRect(rig.chestX - 18, rig.chestY - 18, 36, 40, theme.paper, 1, null, theme.line),
          buildVoxelRect(rig.chestX - 2, rig.chestY - 18, 4, 40, accentFill, 1, null, null),
          buildVoxelRect(rig.chestX + 6, rig.chestY - 10, 8, 2, theme.line, 1, "0.18", null),
        ].join("");
      case "clipboard":
        return [
          buildVoxelRect(rig.rightHandCenterX - 12, rig.rightHandCenterY - 18, 28, 38, theme.paper, 1, null, theme.line),
          buildVoxelRect(rig.rightHandCenterX - 4, rig.rightHandCenterY - 24, 12, 8, accentFill, 1, null, null),
          buildVoxelRect(rig.rightHandCenterX - 6, rig.rightHandCenterY - 6, 16, 2, theme.line, 1, "0.18", null),
          buildVoxelRect(rig.rightHandCenterX - 6, rig.rightHandCenterY + 2, 16, 2, theme.line, 1, "0.18", null),
        ].join("");
      case "sprout":
        return [
          buildVoxelRect(rig.chestX - 12, rig.chestY + 6, 24, 10, theme.paper, 1, null, theme.line),
          buildVoxelRect(rig.chestX - 1, rig.chestY - 18, 2, 24, theme.hairDark, 1, null, null),
          buildVoxelSprite(
            rig.chestX - 20,
            rig.chestY - 34,
            6,
            [
              [1, 0, 2, 1, theme.accentLight],
              [0, 1, 3, 1, accentFill],
              [1, 2, 2, 1, theme.accent],
            ],
            accentFill,
            1,
            null,
            null
          ),
          buildVoxelSprite(
            rig.chestX + 2,
            rig.chestY - 34,
            6,
            [
              [0, 0, 2, 1, theme.accentLight],
              [0, 1, 3, 1, accentFill],
              [1, 2, 2, 1, theme.accent],
            ],
            accentFill,
            1,
            null,
            null
          ),
        ].join("");
      case "lantern":
        return [
          buildVoxelRect(rig.rightHandCenterX - 2, rig.rightHandCenterY, 4, 10, theme.hairDark, 1, null, null),
          buildVoxelRect(rig.rightHandCenterX - 5, rig.rightHandCenterY + 6, 10, 4, theme.metal, 1, null, null),
          buildVoxelRect(
            rig.rightHandCenterX - 8,
            rig.rightHandCenterY + 10,
            16,
            20,
            theme.paper,
            1,
            null,
            theme.line
          ),
          buildVoxelRect(
            rig.rightHandCenterX - 4,
            rig.rightHandCenterY + 16,
            8,
            8,
            accentFill,
            1,
            null,
            null
          ),
        ].join("");
      case "star":
        return buildVoxelSprite(
          rig.rightHandCenterX + 6,
          rig.rightHandCenterY - 34,
          5,
          [
            [2, 0, 1, 1, theme.accentLight],
            [1, 1, 3, 1, accentFill],
            [0, 2, 5, 1, theme.accent],
            [1, 3, 3, 1, accentFill],
            [2, 4, 1, 1, theme.accentLight],
          ],
          accentFill,
          1,
          null,
          null
        );
      case "compass":
        return [
          buildVoxelRect(rig.chestX + 10, rig.chestY - 8, 24, 24, theme.paper, 1, null, theme.line),
          buildVoxelSprite(
            rig.chestX + 14,
            rig.chestY - 4,
            4,
            [
              [2, 0, 1, 1, theme.accentLight],
              [1, 1, 3, 1, accentFill],
              [2, 2, 1, 3, theme.accent],
            ],
            accentFill,
            1,
            null,
            null
          ),
        ].join("");
      default:
        return "";
    }
  }

  function buildVoxelRectList(blocks, fill, radius, stroke, opacity) {
    return blocks
      .filter(Boolean)
      .map(function (block) {
        return buildVoxelRect(
          block.x,
          block.y,
          block.w,
          block.h,
          block.fill || fill,
          block.r || radius || 4,
          block.opacity == null ? opacity : block.opacity,
          block.stroke || stroke
        );
      })
      .join("");
  }

  function buildVoxelTileBand(x, y, width, height, tileWidth, fill, stroke, opacity) {
    const blocks = [];
    const gap = 2;
    let cursor = x;

    while (cursor < x + width) {
      const remaining = x + width - cursor;
      blocks.push({
        x: cursor,
        y: y,
        w: Math.max(4, Math.min(tileWidth - gap, remaining)),
        h: height,
      });
      cursor += tileWidth;
    }

    return buildVoxelRectList(blocks, fill, 1, stroke, opacity);
  }

  function buildVoxelRect(x, y, width, height, fill, radius, opacity, stroke) {
    const finalRadius = Math.max(0, Math.min(radius == null ? 0 : radius, 2));
    return (
      '<rect x="' +
      x +
      '" y="' +
      y +
      '" width="' +
      width +
      '" height="' +
      height +
      '" rx="' +
      finalRadius +
      '" fill="' +
      fill +
      '"' +
      (opacity == null ? "" : ' opacity="' + opacity + '"') +
      (stroke ? ' stroke="' + stroke + '" stroke-width="1"' : "") +
      "/>"
    );
  }

  function buildVoxelSprite(originX, originY, unit, cells, fill, radius, stroke, opacity) {
    return buildVoxelRectList(
      cells.map(function (cell) {
        return {
          x: originX + cell[0] * unit,
          y: originY + cell[1] * unit,
          w: cell[2] * unit,
          h: cell[3] * unit,
          fill: cell[4] || fill,
          opacity: cell[5],
          stroke: cell[6] || stroke,
          r: cell[7] == null ? radius : cell[7],
        };
      }),
      fill,
      radius,
      stroke,
      opacity
    );
  }

  function shiftVoxelBlocks(blocks, dx, dy) {
    blocks.forEach(function (block) {
      block.x += dx;
      block.y += dy;
    });
  }

  function renderFigure(container, persona, compact) {
    container.innerHTML = buildFigureSvg(persona, compact);
  }

  function buildFigureSvg(persona, compact) {
    const name = escapeHtml(localizeText(persona.names));
    const theme = buildMinecraftTheme(persona);
    const rig = buildMinecraftRig(persona, compact);

    return [
      '<svg class="figure-svg minecraft-figure-svg" viewBox="0 0 96 96" role="img" aria-label="' +
        name +
        '">',
      '<g shape-rendering="crispEdges">',
      buildMinecraftScene(theme, persona),
      buildMinecraftCharacter(theme, persona, rig),
      buildMinecraftSceneFront(theme, persona),
      "</g>",
      "</svg>",
    ].join("");
  }

  function buildMinecraftTheme(persona) {
    const familyScene = {
      vectors: {
        hillBack: "#a8bacb",
        hillFront: "#8b9eaf",
        biomeMain: "#b9c5cf",
        biomeLight: "#d7e0e7",
        biomeDark: "#758493",
        biomeAccent: "#70859a",
      },
      signals: {
        hillBack: "#d7b487",
        hillFront: "#b48e60",
        biomeMain: "#b27f45",
        biomeLight: "#d5a86b",
        biomeDark: "#7c552f",
        biomeAccent: "#e0b85b",
      },
      studios: {
        hillBack: "#aab8d2",
        hillFront: "#8796b4",
        biomeMain: "#9d7343",
        biomeLight: "#caa67b",
        biomeDark: "#6e4f2e",
        biomeAccent: "#d6c39b",
      },
      harbors: {
        hillBack: "#95b5bf",
        hillFront: "#73929c",
        biomeMain: "#5f8d75",
        biomeLight: "#87ae95",
        biomeDark: "#40614f",
        biomeAccent: "#5a9ad0",
      },
    }[persona.family];

    return {
      sky: "#acd7ff",
      skyEdge: "#88b6e0",
      cloud: "#ffffff",
      sun: "#ffd24d",
      sunAccent: "#fff0a0",
      frameDark: "#5b4a37",
      frameLight: "#8b7455",
      frameShadow: "#3a2d1f",
      grassTop: "#6dab45",
      grassFront: "#5f943c",
      grassDetail: "#3c6e24",
      dirtTop: "#94653a",
      dirtFront: "#8b6137",
      dirtDark: "#674726",
      stoneTop: "#c2cbd3",
      stoneFront: "#aeb7c1",
      stoneDark: "#7f8994",
      woodTop: "#b57b42",
      woodFront: "#9f703d",
      woodDark: "#704c27",
      leafTop: "#74b24d",
      leafFront: "#5f9844",
      leafDark: "#406d2d",
      waterTop: "#78c3ff",
      waterFront: "#58a0df",
      waterDark: "#356fa5",
      sandTop: "#ecd79c",
      sandFront: "#d2b46d",
      sandDark: "#a58747",
      hillBack: familyScene.hillBack,
      hillFront: familyScene.hillFront,
      biomeMain: familyScene.biomeMain,
      biomeLight: familyScene.biomeLight,
      biomeDark: familyScene.biomeDark,
      biomeAccent: familyScene.biomeAccent,
      clothFront: persona.palette.outfit,
      clothTop: mixHexColors(persona.palette.outfit, "#ffffff", 0.18),
      clothSide: mixHexColors(persona.palette.outfit, "#111316", 0.44),
      clothShade: mixHexColors(persona.palette.outfit, "#111316", 0.58),
      pantsFront: mixHexColors(persona.palette.outfit, "#111316", 0.18),
      pantsTop: mixHexColors(persona.palette.outfit, "#ffffff", 0.08),
      pantsSide: mixHexColors(persona.palette.outfit, "#111316", 0.62),
      accentFront: persona.palette.accent,
      accentTop: mixHexColors(persona.palette.accent, "#ffffff", 0.2),
      accentSide: mixHexColors(persona.palette.accent, "#111316", 0.42),
      skinFront: persona.palette.skin,
      skinTop: mixHexColors(persona.palette.skin, "#ffffff", 0.22),
      skinSide: mixHexColors(persona.palette.skin, "#111316", 0.34),
      hairFront: persona.palette.hair,
      hairTop: mixHexColors(persona.palette.hair, "#ffffff", 0.18),
      hairSide: mixHexColors(persona.palette.hair, "#111316", 0.48),
      bootFront: mixHexColors(persona.palette.outfit, "#111316", 0.72),
      bootTop: mixHexColors(persona.palette.outfit, "#ffffff", 0.06),
      bootSide: mixHexColors(persona.palette.outfit, "#111316", 0.84),
      pathTop: mixHexColors(familyScene.biomeLight, "#dcc07f", 0.46),
      pathFront: mixHexColors(familyScene.biomeMain, "#936d3a", 0.18),
      pathDark: mixHexColors(familyScene.biomeDark, "#111316", 0.14),
      paperFront: "#efe5cf",
      paperTop: "#faf3e2",
      paperSide: "#d2c3a5",
      metalFront: "#b7c1cb",
      metalTop: "#d9e0e7",
      metalSide: "#7f8994",
      metalDark: "#5b6773",
      glowstoneFront: "#f4cf58",
      glowstoneTop: "#fff0a6",
      glowstoneSide: "#b18d24",
      redstoneFront: "#d25c55",
      redstoneTop: "#f08f87",
      redstoneSide: "#8f2f29",
      ink: "#13171c",
      mouth: "#6b473a",
      flowerFront: "#b98ee8",
      flowerSide: "#7b5db5",
      flowerLeaf: "#4d8a37",
      potFront: "#9d6a3b",
      potSide: "#6d4728",
      shadowSoft: rgbaFromHex("#111316", 0.08),
      shadowStrong: rgbaFromHex("#111316", 0.16),
    };
  }

  function buildMinecraftPersonaSpec(persona) {
    return {
      "beacon-architect": { pose: "signal", terrain: "stone", cue: "beacon", prop: "beacon" },
      "bridge-director": { pose: "offer", terrain: "path", cue: "bridge", prop: "banner" },
      "prism-strategist": { pose: "carry", terrain: "stone", cue: "redstone", prop: "map" },
      "stone-captain": { pose: "guard", terrain: "stone", cue: "wall", prop: "shield" },
      "openwave-host": { pose: "carry", terrain: "path", cue: "lantern-garden", prop: "flower" },
      "harbor-rallyer": { pose: "offer", terrain: "path", cue: "bell-fence", prop: "bell" },
      "neon-pathfinder": { pose: "signal", terrain: "path", cue: "waypoint", prop: "torch" },
      "iron-maverick": { pose: "signal", terrain: "stone", cue: "forge", prop: "tool" },
      "quiet-cartographer": { pose: "carry", terrain: "grass", cue: "map-table", prop: "scroll" },
      "cedar-keeper": { pose: "carry", terrain: "grass", cue: "grove", prop: "sapling" },
      "archive-analyst": { pose: "carry", terrain: "grass", cue: "archive", prop: "book" },
      "granite-planner": { pose: "offer", terrain: "stone", cue: "drafting", prop: "clipboard" },
      "night-gardener": { pose: "carry", terrain: "grass", cue: "garden", prop: "sprout" },
      "harbor-listener": { pose: "guard", terrain: "shore", cue: "dock", prop: "lantern" },
      "veil-dreamer": { pose: "signal", terrain: "shore", cue: "crystal", prop: "star" },
      "still-sentinel": { pose: "guard", terrain: "shore", cue: "watchpost", prop: "compass" },
    }[persona.slug] || { pose: "idle", terrain: "grass", cue: "watchpost", prop: "book" };
  }

  function buildMinecraftRig(persona, compact) {
    const spec = buildMinecraftPersonaSpec(persona);

    function part(x, y, width, height, depth) {
      return { x: x, y: y, w: width, h: height, d: depth == null ? 4 : depth };
    }

    const rig = {
      compact: compact,
      poseKey: spec && spec.pose ? spec.pose : "neutral",
      head: part(40, 12, 16, 16, 5),
      torso: part(40, 30, 16, 22, 4),
      leftLeg: part(40, 52, 8, 24, 4),
      rightLeg: part(48, 52, 8, 24, 4),
      leftArm: [part(32, 30, 8, 22, 4)],
      rightArm: [part(56, 30, 8, 22, 4)],
      leftHand: part(32, 52, 8, 6, 3),
      rightHand: part(56, 52, 8, 6, 3),
      anchors: {
        head: { x: 48, y: 7 },
        chest: { x: 48, y: 42 },
        right: { x: 60, y: 50 },
        left: { x: 28, y: 50 },
      },
    };

    switch (rig.poseKey) {
      case "signal":
        rig.rightArm = [part(56, 22, 8, 22, 4)];
        rig.rightHand = part(56, 44, 8, 6, 3);
        rig.anchors.right = { x: 60, y: 40 };
        rig.anchors.chest = { x: 48, y: 42 };
        break;
      case "guard":
        rig.leftArm = [part(30, 34, 8, 22, 4)];
        rig.leftHand = part(30, 56, 8, 6, 3);
        rig.rightArm = [part(56, 30, 8, 22, 4)];
        rig.anchors.left = { x: 24, y: 50 };
        rig.anchors.right = { x: 60, y: 50 };
        rig.anchors.chest = { x: 48, y: 44 };
        break;
      case "carry":
        rig.leftArm = [part(36, 34, 8, 18, 4)];
        rig.rightArm = [part(52, 34, 8, 18, 4)];
        rig.leftHand = part(40, 50, 6, 6, 2);
        rig.rightHand = part(50, 50, 6, 6, 2);
        rig.anchors.right = { x: 52, y: 46 };
        rig.anchors.left = { x: 44, y: 46 };
        rig.anchors.chest = { x: 48, y: 47 };
        break;
      case "offer":
        rig.rightArm = [part(58, 34, 8, 18, 4)];
        rig.rightHand = part(61, 52, 6, 6, 2);
        rig.anchors.left = { x: 28, y: 50 };
        rig.anchors.right = { x: 64, y: 50 };
        rig.anchors.chest = { x: 48, y: 44 };
        break;
      default:
        break;
    }

    return rig;
  }

  function buildMinecraftScene(theme, persona) {
    const spec = buildMinecraftPersonaSpec(persona);

    return [
      buildMinecraftRect(0, 0, 96, 96, theme.sky),
      buildMinecraftRect(0, 56, 96, 4, theme.skyEdge),
      buildMinecraftSun(theme),
      buildMinecraftCloud(10, 14, theme),
      buildMinecraftCloud(56, 20, theme),
      buildMinecraftFarHills(theme),
      buildMinecraftGround(theme, spec),
      buildMinecraftBiomeScene(theme, spec),
      buildMinecraftFigureShadow(theme),
    ].join("");
  }

  function buildMinecraftSceneFront() {
    return "";
  }

  function buildMinecraftSun(theme) {
    return buildMinecraftRects([
      { x: 78, y: 10, w: 8, h: 8, fill: theme.sun },
      { x: 80, y: 12, w: 4, h: 4, fill: theme.sunAccent },
      { x: 76, y: 12, w: 2, h: 4, fill: theme.sun },
      { x: 86, y: 12, w: 2, h: 4, fill: theme.sun },
      { x: 80, y: 8, w: 4, h: 2, fill: theme.sun },
    ]);
  }

  function buildMinecraftCloud(x, y, theme) {
    return buildMinecraftRects([
      { x: x + 4, y: y, w: 10, h: 2, fill: theme.cloud },
      { x: x, y: y + 2, w: 8, h: 2, fill: theme.cloud },
      { x: x + 8, y: y + 2, w: 10, h: 2, fill: theme.cloud },
      { x: x + 2, y: y + 4, w: 12, h: 2, fill: theme.cloud },
    ]);
  }

  function buildMinecraftFarHills(theme) {
    return buildMinecraftRects([
      { x: 0, y: 70, w: 28, h: 6, fill: theme.hillBack },
      { x: 8, y: 66, w: 18, h: 4, fill: theme.hillBack },
      { x: 18, y: 62, w: 14, h: 4, fill: theme.hillBack },
      { x: 52, y: 72, w: 28, h: 6, fill: theme.hillFront },
      { x: 60, y: 68, w: 18, h: 4, fill: theme.hillFront },
      { x: 70, y: 64, w: 14, h: 4, fill: theme.hillFront },
    ]);
  }

  function buildMinecraftBiomeScene(theme, spec) {
    switch (spec.cue) {
      case "beacon":
        return buildMinecraftBeaconStand(10, 58, theme);
      case "bridge":
        return buildMinecraftBridgeSpan(8, 70, 14, theme);
      case "redstone":
        return buildMinecraftRedstoneNode(10, 66, theme);
      case "wall":
        return buildMinecraftStoneWall(8, 68, 2, theme);
      case "lantern-garden":
        return buildMinecraftLanternPost(10, 66, theme);
      case "bell-fence":
        return buildMinecraftBellStand(8, 66, theme);
      case "waypoint":
        return buildMinecraftWaypointPost(10, 60, theme);
      case "forge":
        return buildMinecraftForge(8, 70, theme);
      case "map-table":
        return buildMinecraftMapTable(8, 70, theme);
      case "grove":
        return buildMinecraftSceneTree(6, 56, theme);
      case "archive":
        return buildMinecraftBookshelf(8, 60, theme);
      case "drafting":
        return buildMinecraftSceneWorkbench(10, 70, theme);
      case "garden":
        return buildMinecraftGardenPatch(8, 84, theme);
      case "dock":
        return buildMinecraftSceneDock(8, 72, theme);
      case "crystal":
        return buildMinecraftStarTotem(10, 62, theme);
      default:
        return buildMinecraftWatchpost(8, 62, theme);
    }
  }

  function buildMinecraftGround(theme, spec) {
    const blocks = [
      { x: 0, y: 84, w: 24, h: 12, surface: "grass" },
      { x: 24, y: 80, w: 48, h: 16, surface: "grass" },
      { x: 72, y: 84, w: 20, h: 12, surface: "grass" },
      { x: 8, y: 76, w: 16, h: 8, surface: "grass", d: 3 },
      { x: 72, y: 76, w: 16, h: 8, surface: "grass", d: 3 },
    ];

    switch (spec.terrain) {
      case "stone":
        blocks.forEach(function (block) {
          block.surface = "stone";
        });
        break;
      case "path":
        blocks.splice(2, 0, { x: 30, y: 80, w: 36, h: 10, surface: "path", d: 3 });
        break;
      case "shore":
        blocks[1].surface = "sand";
        blocks[2].surface = "water";
        blocks[4].surface = "sand";
        break;
      default:
        break;
    }

    return blocks
      .map(function (block) {
        return buildMinecraftTerrainMass(
          block.x,
          block.y,
          block.w,
          block.h,
          block.surface,
          theme,
          block.d
        );
      })
      .join("");
  }

  function buildMinecraftFigureShadow(theme) {
    return buildMinecraftRects([
      { x: 34, y: 78, w: 30, h: 3, fill: theme.shadowStrong },
      { x: 38, y: 81, w: 22, h: 2, fill: theme.shadowSoft },
    ]);
  }

  function buildMinecraftTerrainMass(x, y, width, height, surface, theme, depth) {
    const material = buildMinecraftTerrainPalette(surface, theme);
    const d = depth == null ? 4 : depth;
    const bandHeight = Math.min(2, Math.max(1, height - 2));
    const detailWidth = Math.max(2, Math.min(width - 2, Math.floor(width * 0.36)));
    let markup = buildMinecraftCuboid(x, y, width, height, material.palette, d);

    if (material.band && height > 3) {
      markup += buildMinecraftRect(x, y + 1, width, bandHeight, material.band);
      markup += buildMinecraftRect(x + width, y + 1, d, bandHeight, material.bandSide || material.band);
    }

    if (material.detail && height > 5) {
      markup += buildMinecraftRect(
        x + Math.floor((width - detailWidth) / 2),
        y + height - 3,
        detailWidth,
        1,
        material.detail
      );
    }

    return markup;
  }

  function buildMinecraftTerrainPalette(surface, theme) {
    switch (surface) {
      case "stone":
        return {
          palette: { front: theme.stoneFront, top: theme.stoneTop, side: theme.stoneDark },
          detail: theme.stoneDark,
        };
      case "path":
        return {
          palette: {
            front: theme.pathFront,
            top: theme.pathTop,
            side: mixHexColors(theme.pathDark, "#111316", 0.12),
          },
          detail: theme.pathDark,
        };
      case "sand":
        return {
          palette: { front: theme.sandFront, top: theme.sandTop, side: theme.sandDark },
          detail: theme.sandDark,
        };
      case "water":
        return {
          palette: { front: theme.waterFront, top: theme.waterTop, side: theme.waterDark },
          detail: theme.waterDark,
        };
      default:
        return {
          palette: { front: theme.dirtFront, top: theme.grassTop, side: theme.dirtDark },
          band: theme.grassFront,
          bandSide: mixHexColors(theme.grassFront, "#111316", 0.32),
          detail: theme.dirtDark,
        };
    }
  }

  function buildMinecraftGrassBlock(x, y, theme) {
    return buildMinecraftTerrainMass(x, y, 8, 8, "grass", theme, 1);
  }

  function buildMinecraftStoneBlock(x, y, theme) {
    return buildMinecraftTerrainMass(x, y, 8, 8, "stone", theme, 1);
  }

  function buildMinecraftPathBlock(x, y, theme) {
    return buildMinecraftTerrainMass(x, y, 8, 8, "path", theme, 1);
  }

  function buildMinecraftSandBlock(x, y, theme) {
    return buildMinecraftTerrainMass(x, y, 8, 8, "sand", theme, 1);
  }

  function buildMinecraftWaterBlock(x, y, theme) {
    return buildMinecraftTerrainMass(x, y, 8, 8, "water", theme, 1);
  }

  function buildMinecraftSceneTorch(x, y, theme) {
    return [
      buildMinecraftRect(x, y, 2, 10, theme.woodDark),
      buildMinecraftRect(x - 1, y + 10, 4, 2, theme.stoneDark),
      buildMinecraftCuboid(
        x - 2,
        y - 4,
        4,
        4,
        { front: theme.glowstoneFront, top: theme.glowstoneTop, side: theme.glowstoneSide },
        1
      ),
    ].join("");
  }

  function buildMinecraftFence(x, y, width, theme) {
    return buildMinecraftRects([
      { x: x, y: y, w: width, h: 2, fill: theme.woodFront },
      { x: x + 2, y: y - 4, w: 2, h: 6, fill: theme.woodDark },
      { x: x + width - 4, y: y - 4, w: 2, h: 6, fill: theme.woodDark },
    ]);
  }

  function buildMinecraftSceneHouse(x, y, theme) {
    return buildMinecraftRects([
      { x: x + 4, y: y, w: 12, h: 4, fill: theme.woodFront },
      { x: x, y: y + 4, w: 20, h: 12, fill: theme.biomeMain },
      { x: x + 4, y: y + 8, w: 4, h: 8, fill: theme.paperFront },
      { x: x + 12, y: y + 8, w: 4, h: 8, fill: theme.paperFront },
      { x: x + 8, y: y + 10, w: 4, h: 6, fill: theme.woodDark },
      { x: x + 2, y: y + 6, w: 16, h: 2, fill: theme.biomeLight },
    ]);
  }

  function buildMinecraftSceneWorkbench(x, y, theme) {
    return [
      buildMinecraftCuboid(
        x,
        y,
        10,
        6,
        { front: theme.woodFront, top: theme.woodTop, side: theme.woodDark },
        1
      ),
      buildMinecraftRect(x + 2, y + 2, 3, 1, theme.paperFront),
      buildMinecraftRect(x + 6, y + 2, 2, 1, theme.stoneFront),
      buildMinecraftRect(x + 1, y + 6, 2, 4, theme.woodDark),
      buildMinecraftRect(x + 7, y + 6, 2, 4, theme.woodDark),
    ].join("");
  }

  function buildMinecraftSceneTree(x, y, theme) {
    return [
      buildMinecraftCuboid(
        x + 2,
        y + 2,
        10,
        10,
        { front: theme.leafFront, top: theme.leafTop, side: theme.leafDark },
        2
      ),
      buildMinecraftCuboid(
        x + 5,
        y + 12,
        4,
        10,
        { front: theme.woodFront, top: theme.woodTop, side: theme.woodDark },
        1
      ),
    ].join("");
  }

  function buildMinecraftSceneDock(x, y, theme) {
    return [
      buildMinecraftCuboid(
        x,
        y,
        12,
        4,
        { front: theme.woodFront, top: theme.woodTop, side: theme.woodDark },
        1
      ),
      buildMinecraftRect(x + 2, y + 4, 2, 6, theme.woodDark),
      buildMinecraftRect(x + 8, y + 4, 2, 6, theme.woodDark),
      buildMinecraftRect(x + 5, y - 6, 2, 6, theme.woodDark),
      buildMinecraftCuboid(
        x + 3,
        y - 10,
        6,
        3,
        { front: theme.paperFront, top: theme.paperTop, side: theme.paperSide },
        1
      ),
    ].join("");
  }

  function buildMinecraftStoneColumn(x, y, blocks, theme) {
    let markup = "";
    let index;

    for (index = 0; index < blocks; index += 1) {
      markup += buildMinecraftStoneBlock(x, y + index * 8, theme);
    }

    return markup;
  }

  function buildMinecraftBeaconStand(x, y, theme) {
    return [
      buildMinecraftStoneColumn(x, y + 8, 2, theme),
      buildMinecraftBeaconProp(x + 1, y, theme),
    ].join("");
  }

  function buildMinecraftBridgeSpan(x, y, width, theme) {
    return [
      buildMinecraftFence(x, y, width, theme),
      buildMinecraftRect(x + 2, y + 2, width - 4, 2, theme.woodDark),
      buildMinecraftRect(x + 4, y + 4, width - 8, 2, theme.woodFront),
    ].join("");
  }

  function buildMinecraftStoneWall(x, y, blocks, theme) {
    let markup = "";
    let index;

    for (index = 0; index < blocks; index += 1) {
      markup += buildMinecraftStoneBlock(x + index * 8, y, theme);
      markup += buildMinecraftRect(x + index * 8 + 2, y - 2, 4, 2, theme.stoneTop);
    }

    return markup;
  }

  function buildMinecraftLanternPost(x, y, theme) {
    return [
      buildMinecraftRect(x + 4, y - 10, 2, 12, theme.woodDark),
      buildMinecraftRect(x + 2, y - 10, 6, 2, theme.woodFront),
      buildMinecraftCuboid(
        x + 1,
        y - 8,
        6,
        6,
        { front: theme.glowstoneFront, top: theme.metalTop, side: theme.metalSide },
        1
      ),
      buildMinecraftRect(x + 3, y - 5, 2, 2, theme.paperFront),
    ].join("");
  }

  function buildMinecraftBellStand(x, y, theme) {
    return [
      buildMinecraftRect(x + 2, y - 10, 2, 12, theme.woodDark),
      buildMinecraftRect(x + 8, y - 10, 2, 12, theme.woodDark),
      buildMinecraftRect(x + 2, y - 10, 8, 2, theme.woodFront),
      buildMinecraftCuboid(
        x + 4,
        y - 8,
        4,
        5,
        { front: theme.glowstoneFront, top: theme.glowstoneTop, side: theme.glowstoneSide },
        1
      ),
    ].join("");
  }

  function buildMinecraftRedstoneNode(x, y, theme) {
    return [
      buildMinecraftStoneBlock(x, y, theme),
      buildMinecraftRect(x + 3, y - 4, 2, 4, theme.woodDark),
      buildMinecraftCuboid(
        x + 2,
        y - 7,
        4,
        4,
        { front: theme.redstoneFront, top: theme.redstoneTop, side: theme.redstoneSide },
        1
      ),
    ].join("");
  }

  function buildMinecraftWaypointPost(x, y, theme) {
    return [
      buildMinecraftRect(x + 3, y - 12, 2, 14, theme.woodDark),
      buildMinecraftBeaconProp(x + 1, y - 12, theme),
    ].join("");
  }

  function buildMinecraftForge(x, y, theme) {
    return [
      buildMinecraftCuboid(
        x,
        y,
        12,
        10,
        { front: theme.stoneFront, top: theme.stoneTop, side: theme.stoneDark },
        1
      ),
      buildMinecraftRect(x + 2, y + 2, 8, 4, theme.glowstoneSide),
      buildMinecraftRect(x + 3, y + 3, 6, 2, theme.glowstoneFront),
      buildMinecraftRect(x + 4, y - 4, 2, 4, theme.stoneDark),
      buildMinecraftRect(x + 7, y - 4, 2, 4, theme.stoneDark),
    ].join("");
  }

  function buildMinecraftMapTable(x, y, theme) {
    return [
      buildMinecraftCuboid(
        x,
        y,
        12,
        6,
        { front: theme.woodFront, top: theme.woodTop, side: theme.woodDark },
        1
      ),
      buildMinecraftRect(x + 1, y + 1, 10, 4, theme.paperFront),
      buildMinecraftRect(x + 3, y + 3, 3, 1, theme.waterFront),
      buildMinecraftRect(x + 7, y + 3, 2, 1, theme.leafFront),
      buildMinecraftRect(x + 2, y + 6, 2, 6, theme.woodDark),
      buildMinecraftRect(x + 8, y + 6, 2, 6, theme.woodDark),
    ].join("");
  }

  function buildMinecraftSignpost(x, y, theme) {
    return buildMinecraftRects([
      { x: x + 3, y: y, w: 2, h: 12, fill: theme.woodDark },
      { x: x, y: y + 2, w: 8, h: 4, fill: theme.paperFront },
      { x: x + 1, y: y + 3, w: 6, h: 1, fill: theme.paperSide },
    ]);
  }

  function buildMinecraftShrub(x, y, theme) {
    return buildMinecraftRects([
      { x: x + 2, y: y - 2, w: 8, h: 4, fill: theme.leafFront },
      { x: x, y: y + 2, w: 12, h: 4, fill: theme.leafDark },
    ]);
  }

  function buildMinecraftGrassTuft(x, y, theme) {
    return buildMinecraftRects([
      { x: x + 2, y: y, w: 2, h: 6, fill: theme.grassFront },
      { x: x + 5, y: y + 2, w: 2, h: 4, fill: theme.grassDetail },
      { x: x + 8, y: y + 1, w: 2, h: 5, fill: theme.grassFront },
    ]);
  }

  function buildMinecraftBookshelf(x, y, theme) {
    return [
      buildMinecraftCuboid(
        x,
        y,
        12,
        14,
        { front: theme.woodFront, top: theme.woodTop, side: theme.woodDark },
        1
      ),
      buildMinecraftRect(x + 2, y + 2, 8, 3, theme.paperFront),
      buildMinecraftRect(x + 2, y + 6, 3, 3, theme.accentFront),
      buildMinecraftRect(x + 5, y + 6, 2, 3, theme.paperSide),
      buildMinecraftRect(x + 7, y + 6, 3, 3, theme.biomeAccent),
      buildMinecraftRect(x + 2, y + 10, 8, 2, theme.paperFront),
    ].join("");
  }

  function buildMinecraftCrate(x, y, theme) {
    return [
      buildMinecraftCuboid(
        x,
        y,
        8,
        8,
        { front: theme.woodFront, top: theme.woodTop, side: theme.woodDark },
        1
      ),
      buildMinecraftRect(x + 1, y + 3, 6, 1, theme.woodDark),
      buildMinecraftRect(x + 3, y + 1, 1, 6, theme.woodDark),
    ].join("");
  }

  function buildMinecraftStoneMarker(x, y, theme) {
    return [
      buildMinecraftStoneBlock(x, y, theme),
      buildMinecraftRect(x + 2, y - 2, 4, 2, theme.accentFront),
    ].join("");
  }

  function buildMinecraftGardenPatch(x, y, theme) {
    return [
      buildMinecraftPathBlock(x, y, theme),
      buildMinecraftCuboid(
        x + 1,
        y - 4,
        6,
        3,
        { front: theme.potFront, top: theme.woodTop, side: theme.potSide },
        1
      ),
      buildMinecraftRect(x + 2, y - 7, 2, 4, theme.leafFront),
      buildMinecraftRect(x + 5, y - 6, 2, 3, theme.leafDark),
    ].join("");
  }

  function buildMinecraftFlowerPatch(x, y, theme) {
    return buildMinecraftRects([
      { x: x + 2, y: y - 6, w: 2, h: 6, fill: theme.flowerLeaf },
      { x: x + 8, y: y - 5, w: 2, h: 5, fill: theme.flowerLeaf },
      { x: x, y: y - 8, w: 4, h: 2, fill: theme.flowerFront },
      { x: x + 6, y: y - 7, w: 4, h: 2, fill: theme.accentTop },
    ]);
  }

  function buildMinecraftReeds(x, y, theme) {
    return buildMinecraftRects([
      { x: x + 2, y: y, w: 2, h: 8, fill: theme.leafFront },
      { x: x + 6, y: y + 2, w: 2, h: 6, fill: theme.leafDark },
      { x: x + 10, y: y + 1, w: 2, h: 7, fill: theme.leafFront },
    ]);
  }

  function buildMinecraftWaterRipples(x, y, theme) {
    return buildMinecraftRects([
      { x: x, y: y, w: 12, h: 2, fill: theme.waterTop },
      { x: x + 2, y: y + 2, w: 8, h: 1, fill: theme.waterDark },
    ]);
  }

  function buildMinecraftCrystalCluster(x, y, theme) {
    return [
      buildMinecraftCuboid(
        x + 4,
        y - 10,
        3,
        10,
        { front: theme.accentFront, top: theme.accentTop, side: theme.accentSide },
        1
      ),
      buildMinecraftCuboid(
        x + 1,
        y - 7,
        2,
        7,
        { front: theme.accentSide, top: theme.accentTop, side: theme.accentSide },
        1
      ),
      buildMinecraftCuboid(
        x + 8,
        y - 6,
        2,
        6,
        { front: theme.accentFront, top: theme.accentTop, side: theme.accentSide },
        1
      ),
    ].join("");
  }

  function buildMinecraftStarTotem(x, y, theme) {
    return [
      buildMinecraftRect(x + 3, y - 10, 2, 12, theme.woodDark),
      buildMinecraftStarProp(x, y - 12, theme),
    ].join("");
  }

  function buildMinecraftWatchpost(x, y, theme) {
    return [
      buildMinecraftStoneColumn(x, y + 8, 2, theme),
      buildMinecraftRect(x + 3, y - 8, 2, 18, theme.woodDark),
      buildMinecraftRect(x + 5, y - 8, 6, 2, theme.accentFront),
      buildMinecraftRect(x + 5, y - 6, 4, 2, theme.accentFront),
    ].join("");
  }

  function buildMinecraftCharacter(theme, persona, rig) {
    return [
      buildMinecraftBackAccessory(theme, persona, rig),
      buildMinecraftLeg(rig.leftLeg, theme),
      buildMinecraftLeg(rig.rightLeg, theme),
      buildMinecraftTorso(rig.torso, theme),
      buildMinecraftArmSet(rig.leftArm, theme),
      buildMinecraftArmSet(rig.rightArm, theme),
      buildMinecraftHand(rig.leftHand, theme),
      buildMinecraftHand(rig.rightHand, theme),
      buildMinecraftHead(rig.head, theme, persona),
      buildMinecraftWearableAccessory(theme, persona, rig),
      buildMinecraftHeldAccessory(theme, persona, rig),
    ].join("");
  }

  function buildMinecraftLeg(leg, theme) {
    return [
      buildMinecraftCuboid(
        leg.x,
        leg.y,
        leg.w,
        leg.h,
        { front: theme.pantsFront, top: theme.pantsTop, side: theme.pantsSide },
        leg.d
      ),
      buildMinecraftRect(leg.x, leg.y + leg.h - 5, leg.w, 5, theme.bootFront),
      buildMinecraftRect(leg.x + leg.w, leg.y + leg.h - 5, leg.d, 5, theme.bootSide),
    ].join("");
  }

  function buildMinecraftTorso(torso, theme) {
    return [
      buildMinecraftCuboid(
        torso.x,
        torso.y,
        torso.w,
        torso.h,
        { front: theme.clothFront, top: theme.clothTop, side: theme.clothSide },
        torso.d
      ),
      buildMinecraftRect(torso.x, torso.y, torso.w, 4, theme.clothShade),
      buildMinecraftRect(torso.x, torso.y + torso.h - 4, torso.w, 4, theme.clothShade),
    ].join("");
  }

  function buildMinecraftArmSet(segments, theme) {
    return segments.map(function (segment) {
      return buildMinecraftCuboid(
        segment.x,
        segment.y,
        segment.w,
        segment.h,
        { front: theme.clothFront, top: theme.clothTop, side: theme.clothSide },
        segment.d
      );
    }).join("");
  }

  function buildMinecraftHand(hand, theme) {
    return buildMinecraftCuboid(
      hand.x,
      hand.y,
      hand.w,
      hand.h,
      { front: theme.skinFront, top: theme.skinTop, side: theme.skinSide },
      hand.d
    );
  }

  function buildMinecraftHead(head, theme, persona) {
    return [
      buildMinecraftCuboid(
        head.x,
        head.y,
        head.w,
        head.h,
        { front: theme.skinFront, top: theme.skinTop, side: theme.skinSide },
        head.d
      ),
      buildMinecraftHair(head, theme),
      buildMinecraftRects([
        { x: head.x + 5, y: head.y + 7, w: 2, h: 2, fill: theme.ink },
        { x: head.x + 10, y: head.y + 7, w: 2, h: 2, fill: theme.ink },
        { x: head.x + 7, y: head.y + 12, w: 3, h: 1, fill: theme.mouth },
      ]),
    ].join("");
  }

  function buildMinecraftHair(head, theme) {
    return buildMinecraftRects([
      { x: head.x + head.d, y: head.y - head.d, w: head.w, h: head.d, fill: theme.hairTop },
      { x: head.x + head.w, y: head.y, w: head.d, h: head.h, fill: theme.hairSide },
      { x: head.x, y: head.y, w: head.w, h: 4, fill: theme.hairFront },
      { x: head.x, y: head.y + 4, w: 2, h: 4, fill: theme.hairFront },
      { x: head.x + head.w - 2, y: head.y + 4, w: 2, h: 4, fill: theme.hairFront },
    ]);
  }

  function buildMinecraftBackAccessory() {
    return "";
  }

  function buildMinecraftWearableAccessory() {
    return "";
  }

  function buildMinecraftHeldAccessory(theme, persona, rig) {
    const spec = buildMinecraftPersonaSpec(persona);

    switch (spec.prop) {
      case "beacon":
        return buildMinecraftBeaconProp(rig.anchors.right.x + 1, rig.anchors.right.y, theme);
      case "banner":
        return buildMinecraftBannerProp(rig.anchors.right.x - 2, rig.anchors.right.y - 2, theme);
      case "map":
        return buildMinecraftMapProp(rig.anchors.chest.x - 5, rig.anchors.chest.y - 1, theme);
      case "shield":
        return buildMinecraftShieldProp(rig.anchors.left.x, rig.anchors.left.y - 2, theme);
      case "flower":
        return buildMinecraftFlowerProp(rig.anchors.chest.x - 5, rig.anchors.chest.y, theme);
      case "bell":
        return buildMinecraftBellProp(rig.anchors.right.x - 5, rig.anchors.right.y - 2, theme);
      case "torch":
        return buildMinecraftTorchProp(rig.anchors.right.x - 4, rig.anchors.right.y - 2, theme);
      case "tool":
        return buildMinecraftToolProp(rig.anchors.right.x - 5, rig.anchors.right.y - 2, theme);
      case "scroll":
        return buildMinecraftScrollProp(rig.anchors.chest.x - 6, rig.anchors.chest.y, theme);
      case "sapling":
        return buildMinecraftSaplingProp(rig.anchors.chest.x - 4, rig.anchors.chest.y - 2, theme);
      case "book":
        return buildMinecraftBookProp(rig.anchors.chest.x - 5, rig.anchors.chest.y - 1, theme);
      case "clipboard":
        return buildMinecraftClipboardProp(rig.anchors.right.x - 4, rig.anchors.right.y - 4, theme);
      case "sprout":
        return buildMinecraftSproutProp(rig.anchors.chest.x - 4, rig.anchors.chest.y - 2, theme);
      case "lantern":
        return buildMinecraftLanternProp(rig.anchors.right.x - 1, rig.anchors.right.y - 2, theme);
      case "star":
        return buildMinecraftStarProp(rig.anchors.right.x - 1, rig.anchors.right.y - 8, theme);
      case "compass":
        return buildMinecraftCompassProp(rig.anchors.right.x - 2, rig.anchors.right.y - 4, theme);
      default:
        return "";
    }
  }

  function buildMinecraftBeaconProp(x, y, theme) {
    return buildMinecraftCuboid(
      x,
      y,
      6,
      6,
      { front: theme.accentFront, top: theme.accentTop, side: theme.accentSide },
      1
    ) + buildMinecraftRect(x + 1, y + 1, 3, 2, theme.paperFront);
  }

  function buildMinecraftBannerProp(x, y, theme) {
    return [
      buildMinecraftRect(x + 2, y - 10, 2, 14, theme.woodDark),
      buildMinecraftRects([
        { x: x + 4, y: y - 10, w: 6, h: 2, fill: theme.accentFront },
        { x: x + 4, y: y - 8, w: 6, h: 2, fill: theme.accentSide },
        { x: x + 4, y: y - 6, w: 4, h: 2, fill: theme.accentFront },
      ]),
    ].join("");
  }

  function buildMinecraftShieldProp(x, y, theme) {
    return [
      buildMinecraftCuboid(
        x,
        y,
        8,
        10,
        { front: theme.woodFront, top: theme.woodDark, side: theme.biomeDark },
        1
      ),
      buildMinecraftRect(x + 2, y + 2, 4, 2, theme.accentFront),
      buildMinecraftRect(x + 3, y + 5, 2, 3, theme.accentSide),
    ].join("");
  }

  function buildMinecraftTorchProp(x, y, theme) {
    return [
      buildMinecraftRect(x + 2, y - 6, 2, 10, theme.woodDark),
      buildMinecraftCuboid(
        x,
        y - 10,
        4,
        4,
        { front: theme.glowstoneFront, top: theme.glowstoneTop, side: theme.glowstoneSide },
        1
      ),
    ].join("");
  }

  function buildMinecraftScrollProp(x, y, theme) {
    return [
      buildMinecraftCuboid(
        x,
        y,
        12,
        5,
        { front: theme.paperFront, top: theme.paperTop, side: theme.paperSide },
        1
      ),
      buildMinecraftRect(x - 1, y + 1, 2, 4, theme.woodFront),
      buildMinecraftRect(x + 11, y + 1, 2, 4, theme.woodFront),
      buildMinecraftRect(x + 2, y + 2, 8, 1, theme.paperSide),
    ].join("");
  }

  function buildMinecraftLeafProp(x, y, theme) {
    return buildMinecraftRects([
      { x: x + 3, y: y + 3, w: 2, h: 8, fill: theme.woodDark },
      { x: x, y: y, w: 8, h: 4, fill: theme.leafFront },
      { x: x + 1, y: y + 4, w: 6, h: 4, fill: theme.leafDark },
    ]);
  }

  function buildMinecraftBookProp(x, y, theme) {
    return [
      buildMinecraftCuboid(
        x,
        y,
        8,
        6,
        { front: theme.paperFront, top: theme.paperTop, side: theme.paperSide },
        1
      ),
      buildMinecraftRect(x + 3, y, 2, 6, theme.accentFront),
    ].join("");
  }

  function buildMinecraftClipboardProp(x, y, theme) {
    return [
      buildMinecraftCuboid(
        x,
        y,
        8,
        10,
        { front: theme.paperFront, top: theme.paperTop, side: theme.paperSide },
        1
      ),
      buildMinecraftRect(x + 2, y - 2, 4, 2, theme.metalFront),
      buildMinecraftRect(x + 2, y + 3, 4, 1, theme.paperSide),
      buildMinecraftRect(x + 2, y + 6, 4, 1, theme.paperSide),
    ].join("");
  }

  function buildMinecraftChestProp(x, y, theme) {
    return [
      buildMinecraftCuboid(
        x,
        y + 2,
        10,
        6,
        { front: theme.woodFront, top: theme.woodTop, side: theme.woodDark },
        1
      ),
      buildMinecraftRect(x, y + 5, 10, 1, theme.woodDark),
      buildMinecraftRect(x + 4, y + 3, 2, 2, theme.metalFront),
    ].join("");
  }

  function buildMinecraftToolProp(x, y, theme) {
    return buildMinecraftRects([
      { x: x + 4, y: y - 6, w: 2, h: 12, fill: theme.woodDark },
      { x: x, y: y - 6, w: 4, h: 2, fill: theme.metalFront },
      { x: x + 4, y: y - 8, w: 5, h: 2, fill: theme.metalFront },
      { x: x + 9, y: y - 6, w: 2, h: 2, fill: theme.metalSide },
    ]);
  }

  function buildMinecraftSaplingProp(x, y, theme) {
    return [
      buildMinecraftCuboid(
        x,
        y + 4,
        8,
        4,
        { front: theme.potFront, top: theme.woodTop, side: theme.potSide },
        1
      ),
      buildMinecraftRect(x + 3, y + 1, 2, 4, theme.woodDark),
      buildMinecraftRect(x + 1, y, 3, 2, theme.leafFront),
      buildMinecraftRect(x + 4, y, 3, 2, theme.leafFront),
      buildMinecraftRect(x + 2, y + 2, 4, 2, theme.leafDark),
    ].join("");
  }

  function buildMinecraftSproutProp(x, y, theme) {
    return [
      buildMinecraftCuboid(
        x,
        y + 4,
        8,
        4,
        { front: theme.potFront, top: theme.woodFront, side: theme.potSide },
        1
      ),
      buildMinecraftRect(x + 3, y, 2, 4, theme.woodDark),
      buildMinecraftRects([
        { x: x + 1, y: y, w: 3, h: 2, fill: theme.leafFront },
        { x: x + 4, y: y, w: 3, h: 2, fill: theme.leafFront },
        { x: x + 2, y: y + 2, w: 4, h: 2, fill: theme.leafDark },
      ]),
    ].join("");
  }

  function buildMinecraftLanternProp(x, y, theme) {
    return [
      buildMinecraftRect(x + 3, y - 4, 1, 6, theme.metalDark),
      buildMinecraftCuboid(
        x,
        y + 2,
        8,
        8,
        { front: theme.glowstoneFront, top: theme.metalTop, side: theme.metalSide },
        1
      ),
      buildMinecraftRect(x + 2, y + 5, 4, 3, theme.paperFront),
    ].join("");
  }

  function buildMinecraftStarProp(x, y, theme) {
    return buildMinecraftRects([
      { x: x + 3, y: y, w: 2, h: 2, fill: theme.accentTop },
      { x: x + 1, y: y + 2, w: 6, h: 2, fill: theme.accentFront },
      { x: x, y: y + 4, w: 8, h: 2, fill: theme.accentSide },
      { x: x + 1, y: y + 6, w: 6, h: 2, fill: theme.accentFront },
      { x: x + 3, y: y + 8, w: 2, h: 2, fill: theme.accentTop },
    ]);
  }

  function buildMinecraftCompassProp(x, y, theme) {
    return [
      buildMinecraftCuboid(
        x,
        y,
        9,
        9,
        { front: theme.metalFront, top: theme.metalTop, side: theme.metalSide },
        1
      ),
      buildMinecraftRects([
        { x: x + 4, y: y + 1, w: 2, h: 6, fill: theme.redstoneFront },
        { x: x + 2, y: y + 4, w: 6, h: 1, fill: theme.paperFront },
      ]),
    ].join("");
  }

  function buildMinecraftTabletProp(x, y, theme) {
    return [
      buildMinecraftCuboid(
        x,
        y,
        10,
        7,
        { front: theme.metalFront, top: theme.metalTop, side: theme.metalSide },
        1
      ),
      buildMinecraftRect(x + 2, y + 2, 6, 3, theme.paperFront),
      buildMinecraftRect(x + 3, y + 3, 4, 1, theme.accentFront),
    ].join("");
  }

  function buildMinecraftFlowerProp(x, y, theme) {
    return buildMinecraftRects([
      { x: x + 4, y: y + 2, w: 2, h: 7, fill: theme.flowerLeaf },
      { x: x + 1, y: y, w: 4, h: 2, fill: theme.flowerFront },
      { x: x + 5, y: y + 1, w: 4, h: 2, fill: theme.accentTop },
      { x: x + 3, y: y + 3, w: 4, h: 2, fill: theme.flowerSide },
    ]);
  }

  function buildMinecraftBellProp(x, y, theme) {
    return [
      buildMinecraftRect(x + 4, y, 2, 4, theme.woodDark),
      buildMinecraftCuboid(
        x + 2,
        y + 4,
        6,
        6,
        { front: theme.glowstoneFront, top: theme.glowstoneTop, side: theme.glowstoneSide },
        1
      ),
    ].join("");
  }

  function buildMinecraftMapProp(x, y, theme) {
    return [
      buildMinecraftCuboid(
        x,
        y,
        10,
        7,
        { front: theme.paperFront, top: theme.paperTop, side: theme.paperSide },
        1
      ),
      buildMinecraftRects([
        { x: x + 2, y: y + 2, w: 3, h: 2, fill: theme.waterFront },
        { x: x + 5, y: y + 3, w: 2, h: 2, fill: theme.leafFront },
        { x: x + 7, y: y + 1, w: 1, h: 4, fill: theme.redstoneFront },
      ]),
    ].join("");
  }

  function buildMinecraftCuboid(x, y, width, height, palette, depth) {
    const d = depth == null ? 2 : depth;
    const faceShadow = mixHexColors(palette.front, "#111316", 0.16);
    const sideEdge = mixHexColors(palette.side, "#111316", 0.22);
    const topEdge = mixHexColors(palette.top, "#ffffff", 0.14);

    return [
      buildMinecraftRect(x + d, y - d, width, d, palette.top),
      buildMinecraftRect(x + width, y, d, height, palette.side),
      buildMinecraftRect(x + width, y - d, d, d, palette.side),
      buildMinecraftRect(x, y, width, height, palette.front),
      buildMinecraftRect(x, y + height - 1, width, 1, faceShadow),
      d > 1 ? buildMinecraftRect(x + d, y - d, width, 1, topEdge) : "",
      d > 1 ? buildMinecraftRect(x + width + d - 1, y, 1, height, sideEdge) : "",
    ].join("");
  }

  function buildMinecraftRects(rects) {
    return rects
      .filter(Boolean)
      .map(function (rect) {
        return buildMinecraftRect(rect.x, rect.y, rect.w, rect.h, rect.fill);
      })
      .join("");
  }

  function buildMinecraftRect(x, y, width, height, fill) {
    return (
      '<rect x="' +
      x +
      '" y="' +
      y +
      '" width="' +
      width +
      '" height="' +
      height +
      '" fill="' +
      fill +
      '"/>'
    );
  }

  function mixHexColors(colorA, colorB, amount) {
    const a = hexToRgb(colorA);
    const b = hexToRgb(colorB);
    const ratio = Math.max(0, Math.min(1, amount));
    const red = Math.round(a.r + (b.r - a.r) * ratio);
    const green = Math.round(a.g + (b.g - a.g) * ratio);
    const blue = Math.round(a.b + (b.b - a.b) * ratio);
    return "#" + [red, green, blue].map(function (value) {
      return value.toString(16).padStart(2, "0");
    }).join("");
  }

  function rgbaFromHex(color, alpha) {
    const rgb = hexToRgb(color);
    return (
      "rgba(" +
      rgb.r +
      ", " +
      rgb.g +
      ", " +
      rgb.b +
      ", " +
      Math.max(0, Math.min(1, alpha)) +
      ")"
    );
  }

  function hexToRgb(color) {
    const normalized = String(color).replace("#", "");
    const value =
      normalized.length === 3
        ? normalized
            .split("")
            .map(function (part) {
              return part + part;
            })
            .join("")
        : normalized;

    return {
      r: parseInt(value.slice(0, 2), 16) || 17,
      g: parseInt(value.slice(2, 4), 16) || 19,
      b: parseInt(value.slice(4, 6), 16) || 22,
    };
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
})();
