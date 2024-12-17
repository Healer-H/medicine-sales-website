import { useState, useCallback } from 'react';
import { ConfirmationDialogContext } from '../contexts/ConfirmationDialogContext';
import { ConfirmationDialog } from '../components/ConfirmationDialog';

export const ConfirmationDialogProvider = ({ children }) => {
  const [dialogState, setDialogState] = useState({
    open: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
  });
  const [resolveRef, setResolveRef] = useState();

  const openDialog = useCallback(({
    title,
    message,
    confirmText,
    cancelText
  }) => {
    return new Promise((resolve) => {
      setDialogState({
        open: true,
        title,
        message,
        confirmText,
        cancelText
      });
      setResolveRef(() => resolve);
    });
  }, []);

  const handleClose = useCallback(() => {
    setDialogState(prev => ({ ...prev, open: false }));
    resolveRef?.(false);
  }, [resolveRef]);

  const handleConfirm = useCallback(() => {
    setDialogState(prev => ({ ...prev, open: false }));
    resolveRef?.(true);
  }, [resolveRef]);

  return (
    <ConfirmationDialogContext.Provider value={openDialog}>
      {children}
      <ConfirmationDialog
        open={dialogState.open}
        title={dialogState.title}
        message={dialogState.message}
        confirmText={dialogState.confirmText}
        cancelText={dialogState.cancelText}
        onConfirm={handleConfirm}
        onCancel={handleClose}
      />
    </ConfirmationDialogContext.Provider>
  );
};