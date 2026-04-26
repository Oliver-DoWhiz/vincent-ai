use std::net::SocketAddr;

use axum::{response::Html, routing::get, Router};
use tower_http::{services::ServeDir, trace::TraceLayer};

pub fn build_app() -> Router {
    Router::new()
        .route("/", get(landing))
        .route("/screening", get(screening))
        .route("/assessment", get(screening))
        .route("/privacy", get(privacy))
        .route("/how-it-works", get(how_it_works))
        .nest_service(
            "/static",
            ServeDir::new(concat!(env!("CARGO_MANIFEST_DIR"), "/static")),
        )
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
    tracing::info!("Vincent ADHD listening on http://{}", addr);

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

async fn screening() -> Html<&'static str> {
    Html(include_str!("../static/screening.html"))
}

async fn privacy() -> Html<&'static str> {
    Html(include_str!("../static/privacy.html"))
}

async fn how_it_works() -> Html<&'static str> {
    Html(include_str!("../static/how-it-works.html"))
}
