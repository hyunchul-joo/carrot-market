"use server";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    username: z.string(),
    koreanName: z.string(),
    password: z.string(),
    confirm_password: z.string(),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.hanilUser.findUnique({
      where: { username },
      select: { id: true },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "이미 존재하는 아이디 입니다.",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPasswords, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirm_password"],
  });

export default async function createAccount2(
  prevState: any,
  formData: FormData
) {
  const data = {
    username: formData.get("username"),
    koreanName: formData.get("koreanName"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  }
  const hashedPassword = await bcrypt.hash(result.data.password, 12);
  const user = await db.hanilUser.create({
    data: {
      username: result.data.username,
      koreanName: result.data.koreanName,
      password: hashedPassword,
    },
    select: {
      id: true,
    },
  });

  const session = await getSession();
  session.id = user.id;
  await session.save();
  redirect("/calendar");
}
