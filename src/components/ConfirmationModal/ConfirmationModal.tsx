import React from "react";
import { ConfirmationModalProps } from "./ConfirmationModal.types";
import Button from "../Button";

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  message,
  onConfirm,
  onCancel,
  onClose,
}) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="flex flex-col gap-6 bg-white p-3 rounded-lg shadow-lg max-w-md w-full"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing the modal
      >
        <p className="text-[16px] p-2">{message}</p>
        <div className="flex justify-end gap-2">
          {onCancel && (
            <Button onClick={onCancel} variant="bordered">
              Cancel
            </Button>
          )}
          <Button onClick={onConfirm}>Confirm</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
