export const optionData = (name: string): Promise<Record<string, unknown>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        price: name === 'John' ? '100' : '50',
      });
    }, 1000);
  });
};
