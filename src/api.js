export async function apiGetLink() {
  const response = await fetch("/api/generate-invoice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      description: "Test Product Description",
      payload: "{}",
      prices: [{ amount: 1, label: "Test Product" }],
    }),
  });
  return response.json();
}
