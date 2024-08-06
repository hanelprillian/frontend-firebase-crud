import { useState, useEffect, useMemo } from "react";
import { Issue } from "@/lib/services/issue-service";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

export interface FilterOptions {
  keyword: string;
  dateFilter: string;
  sortBy: "title" | "issueNumber" | "issueDate";
  sortOrder: "asc" | "desc";
}

export const useIssues = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    keyword: "",
    dateFilter: "",
    sortBy: "issueNumber",
    sortOrder: "asc",
  });

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    setIsLoading(true);
    const response = await fetch("/api/issues");
    if (response.ok) {
      const fetchedIssues = await response.json();
      setIssues(fetchedIssues);
    }
    setIsLoading(false);
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const storageRef = ref(storage, `issues/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setUploading(false);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
      setUploading(false);
      return null;
    }
  };

  const addIssue = async (newIssue: Omit<Issue, "id">, file: File | null) => {
    if (file) {
      const imageUrl = await handleImageUpload(file);
      if (imageUrl) {
        const issueWithImage = { ...newIssue, imageUri: imageUrl };
        const response = await fetch("/api/issues", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(issueWithImage),
        });

        if (response.ok) {
          await fetchIssues();
          return true;
        }
      }
    }
    return false;
  };

  const updateIssue = async (updatedIssue: Issue, file: File | null) => {
    let issueToUpdate = { ...updatedIssue };

    if (file) {
      const imageUrl = await handleImageUpload(file);
      if (imageUrl) {
        issueToUpdate.imageUri = imageUrl;
      }
    }

    const response = await fetch(`/api/issues/${updatedIssue.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(issueToUpdate),
    });

    if (response.ok) {
      await fetchIssues();
      return true;
    }
    return false;
  };

  const deleteIssue = async (id: string) => {
    const response = await fetch(`/api/issues/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      await fetchIssues();
      return true;
    }
    return false;
  };

  const filteredAndSortedIssues = useMemo(() => {
    return issues
      .filter((issue) =>
        issue.title.toLowerCase().includes(filterOptions.keyword.toLowerCase())
      )
      .filter((issue) =>
        filterOptions.dateFilter
          ? issue.issueDate === filterOptions.dateFilter
          : true
      )
      .sort((a, b) => {
        if (a[filterOptions.sortBy] < b[filterOptions.sortBy])
          return filterOptions.sortOrder === "asc" ? -1 : 1;
        if (a[filterOptions.sortBy] > b[filterOptions.sortBy])
          return filterOptions.sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [issues, filterOptions]);

  return {
    issues: filteredAndSortedIssues,
    isLoading,
    uploading,
    addIssue,
    updateIssue,
    deleteIssue,
    fetchIssues,
    filterOptions,
    setFilterOptions,
  };
};
