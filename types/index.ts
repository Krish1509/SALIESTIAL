export interface Event {
  id: string;
  name: string;
  description: string;
  prizePool: string;
  category: "technical" | "gaming" | "cultural";
  image: string;
  date?: string;
  time?: string;
}

export interface Artist {
  id: string;
  name: string;
  description: string;
  image: string;
  day: number;
  time: string;
}

export interface ScheduleItem {
  day: number;
  date: string;
  events: {
    time: string;
    title: string;
    description?: string;
  }[];
}

