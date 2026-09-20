import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parseSetCookie } from "cookie";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();

      return NextResponse.json(errorData, {
        status: response.status,
      });
    }

    const data = await response.json();

    const cookieStore = await cookies();
    const setCookieHeader = response.headers.get("set-cookie");

    if (setCookieHeader) {
      const cookieArray = setCookieHeader.split(/,(?=\s*[^;,]+=)/);

      for (const cookieStr of cookieArray) {
        const parsed = parseSetCookie(cookieStr);

        if (parsed.value) {
          cookieStore.set(parsed.name, parsed.value, parsed);
        }
      }
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Register error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}