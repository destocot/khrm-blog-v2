"use server";
import {
  SigninFormSchemaType,
  SignupFormSchemaType,
  signinFormSchema,
  // signupFormSchema,
} from "@/lib/schemas";
// import * as bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { SigninResponseType, SignupResponseType } from "@/lib/types";

export async function signup(
  values: SignupFormSchemaType
): Promise<SignupResponseType> {
  return { error: "Signup is offline!", status: 500 };

  // const parsed = signupFormSchema.safeParse(values);

  // if (!parsed.success) {
  //   const { fieldErrors } = parsed.error.flatten();
  //   return { error: fieldErrors, status: 400 };
  // }

  // const { username, email, password } = parsed.data;

  // const isEmailTaken = await prisma.user.findUnique({
  //   where: { email },
  //   select: { id: true },
  // });

  // if (isEmailTaken) {
  //   return { error: "Email is already taken.", status: 409 };
  // }

  // const isUsernameTaken = await prisma.user.findUnique({
  //   where: { name: username },
  //   select: { id: true },
  // });

  // if (isUsernameTaken) {
  //   return { error: "Username is already taken.", status: 409 };
  // }

  // const hashed = await bcrypt.hash(password, 10);

  // await prisma.user.create({
  //   data: { name: username, email, password: hashed },
  // });

  // return { error: null, status: 201 };
}

export async function signin(
  values: SigninFormSchemaType
): Promise<SigninResponseType> {
  const parsed = signinFormSchema.safeParse(values);

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return { error: fieldErrors, status: 400 };
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { error: "Invalid username or password.", status: 404 };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });

    return { error: null, status: 200 };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid username or password.", status: 500 };
        default:
          return { error: "Something went wrong!", status: 500 };
      }
    }
    throw error;
  }
}

export async function signout() {
  await signOut({ redirectTo: "/" });
}
