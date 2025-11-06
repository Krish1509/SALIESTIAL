import { ScheduleItem } from "@/types";

export const schedule: ScheduleItem[] = [
  {
    day: 1,
    date: "Day 1 - Opening Ceremony",
    events: [
      { time: "9:00 AM", title: "Inauguration & Lamp Lighting" },
      { time: "10:00 AM", title: "Hackathon Begins" },
      { time: "11:00 AM", title: "Robo Soccer - Round 1" },
      { time: "2:00 PM", title: "Line Follower Competition" },
      { time: "4:00 PM", title: "Valorant - Group Stage" },
      { time: "7:00 PM", title: "Nightfall - Suhani Shah Performance" },
    ],
  },
  {
    day: 2,
    date: "Day 2 - Main Events",
    events: [
      { time: "9:00 AM", title: "RC Robo Race - Qualifiers" },
      { time: "10:00 AM", title: "Autonomous Maze Solver" },
      { time: "11:00 AM", title: "Drone Race - Prelims" },
      { time: "2:00 PM", title: "BGMI - Semi Finals" },
      { time: "4:00 PM", title: "Hackathon - Mid Evaluation" },
      { time: "8:00 PM", title: "Nightfall - Amit Trivedi Concert" },
    ],
  },
  {
    day: 3,
    date: "Day 3 - Finals & Closing",
    events: [
      { time: "9:00 AM", title: "Robo Soccer - Finals" },
      { time: "10:00 AM", title: "Drone Race - Finals" },
      { time: "11:00 AM", title: "Valorant - Grand Finals" },
      { time: "2:00 PM", title: "BGMI - Grand Finals" },
      { time: "4:00 PM", title: "Hackathon - Final Presentations" },
      { time: "6:00 PM", title: "Prize Distribution Ceremony" },
      { time: "7:30 PM", title: "Nightfall - Aditya Gadhvi Performance" },
      { time: "9:00 PM", title: "Closing Ceremony" },
    ],
  },
];

