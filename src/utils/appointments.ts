import { addMinutes, format, parse } from 'date-fns';
import { AppointmentSlot, AppointmentSchedule } from '../types/appointment';
import { businessConfig } from '../config/business';

export function generateTimeSlots(date: Date): AppointmentSlot[] {
  const dayOfWeek = format(date, 'EEEE') as keyof typeof businessConfig.hours;
  const hours = businessConfig.hours[dayOfWeek];
  
  if (hours.open === 'Closed') return [];

  const slots: AppointmentSlot[] = [];
  const startTime = parse(hours.open, 'HH:mm', date);
  const endTime = parse(hours.close, 'HH:mm', date);
  let currentTime = startTime;

  while (currentTime < endTime) {
    slots.push({
      startTime: currentTime,
      endTime: addMinutes(currentTime, 30),
      available: true,
    });
    currentTime = addMinutes(currentTime, 30);
  }

  return slots;
}

export function checkSlotAvailability(
  slot: AppointmentSlot,
  existingAppointments: AppointmentSchedule[]
): boolean {
  return !existingAppointments.some(
    (appointment) =>
      appointment.slots.some(
        (existingSlot) =>
          existingSlot.startTime <= slot.startTime &&
          existingSlot.endTime >= slot.endTime
      )
  );
}

export function formatTimeSlot(slot: AppointmentSlot): string {
  return `${format(slot.startTime, 'h:mm a')} - ${format(slot.endTime, 'h:mm a')}`;
}