import { DateTime } from "luxon";
import { useMemo } from "react";
import { ISOToFormatDate } from "../helpers";
import { slotsRoute } from "../helpers/apiRoutes";
import { ServerSlot, Slot, SlotDate } from "../models/slot.model";
import { useFetchData } from "./useFetchData";

export const useGetTimeSlotsByCompany = () => {
  const { data, ...query } = useFetchData<ServerSlot[]>(slotsRoute);

  const dataGroupedByDate: Slot[] | undefined = useMemo(
    () =>
      data?.map(({ time_slots, ...company }) => {
        const sortedTimeSlots = time_slots.sort(
          (a, b) =>
            DateTime.fromISO(a.end_time).toMillis() -
            DateTime.fromISO(b.end_time).toMillis()
        );

        const dates = sortedTimeSlots.reduce<SlotDate[]>((arr, slot) => {
          const currentSlotDate = ISOToFormatDate(slot.start_time);

          const dateIndex = arr.findIndex((i) => i.date === currentSlotDate);

          const updatedArr = [...arr];

          if (dateIndex > -1) {
            updatedArr[dateIndex].time_slots.push(slot);
          } else {
            updatedArr.push({
              date: currentSlotDate,
              time_slots: [slot],
            });
          }

          return updatedArr;
        }, []);

        return { ...company, dates };
      }),
    [data]
  );

  return { data: dataGroupedByDate, ...query };
};
