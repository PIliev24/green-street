import { NextRequest, NextResponse } from "next/server";
import { updateTransactionState } from "@/actions/transactions";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const formData = await request.formData();

    formData.set("id", id);

    const result = await updateTransactionState(formData);

    if (result.error) {
      return NextResponse.json(
        {
          error: result.error,
          errors: result.errors,
        },
        { status: 400 }
      );
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
