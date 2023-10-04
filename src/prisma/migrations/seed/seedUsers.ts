import prisma from '@/lib/prismadb';

export const seedUsers = async () => {
  const users = [
    {
      name: 'User 1',
      email: 'user1@example.com',
    },
    {
      name: 'User 2',
      email: 'user2@example.com',
    },
    {
      name: 'User 3',
      email: 'user3@example.com',
    },
    {
      name: 'User 4',
      email: 'user4@example.com',
    },
    {
      name: 'User 5',
      email: 'user5@example.com',
    },
    {
      name: 'User 6',
      email: 'user6@example.com',
    },
    {
      name: 'User 7',
      email: 'user7@example.com',
    },
    {
      name: 'User 8',
      email: 'user8@example.com',
    },
    {
      name: 'User 9',
      email: 'user9@example.com',
    },
    {
      name: 'Harry Potter',
      email: 'hp@example.com',
    },
    {
      name: 'Hermione Granger',
      email: 'hg@example.com',
    },
    {
      name: 'Ron Weasley',
      email: 'rw@example.com',
    },
    // Add more users here
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
};
