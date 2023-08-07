'use server';

import { formatSafePost } from '@/helpers/format-dto';
import prisma from '@/lib/prismadb';

export async function addComment(comment: string, postId: number) {
  console.log('adding comment', comment);
  // const newComment = await prisma.comment.create({
  //   data: {
  //     comment,
  //     postId,
  //   },
  // });
}

export async function getFeedPosts() {
  const posts = await prisma.post.findMany({
    include: {
      comments: true,
    },
  });

  console.log('posts', posts);

  return posts.map(formatSafePost);
}
