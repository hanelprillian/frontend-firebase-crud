import { Issue } from "@/lib/services/issue-service";
import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function IssueCard({
  issue,
  onUpdate,
  onDelete,
}: {
  issue: Issue;
  onUpdate: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative h-48">
        <Image
          src={issue.imageUri}
          alt={issue.title}
          fill
          style={{ objectFit: "cover" }}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-700">
          #{issue.issueNumber}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{issue.title}</h3>
        <p className="text-gray-600 mb-4">
          {new Date(issue.issueDate).toLocaleDateString()}
        </p>
        <div className="flex justify-between items-center">
          <button
            onClick={onUpdate}
            className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            <FaEdit />
            <span>Edit</span>
          </button>
          <button
            onClick={onDelete}
            className="flex items-center space-x-1 text-red-500 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            <FaTrash />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function IssueCardSkeleton() {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 animate-pulse">
      <div className="bg-gray-300 h-48 mb-4 rounded"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
    </div>
  );
}
