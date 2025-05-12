import Modal from "../ui/modal";
import Form from "./form";

interface SessionFormProps {
    isOpen: boolean;
    handleClose: () => void;
}

export default function SessionForm ({isOpen, handleClose}: SessionFormProps) {
    return <Modal title="Create Session" isOpen={isOpen} onClose={handleClose}>
        <Form />
    </Modal>
}