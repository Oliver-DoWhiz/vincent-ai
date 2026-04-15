use axum::{
    body::{to_bytes, Body},
    http::{Method, Request, StatusCode},
};
use tower::util::ServiceExt;

use vincent_ai::{build_app, domain::questions};

fn valid_payload(default_value: u8) -> serde_json::Value {
    let mut answers = serde_json::Map::new();

    for question in questions() {
        answers.insert(question.id.to_string(), serde_json::Value::from(default_value));
    }

    serde_json::json!({ "answers": answers })
}

#[tokio::test]
async fn landing_route_returns_ok() {
    let app = build_app();

    let response = app
        .oneshot(
            Request::builder()
                .uri("/")
                .method(Method::GET)
                .body(Body::empty())
                .expect("request should build"),
        )
        .await
        .expect("response should succeed");

    assert_eq!(response.status(), StatusCode::OK);
}

#[tokio::test]
async fn personas_route_returns_ok() {
    let app = build_app();

    let response = app
        .oneshot(
            Request::builder()
                .uri("/personas")
                .method(Method::GET)
                .body(Body::empty())
                .expect("request should build"),
        )
        .await
        .expect("response should succeed");

    assert_eq!(response.status(), StatusCode::OK);
}

#[tokio::test]
async fn persona_detail_route_returns_ok() {
    let app = build_app();

    let response = app
        .oneshot(
            Request::builder()
                .uri("/personas/beacon-architect")
                .method(Method::GET)
                .body(Body::empty())
                .expect("request should build"),
        )
        .await
        .expect("response should succeed");

    assert_eq!(response.status(), StatusCode::OK);
}

#[tokio::test]
async fn framework_route_returns_ok() {
    let app = build_app();

    let response = app
        .oneshot(
            Request::builder()
                .uri("/framework")
                .method(Method::GET)
                .body(Body::empty())
                .expect("request should build"),
        )
        .await
        .expect("response should succeed");

    assert_eq!(response.status(), StatusCode::OK);
}

#[tokio::test]
async fn question_api_returns_full_construct_catalog() {
    let app = build_app();

    let response = app
        .oneshot(
            Request::builder()
                .uri("/api/questions")
                .method(Method::GET)
                .body(Body::empty())
                .expect("request should build"),
        )
        .await
        .expect("response should succeed");

    assert_eq!(response.status(), StatusCode::OK);

    let body = to_bytes(response.into_body(), usize::MAX)
        .await
        .expect("body should read");
    let payload: serde_json::Value =
        serde_json::from_slice(&body).expect("questions payload should be valid json");

    let questions = payload
        .as_array()
        .expect("question payload should be an array");
    assert_eq!(questions.len(), 28);
    assert_eq!(questions[0]["options"].as_array().expect("options should exist").len(), 5);
}

#[tokio::test]
async fn score_api_returns_construct_profile() {
    let app = build_app();
    let payload = valid_payload(4);

    let response = app
        .oneshot(
            Request::builder()
                .uri("/api/score")
                .method(Method::POST)
                .header("content-type", "application/json")
                .body(Body::from(payload.to_string()))
                .expect("request should build"),
        )
        .await
        .expect("response should succeed");

    assert_eq!(response.status(), StatusCode::OK);

    let body = to_bytes(response.into_body(), usize::MAX)
        .await
        .expect("body should read");
    let payload: serde_json::Value =
        serde_json::from_slice(&body).expect("score payload should be valid json");

    let constructs = payload["constructs"]
        .as_array()
        .expect("constructs should be an array");
    assert_eq!(constructs.len(), 7);
    assert_eq!(payload["item_count"], 28);
    assert_eq!(payload["response_scale"], "5-point agreement");
    assert!(payload["note"]
        .as_str()
        .expect("note should be present")
        .contains("continuous construct scores"));
}

#[tokio::test]
async fn score_api_rejects_incomplete_payload() {
    let app = build_app();
    let payload = serde_json::json!({ "answers": {} });

    let response = app
        .oneshot(
            Request::builder()
                .uri("/api/score")
                .method(Method::POST)
                .header("content-type", "application/json")
                .body(Body::from(payload.to_string()))
                .expect("request should build"),
        )
        .await
        .expect("response should succeed");

    assert_eq!(response.status(), StatusCode::BAD_REQUEST);

    let body = to_bytes(response.into_body(), usize::MAX)
        .await
        .expect("body should read");
    let payload: serde_json::Value =
        serde_json::from_slice(&body).expect("error payload should be valid json");

    assert!(payload["error"]
        .as_str()
        .expect("error should be present")
        .contains("Assessment incomplete"));
}

#[tokio::test]
async fn score_api_rejects_invalid_answer_values() {
    let app = build_app();
    let mut payload = valid_payload(3);

    let first_question = questions()
        .first()
        .expect("question catalog should not be empty");
    payload["answers"][first_question.id] = serde_json::Value::from(9);

    let response = app
        .oneshot(
            Request::builder()
                .uri("/api/score")
                .method(Method::POST)
                .header("content-type", "application/json")
                .body(Body::from(payload.to_string()))
                .expect("request should build"),
        )
        .await
        .expect("response should succeed");

    assert_eq!(response.status(), StatusCode::BAD_REQUEST);

    let body = to_bytes(response.into_body(), usize::MAX)
        .await
        .expect("body should read");
    let payload: serde_json::Value =
        serde_json::from_slice(&body).expect("error payload should be valid json");

    assert!(payload["error"]
        .as_str()
        .expect("error should be present")
        .contains("must be 1, 2, 3, 4, or 5"));
}
