import { create } from "zustand";

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
}

 const useHabitStore = create<HabitState>()((set) => {
    return {
        habits: [],
        addHabit: (name, frequency) => set((state)=>{
            return {
                habits:[
                 {
                    id:1,
                    name:"read",
                    frequency:"daily",
                    completedDates:[],
                    createdAt:new Date().toISOString()
                 }   
                ]
            }
        })
            
    } 
});

export default useHabitStore;

