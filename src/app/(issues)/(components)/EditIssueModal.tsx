import Modal from "@/app/(components)/Modal";
import { Issue } from "@/lib/services/issue-service";
import { useRef, useState } from "react";
import { useIssues } from "../(hooks)/use-issues";

interface EditIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  issue: Issue;
}

export default function EditIssueModal({
  isOpen,
  onClose,
  issue,
}: EditIssueModalProps) {
  const { uploading, updateIssue } = useIssues();
  const [currentIssue, setCurrentIssue] = useState<Issue>(issue);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpdateIssue = async () => {
    if (!currentIssue) return;
    const file = fileInputRef.current?.files?.[0] || null;
    const success = await updateIssue(currentIssue, file);
    if (success) {
      onClose();
    } else {
      alert("Failed to update issue");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4">Edit Issue</h2>
      {currentIssue && (
        <>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            disabled={uploading}
            className="w-full p-2 mb-2 border rounded"
          />
          <img
            src={currentIssue.imageUri}
            alt="Current image"
            className="w-full h-32 object-cover mb-2"
          />
          <input
            type="text"
            placeholder="Title"
            value={currentIssue.title}
            onChange={(e) =>
              setCurrentIssue({ ...currentIssue, title: e.target.value })
            }
            className="w-full p-2 mb-2 border rounded"
            disabled={uploading}
          />
          <input
            type="text"
            placeholder="Issue Number"
            value={currentIssue.issueNumber}
            onChange={(e) =>
              setCurrentIssue({
                ...currentIssue,
                issueNumber: e.target.value,
              })
            }
            className="w-full p-2 mb-2 border rounded"
            disabled={uploading}
          />
          <input
            type="date"
            value={currentIssue.issueDate}
            disabled={uploading}
            onChange={(e) =>
              setCurrentIssue({ ...currentIssue, issueDate: e.target.value })
            }
            className="w-full p-2 mb-4 border rounded"
          />
          <button
            onClick={handleUpdateIssue}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Update Issue"}
          </button>
        </>
      )}
    </Modal>
  );
}
