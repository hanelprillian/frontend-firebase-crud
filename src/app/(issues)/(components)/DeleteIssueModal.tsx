import Modal from "@/app/(components)/Modal";
import { useIssues } from "@/app/(issues)/(hooks)/use-issues";
import { Issue } from "@/lib/services/issue-service";

interface AddIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  issue: Issue;
}

export default function DeleteIssueModal({
  isOpen,
  onClose,
  issue,
}: AddIssueModalProps) {
  const { deleteIssue } = useIssues();

  const handleDeleteIssue = async () => {
    if (!issue) return;
    const success = await deleteIssue(issue.id);

    if (success) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
      <p className="mb-4">Are you sure you want to delete this issue?</p>
      <button
        onClick={handleDeleteIssue}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Confirm Delete
      </button>
    </Modal>
  );
}
