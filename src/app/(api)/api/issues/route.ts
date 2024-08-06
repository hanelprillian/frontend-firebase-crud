import { IssueService } from "@/lib/services/issue-service";
import { NextResponse } from "next/server";

const issueService = new IssueService();

export async function GET() {
  try {
    const issues = await issueService.getAllIssues();
    return NextResponse.json(issues);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch issues" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newIssue = await request.json();
    const newIssueId = await issueService.addIssue(newIssue);
    return NextResponse.json({ id: newIssueId }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create issue" },
      { status: 500 }
    );
  }
}
