import { create } from 'zustand';

interface IEvent {
  eventId: number | null;
  setEventId: (id: string) => void;
}

const useEventStore = create<IEvent>((set) => ({
  eventId: typeof window !== 'undefined' ? Number(localStorage.getItem('eventId')) : null,
  setEventId: (id) => {
    localStorage.setItem('eventId', id);
    set({ eventId: Number(id) });
  },
}));

export default useEventStore;
