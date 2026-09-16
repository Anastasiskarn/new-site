import handler from "../../../server/chat.js";
import { invokeHandler } from "../../../lib/legacy-handler";
export const runtime = "nodejs";
export const maxDuration = 30;
export async function POST(request: Request) {
  return invokeHandler(request, handler);
}
