"use server";
import { redirect } from "next/navigation";

export default async function signupAction(currentState:any,formData: FormData):Promise<string> {
  //Get res from form
  const email = formData.get("email");
  const password = formData.get("password");

  //Send data to api route
  const response = await fetch(`${process.env.DOMAIN}/api/signup`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const res = await response.json();

  //Redirect to login page
  if (response.ok) {
    redirect("/login");
  }else{
    return res.error
  }
}
