import { atom } from "recoil";
import { VacationsProps } from "./(auth)/calendar/actions";

export const modalState = atom({
  key: "modalOpen",
  default: false,
});

export const requestDate = atom({
  key: "requestDate",
  default: new Date(),
});

export const vacationAddClicked = atom({
  key: "vacationAddClicked",
  default: false,
});

export const selectedDateAtom = atom<Date | null>({
  key: "selectedDateAtom",
  default: null,
});

export const requestDatesAtom = atom<Date[]>({
  key: "requestDatesAtom",
  default: [],
});

export const allVacationsAtom = atom<VacationsProps>({
  key: "allVacationsAtom",
  default: [],
});
