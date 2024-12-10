import { Service } from './chat';

export interface AppointmentSlot {
  startTime: Date;
  endTime: Date;
  available: boolean;
  serviceId?: string;
}

export interface AppointmentSchedule {
  date: Date;
  slots: AppointmentSlot[];
}

export interface AppointmentForm {
  serviceId: string;
  date: Date;
  time: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
}

export interface ScheduleState {
  selectedService: Service | null;
  selectedDate: Date | null;
  selectedSlot: AppointmentSlot | null;
  form: AppointmentForm | null;
}