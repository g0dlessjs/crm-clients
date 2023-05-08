export async function getClient() {
  const response = await fetch(import.meta.env.VITE_API_URL);
  const result = await response.json();
  return result;
}

export async function addClient(data) {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });
    await response.json();
  } catch (error) {
    console.log(error);
  }
}
