#[tokio::main]
async fn main() {
    vincent_ai::web::serve().await;
}
