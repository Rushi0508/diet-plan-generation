// NextJS API for generating a plan using gemni API

import { NextResponse } from "next/server";
import { generatePlan } from "./generatePlan";

export async function POST(req: Request) {
  try {
    let body = await req.json();
    const plan = await generatePlan(body);
    console.log(plan);
    return NextResponse.json(plan);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching response" });
  }
}
