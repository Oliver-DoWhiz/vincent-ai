(function () {
  const root = document.documentElement;
  const page = document.body.dataset.page;
  const DAY_START_HOUR = 6;
  const NIGHT_START_HOUR = 18;
  const DEFAULT_LANG = "en";
  const LANG_STORAGE_KEY = "vincent.lang";
  const ASSESSMENT_STORAGE_KEY = "vincent.assessment.v1";
  const SUPPORTED_LANGS = new Set(["en", "zh"]);

  const COPY = {
    en: {
      title: {
        landing: "Vincent AI",
        assessment: "Vincent AI Assessment",
      },
      description: {
        landing: "Vincent is a personal mental health companion for early reflection.",
        assessment: "A reflective assessment to understand your current Vincent pattern.",
      },
      landing: {
        heroSummary: "Personal mental health companion",
        heroTitle: "Meet Vincent",
        heroPurpose: "A personal companion for early mental health reflection.",
        heroCta: "Start with assessment",
        heroNote: "Private by default. Not for crisis support.",
      },
      shared: {
        brandTagline: "reflective assessment",
        home: "Home",
      },
      assessment: {
        eyebrow: "Assessment",
        title: "Pick what feels most typical.",
        lead: "One choice per question. Go back anytime.",
        resultEyebrow: "Your Vincent pattern",
        shadowBadge: "Shadow state",
        similarity: "Similarity",
        signature: "Signature",
        why: "Why this result",
        gifts: "Gifts",
        support: "Support",
        previous: "Previous",
        continue: "Continue",
        seeResult: "See result",
        takeAgain: "Take again",
        backHome: "Back home",
        loading: "Loading your first question…",
        unavailableQuestion: "Vincent could not load the assessment right now.",
        unavailableStatus: "Unavailable",
        unavailableHelp: "Try reloading",
        readyForResult: "Ready for result",
        scoring: "Scoring…",
        tryAgain: "Try again",
        option: (index) => `Option ${index}`,
        progressLabel: (current, total) => `Question ${current} of ${total}`,
        progressPercent: (percent) => `${percent}% done`,
        progressAnswered: (answered, total) => `${answered} of ${total} answered`,
        resultHeadline: "Your dominant Vincent pattern",
        resultReflection: (archetype) =>
          `Your current profile clusters around ${archetype.subtitle}. Vincent reads this as a default way you make sense of yourself, your relationships, and pressure.`,
        resultCaution:
          "This assessment is reflective only. It is not a diagnosis, treatment plan, or crisis service.",
      },
    },
    zh: {
      title: {
        landing: "Vincent AI",
        assessment: "Vincent AI 测评",
      },
      description: {
        landing: "Vincent 是一个用于早期心理状态反思的个人陪伴工具。",
        assessment: "一份帮助你理解当前 Vincent 模式的反思型测评。",
      },
      landing: {
        heroSummary: "个人心理健康陪伴",
        heroTitle: "认识 Vincent",
        heroPurpose: "一个用于早期心理状态反思的个人陪伴工具。",
        heroCta: "开始测评",
        heroNote: "默认私密。不能用于危机干预。",
      },
      shared: {
        brandTagline: "反思型测评",
        home: "首页",
      },
      assessment: {
        eyebrow: "测评",
        title: "选择最符合你平时状态的一项。",
        lead: "每题只选一个。随时可以返回修改。",
        resultEyebrow: "你的 Vincent 模式",
        shadowBadge: "阴影状态",
        similarity: "相似度",
        signature: "特征签名",
        why: "结果解读",
        gifts: "优势",
        support: "支持建议",
        previous: "上一题",
        continue: "继续",
        seeResult: "查看结果",
        takeAgain: "重新测一次",
        backHome: "回到首页",
        loading: "正在载入题目…",
        unavailableQuestion: "Vincent 暂时无法载入测评。",
        unavailableStatus: "暂不可用",
        unavailableHelp: "请稍后刷新重试",
        readyForResult: "可以查看结果",
        scoring: "生成结果中…",
        tryAgain: "重试",
        option: (index) => `选项 ${index}`,
        progressLabel: (current, total) => `第 ${current} / ${total} 题`,
        progressPercent: (percent) => `已完成 ${percent}%`,
        progressAnswered: (answered, total) => `已回答 ${answered} / ${total} 题`,
        resultHeadline: "你的当前主模式",
        resultReflection: (archetype) =>
          `当前结果更接近「${archetype.subtitle}」。Vincent 认为，你通常会用这套方式理解自己、处理关系，并面对压力。`,
        resultCaution: "这份结果用于自我反思，不构成医疗或临床诊断。",
      },
    },
  };

  const DIMENSION_NAMES = {
    en: {
      DRIVE: "Ambition",
      BOUNDARY: "Boundary",
      EXPOSURE: "Visibility",
      VOLATILITY: "Intensity",
      DISCIPLINE: "Discipline",
      INTERPRETATION: "Meaning-Making",
      ATTACHMENT: "Attachment",
      INITIATIVE: "Initiative",
    },
    zh: {
      DRIVE: "进取心",
      BOUNDARY: "边界",
      EXPOSURE: "可见度",
      VOLATILITY: "情绪强度",
      DISCIPLINE: "自律",
      INTERPRETATION: "解释倾向",
      ATTACHMENT: "依恋",
      INITIATIVE: "主动性",
    },
  };

  const BAND_LABELS = {
    en: {
      Low: "Low",
      Medium: "Medium",
      High: "High",
    },
    zh: {
      Low: "低",
      Medium: "中",
      High: "高",
    },
  };

  const ZH_INTERPRETATIONS = {
    DRIVE: {
      Low: "你会保护自己的欲望，不让它变成一种表演性的义务。",
      Medium: "你想产生影响，但不想以抹掉自己为代价。",
      High: "你对权力结构很敏锐，也想在其中拥有主动权。",
    },
    BOUNDARY: {
      Low: "你的第一反应是迁就，代价往往由身体替你结账。",
      Medium: "你能弹性配合，但不会丢掉自我这根线。",
      High: "你的边界很清晰，只是有时比你想的更冷。",
    },
    EXPOSURE: {
      Low: "隐私是你保持内在信号干净的方式。",
      Medium: "你知道隐藏和策展的区别。",
      High: "你理解舞台、影响力，以及感知的经济学。",
    },
    VOLATILITY: {
      Low: "感受存在，但很少被允许长成戏剧。",
      Medium: "情绪会流经你，但更像纹理，不像混乱。",
      High: "你用高压电的方式体验生活，很少是灰度的。",
    },
    DISCIPLINE: {
      Low: "自由对你足够重要，所以系统感常常让你起疑。",
      Medium: "只要结构还保有人味，你就能持续发力。",
      High: "你相信仪式能托住情绪托不住的东西。",
    },
    INTERPRETATION: {
      Low: "你会抵抗偏执式过读，给善意留位置。",
      Medium: "你能读出细节，但不会自动把它翻译成危险。",
      High: "你很快就能看见潜台词，尤其在权力参与时。",
    },
    ATTACHMENT: {
      Low: "在亲密里，你的第一语言是自主。",
      Medium: "你想要的是能经得起现实的连接。",
      High: "亲密对你来说非常鲜活，缺席很容易长成故事。",
    },
    INITIATIVE: {
      Low: "你会等内在确定成形后再动，而不是之前。",
      Medium: "你偏好审慎而果断的移动，而不是戏剧化起步。",
      High: "行动是你制造清晰的方法，不只是表达清晰。",
    },
  };

  const ZH_QUESTIONS = {
    drive_1: {
      prompt: "眼前出现一个高声望的机会，你的第一反应是：",
      options: [
        "先问自己：我真的想要连带而来的那种生活吗？",
        "先算清收益，再冷静决定。",
        "先把机会拿下，免得被更慢的人占走。",
      ],
    },
    drive_2: {
      prompt: "当身边的人开始加速时，你通常会：",
      options: [
        "守住自己的节奏。不是每场比赛都属于我。",
        "注意到变化，重新校准，再继续往前。",
        "立刻感到压力，然后逼自己更快。",
      ],
    },
    drive_3: {
      prompt: "合作成果最后落到别人头上时，你会：",
      options: [
        "算了。比起署名，我更在意清静。",
        "记在心里，下次调整做法。",
        "会很在意。我不该这么容易被忽略。",
      ],
    },
    boundary_1: {
      prompt: "有人向你索取超过合理范围时，你通常会：",
      options: [
        "先答应，之后自己慢慢承担代价。",
        "谈条件。我可以帮，但不会没有边界。",
        "干脆拒绝。我的界限不需要讨论。",
      ],
    },
    boundary_2: {
      prompt: "一个朋友不停倾诉却不做任何改变，你会：",
      options: [
        "继续承接。我宁愿自己累一点，也不想让对方失望。",
        "会支持，但也会点出那个反复出现的模式。",
        "很快后退。重复并不等于亲密。",
      ],
    },
    boundary_3: {
      prompt: "在冲突里，你的默认反应是：",
      options: [
        "不断自我修饰，只为让场面保持平静。",
        "把该说的说清楚，不加戏。",
        "直接切中要害。准确比舒服更重要。",
      ],
    },
    exposure_1: {
      prompt: "在公开分享一件事之前，你会：",
      options: [
        "倾向于不发。我的内在不属于信息流。",
        "如果它真的有价值，我会有选择地分享。",
        "反复打磨呈现方式，直到信息准确落地。",
      ],
    },
    exposure_2: {
      prompt: "当你走进一个新场域时，你的能量通常是：",
      options: [
        "观察型。先让空间自己显露出来。",
        "适配型。找到合适的频道再进入。",
        "为影响力而准备好的。存在感本来就是工作的一部分。",
      ],
    },
    exposure_3: {
      prompt: "线上版本的你和线下版本的你相比：",
      options: [
        "更小一点。我暴露得比别人以为的少。",
        "差不多。有修饰，但不是另一套人格。",
        "更锋利。重要时刻，我知道怎么引导注意力。",
      ],
    },
    volatility_1: {
      prompt: "来自某个不该忽视的人，一点小冒犯都会：",
      options: [
        "到晚上基本就过去了。",
        "留在脑子里，直到我想明白。",
        "像把整个内在系统点着一样。",
      ],
    },
    volatility_2: {
      prompt: "当情绪来了，你通常会：",
      options: [
        "先收住。感觉可以等等。",
        "先研究它，直到它变得清楚。",
        "立刻跟着它走。拖延会让我觉得不真实。",
      ],
    },
    volatility_3: {
      prompt: "熟悉你的人会怎么形容你的情绪天气：",
      options: [
        "稳定。外面很少看得出风暴。",
        "有层次。会变化，但并非毫无预兆。",
        "带电。漂亮、鲜活，而且很难忽略。",
      ],
    },
    discipline_1: {
      prompt: "一个系统对你来说要成立，前提是它：",
      options: [
        "足够松，不让我觉得被困住。",
        "足够务实，能在真实生活里活下来。",
        "足够严格。结构为我换来自由。",
      ],
    },
    discipline_2: {
      prompt: "当一个连续记录断掉时，你通常会：",
      options: [
        "就让它过去。仪式不该变成惩罚。",
        "尽快重启，但不把它演成大事。",
        "立刻重建。松动的代价很高。",
      ],
    },
    discipline_3: {
      prompt: "你那些没做完的项目，大多是：",
      options: [
        "好奇心跑得比维护更快的证据。",
        "不错的直觉，加上不完美的时机。",
        "很少见。我不会轻易开始，也不喜欢悬而未决。",
      ],
    },
    interpretation_1: {
      prompt: "有人给了你一段模糊的反馈，你的脑子会先去到：",
      options: [
        "最善意、最可能成立的解释。",
        "先并行几种理解，再慢慢收窄。",
        "他们真正想说、但没说出口的那部分。",
      ],
    },
    interpretation_2: {
      prompt: "当你听到一个关于某人的美好故事，你会：",
      options: [
        "除非证据反驳，否则愿意相信。",
        "会欣赏，但还是会保留一点警惕。",
        "先去找它被编辑掉了什么、遗漏了什么、谁从中获利。",
      ],
    },
    interpretation_3: {
      prompt: "你最强的模式识别能力通常是：",
      options: [
        "知道什么时候不要过度解读噪音。",
        "把真正的信号和一时情绪分开。",
        "在权力关系还没明朗前就先看出来。",
      ],
    },
    attachment_1: {
      prompt: "当你开始在意一个人时，你通常会：",
      options: [
        "先守住自主性。亲近不该吞没我。",
        "慢慢建立。信任应该有结构。",
        "很快靠近。距离会让我不安。",
      ],
    },
    attachment_2: {
      prompt: "重要的人一天没回你，会让你觉得：",
      options: [
        "很正常。每个人都有自己的内在生活。",
        "会注意到，但不会开始脑补剧情。",
        "胸口里立刻开始长出一个完整故事。",
      ],
    },
    attachment_3: {
      prompt: "在关系里，你最可能害怕的是：",
      options: ["被吞没。", "被误解。", "在完全打开之后被留下。"],
    },
    initiative_1: {
      prompt: "一场难谈的话必须发生时，你通常会：",
      options: [
        "拖到它实在避不开为止。",
        "先准备，再在合适的时候处理。",
        "现在就谈。拖着比冲击更伤人。",
      ],
    },
    initiative_2: {
      prompt: "当一个好点子出现时，你会：",
      options: [
        "先让它待一待。能活下来的才是真的。",
        "先画出下一步，再试试可行性。",
        "趁怀疑还没长得太漂亮之前先动手。",
      ],
    },
    initiative_3: {
      prompt: "你和“势能”的关系更像：",
      options: [
        "间歇性的。等内在天气放晴我才启动。",
        "有意图的。我偏好果断但克制的行动。",
        "饥饿的。行动会让我更锋利。",
      ],
    },
  };

  const ZH_ARCHETYPES = {
    "quiet-monarch": {
      name: "静默君主",
      subtitle: "私密权威，克制热度",
      tone: "沉着",
      essence: "你不追逐房间中央，你会自己制造一个中心，让别人感到那股引力。",
      gifts: ["稳定权威", "清晰边界", "有品位但不炫耀"],
      fracture: "你可能把自己管理得太完整，以至于别人的帮助都像打扰。",
      support: ["在怨气出现前先学会分派", "把赞赏说出来，不要默认别人知道", "让亲密关系也看见你未经修饰的草稿"],
    },
    "velvet-strategist": {
      name: "天鹅绒战略家",
      subtitle: "野心包裹在克制里",
      tone: "锋利",
      essence: "你不会大声宣告自己想要权力，你只是把自己摆在一个越来越难以被忽视的位置。",
      gifts: ["长期主义思维", "政治敏感度", "压力下的高标准"],
      fracture: "如果你不主动保护柔软，每个房间都可能在你眼里变成一张筹码地图。",
      support: ["尽早指出人的代价", "公开做一件不完美的事", "把策略和身份分开"],
    },
    "glass-flame": {
      name: "玻璃火焰",
      subtitle: "耀眼、有说服力、也易燃",
      tone: "带电",
      essence: "别人往往先感受到你，再来理解你。人们记得的是你带来的天气。",
      gifts: ["魅力", "创意点火能力", "情绪上的勇气"],
      fracture: "对你来说，强烈有时会看起来像真相，其实那可能只是速度。",
      support: ["每周至少放慢一个重大决定", "把恢复力做成仪式", "不要让化学反应跑在证据前面"],
    },
    "silver-mirror": {
      name: "银镜",
      subtitle: "敏感、接收力强、观察近乎危险",
      tone: "明亮",
      essence: "你能注意到细微的偏移、吞回去的句子，以及故事和告白之间的区别。",
      gifts: ["社交感知", "细致倾听", "关系智力"],
      fracture: "你可能成为所有人的映照面，却唯独照不到自己。",
      support: ["先说自己想要什么，再问别人需要什么", "练习直接提出请求", "把身体当成数据，而不是背景"],
    },
    "midnight-architect": {
      name: "午夜架构师",
      subtitle: "为感受建系统，为混乱画蓝图",
      tone: "精准",
      essence: "只要模式一出现，你就会更安心。结构，是你把不确定变成可使用之物的方式。",
      gifts: ["分析力", "系统思维", "处理复杂性的可靠能力"],
      fracture: "不是每个活生生的问题，都想被做成模型。",
      support: ["别在测试前就删掉直觉", "给未完成的对话留点空间", "更早分享草稿"],
    },
    "field-medic": {
      name: "战地医者",
      subtitle: "高压下冷静，对自己代价高",
      tone: "踏实",
      essence: "在情绪风暴里，你会变得异常有用。人们会自然靠向你的稳定。",
      gifts: ["承接力", "务实照料", "让人安心的责任感"],
      fracture: "你的能干，会比你的需求更快吸引来依赖。",
      support: ["少一点拯救，多一点陪练", "在崩溃前先休息", "分清“被需要”和“被爱”"],
    },
    "ritual-machine": {
      name: "仪式机器",
      subtitle: "有脉搏的纪律",
      tone: "强韧",
      essence: "你比起情绪更相信流程。当一些事能被有意识地重复，你的生活就变得清晰。",
      gifts: ["执行到底", "专注", "安静但高效的运营能力"],
      fracture: "控制感可能会慢慢伪装成安全感。",
      support: ["安排一些不求优化的玩耍", "允许一天保持混乱", "衡量结果，而不只衡量服从"],
    },
    "borderless-dreamer": {
      name: "无界梦者",
      subtitle: "边界松、想象力强、难以被钉住",
      tone: "空灵",
      essence: "你依靠氛围、可能性和细微牵引来移动。只要生活里还有空气感，你就会觉得它鲜活。",
      gifts: ["想象力", "温柔的开放性", "创作上的渗透力"],
      fracture: "没有边界时，你的天赋很容易流进别人的议程。",
      support: ["进房间前先决定一个不可退让点", "每天做完一件小事", "保护独处，不要让它只剩漂浮"],
    },
    "storm-carrier": {
      name: "风暴携行者",
      subtitle: "先感受，再学习的人",
      tone: "易燃",
      essence: "你拥有罕见的力量、投入和推进力。你身上没有半明半暗的东西。",
      gifts: ["勇气", "投入", "风险中的推进力"],
      fracture: "风暴可以很诚实，但仍然可能打错方向。",
      support: ["先命名触发点，再指向对象", "先延迟消息，不延迟真相", "训练你的退出方式"],
    },
    "charm-economy": {
      name: "魅力经济体",
      subtitle: "社交聪明，熟悉注意力的运作",
      tone: "精致",
      essence: "你知道感知会改变进入权。你明白一个气氛、一句话、一张图像，如何重排整个交换。",
      gifts: ["社交时机感", "呈现能力", "关系调度能力"],
      fracture: "如果每次互动都变成策展，真诚就会开始显得低效。",
      support: ["让至少一段对话不被表演接管", "用准确代替圆滑", "留意何时“被喜欢”成了燃料"],
    },
    "loyal-sentinel": {
      name: "忠诚哨兵",
      subtitle: "慢热、难撼动、为耐久而生",
      tone: "稳固",
      essence: "你很难被轻易打动，也很难被轻易撼动。一旦承诺，你会把稳定变成一种奢侈。",
      gifts: ["忠诚", "一致性", "保护本能"],
      fracture: "守住边界，可能慢慢变成你的全职身份。",
      support: ["在别人猜之前先更新你的状态", "敢于冒一点喜悦的风险，而不只追求稳定", "给修正留下空间"],
    },
    "soft-provocateur": {
      name: "温柔挑衅者",
      subtitle: "表面温和，问题却有扰动力",
      tone: "含蓄",
      essence: "你很少主导房间，但会因为问出了别人删掉的那句话，而改变整个温度。",
      gifts: ["新鲜框架", "情绪智力", "安静的勇气"],
      fracture: "你可能不断激发别人的洞察，却不承认自己也在其中有利害。",
      support: ["承认自己在场中的欲望", "制造波动后别立刻离开", "练习收束，而不只练习揭示"],
    },
    "hollow-oracle": {
      name: "空心神谕者",
      subtitle: "看穿一切，却几乎不再信任什么",
      tone: "阴影",
      essence: "你的模式识别极强。你能很快看见隐藏结构，但代价是，天真会变得越来越难以抵达。",
      gifts: ["锋利的辨识力", "看穿动机的透视感", "防御型智能"],
      fracture: "当一切解读都变成怀疑，连爱也会开始像布景。",
      support: ["收集证据是为了安全，不是为了全控", "试着验证一种更宽厚的解释", "先说出害怕，再说讽刺"],
    },
    "crowned-ember": {
      name: "加冕余烬",
      subtitle: "王者标准，灼伤的神经系统",
      tone: "阴影",
      essence: "你确实带着力量冲向卓越。问题是，所有事都容易变得急迫到值得你牺牲自己。",
      gifts: ["驱动力", "吸引力", "高电压的执行力"],
      fracture: "你可能把耗竭误认成意义，把关注误认成爱。",
      support: ["像保护战略资产一样保护恢复", "允许一个野心过夜也不立刻完成", "去找见证者，而不只是观众"],
    },
  };

  function themeForLocalTime(date) {
    const hour = date.getHours();
    return hour >= DAY_START_HOUR && hour < NIGHT_START_HOUR ? "day" : "night";
  }

  function applyAutoTheme() {
    const theme = themeForLocalTime(new Date());
    if (root.dataset.theme !== theme) {
      root.dataset.theme = theme;
    }
    root.style.colorScheme = theme === "night" ? "dark" : "light";
  }

  applyAutoTheme();
  window.setInterval(applyAutoTheme, 60 * 1000);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      applyAutoTheme();
    }
  });

  let currentLang = resolveLanguage();
  const commonElements = {
    localeButtons: Array.from(document.querySelectorAll("[data-lang-target]")),
    preserveLangLinks: Array.from(document.querySelectorAll("[data-preserve-lang]")),
    descriptionMeta: document.querySelector('meta[name="description"]'),
  };

  const landingElements =
    page === "landing"
      ? {
          heroSummary: document.getElementById("landingHeroSummary"),
          heroTitle: document.getElementById("landingHeroTitle"),
          heroPurpose: document.getElementById("landingHeroPurpose"),
          heroCta: document.getElementById("landingHeroCta"),
          heroNote: document.getElementById("landingHeroNote"),
        }
      : null;

  const assessmentElements =
    page === "assessment"
      ? {
          brandTagline: document.getElementById("brandTagline"),
          homeLink: document.getElementById("homeLink"),
          taskEyebrow: document.getElementById("taskEyebrow"),
          taskTitle: document.getElementById("taskTitle"),
          taskLead: document.getElementById("taskLead"),
          progressLabel: document.getElementById("progressLabel"),
          progressPercent: document.getElementById("progressPercent"),
          progressAnswered: document.getElementById("progressAnswered"),
          progressBar: document.getElementById("progressBar"),
          dimensionBadge: document.getElementById("dimensionBadge"),
          questionIndex: document.getElementById("questionIndex"),
          questionPrompt: document.getElementById("questionPrompt"),
          optionList: document.getElementById("optionList"),
          previousButton: document.getElementById("previousButton"),
          nextButton: document.getElementById("nextButton"),
          questionCard: document.getElementById("questionCard"),
          resultCard: document.getElementById("resultCard"),
          resultEyebrow: document.getElementById("resultEyebrow"),
          resultTone: document.getElementById("resultTone"),
          shadowBadge: document.getElementById("shadowBadge"),
          resultHeadline: document.getElementById("resultHeadline"),
          resultName: document.getElementById("resultName"),
          resultSubtitle: document.getElementById("resultSubtitle"),
          resultEssence: document.getElementById("resultEssence"),
          resultReflection: document.getElementById("resultReflection"),
          similarityLabel: document.getElementById("similarityLabel"),
          signatureLabel: document.getElementById("signatureLabel"),
          resultSimilarity: document.getElementById("resultSimilarity"),
          resultSignature: document.getElementById("resultSignature"),
          whyTitle: document.getElementById("whyTitle"),
          dimensionBars: document.getElementById("dimensionBars"),
          giftsTitle: document.getElementById("giftsTitle"),
          supportTitle: document.getElementById("supportTitle"),
          resultGifts: document.getElementById("resultGifts"),
          resultSupport: document.getElementById("resultSupport"),
          resultFracture: document.getElementById("resultFracture"),
          resultCaution: document.getElementById("resultCaution"),
          restartButton: document.getElementById("restartButton"),
          backHomeButton: document.getElementById("backHomeButton"),
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
        }
      : null;

  bindLanguageControls();
  applyLanguage();

  if (page !== "assessment") {
    return;
  }

  restoreAssessmentState();
  bindAssessmentEvents();
  applyAssessmentChrome();

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

    return navigator.language && navigator.language.toLowerCase().startsWith("zh") ? "zh" : DEFAULT_LANG;
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

  function bindLanguageControls() {
    commonElements.localeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const lang = button.dataset.langTarget;
        if (!SUPPORTED_LANGS.has(lang) || lang === currentLang) {
          return;
        }
        currentLang = lang;
        persistLanguage(lang);
        applyLanguage();
        if (page === "assessment" && state.questions.length > 0) {
          renderAssessment();
        }
      });
    });
  }

  function applyLanguage() {
    persistLanguage(currentLang);
    root.lang = currentLang === "zh" ? "zh-CN" : "en";
    root.dataset.lang = currentLang;
    syncLanguageQuery();
    syncLanguageButtons();
    syncLanguageLinks();
    applyDocumentCopy();
    if (page === "landing") {
      applyLandingCopy();
    }
    if (page === "assessment") {
      applyAssessmentChrome();
    }
  }

  function syncLanguageQuery() {
    const url = new URL(window.location.href);
    if (currentLang === DEFAULT_LANG) {
      url.searchParams.delete("lang");
    } else {
      url.searchParams.set("lang", currentLang);
    }
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }

  function syncLanguageButtons() {
    commonElements.localeButtons.forEach((button) => {
      const isActive = button.dataset.langTarget === currentLang;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function syncLanguageLinks() {
    commonElements.preserveLangLinks.forEach((link) => {
      if (!link.dataset.baseHref) {
        link.dataset.baseHref = link.getAttribute("href") || "/";
      }
      const url = new URL(link.dataset.baseHref, window.location.origin);
      if (currentLang === DEFAULT_LANG) {
        url.searchParams.delete("lang");
      } else {
        url.searchParams.set("lang", currentLang);
      }
      link.setAttribute("href", `${url.pathname}${url.search}${url.hash}`);
    });
  }

  function applyDocumentCopy() {
    const copy = COPY[currentLang];
    const pageTitle = page === "assessment" ? copy.title.assessment : copy.title.landing;
    const pageDescription =
      page === "assessment" ? copy.description.assessment : copy.description.landing;

    document.title = pageTitle;
    if (commonElements.descriptionMeta) {
      commonElements.descriptionMeta.setAttribute("content", pageDescription);
    }
  }

  function applyLandingCopy() {
    if (!landingElements) {
      return;
    }

    const copy = COPY[currentLang].landing;
    landingElements.heroSummary.textContent = copy.heroSummary;
    landingElements.heroTitle.textContent = copy.heroTitle;
    landingElements.heroPurpose.textContent = copy.heroPurpose;
    landingElements.heroCta.textContent = copy.heroCta;
    landingElements.heroNote.textContent = copy.heroNote;
  }

  function applyAssessmentChrome() {
    if (!assessmentElements) {
      return;
    }

    const shared = COPY[currentLang].shared;
    const copy = COPY[currentLang].assessment;

    assessmentElements.brandTagline.textContent = shared.brandTagline;
    assessmentElements.homeLink.textContent = shared.home;
    assessmentElements.taskEyebrow.textContent = copy.eyebrow;
    assessmentElements.taskTitle.textContent = copy.title;
    assessmentElements.taskLead.textContent = copy.lead;
    assessmentElements.resultEyebrow.textContent = copy.resultEyebrow;
    assessmentElements.shadowBadge.textContent = copy.shadowBadge;
    assessmentElements.similarityLabel.textContent = copy.similarity;
    assessmentElements.signatureLabel.textContent = copy.signature;
    assessmentElements.whyTitle.textContent = copy.why;
    assessmentElements.giftsTitle.textContent = copy.gifts;
    assessmentElements.supportTitle.textContent = copy.support;
    assessmentElements.restartButton.textContent = copy.takeAgain;
    assessmentElements.backHomeButton.textContent = copy.backHome;
    if (!state.questions.length && !state.showingResult) {
      assessmentElements.questionPrompt.textContent = copy.loading;
      assessmentElements.previousButton.textContent = copy.previous;
      assessmentElements.nextButton.textContent = copy.continue;
    }
  }

  async function initAssessment() {
    const response = await fetch("/api/questions");
    if (!response.ok) {
      throw new Error("question catalog failed to load");
    }

    state.questions = await response.json();
    state.index = clamp(state.index, 0, Math.max(0, state.questions.length - 1));

    if (state.showingResult && state.result) {
      renderResult(state.result);
      return;
    }

    if (state.showingResult && hasCompleteAnswers()) {
      await submit({ skipScroll: true, restoreMode: true });
      return;
    }

    renderAssessment();
  }

  function bindAssessmentEvents() {
    assessmentElements.previousButton.addEventListener("click", () => {
      state.index = Math.max(0, state.index - 1);
      persistAssessmentState();
      renderAssessment();
    });

    assessmentElements.nextButton.addEventListener("click", async () => {
      if (assessmentElements.nextButton.disabled) {
        return;
      }

      if (state.index === state.questions.length - 1) {
        await submit();
        return;
      }

      state.index += 1;
      persistAssessmentState();
      renderAssessment();
    });

    assessmentElements.restartButton.addEventListener("click", () => {
      state.answers = {};
      state.index = 0;
      state.result = null;
      state.showingResult = false;
      persistAssessmentState();
      assessmentElements.resultCard.classList.add("hidden");
      assessmentElements.questionCard.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
      renderAssessment();
    });
  }

  function renderAssessment() {
    if (state.showingResult && state.result) {
      renderResult(state.result);
      return;
    }

    renderQuestion();
  }

  function renderQuestion() {
    const question = state.questions[state.index];
    if (!question) {
      return;
    }

    const copy = COPY[currentLang].assessment;
    const localizedQuestion = localizeQuestion(question);
    const answeredCount = Object.keys(state.answers).length;
    const completion = Math.round((answeredCount / state.questions.length) * 100);
    const progressWidth = answeredCount === 0 ? 4 : completion;
    const hasAnswer = state.answers[question.id] != null;

    assessmentElements.resultCard.classList.add("hidden");
    assessmentElements.questionCard.classList.remove("hidden");
    assessmentElements.dimensionBadge.textContent =
      DIMENSION_NAMES[currentLang][question.dimension] || question.dimension;
    assessmentElements.questionIndex.textContent = String(state.index + 1).padStart(2, "0");
    assessmentElements.questionPrompt.textContent = localizedQuestion.prompt;
    assessmentElements.progressLabel.textContent = copy.progressLabel(
      state.index + 1,
      state.questions.length
    );
    assessmentElements.progressPercent.textContent =
      answeredCount === state.questions.length
        ? copy.readyForResult
        : copy.progressPercent(completion);
    assessmentElements.progressAnswered.textContent = copy.progressAnswered(
      answeredCount,
      state.questions.length
    );
    assessmentElements.progressBar.style.width = `${progressWidth}%`;
    assessmentElements.previousButton.disabled = state.index === 0;
    assessmentElements.nextButton.disabled = !hasAnswer;
    assessmentElements.previousButton.textContent = copy.previous;
    assessmentElements.nextButton.textContent =
      state.index === state.questions.length - 1 ? copy.seeResult : copy.continue;

    renderOptions(localizedQuestion, question.id);
  }

  function renderOptions(question, questionId) {
    const copy = COPY[currentLang].assessment;
    assessmentElements.optionList.innerHTML = "";

    question.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option-button button-reset";

      if (state.answers[questionId] === option.value) {
        button.classList.add("active");
      }

      const optionIndex = document.createElement("span");
      optionIndex.className = "option-index";
      optionIndex.textContent = copy.option(index + 1);

      const optionText = document.createElement("span");
      optionText.className = "option-text";
      optionText.textContent = option.label;

      button.appendChild(optionIndex);
      button.appendChild(optionText);
      button.addEventListener("click", () => {
        state.answers[questionId] = option.value;
        state.result = null;
        state.showingResult = false;
        persistAssessmentState();
        renderAssessment();
      });

      assessmentElements.optionList.appendChild(button);
    });
  }

  async function submit(options = {}) {
    const copy = COPY[currentLang].assessment;
    assessmentElements.nextButton.disabled = true;
    assessmentElements.nextButton.textContent = copy.scoring;

    const response = await fetch("/api/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: state.answers }),
    });

    const payload = await response.json();
    if (!response.ok) {
      assessmentElements.nextButton.disabled = false;
      assessmentElements.nextButton.textContent = copy.tryAgain;
      return;
    }

    state.result = payload;
    state.showingResult = true;
    persistAssessmentState();
    renderResult(payload);

    if (!options.skipScroll && !options.restoreMode) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function renderResult(payload) {
    const copy = COPY[currentLang].assessment;
    const localizedArchetype = localizeArchetype(payload.archetype);
    const localizedDimensions = payload.dimensions.map(localizeDimensionScore);

    assessmentElements.questionCard.classList.add("hidden");
    assessmentElements.resultCard.classList.remove("hidden");
    assessmentElements.resultTone.textContent = localizedArchetype.tone;
    assessmentElements.resultHeadline.textContent =
      currentLang === "zh" ? copy.resultHeadline : payload.narrative.headline;
    assessmentElements.resultName.textContent = localizedArchetype.name;
    assessmentElements.resultSubtitle.textContent = localizedArchetype.subtitle;
    assessmentElements.resultEssence.textContent = localizedArchetype.essence;
    assessmentElements.resultReflection.textContent =
      currentLang === "zh"
        ? copy.resultReflection(localizedArchetype)
        : payload.narrative.reflection;
    assessmentElements.resultSimilarity.textContent = `${payload.similarity}%`;
    assessmentElements.resultSignature.textContent = payload.signature;
    assessmentElements.resultFracture.textContent = localizedArchetype.fracture;
    assessmentElements.resultCaution.textContent = copy.resultCaution;

    if (payload.shadow_triggered) {
      assessmentElements.shadowBadge.classList.remove("hidden");
    } else {
      assessmentElements.shadowBadge.classList.add("hidden");
    }

    renderSimpleList(assessmentElements.resultGifts, localizedArchetype.gifts);
    renderSimpleList(assessmentElements.resultSupport, localizedArchetype.support);
    renderDimensionBars(localizedDimensions);
  }

  function renderSimpleList(container, values) {
    container.innerHTML = "";
    values.forEach((value) => {
      const item = document.createElement("li");
      item.textContent = value;
      container.appendChild(item);
    });
  }

  function renderDimensionBars(dimensions) {
    assessmentElements.dimensionBars.innerHTML = "";

    dimensions.forEach((dimension) => {
      const row = document.createElement("div");
      row.className = "dimension-item";

      const labelRow = document.createElement("div");
      labelRow.className = "dimension-label";

      const strong = document.createElement("strong");
      strong.textContent = dimension.label;

      const meta = document.createElement("span");
      meta.textContent = `${dimension.band} · ${dimension.total}/9`;

      labelRow.appendChild(strong);
      labelRow.appendChild(meta);

      const meter = document.createElement("div");
      meter.className = "dimension-meter";

      const meterFill = document.createElement("span");
      const width = Math.max(12, Math.min(100, (dimension.total / 9) * 100));
      meterFill.style.width = `${width}%`;
      meter.appendChild(meterFill);

      const note = document.createElement("p");
      note.className = "dimension-note";
      note.textContent = dimension.interpretation;

      row.appendChild(labelRow);
      row.appendChild(meter);
      row.appendChild(note);
      assessmentElements.dimensionBars.appendChild(row);
    });
  }

  function localizeQuestion(question) {
    if (currentLang !== "zh") {
      return question;
    }

    const translated = ZH_QUESTIONS[question.id];
    if (!translated) {
      return question;
    }

    return {
      ...question,
      prompt: translated.prompt,
      options: question.options.map((option, index) => ({
        ...option,
        label: translated.options[index] || option.label,
      })),
    };
  }

  function localizeArchetype(archetype) {
    if (currentLang !== "zh") {
      return {
        ...archetype,
        tone: titleCase(archetype.tone),
      };
    }

    return ZH_ARCHETYPES[archetype.slug] || archetype;
  }

  function localizeDimensionScore(dimension) {
    if (currentLang !== "zh") {
      return dimension;
    }

    return {
      ...dimension,
      label: DIMENSION_NAMES.zh[dimension.key] || dimension.label,
      band: BAND_LABELS.zh[dimension.band] || dimension.band,
      interpretation:
        (ZH_INTERPRETATIONS[dimension.key] && ZH_INTERPRETATIONS[dimension.key][dimension.band]) ||
        dimension.interpretation,
    };
  }

  function titleCase(value) {
    return value.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function hasCompleteAnswers() {
    return state.questions.length > 0 && Object.keys(state.answers).length === state.questions.length;
  }

  function restoreAssessmentState() {
    const raw = readLocalStorage(ASSESSMENT_STORAGE_KEY);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        state.answers = isPlainObject(parsed.answers) ? parsed.answers : {};
        state.index = Number.isInteger(parsed.index) ? parsed.index : 0;
        state.result = parsed.result && typeof parsed.result === "object" ? parsed.result : null;
        state.showingResult = Boolean(parsed.showingResult);
      }
    } catch (_error) {
      state.answers = {};
      state.index = 0;
      state.result = null;
      state.showingResult = false;
    }
  }

  function persistAssessmentState() {
    try {
      window.localStorage.setItem(
        ASSESSMENT_STORAGE_KEY,
        JSON.stringify({
          answers: state.answers,
          index: state.index,
          result: state.result,
          showingResult: state.showingResult,
        })
      );
    } catch (_error) {
      // no-op
    }
  }

  function isPlainObject(value) {
    return value != null && typeof value === "object" && !Array.isArray(value);
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  initAssessment().catch(() => {
    const copy = COPY[currentLang].assessment;
    assessmentElements.questionPrompt.textContent = copy.unavailableQuestion;
    assessmentElements.optionList.innerHTML = "";
    assessmentElements.progressPercent.textContent = copy.unavailableStatus;
    assessmentElements.progressAnswered.textContent = copy.unavailableHelp;
    assessmentElements.previousButton.textContent = copy.previous;
    assessmentElements.nextButton.textContent = copy.tryAgain;
  });
})();
