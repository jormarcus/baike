import { db } from '@/lib/db';

export default async function Home() {
  await db.set('hello', 'baike');

  return <div className="text-rose-500">Hello Baike</div>;
}
