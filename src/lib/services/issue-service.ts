import { FirestoreService } from "./firebase-service";

export type Issue = {
  id: string;
  imageUri: string;
  title: string;
  issueNumber: string;
  issueDate: string;
};

const collectionName = "issues";

export class IssueService extends FirestoreService<Issue> {
  constructor() {
    super(collectionName);
  }

  async addIssue(data: Omit<Issue, "id">): Promise<string> {
    return this.add(data);
  }

  async getAllIssues(): Promise<Issue[]> {
    return this.getAll();
  }

  async getIssue(id: string): Promise<Issue | null> {
    return this.getById(id);
  }

  async updateIssue(id: string, data: Partial<Issue>): Promise<void> {
    await this.update(id, data);
  }

  async deleteIssue(id: string): Promise<void> {
    await this.delete(id);
  }

  async getIssuesByDate(date: string): Promise<Issue[]> {
    const allIssues = await this.getAll();
    return allIssues.filter((issue) => issue.issueDate === date);
  }
}
