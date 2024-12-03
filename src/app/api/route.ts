interface ResponseData {
  message: string;
}

export const GET = async () => {
  try {
    const response = await fetch(`${process.env.SERVER_URL}`);
    const message: ResponseData = await response.json();

    if (message.message) {
      return Response.json(message.message, {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return Response.json(message, {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (e) {
    console.error(e);
    return Response.json(String(e), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
