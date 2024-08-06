import { Issue, IssueService } from "@/lib/services/issue-service";
import { NextResponse } from "next/server";

const issueService = new IssueService();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const issue = await issueService.getIssue(params.id);
    if (issue) {
      return NextResponse.json(issue);
    } else {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching issue:", error);
    return NextResponse.json(
      { error: "Failed to fetch issue", },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updatedIssue = await request.json();
    await issueService.updateIssue(params.id, updatedIssue);
    return NextResponse.json({ message: "Issue updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update issue" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await issueService.deleteIssue(params.id);
    return NextResponse.json({ message: "Issue deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete issue" },
      { status: 500 }
    );
  }
}
