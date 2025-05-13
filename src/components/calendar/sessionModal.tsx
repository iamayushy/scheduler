import Modal from "../ui/modal";
import Form from "./form";

interface SessionFormProps {
  isOpen: boolean;
  isEditMode?: boolean;
  handleClose: () => void;
  sessionForm?: {
    case: string;
    claimant: string;
    respondent: string;
    date: string;
    startTime: string;
    endTime: string;
  };
}

export default function SessionForm({
  isOpen,
  handleClose,
  sessionForm,
  isEditMode
}: SessionFormProps) {
  return (
    <Modal title="Create Session" isOpen={isOpen} onClose={handleClose}>
      <Form isEditing={isEditMode} onSubmit={handleClose} updateFormData={sessionForm} />
    </Modal>
  );
}
