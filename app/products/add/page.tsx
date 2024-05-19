"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { uploadProduct } from "./actions";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { ProductType, productSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface ImgurResponseProps {
  status: number;
  success: boolean;
  data: {
    link: string;
  };
}

export default function AddProudct() {
  const [preview, setPreview] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imgurUrl, setImgurUrl] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<ProductType>({ resolver: zodResolver(productSchema) });
  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
    setFile(file);
    const imgurUploadUrl = "https://api.imgur.com/3/image";
    setUploadUrl(imgurUploadUrl);
    const imgurUrl = await getImgurUrl();
    console.log(imgurUrl);
    setValue("photo", imgurUrl!);
    setImgurUrl(imgurUrl!);
  };

  const getImgurUrl = async () => {
    if (!file) {
      return;
    }
    const imgurForm = new FormData();
    imgurForm.append("image", file);
    imgurForm.append("type", "image");
    const response = await fetch(uploadUrl, {
      method: "post",
      body: imgurForm,
      headers: {
        Authorization: "Client-ID 293c55462c2217c",
        Accept: "application/json",
      },
    });
    const imgurResponse: ImgurResponseProps = await response.json();
    console.log(imgurResponse);
    if (response.status !== 200) {
      return;
    }
    return imgurResponse.data.link;
  };

  const onSubmit = handleSubmit(
    async (data: ProductType) => {
      console.log(data);
      // const imgurResponse: ImgurResponseProps = await getImgurUrl();
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("price", data.price + "");
      formData.append("description", data.description);
      formData.append("photo", imgurUrl);
      const errors = await uploadProduct(formData);
      if (errors) {
        // setError('')
      }
    },
    (error) => {
      console.log(error);
    }
  );

  const onValid = async () => {
    console.log(errors);
    await onSubmit();
  };

  return (
    <div>
      <form action={onValid} className="p-5 flex flex-col gap-5">
        <label
          htmlFor="photo"
          className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300
           border-neutral-300 rounded-md border-dashed cursor-pointer"
          style={{ backgroundImage: `url(${preview})` }}
        >
          {preview === "" ? (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">
                사진을 추가해주세요.
                {errors.photo?.message}
              </div>
            </>
          ) : null}
        </label>
        <input
          type="file"
          onChange={onImageChange}
          id="photo"
          name="photo"
          accept="image/*"
          className="hidden"
        />
        <Input
          placeholder="제목"
          type="text"
          {...register("title")}
          errors={[errors.title?.message ?? ""]}
        />
        <Input
          type="number"
          placeholder="가격"
          {...register("price")}
          errors={[errors.price?.message ?? ""]}
        />
        <Input
          type="text"
          placeholder="자세한 설명"
          {...register("description")}
          errors={[errors.description?.message ?? ""]}
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
