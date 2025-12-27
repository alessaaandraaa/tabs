import SubscriptionsService from "@/services/subscriptions.service";
import { NextResponse } from "next/server";

const subsService = new SubscriptionsService();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const statusParam = searchParams.get("status");

    if (statusParam == "ongoing") {
      const subs = await subsService.getOngoingSubscriptions();
      return NextResponse.json({ subs, count: subs.length }, { status: 200 });
    } else if (statusParam == "expired") {
      const subs = await subsService.getExpiredSubscriptions();
      return NextResponse.json({ subs, count: subs.length }, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching subscriptions: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
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
