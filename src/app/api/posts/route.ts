import { NextResponse } from "next/server";
import { getPostsHandler } from "@/app/api/posts/handler";

export async function GET() {
  const result = await getPostsHandler();

  return NextResponse.json(result.data, { status: result.success ? 200 : 500 });
}
