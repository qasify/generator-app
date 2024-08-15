export interface AddGeneratorModalProps {
  isVisible: boolean;
  onConfirm: (name:string, code:string) => Promise<string | undefined>;
  onCancel?: () => void;
  onClose?: () => void; // Optional: A handler to close the modal (e.g., clicking outside the modal)
}

type AddGeneratorError = "name" | "code";

type AddGeneratorErrors =Record<AddGeneratorError, string | null>;
 
export type { AddGeneratorError, AddGeneratorErrors };