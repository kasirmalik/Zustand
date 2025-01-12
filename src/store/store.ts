import { create } from "zustand";
import { devtools } from "zustand/middleware";

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
    addHabit: (name:string,frequency:"daily" | "weekly") => void;
    removeHabit: (id: string) => void;
    toggleHabit:(id:string, date:string)=>void;
}

 const useHabitStore = create<HabitState>()(devtools((set) => {
    return {
        habits: [],
        addHabit: (name, frequency) => set((state)=>{
            return {
                habits:[
                    ...state.habits,{
                        id:Date.now().toString(),
                        name,
                        frequency,
                        completedDates: [],
                        createdAt: new Date().toISOString(),
                    }
                ]
            }
        }),
        removeHabit: (id) => set((state) => {
            return {
                habits: state.habits.filter(habit => habit.id !== id)
            };
        }),
       toggleHabit:(id,date)=> 
        set((state)=>({
            habits:state.habits.map((habit)=>
                habit.id === id
            ? {
                ...habit,
                completedDates:habit.completedDates.includes(date)
                ? habit.completedDates.filter((d)=>d !==date)
                : [...habit.completedDates,date]
            }
            : habit
            ),
        })),
            
    } 
}));

export default useHabitStore;

