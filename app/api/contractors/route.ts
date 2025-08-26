import { NextResponse } from "next/server";
import { getContractors } from "@/actions/contractors";

export async function GET() {
  try {
    const result = await getContractors();

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({
      data: result.data,
      error: null,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
