'use server';

import { ImportedRecipe } from '@/types';
import { InvokeCommand, Lambda } from '@aws-sdk/client-lambda';

const invoke = async (funcName: string, payload: any) => {
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error('No aws credentials found. Please set env variables');
  }

  const lambdaClient = new Lambda({
    region: 'us-east-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const params = {
    FunctionName: funcName,
    Payload: payload,
  };

  const command = new InvokeCommand(params);

  const { Payload, LogResult: logs } = await lambdaClient.send(command);

  if (!Payload) throw new Error('No payload returned from lambda');

  const stringResult = Buffer.from(Payload).toString();
  const response = JSON.parse(stringResult);

  if (response.errorMessage) {
    throw new Error(response.errorMessage);
  }

  const result = JSON.parse(response.body);

  return { logs, result };
};

export async function importRecipeLambda(url: string) {
  try {
    const { result }: { result: ImportedRecipe } = await invoke(
      'recipe_import',
      JSON.stringify({ url: url })
    );
    return result;
  } catch (error) {
    console.log('error:', error);
    throw new Error('Error importing recipe');
  }
}
