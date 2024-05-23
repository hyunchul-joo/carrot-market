"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";
import moment from "moment";

export async function UploadVacations(formData: FormData) {
  const data = {
    type: formData.get("type") as string,
    requestDate1: formData.get("requestDate1"),
    requestDate2: formData.get("requestDate2"),
  };
  const session = await getSession();
  let startDate;
  let endDate;
  if (data.requestDate1) {
    startDate = moment(data.requestDate1 as any);
  }
  if (data.requestDate2) {
    endDate = moment(data.requestDate2 as any);
  }
  if (!startDate) return Promise.resolve(false);
  if (endDate) {
    let date = startDate;
    while (date.isSameOrBefore(endDate)) {
      date = date.add(1, "days");
      await db.vacation.create({
        data: {
          date: date.toDate(),
          type: data.type,
          HanilUser: {
            connect: {
              id: session.id,
            },
          },
        },
      });
    }
  } else {
    await db.vacation.create({
      data: {
        date: startDate.toDate(),
        type: data.type,
        HanilUser: {
          connect: {
            id: session.id,
          },
        },
      },
    });
  }
  return Promise.resolve(true);
}
