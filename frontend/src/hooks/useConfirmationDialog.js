import { useContext } from 'react';
import { ConfirmationDialogContext } from '../contexts/ConfirmationDialogContext';

export const useConfirmationDialog = () => {
  const confirm = useContext(ConfirmationDialogContext);
  return confirm;
};