import validateEmail from "@/app/helpers/validateEmail";
import validatePassword from "@/app/helpers/validatePassword";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
    //Read data from request
  const body = await request.json();
  const { email, password } = body;

  //Validate email and password
  if (!validateEmail(email) || !validatePassword(password)) {
    return Response.json(
      { error: "Invalid email or password" },
      { status: 400 }
    );
  }

  //Hash password
  const hashPassword = bcrypt.hashSync(password, 8);

  //Create user to database
  const user = await prisma.user.create({
    data:{
        email,
        password:hashPassword
    }
  })

  return Response.json({user});
}
