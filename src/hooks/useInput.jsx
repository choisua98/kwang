import { useState } from 'react';

const useInput = () => {
  // state
  const [value, setValue] = useState('');

  // handler
  const handler = (e) => setValue(e.target.value);

  // reset
  const reset = () => setValue('');

  return [value, handler, reset];
};

export default useInput;
