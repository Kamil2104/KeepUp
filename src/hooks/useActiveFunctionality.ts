import { useContext } from 'react';

import ActiveFunctionalityContext from '../context/ActiveFunctionalityContext';

export const useActiveFunctionality = () => {
  return useContext(ActiveFunctionalityContext);
};
