'use server';

import { Pool, PoolClient } from 'pg';

import { Message as ValidationMessage } from '@/lib/validators/message-validator';
import { formatSafeMessage } from '@/helpers/format-dto';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export async function createDBMessage(message: ValidationMessage) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const newMessage = await client.query(
      'INSERT INTO "Message" (is_user_message, text, chat_id, "updatedAt") VALUES ($1, $2, $3, $4) RETURNING *',
      [message.isUserMessage, message.text, message.chatId, new Date()]
    );

    if (message.isUserMessage) {
      await incrementUserMessageCount(client, message.chatId);
    }

    await client.query('COMMIT');
    return formatSafeMessage(newMessage.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating message:', error);
  } finally {
    client.release();
  }
}

async function incrementUserMessageCount(client: PoolClient, chatId: number) {
  try {
    await client.query(
      'UPDATE "Chat" SET "user_messages_count" = "user_messages_count" + 1 WHERE id = $1',
      [chatId]
    );
  } catch (error) {
    console.error('Error incrementing userMessageCount:', error);
  }
}
