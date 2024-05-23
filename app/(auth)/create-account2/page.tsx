"use client";
import SocialLogin from "../../../components/social-login";
import { useFormState } from "react-dom";
import Input from "../../../components/input";
import Button from "../../../components/button";
import { PASSWORD_MIN_LENGTH } from "../../../lib/constants";
import createAccount2 from "./actions";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount2, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">회원가입</h1>
        {/* <h2 className="text-xl">Fill in the form below to join!</h2> */}
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
          name="koreanName"
          type="text"
          placeholder="성명"
          required
          errors={state?.fieldErrors.koreanName}
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          //   minLength={PASSWORD_MIN_LENGTH}
          required
          errors={state?.fieldErrors.password}
        />
        <Input
          name="confirm_password"
          type="password"
          placeholder="비밀번호 확인"
          required
          //   minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.confirm_password}
        />
        <Button text="회원가입" />
      </form>
      {/* <SocialLogin /> */}
    </div>
  );
}
