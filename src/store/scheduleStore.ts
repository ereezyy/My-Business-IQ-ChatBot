import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ScheduleState, AppointmentForm, AppointmentSlot } from '../types/appointment';
import { Service } from '../types/chat';

interface ScheduleStore extends ScheduleState {
  setSelectedService: (service: Service | null) => void;
  setSelectedDate: (date: Date | null) => void;
  setSelectedSlot: (slot: AppointmentSlot | null) => void;
  updateForm: (form: Partial<AppointmentForm>) => void;
  resetSchedule: () => void;
}

const initialState: ScheduleState = {
  selectedService: null,
  selectedDate: null,
  selectedSlot: null,
  form: null,
};

export const useScheduleStore = create<ScheduleStore>()(
  persist(
    (set) => ({
      ...initialState,
      setSelectedService: (service) => set({ selectedService: service }),
      setSelectedDate: (date) => set({ selectedDate: date }),
      setSelectedSlot: (slot) => set({ selectedSlot: slot }),
      updateForm: (formData) =>
        set((state) => ({
          form: { ...state.form, ...formData } as AppointmentForm,
        })),
      resetSchedule: () => set(initialState),
    }),
    {
      name: 'schedule-storage',
    }
  )
);