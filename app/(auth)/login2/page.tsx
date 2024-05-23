"use client";

import { useFormState } from "react-dom";
import Input from "@/components/input";
import Button from "@/components/button";
import SocialLogin from "@/components/social-login";
import { logIn2 } from "./actions";

export default function LogIn() {
  const [state, dispatch] = useFormState(logIn2, null);
  return (
    <div className="flex flex-col gpa-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">로그인</h1>
        {/* <h2 className="text-xl">Log in with email and password.</h2> */}
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="username"
          type="text"
          placeholder="아이디"
          required
          errors={state?.fieldErrors.username}
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          errors={state?.fieldErrors.password}
        />

        <Button text="로그인" />
      </form>
      {/* <SocialLogin /> */}
    </div>
  );
}
