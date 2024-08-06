import Modal from "@/app/(components)/Modal";
import { Issue } from "@/lib/services/issue-service";
import { useRef, useState } from "react";
import { useIssues } from "../(hooks)/use-issues";

interface AddIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddIssueModal({ isOpen, onClose }: AddIssueModalProps) {
  const { uploading, addIssue } = useIssues();
  const [newIssue, setNewIssue] = useState<Omit<Issue, "id">>({
    imageUri: "",
    title: "",
    issueNumber: '',
    issueDate: new Date().toISOString().split("T")[0],
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddIssue = async () => {
    if (fileInputRef.current?.files?.[0]) {
      const success = await addIssue(newIssue, fileInputRef.current.files[0]);
      if (success) {
        onClose();
        setNewIssue({
          imageUri: "",
          title: "",
          issueNumber: '',
          issueDate: new Date().toISOString().split("T")[0],
        });
      } else {
        alert("Failed to add issue");
      }
    } else {
      alert("No image selected");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4">Add New Issue</h2>
      <input
        type="file"
        accept="image/*"
        disabled={uploading}
        ref={fileInputRef}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        placeholder="Title"
        disabled={uploading}
        value={newIssue.title}
        onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        disabled={uploading}
        placeholder="Issue Number"
        value={newIssue.issueNumber}
        onChange={(e) =>
          setNewIssue({ ...newIssue, issueNumber: e.target.value })
        }
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="date"
        disabled={uploading}
        value={newIssue.issueDate}
        onChange={(e) =>
          setNewIssue({ ...newIssue, issueDate: e.target.value })
        }
        className="w-full p-2 mb-4 border rounded"
      />
      <button
        onClick={handleAddIssue}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Add Issue"}
      </button>
    </Modal>
  );
}
