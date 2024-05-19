import { atom } from "recoil";

export const modalState = atom({
  key: "modalOpen",
  default: false,
});

export const requestDate = atom({
  key: "requestDate",
  default: new Date(),
});
