import SubscriptionsService from "@/services/subscriptions.service";
import { NextResponse } from "next/server";

const subsService = new SubscriptionsService();

export async function GET() {
  const subs = await subsService.getSubscriptions();
  return NextResponse.json({ subs, count: subs.length }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("BODY: ", body);
    const newGame = await subsService.addSubscription(body);
    return NextResponse.json({ newGame }, { status: 201 });
  } catch (error) {
    console.error("Error adding subscription:", error);
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    console.log(body);
    const send = body.sub_id;
    console.log("SENT DATA: ", send);
    const deletedSub = await subsService.deleteSubscription(send);
    return NextResponse.json({ deletedSub }, { status: 200 });
  } catch (error) {
    console.error("Error deleting subscription:", error);
    return NextResponse.json(
      {
        error: "An unexpected error occurred while deleting the subscription.",
      },
      { status: 500 }
    );
  }
}
