import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

// Zustand store for habit data
export interface Habit {
    id: string;
    name: string;
    frequency: "daily" | "weekly";
    completedDates: string[];
    createdAt: string;
}

interface HabitState {
    habits: Habit[];
    addHabit: (name: string, frequency: "daily" | "weekly") => void;
    removeHabit: (id: string) => void;
    toggleHabit: (id: string, date: string) => void;
}

const useHabitStore = create<HabitState>()(
    devtools(
        persist(
            (set) => ({
                habits: [],
                addHabit: (name, frequency) => set((state) => ({
                    habits: [
                        ...state.habits,
                        {
                            id: Date.now().toString(),
                            name,
                            frequency,
                            completedDates: [],
                            createdAt: new Date().toISOString(),
                        },
                    ],
                })),
                removeHabit: (id) => set((state) => ({
                    habits: state.habits.filter((habit) => habit.id !== id),
                })),
                toggleHabit: (id, date) => set((state) => ({
                    habits: state.habits.map((habit) =>
                        habit.id === id
                            ? {
                                  ...habit,
                                  completedDates: habit.completedDates.includes(date)
                                      ? habit.completedDates.filter((d) => d !== date)
                                      : [...habit.completedDates, date],
                              }
                            : habit
                    ),
                })),
            }),
            {
                name: "habit-storage", // unique name for the storage
                storage:createJSONStorage(()=>sessionStorage)
            }
        )
    )
);

export default useHabitStore;
