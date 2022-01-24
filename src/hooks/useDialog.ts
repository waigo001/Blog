import React from "react";

export const useDialog = (defaultValue = false) => {
  const [isOpen, setIsOpen] = React.useState(defaultValue || false);

  const onClose = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const onOpen = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  return {
    isOpen,
    onClose,
    onOpen,
  };
};
