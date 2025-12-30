import { NextRequest, NextResponse } from "next/server";
import getHostAPIUrl from "@/api/appConfig";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const apiUrl = getHostAPIUrl();
    const endpoint = "/auth/login";
    
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process login request" },
      { status: 500 }
    );
  }
}

