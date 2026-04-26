use axum::{
    body::{to_bytes, Body},
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

    let body = to_bytes(response.into_body(), usize::MAX)
        .await
        .expect("body should read");
    let html = String::from_utf8(body.to_vec()).expect("landing should be utf-8");

    assert!(html.contains("Vincent ADHD"));
    assert!(html.contains("Start screening"));
    assert!(html.contains("Private adult ADHD screening"));
}

#[tokio::test]
async fn screening_route_returns_ok() {
    let app = build_app();

    let response = app
        .oneshot(
            Request::builder()
                .uri("/screening")
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
    let html = String::from_utf8(body.to_vec()).expect("screening should be utf-8");

    assert!(html.contains("Vincent ADHD Screening"));
    assert!(html.contains("Review the limits before you begin."));
}

#[tokio::test]
async fn assessment_alias_returns_ok() {
    let app = build_app();

    let response = app
        .oneshot(
            Request::builder()
                .uri("/assessment")
                .method(Method::GET)
                .body(Body::empty())
                .expect("request should build"),
        )
        .await
        .expect("response should succeed");

    assert_eq!(response.status(), StatusCode::OK);
}

#[tokio::test]
async fn privacy_route_returns_ok() {
    let app = build_app();

    let response = app
        .oneshot(
            Request::builder()
                .uri("/privacy")
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
    let html = String::from_utf8(body.to_vec()).expect("privacy page should be utf-8");

    assert!(html.contains("Privacy and scope"));
}

#[tokio::test]
async fn how_it_works_route_returns_ok() {
    let app = build_app();

    let response = app
        .oneshot(
            Request::builder()
                .uri("/how-it-works")
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
    let html = String::from_utf8(body.to_vec()).expect("how-it-works page should be utf-8");

    assert!(html.contains("Deterministic scoring"));
}

#[tokio::test]
async fn legacy_api_routes_are_not_active() {
    let app = build_app();

    let questions = app
        .clone()
        .oneshot(
            Request::builder()
                .uri("/api/questions")
                .method(Method::GET)
                .body(Body::empty())
                .expect("request should build"),
        )
        .await
        .expect("response should succeed");

    let score = app
        .oneshot(
            Request::builder()
                .uri("/api/score")
                .method(Method::POST)
                .body(Body::empty())
                .expect("request should build"),
        )
        .await
        .expect("response should succeed");

    assert_eq!(questions.status(), StatusCode::NOT_FOUND);
    assert_eq!(score.status(), StatusCode::NOT_FOUND);
}
