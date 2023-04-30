export function getCredentials(isGoogle: boolean) {
  const key = isGoogle ? 'GOOGLE_CLIENT' : 'GITHUB';
  const clientId = process.env[`${key}]_ID`];
  const clientSecret = process.env[`${key}]_SECRET`];

  if (!clientId || !clientSecret) {
    throw new Error(
      `Please provide ${key}_ID and  ${key}_SECRET env variables`
    );
  }

  return {
    clientId,
    clientSecret,
  };
}
