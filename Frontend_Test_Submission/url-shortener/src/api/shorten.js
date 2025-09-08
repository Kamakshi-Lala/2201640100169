export async function shortenUrl(baseUrl, url, customCode, validityMinutes) {
  return fetch(`${baseUrl}/shorten`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url,
      customCode,
      validityMinutes,
    }),
  }).then(r => r.json());
}

export async function getStats(shortCode) {
  return fetch(`https://api.example.com/stats/${shortCode}`)
    .then(r => r.json());
}