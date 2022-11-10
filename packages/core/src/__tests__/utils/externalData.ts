
export const optionData = () : Promise<Record<string, unknown>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        options: [
          {
            label: 'option A',
            value: 'option A',
          },
          {
            label: 'option B',
            value: 'option B',
          },
          {
            label: 'option C',
            value: 'option C',
          },
          {
            label: 'option D',
            value: 'option D',
          }
        ],
      });
    }, 1000);
  });
}