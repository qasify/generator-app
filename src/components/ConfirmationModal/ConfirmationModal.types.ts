export interface ConfirmationModalProps {
  isVisible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  onClose?: () => void; // Optional: A handler to close the modal (e.g., clicking outside the modal)
}
