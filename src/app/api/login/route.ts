import validateEmail from "@/app/helpers/validateEmail";
import validatePassword from "@/app/helpers/validatePassword";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import * as jose from "jose"

export async function POST(request: Request) {
  //Read data from request
  const body = await request.json();
  const { email, password } = body;

  //Validate the email and password
  if (!validateEmail(email) || !validatePassword(password)) {
    return Response.json(
      { error: "Invalid email or password" },
      { status: 400 }
    );
  }

  //check if user is in the database
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 400 });
  }

  //Compare the password
  const isValidPassword = bcrypt.compareSync(password, user.password);

  if (!isValidPassword) {
    return Response.json({ error: "Invalid Password" }, { status: 400 });
  }


  //Create a JWT token
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  const alg = "HS256"

  const jwt = await new jose.SignJWT({})
  .setProtectedHeader({alg})
  .setExpirationTime("72h")
  .setSubject(user.id.toString())
  .sign(secret)

  //Return the token to the user(Resonse)
  return Response.json({token:jwt});

}
