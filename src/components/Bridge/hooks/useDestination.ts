import { useState } from 'react';

export default () => {
  const [checked, setChecked] = useState<boolean>(false);
  const [destination, setDestination] = useState<string>('');

  return { checked, setChecked, destination, setDestination };
};
