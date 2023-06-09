export async function createThread() {
  const response = await fetch('/api/thread', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    throw new Error('Something went wrong.');
  }

  return await response.json();
}
