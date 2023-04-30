export const CredentialProviders = {
  GOOGLE: 'GOOGLE_CLIENT',
  GITHUB: 'GITHUB',
} as const;

type ObjectValues<T> = T[keyof T];

type CredentialProvider = ObjectValues<typeof CredentialProviders>;

export function getCredentials(credentialProvider: CredentialProvider) {
  let clientId: string | undefined;
  let clientSecret: string | undefined;

  if (credentialProvider === CredentialProviders.GOOGLE) {
    clientId = process.env.GOOGLE_CLIENT_ID;
    clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  } else if (credentialProvider === CredentialProviders.GITHUB) {
    clientId = process.env.GITHUB_ID;
    clientSecret = process.env.GITHUB_SECRET;
  }

  if (!clientId || !clientSecret) {
    throw new Error(
      `Please provide ${credentialProvider}_ID and  ${credentialProvider}_SECRET env variables`
    );
  }

  return {
    clientId,
    clientSecret,
  };
}
