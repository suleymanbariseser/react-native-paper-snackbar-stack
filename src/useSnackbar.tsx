import { useContext } from 'react';
import SnackbarContext from './SnackbarContext';

const useSnackbar = () => useContext(SnackbarContext);

export default useSnackbar;
