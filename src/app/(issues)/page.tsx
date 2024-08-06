"use client";

import { Issue } from "@/lib/services/issue-service";
import { useState } from "react";
import IssueCard, { IssueCardSkeleton } from "./(components)/IssueCard";
import { useIssues } from "./(hooks)/use-issues";
import dynamic from "next/dynamic";

const AddIssueModal = dynamic(() => import("./(components)/AddIssueModal"), {
  ssr: false,
});
const EditIssueModal = dynamic(() => import("./(components)/EditIssueModal"), {
  ssr: false,
});
const DeleteIssueModal = dynamic(
  () => import("./(components)/DeleteIssueModal"),
  {
    ssr: false,
  }
);

const IssuesCRUDExample: React.FC = () => {
  const { issues, isLoading, fetchIssues, filterOptions, setFilterOptions } =
    useIssues();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentIssue, setCurrentIssue] = useState<Issue | null>(null);

  const NoIssuesFound: React.FC = () => (
    <div className="col-span-full text-center py-10">
      <h3 className="text-xl font-semibold mb-2">No issues found</h3>
      <p className="text-gray-600">
        Try adjusting your filters or add a new issue.
      </p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">The latest issues</h1>
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-6"
      >
        Add Issue
      </button>

      <div className="mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Filter by keyword"
          value={filterOptions.keyword}
          onChange={(e) =>
            setFilterOptions({ ...filterOptions, keyword: e.target.value })
          }
          className="p-2 border rounded"
        />
        <input
          type="date"
          value={filterOptions.dateFilter}
          onChange={(e) =>
            setFilterOptions({ ...filterOptions, dateFilter: e.target.value })
          }
          className="p-2 border rounded"
        />
        <select
          value={filterOptions.sortBy}
          onChange={(e) =>
            setFilterOptions({
              ...filterOptions,
              sortBy: e.target.value as "title" | "issueNumber" | "issueDate",
            })
          }
          className="p-2 border rounded"
        >
          <option value="title">Sort by Title</option>
          <option value="issueNumber">Sort by Issue Number</option>
          <option value="issueDate">Sort by Date</option>
        </select>
        <button
          onClick={() =>
            setFilterOptions({
              ...filterOptions,
              sortOrder: filterOptions.sortOrder === "asc" ? "desc" : "asc",
            })
          }
          className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded"
        >
          {filterOptions.sortOrder === "asc" ? "▲" : "▼"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <IssueCardSkeleton key={index} />
          ))
        ) : issues.length > 0 ? (
          issues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              onUpdate={() => {
                setIsEditModalOpen(true);
                setCurrentIssue(issue);
              }}
              onDelete={() => {
                setIsDeleteModalOpen(true);
                setCurrentIssue(issue);
              }}
            />
          ))
        ) : (
          <NoIssuesFound />
        )}
      </div>

      {isAddModalOpen && (
        <AddIssueModal
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            fetchIssues();
          }}
        />
      )}

      {currentIssue && isEditModalOpen && (
        <EditIssueModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            fetchIssues();
            setCurrentIssue(null);
          }}
          issue={currentIssue}
        />
      )}

      {isDeleteModalOpen && currentIssue && (
        <DeleteIssueModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            fetchIssues();
            setIsDeleteModalOpen(false);
            setCurrentIssue(null);
          }}
          issue={currentIssue}
        />
      )}
    </div>
  );
};

export default IssuesCRUDExample;
