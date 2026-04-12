use std::collections::BTreeMap;

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize)]
pub struct Question {
    pub id: &'static str,
    pub dimension: &'static str,
    pub prompt: &'static str,
    pub options: [Choice; 3],
}

#[derive(Debug, Clone, Copy, Serialize)]
pub struct Choice {
    pub label: &'static str,
    pub value: u8,
}

#[derive(Debug, Clone, Copy, Serialize)]
pub struct Archetype {
    pub slug: &'static str,
    pub name: &'static str,
    pub subtitle: &'static str,
    pub tone: &'static str,
    pub signature: &'static str,
    pub shadow: bool,
    pub essence: &'static str,
    pub gifts: &'static [&'static str],
    pub fracture: &'static str,
    pub support: &'static [&'static str],
}

#[derive(Debug, Deserialize)]
pub struct ScoreRequest {
    pub answers: BTreeMap<String, u8>,
}

#[derive(Debug, Clone, Serialize)]
pub struct ScoreResponse {
    pub archetype: &'static Archetype,
    pub similarity: u8,
    pub signature: String,
    pub shadow_triggered: bool,
    pub dimensions: Vec<DimensionScore>,
    pub narrative: Narrative,
}

#[derive(Debug, Clone, Serialize)]
pub struct DimensionScore {
    pub key: &'static str,
    pub label: &'static str,
    pub total: u8,
    pub band: &'static str,
    pub interpretation: &'static str,
}

#[derive(Debug, Clone, Serialize)]
pub struct Narrative {
    pub headline: String,
    pub reflection: String,
    pub caution: String,
}

#[derive(Debug)]
pub enum ScoreError {
    MissingAnswers(Vec<&'static str>),
    InvalidAnswer { question_id: String, value: u8 },
}

impl ScoreError {
    pub fn message(&self) -> String {
        match self {
            Self::MissingAnswers(ids) => format!(
                "Assessment incomplete. Missing answers for: {}.",
                ids.join(", ")
            ),
            Self::InvalidAnswer { question_id, value } => {
                format!("Answer for `{question_id}` must be 1, 2, or 3. Received `{value}`.")
            }
        }
    }
}

const DIMENSIONS: [(&str, &str); 8] = [
    ("DRIVE", "Ambition"),
    ("BOUNDARY", "Boundary"),
    ("EXPOSURE", "Visibility"),
    ("VOLATILITY", "Intensity"),
    ("DISCIPLINE", "Discipline"),
    ("INTERPRETATION", "Meaning-Making"),
    ("ATTACHMENT", "Attachment"),
    ("INITIATIVE", "Initiative"),
];

pub const QUESTIONS: [Question; 24] = [
    Question {
        id: "drive_1",
        dimension: "DRIVE",
        prompt: "A high-prestige opportunity appears. Your first instinct is:",
        options: [
            Choice {
                label: "Ask whether I want the life that comes with it.",
                value: 1,
            },
            Choice {
                label: "Measure the upside, then decide with a cool head.",
                value: 2,
            },
            Choice {
                label: "Take the room before someone slower does.",
                value: 3,
            },
        ],
    },
    Question {
        id: "drive_2",
        dimension: "DRIVE",
        prompt: "When peers start accelerating, you usually:",
        options: [
            Choice {
                label: "Protect my pace. Not every race is mine.",
                value: 1,
            },
            Choice {
                label: "Notice it, recalibrate, then keep moving.",
                value: 2,
            },
            Choice {
                label: "Feel the heat immediately and push harder.",
                value: 3,
            },
        ],
    },
    Question {
        id: "drive_3",
        dimension: "DRIVE",
        prompt: "Recognition lands on someone else after shared work. You:",
        options: [
            Choice {
                label: "Shrug. Credit matters less than peace.",
                value: 1,
            },
            Choice {
                label: "Log it mentally and adjust next time.",
                value: 2,
            },
            Choice {
                label: "Feel it sharply. I should not be easy to overlook.",
                value: 3,
            },
        ],
    },
    Question {
        id: "boundary_1",
        dimension: "BOUNDARY",
        prompt: "Someone asks for more of you than is fair. You usually:",
        options: [
            Choice {
                label: "Say yes, then pay for it later.",
                value: 1,
            },
            Choice {
                label: "Negotiate. I can help, but not endlessly.",
                value: 2,
            },
            Choice {
                label: "Decline cleanly. My limits are not a debate.",
                value: 3,
            },
        ],
    },
    Question {
        id: "boundary_2",
        dimension: "BOUNDARY",
        prompt: "A friend keeps venting without changing anything. You:",
        options: [
            Choice {
                label: "Absorb it. I would rather carry it than disappoint them.",
                value: 1,
            },
            Choice {
                label: "Offer support, but name the pattern.",
                value: 2,
            },
            Choice {
                label: "Step back fast. Repetition is not intimacy.",
                value: 3,
            },
        ],
    },
    Question {
        id: "boundary_3",
        dimension: "BOUNDARY",
        prompt: "In conflict, your default is:",
        options: [
            Choice {
                label: "Self-edit until the room stays calm.",
                value: 1,
            },
            Choice {
                label: "Say the necessary thing without theatrics.",
                value: 2,
            },
            Choice {
                label: "Cut to the bone. Precision matters more than comfort.",
                value: 3,
            },
        ],
    },
    Question {
        id: "exposure_1",
        dimension: "EXPOSURE",
        prompt: "Before sharing something publicly, you:",
        options: [
            Choice {
                label: "Prefer not to. My interior life is not a feed.",
                value: 1,
            },
            Choice {
                label: "Share selectively if it adds something true.",
                value: 2,
            },
            Choice {
                label: "Shape the framing until the message lands exactly right.",
                value: 3,
            },
        ],
    },
    Question {
        id: "exposure_2",
        dimension: "EXPOSURE",
        prompt: "When you enter a new room, your energy is usually:",
        options: [
            Choice {
                label: "Observational. I let the room reveal itself first.",
                value: 1,
            },
            Choice {
                label: "Adaptive. I find the right register and settle in.",
                value: 2,
            },
            Choice {
                label: "Composed for impact. Presence is part of the work.",
                value: 3,
            },
        ],
    },
    Question {
        id: "exposure_3",
        dimension: "EXPOSURE",
        prompt: "Your online self compared with your offline self is:",
        options: [
            Choice {
                label: "Smaller. I reveal less than people assume.",
                value: 1,
            },
            Choice {
                label: "Close enough. Some editing, not a costume.",
                value: 2,
            },
            Choice {
                label: "Sharper. I know how to direct attention when it matters.",
                value: 3,
            },
        ],
    },
    Question {
        id: "volatility_1",
        dimension: "VOLATILITY",
        prompt: "A minor slight from the wrong person can:",
        options: [
            Choice {
                label: "Pass through me by nightfall.",
                value: 1,
            },
            Choice {
                label: "Stay in mind until I make sense of it.",
                value: 2,
            },
            Choice {
                label: "Light the whole internal system on fire.",
                value: 3,
            },
        ],
    },
    Question {
        id: "volatility_2",
        dimension: "VOLATILITY",
        prompt: "When emotion arrives, you tend to:",
        options: [
            Choice {
                label: "Contain it. The feeling can wait.",
                value: 1,
            },
            Choice {
                label: "Study it until it becomes legible.",
                value: 2,
            },
            Choice {
                label: "Move with it immediately. Delay feels false.",
                value: 3,
            },
        ],
    },
    Question {
        id: "volatility_3",
        dimension: "VOLATILITY",
        prompt: "People who know you well would say your emotional weather is:",
        options: [
            Choice {
                label: "Even. You rarely see the storm from outside.",
                value: 1,
            },
            Choice {
                label: "Textured. It changes, but with some warning.",
                value: 2,
            },
            Choice {
                label: "Electric. Beautiful, alive, and hard to ignore.",
                value: 3,
            },
        ],
    },
    Question {
        id: "discipline_1",
        dimension: "DISCIPLINE",
        prompt: "A system only works for you if it is:",
        options: [
            Choice {
                label: "Loose enough that I do not feel trapped by it.",
                value: 1,
            },
            Choice {
                label: "Practical enough to survive real life.",
                value: 2,
            },
            Choice {
                label: "Relentless. Structure buys me freedom.",
                value: 3,
            },
        ],
    },
    Question {
        id: "discipline_2",
        dimension: "DISCIPLINE",
        prompt: "When a streak breaks, you usually:",
        options: [
            Choice {
                label: "Let it go. Ritual should not become punishment.",
                value: 1,
            },
            Choice {
                label: "Reset soon, without dramatizing it.",
                value: 2,
            },
            Choice {
                label: "Rebuild immediately. Slippage is expensive.",
                value: 3,
            },
        ],
    },
    Question {
        id: "discipline_3",
        dimension: "DISCIPLINE",
        prompt: "Your unfinished projects are mostly:",
        options: [
            Choice {
                label: "Proof that curiosity outruns maintenance.",
                value: 1,
            },
            Choice {
                label: "A mix of decent instincts and imperfect timing.",
                value: 2,
            },
            Choice {
                label: "Rare. I do not start lightly, and I do not like open loops.",
                value: 3,
            },
        ],
    },
    Question {
        id: "interpretation_1",
        dimension: "INTERPRETATION",
        prompt: "Someone gives you vague feedback. Your mind goes to:",
        options: [
            Choice {
                label: "The kindest plausible reading.",
                value: 1,
            },
            Choice {
                label: "Several readings at once, then I narrow them.",
                value: 2,
            },
            Choice {
                label: "What they meant but did not want to say aloud.",
                value: 3,
            },
        ],
    },
    Question {
        id: "interpretation_2",
        dimension: "INTERPRETATION",
        prompt: "A beautiful story about a person makes you:",
        options: [
            Choice {
                label: "Want to believe it unless evidence says otherwise.",
                value: 1,
            },
            Choice {
                label: "Enjoy it, but keep one eyebrow raised.",
                value: 2,
            },
            Choice {
                label: "Look for the edit, omission, or incentive structure.",
                value: 3,
            },
        ],
    },
    Question {
        id: "interpretation_3",
        dimension: "INTERPRETATION",
        prompt: "Your strongest pattern-reading skill is usually:",
        options: [
            Choice {
                label: "Knowing when not to over-interpret noise.",
                value: 1,
            },
            Choice {
                label: "Separating signal from mood.",
                value: 2,
            },
            Choice {
                label: "Seeing power dynamics before they become obvious.",
                value: 3,
            },
        ],
    },
    Question {
        id: "attachment_1",
        dimension: "ATTACHMENT",
        prompt: "When you start caring about someone, you usually:",
        options: [
            Choice {
                label: "Protect autonomy first. Closeness should not consume me.",
                value: 1,
            },
            Choice {
                label: "Build gradually. Trust should have architecture.",
                value: 2,
            },
            Choice {
                label: "Move closer fast. Distance feels like uncertainty.",
                value: 3,
            },
        ],
    },
    Question {
        id: "attachment_2",
        dimension: "ATTACHMENT",
        prompt: "Silence from someone important for a day feels like:",
        options: [
            Choice {
                label: "Normal. People have inner lives.",
                value: 1,
            },
            Choice {
                label: "Noticeable, but I do not start writing fiction.",
                value: 2,
            },
            Choice {
                label: "A whole narrative trying to form in my chest.",
                value: 3,
            },
        ],
    },
    Question {
        id: "attachment_3",
        dimension: "ATTACHMENT",
        prompt: "In relationships, you are most likely to fear:",
        options: [
            Choice {
                label: "Being absorbed.",
                value: 1,
            },
            Choice {
                label: "Being misunderstood.",
                value: 2,
            },
            Choice {
                label: "Being left while still fully open.",
                value: 3,
            },
        ],
    },
    Question {
        id: "initiative_1",
        dimension: "INITIATIVE",
        prompt: "A hard conversation has to happen. You typically:",
        options: [
            Choice {
                label: "Delay until the shape becomes unavoidable.",
                value: 1,
            },
            Choice {
                label: "Prepare, then handle it at the right moment.",
                value: 2,
            },
            Choice {
                label: "Do it now. Drag is worse than impact.",
                value: 3,
            },
        ],
    },
    Question {
        id: "initiative_2",
        dimension: "INITIATIVE",
        prompt: "When a good idea lands, you:",
        options: [
            Choice {
                label: "Let it breathe. If it survives, it was real.",
                value: 1,
            },
            Choice {
                label: "Sketch the next moves and test viability.",
                value: 2,
            },
            Choice {
                label: "Move before doubt can turn elegant.",
                value: 3,
            },
        ],
    },
    Question {
        id: "initiative_3",
        dimension: "INITIATIVE",
        prompt: "Your relationship to momentum is:",
        options: [
            Choice {
                label: "Intermittent. I start when the internal weather clears.",
                value: 1,
            },
            Choice {
                label: "Intentional. I prefer decisive but measured motion.",
                value: 2,
            },
            Choice {
                label: "Hungry. Action sharpens me.",
                value: 3,
            },
        ],
    },
];

pub const ARCHETYPES: [Archetype; 14] = [
    Archetype {
        slug: "quiet-monarch",
        name: "Quiet Monarch",
        subtitle: "private authority, measured heat",
        tone: "composed",
        signature: "M-H-M-L-H-M-L-M",
        shadow: false,
        essence: "You do not chase the center of the room. You make your own center and let people feel the gravity.",
        gifts: &["steady authority", "clean boundaries", "taste without exhibitionism"],
        fracture: "You can become so self-governed that help starts to feel like interference.",
        support: &["delegate before resentment appears", "make praise audible, not assumed", "let intimacy see the uncurated draft"],
    },
    Archetype {
        slug: "velvet-strategist",
        name: "Velvet Strategist",
        subtitle: "ambition wrapped in restraint",
        tone: "surgical",
        signature: "H-H-M-L-H-H-L-M",
        shadow: false,
        essence: "You are not loud about wanting power. You simply arrange yourself so it becomes difficult to deny you.",
        gifts: &["long-game thinking", "political sensitivity", "high standards under pressure"],
        fracture: "Every room starts to look like a map of leverage if you do not protect your softness on purpose.",
        support: &["name the human cost early", "do one thing badly in public", "separate strategy from identity"],
    },
    Archetype {
        slug: "glass-flame",
        name: "Glass Flame",
        subtitle: "radiant, persuasive, combustible",
        tone: "electric",
        signature: "M-M-H-H-M-M-H-H",
        shadow: false,
        essence: "You are easy to feel before you are easy to explain. People remember the weather you bring.",
        gifts: &["charisma", "creative ignition", "emotional courage"],
        fracture: "Intensity can look like truth to you even when it is only velocity.",
        support: &["slow one major decision per week", "build recovery like a ritual", "do not let chemistry outrun evidence"],
    },
    Archetype {
        slug: "silver-mirror",
        name: "Silver Mirror",
        subtitle: "attuned, receptive, dangerously observant",
        tone: "luminous",
        signature: "M-L-M-M-L-M-H-M",
        shadow: false,
        essence: "You notice the subtle shift, the swallowed sentence, the difference between a story and a confession.",
        gifts: &["social perception", "careful listening", "relational intelligence"],
        fracture: "You can become a reflection surface for everyone except yourself.",
        support: &["say what you want before asking what others need", "practice direct asks", "treat your body as data, not background"],
    },
    Archetype {
        slug: "midnight-architect",
        name: "Midnight Architect",
        subtitle: "systems for feelings, blueprints for chaos",
        tone: "precise",
        signature: "M-M-L-M-H-H-L-M",
        shadow: false,
        essence: "You feel safer once the pattern appears. Structure is how you turn uncertainty into something usable.",
        gifts: &["analysis", "systems thinking", "reliable complexity handling"],
        fracture: "Not every living problem wants to become a model.",
        support: &["test intuition before deleting it", "leave space for unfinished conversations", "share drafts sooner"],
    },
    Archetype {
        slug: "field-medic",
        name: "Field Medic",
        subtitle: "calm under pressure, costly to self",
        tone: "grounded",
        signature: "M-L-L-M-H-L-H-M",
        shadow: false,
        essence: "In the middle of emotional weather, you become startlingly useful. People lean toward your steadiness.",
        gifts: &["containment", "practical care", "responsibility that comforts"],
        fracture: "Your competence attracts dependence faster than your needs get voiced.",
        support: &["rescue less, coach more", "rest before collapse", "differentiate being needed from being loved"],
    },
    Archetype {
        slug: "ritual-machine",
        name: "Ritual Machine",
        subtitle: "discipline with a pulse",
        tone: "relentless",
        signature: "M-M-M-M-H-H-L-M",
        shadow: false,
        essence: "You trust process more than mood. Your life becomes legible when it can be repeated on purpose.",
        gifts: &["follow-through", "focus", "quiet operational excellence"],
        fracture: "Control can start masquerading as safety.",
        support: &["schedule play without optimizing it", "let one day stay messy", "measure outcomes, not only obedience"],
    },
    Archetype {
        slug: "borderless-dreamer",
        name: "Borderless Dreamer",
        subtitle: "porous, imaginative, difficult to pin down",
        tone: "ethereal",
        signature: "L-L-M-H-M-M-L-L",
        shadow: false,
        essence: "You move by atmosphere, possibility, and subtle pull. Life becomes vivid when it still has air around it.",
        gifts: &["imagination", "gentle openness", "creative permeability"],
        fracture: "Without edges, your gifts leak into other people's agendas.",
        support: &["decide one non-negotiable before entering the room", "finish one small thing daily", "protect solitude from pure drift"],
    },
    Archetype {
        slug: "storm-carrier",
        name: "Storm Carrier",
        subtitle: "the one who feels first and learns later",
        tone: "volatile",
        signature: "M-H-M-H-M-L-H-H",
        shadow: false,
        essence: "You have a rare capacity for force, devotion, and movement. Nothing about you is half-lit.",
        gifts: &["courage", "devotion", "momentum under risk"],
        fracture: "A storm can feel honest while still being misdirected.",
        support: &["name the trigger before the target", "delay the text, not the truth", "train your exits"],
    },
    Archetype {
        slug: "charm-economy",
        name: "Charm Economy",
        subtitle: "socially intelligent, attention fluent",
        tone: "polished",
        signature: "M-H-H-M-M-M-H-M",
        shadow: false,
        essence: "You understand that perception shapes access. You know how a mood, line, or image can reposition a whole exchange.",
        gifts: &["social timing", "presentation", "relationship brokerage"],
        fracture: "If every interaction becomes curation, sincerity starts feeling inefficient.",
        support: &["let one conversation stay unperformed", "trade polish for accuracy", "notice when approval becomes fuel"],
    },
    Archetype {
        slug: "loyal-sentinel",
        name: "Loyal Sentinel",
        subtitle: "slow to open, hard to move, built for endurance",
        tone: "anchored",
        signature: "L-M-M-L-H-M-M-L",
        shadow: false,
        essence: "You are difficult to impress and difficult to shake. Once you commit, you make steadiness feel luxurious.",
        gifts: &["loyalty", "consistency", "protective instinct"],
        fracture: "Guarding the perimeter can become a full-time identity.",
        support: &["update people before they have to guess", "risk delight, not only stability", "make room for revision"],
    },
    Archetype {
        slug: "soft-provocateur",
        name: "Soft Provocateur",
        subtitle: "gentle surface, disruptive questions",
        tone: "subtle",
        signature: "M-L-M-H-M-H-M-H",
        shadow: false,
        essence: "You rarely dominate a room, but you change its temperature by asking what everyone else edited out.",
        gifts: &["fresh framing", "emotional intelligence", "quiet bravery"],
        fracture: "You can provoke insight without admitting your own stake in it.",
        support: &["own your desire in the room", "stay after the disruption", "practice closure, not only revelation"],
    },
    Archetype {
        slug: "hollow-oracle",
        name: "Hollow Oracle",
        subtitle: "sees through everything, trusts almost nothing",
        tone: "shadow",
        signature: "L-H-H-L-H-H-L-H",
        shadow: true,
        essence: "Your pattern recognition is extreme. You can read the hidden arrangement quickly, but the cost is that innocence stops feeling accessible.",
        gifts: &["sharp discernment", "x-ray vision for motive", "defensive intelligence"],
        fracture: "When all interpretation becomes suspicion, even love begins to look staged.",
        support: &["collect evidence for safety, not total control", "test one generous reading", "share fear before sarcasm"],
    },
    Archetype {
        slug: "crowned-ember",
        name: "Crowned Ember",
        subtitle: "royal standards, scorched nervous system",
        tone: "shadow",
        signature: "H-H-M-H-H-M-H-H",
        shadow: true,
        essence: "You burn toward excellence with real force. The trouble is that everything starts to feel urgent enough to sacrifice yourself for.",
        gifts: &["drive", "magnetism", "high-voltage execution"],
        fracture: "You can confuse exhaustion with significance and attention with love.",
        support: &["protect recovery like a strategic asset", "let one ambition stay unfinished overnight", "seek witnesses, not just audiences"],
    },
];

pub fn questions() -> &'static [Question] {
    &QUESTIONS
}

pub fn score(request: ScoreRequest) -> Result<ScoreResponse, ScoreError> {
    let mut missing = Vec::new();
    let mut totals = BTreeMap::new();
    for (key, _) in DIMENSIONS {
        totals.insert(key, 0_u8);
    }

    for question in QUESTIONS {
        let Some(value) = request.answers.get(question.id) else {
            missing.push(question.id);
            continue;
        };
        if !matches!(value, 1..=3) {
            return Err(ScoreError::InvalidAnswer {
                question_id: question.id.to_string(),
                value: *value,
            });
        }
        *totals
            .get_mut(question.dimension)
            .expect("dimension exists") += *value;
    }

    if !missing.is_empty() {
        return Err(ScoreError::MissingAnswers(missing));
    }

    let signature_bands = DIMENSIONS
        .iter()
        .map(|(key, _)| band_letter(*totals.get(key).expect("dimension total exists")))
        .collect::<Vec<_>>();

    let signature = signature_bands.join("-");
    let archetype = nearest_archetype(&signature);
    let distance = signature_distance(&signature, archetype.signature);
    let similarity = (((16 - distance) as f32 / 16.0) * 100.0).round() as u8;

    let dimensions = DIMENSIONS
        .iter()
        .map(|(key, label)| {
            let total = *totals.get(key).expect("dimension total exists");
            let band = band_label(total);
            DimensionScore {
                key,
                label,
                total,
                band,
                interpretation: interpretation(key, band),
            }
        })
        .collect::<Vec<_>>();

    let narrative = Narrative {
        headline: format!("{} is your dominant Vincent pattern.", archetype.name),
        reflection: format!(
            "Your profile concentrates around {}. The model reads you as someone with {}",
            archetype.subtitle, archetype.essence.to_lowercase()
        ),
        caution: format!(
            "{} This assessment is reflective, not clinical; treat it as a sharp lens, not a diagnosis.",
            archetype.fracture
        ),
    };

    Ok(ScoreResponse {
        archetype,
        similarity,
        signature,
        shadow_triggered: archetype.shadow,
        dimensions,
        narrative,
    })
}

fn band_letter(total: u8) -> &'static str {
    match total {
        0..=4 => "L",
        5..=6 => "M",
        _ => "H",
    }
}

fn band_label(total: u8) -> &'static str {
    match total {
        0..=4 => "Low",
        5..=6 => "Medium",
        _ => "High",
    }
}

fn band_value(band: &str) -> i16 {
    match band {
        "Low" | "L" => 1,
        "Medium" | "M" => 2,
        "High" | "H" => 3,
        _ => 2,
    }
}

fn nearest_archetype(signature: &str) -> &'static Archetype {
    ARCHETYPES
        .iter()
        .min_by_key(|archetype| signature_distance(signature, archetype.signature))
        .expect("archetypes configured")
}

fn signature_distance(left: &str, right: &str) -> i16 {
    left.split('-')
        .zip(right.split('-'))
        .map(|(a, b)| (band_value(a) - band_value(b)).abs())
        .sum()
}

fn interpretation(dimension: &str, band: &str) -> &'static str {
    match (dimension, band) {
        ("DRIVE", "Low") => "You protect desire from becoming a performance obligation.",
        ("DRIVE", "Medium") => "You want impact, but not at the price of self-erasure.",
        ("DRIVE", "High") => "You feel the hierarchy instantly and want agency inside it.",
        ("BOUNDARY", "Low") => {
            "Your first move is accommodation; your body pays the invoice later."
        }
        ("BOUNDARY", "Medium") => "You can flex without losing the thread of yourself.",
        ("BOUNDARY", "High") => "Your limits are crisp, and sometimes colder than you intend.",
        ("EXPOSURE", "Low") => "Privacy is how you keep your interior signal clean.",
        ("EXPOSURE", "Medium") => "You know the difference between concealment and curation.",
        ("EXPOSURE", "High") => {
            "You understand staging, influence, and the economics of perception."
        }
        ("VOLATILITY", "Low") => "Feeling is present, but rarely allowed to become theater.",
        ("VOLATILITY", "Medium") => "Emotion moves through you with texture rather than chaos.",
        ("VOLATILITY", "High") => "You experience life at high voltage and rarely in grayscale.",
        ("DISCIPLINE", "Low") => "Freedom matters enough that systems can feel suspicious.",
        ("DISCIPLINE", "Medium") => "You can sustain effort when the structure still feels human.",
        ("DISCIPLINE", "High") => "You trust ritual to hold what mood cannot.",
        ("INTERPRETATION", "Low") => {
            "You resist paranoid over-reading and preserve room for grace."
        }
        ("INTERPRETATION", "Medium") => {
            "You read nuance without automatically converting it into danger."
        }
        ("INTERPRETATION", "High") => "You see subtext fast, especially when power is involved.",
        ("ATTACHMENT", "Low") => "Autonomy is your first language in love.",
        ("ATTACHMENT", "Medium") => "You want connection that can withstand reality.",
        ("ATTACHMENT", "High") => "Closeness is vivid for you; absence can become a story quickly.",
        ("INITIATIVE", "Low") => "You move when internal certainty forms, not before.",
        ("INITIATIVE", "Medium") => "You favor deliberate motion over dramatic starts.",
        ("INITIATIVE", "High") => "Action is how you create clarity, not just express it.",
        _ => "This dimension is still being calibrated.",
    }
}

#[cfg(test)]
mod tests {
    use super::{score, ScoreRequest, QUESTIONS};
    use std::collections::BTreeMap;

    #[test]
    fn score_requires_complete_answers() {
        let answers = BTreeMap::new();
        let result = score(ScoreRequest { answers });
        assert!(result.is_err());
    }

    #[test]
    fn score_rejects_invalid_answer_values() {
        let mut answers = BTreeMap::new();
        for question in QUESTIONS {
            answers.insert(question.id.to_string(), 1);
        }
        answers.insert("drive_1".to_string(), 9);
        let result = score(ScoreRequest { answers });
        assert!(result.is_err());
    }

    #[test]
    fn score_returns_an_archetype() {
        let mut answers = BTreeMap::new();
        for question in QUESTIONS {
            let value = match question.dimension {
                "DRIVE" | "DISCIPLINE" | "INITIATIVE" => 3,
                "BOUNDARY" | "INTERPRETATION" => 2,
                _ => 1,
            };
            answers.insert(question.id.to_string(), value);
        }
        let result = score(ScoreRequest { answers }).expect("assessment should score");
        assert!(!result.archetype.name.is_empty());
        assert_eq!(result.dimensions.len(), 8);
    }
}
