use std::net::SocketAddr;

use axum::{
    extract::State,
    http::StatusCode,
    response::{Html, IntoResponse, Response},
    routing::{get, post},
    Json, Router,
};
use serde::Serialize;
use tower_http::{services::ServeDir, trace::TraceLayer};

use crate::domain::{questions, score, ScoreRequest};

#[derive(Clone, Default)]
pub struct AppState;

#[derive(Debug, Serialize)]
struct ErrorPayload {
    error: String,
}

pub fn build_app() -> Router {
    Router::new()
        .route("/", get(landing))
        .route("/assessment", get(assessment))
        .route("/api/questions", get(all_questions))
        .route("/api/score", post(score_assessment))
        .nest_service(
            "/static",
            ServeDir::new(concat!(env!("CARGO_MANIFEST_DIR"), "/static")),
        )
        .with_state(AppState)
        .layer(TraceLayer::new_for_http())
}

pub async fn serve() {
    let subscriber = tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "vincent_ai=info,tower_http=info".into()),
        )
        .finish();
    let _ = tracing::subscriber::set_global_default(subscriber);

    let app = build_app();
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    tracing::info!("Vincent AI listening on http://{}", addr);

    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .expect("listener should bind");

    axum::serve(listener, app)
        .with_graceful_shutdown(shutdown_signal())
        .await
        .expect("server should run");
}

async fn shutdown_signal() {
    let _ = tokio::signal::ctrl_c().await;
}

async fn landing() -> Html<&'static str> {
    Html(include_str!("../static/landing.html"))
}

async fn assessment() -> Html<&'static str> {
    Html(include_str!("../static/assessment.html"))
}

async fn all_questions(State(_): State<AppState>) -> Json<&'static [crate::domain::Question]> {
    Json(questions())
}

async fn score_assessment(
    State(_): State<AppState>,
    Json(payload): Json<ScoreRequest>,
) -> Response {
    match score(payload) {
        Ok(result) => Json(result).into_response(),
        Err(err) => (
            StatusCode::BAD_REQUEST,
            Json(ErrorPayload {
                error: err.message(),
            }),
        )
            .into_response(),
    }
}
