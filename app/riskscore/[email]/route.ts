import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ email: string }> }
  
) {
  console.log("GET request received for risk score");

  const { email } = await params;
  console.log("Email parameter:", email);

  const token = request.headers.get("suresteps-session-token");
  console.log("Session token:", token);

  if (!token) {
    return NextResponse.json(
      { error: "Missing session token" },
      { status: 401 }
    );
  }

  if (!email) {
    return NextResponse.json(
      { error: "Missing email parameter" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`https://dev.stedi.me/riskscore/${email}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "suresteps.session.token": token,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json(
        { error: "Failed to retrieve risk score", details: errorData },
        { status: response.status }
      );
    }

    const riskScore = await response.json(); // returns a number string like "57"
    console.log("riskstoce-[email]Line 48: Risk score response:", riskScore);
    return NextResponse.json({ score: riskScore.score }, { status: 200 });
  } catch (error) {
    console.error("Risk score fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
