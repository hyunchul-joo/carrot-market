"use server";

import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkUsernameExists = async (username: string) => {
  const user = await db.hanilUser.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchema = z.object({
  username: z
    .string()
    .refine(checkUsernameExists, "아이디가 존재하지 않습니다."),
  password: z.string(),
});

export async function logIn2(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.hanilUser.findUnique({
      where: {
        username: result.data.username,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(
      result.data.password,
      user?.password ?? "xxxx"
    );
    if (ok) {
      const session = await getSession();
      session.id = user?.id;
      await session.save();
      redirect("/calendar");
    } else {
      return {
        fieldErrors: {
          password: ["비밀번호가 틀렸습니다."],
          username: [],
        },
      };
    }
  }
}
