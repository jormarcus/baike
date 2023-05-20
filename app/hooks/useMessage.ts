import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { Message } from '@/lib/validators/message';

export const useMessage = () => {
  const { mutate: sendMessage, isLoading } = useMutation({
    mutationKey: ['sendMessage'],
    mutationFn: async (message: Message) => {
      const response = await fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      console.log(response);
      return response.body;
    },
    onMutate(message) {
      console.log('mutate', message);
    },
    onSuccess() {
      console.log('success');
    },
    onError: (_, message) => {
      toast.error('Something went wrong. Please try again.');
      // removeMessage(message.id);
    },
  });

  return {
    sendMessage,
    isLoading,
  };
};
