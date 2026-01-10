export async function loginGoogle(token: string) {
  const res = await fetch("/auth/google", {
    method: "POST",
    body: JSON.stringify({ token }),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}
