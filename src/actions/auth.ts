"use server";
import {
  SigninFormSchemaType,
  SignupFormSchemaType,
  signinFormSchema,
  // signupFormSchema,
} from "@/lib/schemas";
// import * as bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { SigninResponseType, SignupResponseType } from "@/lib/types";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

export async function signup(
  values: SignupFormSchemaType,
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
  values: SigninFormSchemaType,
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

export async function updateName(
  prevState: { error: string | null } | undefined,
  formData: FormData,
) {
  const session = await auth();
  if (!session) {
    return { error: "Oops, Something went wrong!" };
  }
  const newName = formData.get("name") as string;
  if (session.user.name === newName) return;

  try {
    const isUsernameTaken = await prisma.user.findUnique({
      where: { name: newName },
      select: { id: true },
    });

    if (isUsernameTaken) {
      return { error: "Username is already taken." };
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { name: newName },
    });
    return { error: null, status: 200 };
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      return {
        error: "Oops, Something went wrong!",
      };
    }
    return { error: "Username is already taken." };
  }
}
