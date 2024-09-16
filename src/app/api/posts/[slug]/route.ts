import { NextRequest, NextResponse } from "next/server";
import { getPostHandler } from "./handler";

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const slug = pathname.replace("/api/posts/", "").trim();
  const result = await getPostHandler(slug);
  const postData = await result.data;

  return NextResponse.json(postData, { status: result.success ? 200 : 500 });
}
