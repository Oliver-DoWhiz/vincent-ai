use axum::{
    body::Body,
    http::{Method, Request, StatusCode},
};
use tower::util::ServiceExt;

use vincent_ai::build_app;

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
async fn question_api_returns_catalog() {
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
}

#[tokio::test]
async fn score_api_accepts_valid_payload() {
    let app = build_app();

    let mut answers = serde_json::Map::new();
    for key in [
        "drive_1",
        "drive_2",
        "drive_3",
        "boundary_1",
        "boundary_2",
        "boundary_3",
        "exposure_1",
        "exposure_2",
        "exposure_3",
        "volatility_1",
        "volatility_2",
        "volatility_3",
        "discipline_1",
        "discipline_2",
        "discipline_3",
        "interpretation_1",
        "interpretation_2",
        "interpretation_3",
        "attachment_1",
        "attachment_2",
        "attachment_3",
        "initiative_1",
        "initiative_2",
        "initiative_3",
    ] {
        answers.insert(key.to_string(), serde_json::Value::from(2));
    }

    let payload = serde_json::json!({ "answers": answers });

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
}
