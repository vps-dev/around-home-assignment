import { DateTime } from "luxon";
import { TimeSlot } from "../models/slot.model";

export const checkIfTimeSlotsOverlap = (
  timeSlot1: TimeSlot,
  timeSlot2: TimeSlot
) => {
  const timeSlot1Start = DateTime.fromISO(timeSlot1.start_time).toMillis()
  const timeSlot1End = DateTime.fromISO(timeSlot1.end_time).toMillis()
  const timeSlot2Start = DateTime.fromISO(timeSlot2.start_time).toMillis()
  const timeSlot2End = DateTime.fromISO(timeSlot2.end_time).toMillis()

  return timeSlot1Start < timeSlot2End  && timeSlot1End > timeSlot2Start
}
  

export const ISOToFormatDate = (time: string) =>
  DateTime.fromISO(time).startOf("day").toFormat("EEE, dd MMM yyyy");

export const timeSlotToFormatTime = (timeSlot: TimeSlot) =>
  `${DateTime.fromISO(timeSlot.start_time).toFormat(
    "HH:mm"
  )} - ${DateTime.fromISO(timeSlot.end_time).toFormat("HH:mm")}`;
