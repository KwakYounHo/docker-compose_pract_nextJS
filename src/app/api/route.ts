import { NextRequest } from "next/server";

export interface ResponseData {
  error?: string;
  data?: string;
}

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const response = await fetch(`${process.env.SERVER_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const message: ResponseData = await response.json();

    if (message.error) {
      return Response.json(
        { error: message.error },
        {
          status: 502,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      console.log(message);
      return Response.json(message.data, {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (e) {
    console.error(e);
    return Response.json(
      { error: "server error" },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const { key, data } = await request.json();
    const response = await fetch(`${process.env.SERVER_URL}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key, data }),
    });
    const message: ResponseData = await response.json();

    if (message.error) {
      return Response.json(
        { error: message.error },
        {
          status: 402,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      return Response.json(message.data, {
        status: 202,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (e) {
    console.error(e);
    return Response.json(
      { error: "Server error" },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    const { key } = await request.json();
    const response = await fetch(`${process.env.SERVER_URL}/${key}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const message: ResponseData = await response.json();

    console.log(message);

    if (message.error) {
      return Response.json(
        { error: message.error },
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return Response.json(message.data, {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (e) {
    console.error(e);
    return Response.json(
      { error: "Server error" },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
