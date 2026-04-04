// /app/api/login/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();

  const backendRes = await fetch(
    "https://full-stack-backend-4ag5.onrender.com/api/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const data = await backendRes.json();

  const response = NextResponse.json(data);

  // ✅ Set cookie on SAME domain as middleware
  response.cookies.set("token", data.token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  return response;
}