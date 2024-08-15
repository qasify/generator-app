import React, { useState } from "react";
import { AddGeneratorErrors, AddGeneratorModalProps } from "./AddGeneratorModal.types";
import Button from "../Button";
import InputField from "../InputField";
import constants from "./constants";

const AddGeneratorModal: React.FC<AddGeneratorModalProps> = ({
  isVisible,
  onConfirm,
  onCancel,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState<AddGeneratorErrors | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => ({ ...prev, name: null } as AddGeneratorErrors));
    setName(e.target.value);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => ({ ...prev, code: null } as AddGeneratorErrors));
    setCode(e.target.value);
  };


  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!name.length || !code.length) {
      setErrors({
        name: name.length ? null : constants.NAME_MISSING,
        code: code.length ? null : constants.CODE_MISSING,
      } as AddGeneratorErrors);
      return;
    }

    setIsLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const error = await onConfirm(name, code)
    if (error)
      setErrors((prev) => ({ ...prev, code: null } as AddGeneratorErrors));
    else
      setIsLoading(false);
  }

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <form
        className="flex flex-col gap-6 bg-white p-3 rounded-lg shadow-lg max-w-sm sm:max-w-md w-full"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing the modal
        onSubmit={handleSubmit}
      // className="flex flex-col gap-4 w-full"
      >
        <h6 className="text-xl p-2 uppercase self-center">Add new generator</h6>
        <InputField
          label="Generator Name:"
          type="text"
          placeholder="generator xyz"
          value={name}
          onChange={handleNameChange}
          error={errors?.name}
        />
        <InputField
          label="Generator Code:"
          type="text"
          placeholder="ABC123"
          value={code}
          onChange={handleCodeChange}
          error={errors?.code}
        />
        <div className="flex justify-end gap-2">
          {onCancel && (
            <Button onClick={onCancel} variant="bordered">
              Cancel
            </Button>
          )}
          <Button onClick={handleSubmit} isLoading={isLoading} disabled={isLoading} type="submit">Confirm</Button>
        </div>
      </form>
    </div>
  );
};

export default AddGeneratorModal;
