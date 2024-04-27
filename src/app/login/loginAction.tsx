"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function signupAction(
  currentState: any,
  formData: FormData
): Promise<string> {
  //Get res from form
  const email = formData.get("email");
  const password = formData.get("password");

  //Send data to api route
  const response = await fetch(`${process.env.DOMAIN}/api/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const json = await response.json();

  cookies().set("Authorization", json.token, {
    secure: true,
    httpOnly: true,
    expires: Date.now() + 24 * 60 * 60 * 1000 * 3,
    path: "/",
    sameSite: "strict",
  });

  // Redirect to login if success
  if (response.ok) {
    redirect("/protected");
  } else {
    return json.error;
  }
}
