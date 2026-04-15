use std::collections::BTreeMap;

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, Serialize)]
pub struct Choice {
    pub label: &'static str,
    pub value: u8,
}

#[derive(Debug, Clone, Copy, Serialize)]
pub struct Question {
    pub id: &'static str,
    pub dimension: &'static str,
    pub prompt: &'static str,
    pub reverse_keyed: bool,
    pub options: [Choice; 5],
}

#[derive(Debug, Deserialize)]
pub struct ScoreRequest {
    pub answers: BTreeMap<String, u8>,
}

#[derive(Debug, Clone, Serialize)]
pub struct ScoreResponse {
    pub constructs: Vec<ConstructScore>,
    pub item_count: usize,
    pub response_scale: &'static str,
    pub note: &'static str,
}

#[derive(Debug, Clone, Serialize)]
pub struct ConstructScore {
    pub key: &'static str,
    pub label: &'static str,
    pub raw_total: u8,
    pub mean_score: f32,
    pub display_band: &'static str,
    pub interpretation: &'static str,
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
            Self::InvalidAnswer { question_id, value } => format!(
                "Answer for `{question_id}` must be 1, 2, 3, 4, or 5. Received `{value}`."
            ),
        }
    }
}

#[derive(Debug, Clone, Copy)]
struct Construct {
    key: &'static str,
    label: &'static str,
}

const LIKERT_OPTIONS: [Choice; 5] = [
    Choice {
        label: "Strongly disagree",
        value: 1,
    },
    Choice {
        label: "Disagree",
        value: 2,
    },
    Choice {
        label: "Neither / unsure",
        value: 3,
    },
    Choice {
        label: "Agree",
        value: 4,
    },
    Choice {
        label: "Strongly agree",
        value: 5,
    },
];

const CONSTRUCTS: [Construct; 7] = [
    Construct {
        key: "ASSERTIVE_EXTRAVERSION",
        label: "Assertive Extraversion",
    },
    Construct {
        key: "TRUSTING_AGREEABLENESS",
        label: "Trusting Agreeableness",
    },
    Construct {
        key: "PRODUCTIVE_CONSCIENTIOUSNESS",
        label: "Productive Conscientiousness",
    },
    Construct {
        key: "NEGATIVE_EMOTIONALITY",
        label: "Negative Emotionality",
    },
    Construct {
        key: "OPEN_MINDEDNESS",
        label: "Open-Mindedness",
    },
    Construct {
        key: "ATTACHMENT_ANXIETY",
        label: "Attachment Anxiety",
    },
    Construct {
        key: "ATTACHMENT_AVOIDANCE",
        label: "Attachment Avoidance",
    },
];

pub const QUESTIONS: [Question; 28] = [
    Question {
        id: "assertive_extraversion_1",
        dimension: "ASSERTIVE_EXTRAVERSION",
        prompt: "I speak up quickly when a group needs direction.",
        reverse_keyed: false,
        options: LIKERT_OPTIONS,
    },
    Question {
        id: "assertive_extraversion_2",
        dimension: "ASSERTIVE_EXTRAVERSION",
        prompt: "I find it easy to start conversations with unfamiliar people.",
        reverse_keyed: false,
        options: LIKERT_OPTIONS,
    },
    Question {
        id: "assertive_extraversion_3",
        dimension: "ASSERTIVE_EXTRAVERSION",
        prompt: "I usually hold back even when I have something useful to add.",
        reverse_keyed: true,
        options: LIKERT_OPTIONS,
    },
    Question {
        id: "assertive_extraversion_4",
        dimension: "ASSERTIVE_EXTRAVERSION",
        prompt: "Being visible in a group tends to energize me.",
        reverse_keyed: false,
        options: LIKERT_OPTIONS,
    },
    Question {
        id: "trusting_agreeableness_1",
        dimension: "TRUSTING_AGREEABLENESS",
        prompt: "I usually assume good intent until I see evidence otherwise.",
        reverse_keyed: false,
        options: LIKERT_OPTIONS,
    },
    Question {
        id: "trusting_agreeableness_2",
        dimension: "TRUSTING_AGREEABLENESS",
        prompt: "I try to stay considerate even when I disagree strongly.",
        reverse_keyed: false,
        options: LIKERT_OPTIONS,
    },
    Question {
        id: "trusting_agreeableness_3",
        dimension: "TRUSTING_AGREEABLENESS",
        prompt: "I expect people to exploit softness if they get the chance.",
        reverse_keyed: true,
        options: LIKERT_OPTIONS,
    },
    Question {
        id: "trusting_agreeableness_4",
        dimension: "TRUSTING_AGREEABLENESS",
        prompt: "I can be direct without becoming harsh.",
        reverse_keyed: false,
        options: LIKERT_OPTIONS,
    },
    Question {
        id: "productive_conscientiousness_1",
        dimension: "PRODUCTIVE_CONSCIENTIOUSNESS",
        prompt: "I make concrete plans before important work begins.",
        reverse_keyed: false,
        options: LIKERT_OPTIONS,
    },
    Question {
        id: "productive_conscientiousness_2",
        dimension: "PRODUCTIVE_CONSCIENTIOUSNESS",
        prompt: "I finish routine tasks even when I am bored.",
        reverse_keyed: false,
        options: LIKERT_OPTIONS,
    },
    Question {
        id: "productive_conscientiousness_3",
        dimension: "PRODUCTIVE_CONSCIENTIOUSNESS",
        prompt: "My priorities change faster than my follow-through.",
        reverse_keyed: true,
        options: LIKERT_OPTIONS,
    },
    Question {
        id: "productive_conscientiousness_4",
        dimension: "PRODUCTIVE_CONSCIENTIOUSNESS",
        prompt: "I keep promises to myself even when nobody is watching.",
        reverse_keyed: false,
        options: LIKERT_OPTIONS,
    },
    Question {
        id: "negative_emotionality_1",
        dimension: "NEGATIVE_EMOTIONALITY",
        prompt: "Small setbacks can stay with me longer than I want.",
        reverse_keyed: false,
        options: LIKERT_OPTIONS,
    },
    Question {
        id: "negative_emotionality_2",
        dimension: "NEGATIVE_EMOTIONALITY",
        prompt: "My mood shifts quickly when I am under pressure.",
        reverse_keyed: false,
        options: LIKERT_OPTIONS,
    },
    Question {
        id: "negative_emotionality_3",
        dimension: "NEGATIVE_EMOTIONALITY",
        prompt: "I recover quickly after an upsetting interaction.",
        reverse_keyed: true,
        options: LIKERT_OPTIONS,
    },
    Question {
        id: "negative_emotionality_4",
        dimension: "NEGATIVE_EMOTIONALITY",
        prompt: "I start worrying about problems before they fully arrive.",
        reverse_keyed: false,
        options: LIKERT_OPTIONS,
    },
    Question {
        id: "open_mindedness_1",
        dimension: "OPEN_MINDEDNESS",
        prompt: "New ideas energize me even before I know whether they will work.",
        reverse_keyed: false,
        options: LIKERT_OPTIONS,
    },
    Question {
        id: "open_mindedness_2",
        dimension: "OPEN_MINDEDNESS",
        prompt: "I like approaching the same problem from several different angles.",
        reverse_keyed: false,
        options: LIKERT_OPTIONS,
    },
    Question {
        id: "open_mindedness_3",
        dimension: "OPEN_MINDEDNESS",
        prompt: "I prefer familiar methods over experimentation.",
        reverse_keyed: true,
        options: LIKERT_OPTIONS,
    },
    Question {
        id: "open_mindedness_4",
        dimension: "OPEN_MINDEDNESS",
        prompt: "Art, language, or design often changes how I think.",
        reverse_keyed: false,
        options: LIKERT_OPTIONS,
    },
    Question {
        id: "attachment_anxiety_1",
        dimension: "ATTACHMENT_ANXIETY",
        prompt: "When someone I care about goes quiet, I start to worry about what it means.",
        reverse_keyed: false,
        options: LIKERT_OPTIONS,
    },
    Question {
        id: "attachment_anxiety_2",
        dimension: "ATTACHMENT_ANXIETY",
        prompt: "I need a lot of reassurance to feel secure in close relationships.",
        reverse_keyed: false,
        options: LIKERT_OPTIONS,
    },
    Question {
        id: "attachment_anxiety_3",
        dimension: "ATTACHMENT_ANXIETY",
        prompt: "I worry that people I love may pull away without warning.",
        reverse_keyed: false,
        options: LIKERT_OPTIONS,
    },
    Question {
        id: "attachment_anxiety_4",
        dimension: "ATTACHMENT_ANXIETY",
        prompt: "Uncertainty in a close relationship does not unsettle me much.",
        reverse_keyed: true,
        options: LIKERT_OPTIONS,
    },
    Question {
        id: "attachment_avoidance_1",
        dimension: "ATTACHMENT_AVOIDANCE",
        prompt: "I get uncomfortable when someone wants more emotional closeness than I do.",
        reverse_keyed: false,
        options: LIKERT_OPTIONS,
    },
    Question {
        id: "attachment_avoidance_2",
        dimension: "ATTACHMENT_AVOIDANCE",
        prompt: "Depending on other people feels risky to me.",
        reverse_keyed: false,
        options: LIKERT_OPTIONS,
    },
    Question {
        id: "attachment_avoidance_3",
        dimension: "ATTACHMENT_AVOIDANCE",
        prompt: "I keep important feelings to myself even in close relationships.",
        reverse_keyed: false,
        options: LIKERT_OPTIONS,
    },
    Question {
        id: "attachment_avoidance_4",
        dimension: "ATTACHMENT_AVOIDANCE",
        prompt: "Letting someone see my emotional needs feels difficult.",
        reverse_keyed: false,
        options: LIKERT_OPTIONS,
    },
];

pub fn questions() -> &'static [Question] {
    &QUESTIONS
}

pub fn score(request: ScoreRequest) -> Result<ScoreResponse, ScoreError> {
    let mut missing = Vec::new();
    let mut totals = BTreeMap::new();

    for construct in CONSTRUCTS {
        totals.insert(construct.key, 0_u8);
    }

    for question in QUESTIONS {
        let Some(value) = request.answers.get(question.id) else {
            missing.push(question.id);
            continue;
        };

        if !matches!(value, 1..=5) {
            return Err(ScoreError::InvalidAnswer {
                question_id: question.id.to_string(),
                value: *value,
            });
        }

        let scored = if question.reverse_keyed {
            6 - *value
        } else {
            *value
        };

        *totals
            .get_mut(question.dimension)
            .expect("construct exists") += scored;
    }

    if !missing.is_empty() {
        return Err(ScoreError::MissingAnswers(missing));
    }

    let constructs = CONSTRUCTS
        .iter()
        .map(|construct| {
            let raw_total = *totals.get(construct.key).expect("construct total exists");
            let mean_score = raw_total as f32 / 4.0;
            let display_band = display_band(mean_score);

            ConstructScore {
                key: construct.key,
                label: construct.label,
                raw_total,
                mean_score,
                display_band,
                interpretation: interpretation(construct.key, display_band),
            }
        })
        .collect::<Vec<_>>();

    Ok(ScoreResponse {
        constructs,
        item_count: QUESTIONS.len(),
        response_scale: "5-point agreement",
        note: "Vincent now returns continuous construct scores first. Any profile label should be treated as a reflective summary rather than a diagnostic category.",
    })
}

fn display_band(mean_score: f32) -> &'static str {
    if mean_score < 1.8 {
        "Mostly disagree"
    } else if mean_score < 2.6 {
        "Somewhat disagree"
    } else if mean_score < 3.4 {
        "Mixed"
    } else if mean_score < 4.2 {
        "Somewhat agree"
    } else {
        "Mostly agree"
    }
}

fn interpretation(construct: &str, band: &str) -> &'static str {
    match (construct, band) {
        ("ASSERTIVE_EXTRAVERSION", "Mostly disagree")
        | ("ASSERTIVE_EXTRAVERSION", "Somewhat disagree") => {
            "You tend to conserve social energy and may wait before stepping into the center of a room."
        }
        ("ASSERTIVE_EXTRAVERSION", "Mixed") => {
            "You can step forward when needed without needing constant visibility."
        }
        ("ASSERTIVE_EXTRAVERSION", "Somewhat agree")
        | ("ASSERTIVE_EXTRAVERSION", "Mostly agree") => {
            "You tend to move toward visibility, participation, and interpersonal impact."
        }
        ("TRUSTING_AGREEABLENESS", "Mostly disagree")
        | ("TRUSTING_AGREEABLENESS", "Somewhat disagree") => {
            "You may protect yourself by reading threat or leverage into relationships early."
        }
        ("TRUSTING_AGREEABLENESS", "Mixed") => {
            "You can stay warm and direct without assuming everyone is either safe or dangerous."
        }
        ("TRUSTING_AGREEABLENESS", "Somewhat agree")
        | ("TRUSTING_AGREEABLENESS", "Mostly agree") => {
            "You tend to lead with trust, cooperation, and interpersonal softness."
        }
        ("PRODUCTIVE_CONSCIENTIOUSNESS", "Mostly disagree")
        | ("PRODUCTIVE_CONSCIENTIOUSNESS", "Somewhat disagree") => {
            "You may prefer flexibility over structure, even when that makes follow-through uneven."
        }
        ("PRODUCTIVE_CONSCIENTIOUSNESS", "Mixed") => {
            "You can work with structure without becoming fully ruled by it."
        }
        ("PRODUCTIVE_CONSCIENTIOUSNESS", "Somewhat agree")
        | ("PRODUCTIVE_CONSCIENTIOUSNESS", "Mostly agree") => {
            "You tend to rely on planning, consistency, and self-directed follow-through."
        }
        ("NEGATIVE_EMOTIONALITY", "Mostly disagree")
        | ("NEGATIVE_EMOTIONALITY", "Somewhat disagree") => {
            "Stress and emotional setbacks are less likely to linger or escalate quickly for you."
        }
        ("NEGATIVE_EMOTIONALITY", "Mixed") => {
            "You seem able to feel pressure without being dominated by it."
        }
        ("NEGATIVE_EMOTIONALITY", "Somewhat agree")
        | ("NEGATIVE_EMOTIONALITY", "Mostly agree") => {
            "You may feel threat, worry, or emotional shifts with unusual intensity or persistence."
        }
        ("OPEN_MINDEDNESS", "Mostly disagree") | ("OPEN_MINDEDNESS", "Somewhat disagree") => {
            "You may prefer familiar tools and proven routes over novelty for its own sake."
        }
        ("OPEN_MINDEDNESS", "Mixed") => {
            "You can appreciate new ideas while still keeping one foot in the practical."
        }
        ("OPEN_MINDEDNESS", "Somewhat agree") | ("OPEN_MINDEDNESS", "Mostly agree") => {
            "You tend to seek novelty, multiple perspectives, and conceptual range."
        }
        ("ATTACHMENT_ANXIETY", "Mostly disagree")
        | ("ATTACHMENT_ANXIETY", "Somewhat disagree") => {
            "Relational uncertainty may feel manageable without frequent reassurance."
        }
        ("ATTACHMENT_ANXIETY", "Mixed") => {
            "You appear able to care deeply without reading too much danger into temporary distance."
        }
        ("ATTACHMENT_ANXIETY", "Somewhat agree")
        | ("ATTACHMENT_ANXIETY", "Mostly agree") => {
            "Silence, ambiguity, or shifts in closeness may trigger fast concern or reassurance-seeking."
        }
        ("ATTACHMENT_AVOIDANCE", "Mostly disagree")
        | ("ATTACHMENT_AVOIDANCE", "Somewhat disagree") => {
            "Emotional dependence and closeness may feel relatively accessible to you."
        }
        ("ATTACHMENT_AVOIDANCE", "Mixed") => {
            "You appear able to value closeness while still keeping healthy personal boundaries."
        }
        ("ATTACHMENT_AVOIDANCE", "Somewhat agree")
        | ("ATTACHMENT_AVOIDANCE", "Mostly agree") => {
            "You may protect autonomy by keeping emotional needs or dependence at a distance."
        }
        _ => "This construct is still being calibrated.",
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
            answers.insert(question.id.to_string(), 3);
        }
        answers.insert("assertive_extraversion_1".to_string(), 9);
        let result = score(ScoreRequest { answers });
        assert!(result.is_err());
    }

    #[test]
    fn score_returns_construct_scores() {
        let mut answers = BTreeMap::new();
        for question in QUESTIONS {
            answers.insert(question.id.to_string(), 4);
        }
        let result = score(ScoreRequest { answers }).expect("assessment should score");
        assert_eq!(result.constructs.len(), 7);
        assert_eq!(result.item_count, 28);
        assert_eq!(result.response_scale, "5-point agreement");
    }

    #[test]
    fn score_reverse_keys_items() {
        let mut answers = BTreeMap::new();
        for question in QUESTIONS {
            let value = if question.reverse_keyed { 5 } else { 1 };
            answers.insert(question.id.to_string(), value);
        }

        let result = score(ScoreRequest { answers }).expect("assessment should score");
        let assertive = result
            .constructs
            .iter()
            .find(|score| score.key == "ASSERTIVE_EXTRAVERSION")
            .expect("assertive extraversion should exist");

        assert_eq!(assertive.raw_total, 4);
        assert!((assertive.mean_score - 1.0).abs() < f32::EPSILON);
    }
}
