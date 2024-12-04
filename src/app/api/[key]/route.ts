import { NextRequest } from "next/server";
import { ResponseData } from "../route";

export const GET = async (
  request: NextRequest,
  { params }: { params: { key: string } }
) => {
  try {
    const { key } = params;
    const response = await fetch(`${process.env.SERVER_URL}/${key}`, {
      cache: "no-store",
    });
    const message: ResponseData = await response.json();

    if (message.data) {
      return Response.json(message.data, {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      });
    } else {
      return Response.json(message.error, {
        status: 404,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      });
    }
  } catch (e) {
    console.error(e);
    return Response.json(String(e), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  }
};
