interface BaseSlot {
  id: number;
  name: string;
  type: string;
}

export interface TimeSlot {
  start_time: string;
  end_time: string;
}

export interface ServerSlot extends BaseSlot {
  time_slots: TimeSlot[];
}

export interface SlotDate {
  date: string;
  time_slots: TimeSlot[];
}

export interface Slot extends BaseSlot {
  dates: SlotDate[];
}

export type ReservedSlots = Record<number, TimeSlot>;