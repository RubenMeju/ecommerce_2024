import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req) {
  //const token = await getToken({ req });
  // console.log("token en el PUT: ", token);
  //return NextResponse.json("success", token);

  try {
    const requestBody = JSON.parse(await req.text()); // Leer el cuerpo de la solicitud como JSON
    console.log("ME llega el id?? ", requestBody);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/users/${requestBody.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${requestBody.access}`,
        },
        body: JSON.stringify(requestBody),
      }
    );
    if (res.status === 200) {
      console.log("datos de la cuenta modificados!", res.status);
      return NextResponse.json(res.status);
    }

    const responseData = await res.json();
    console.log("Respuesta del servidor:", responseData);
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error en el servidor:", error);
    return NextResponse.json({
      error: "Hubo un error en el servidor",
    });
  }
}
