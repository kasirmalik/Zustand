import { Box, Paper, Grid, Typography, Button, LinearProgress } from "@mui/material"
import useHabitStore, { Habit } from "../store/store";
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteIcon from '@mui/icons-material/Delete'


function HabitList() {
    const {habits,removeHabit,toggleHabit}=useHabitStore();
    const today = new Date().toISOString().split("T")[0];
    const getStreak = (habit:Habit) => {
        let streak = 0
        const currentDate = new Date()
        while (true) {
            const dateString = currentDate.toISOString().split("T")[0]
            if(habit.completedDates.includes(dateString)){
                streak++
                currentDate.setDate(currentDate.getDate() - 1)
            } else{
                break
            }
        }
        return streak
    }

  return (
    
    <Box sx={{display:"flex",flexDirection:"column",gap:"2",mt:4}}>
        {
            habits.map((habit)=>(
                <Paper key={habit.id} elevation={2} sx={{p:2}} >
                    <Grid container alignContent={"center"}>
                      <Grid xs={12} sm={6}>
                        <Typography variant="h6" >{habit.name}</Typography>
                        <Typography variant="body2" color="text-secondry">{habit.frequency}</Typography>
                      </Grid>
                      <Grid xs={12} sm={6}>
                          <Box sx={{display:"flex",justifyContent:"flex-end",gap:1}}>
                                <Button variant="outlined"
                                color={
                                    habit.completedDates.includes(today) ? "success" : "primary"
                                }
                                startIcon={<CheckCircleIcon/>}
                                onClick={() => toggleHabit(habit.id,today)}
                                >
                                    {habit.completedDates.includes(today)
                                    ? "completed"
                                    :"Mark Complete"
                                    }
                                </Button>
                                <Button variant="outlined" color="error" startIcon={<DeleteIcon/>}
                                 onClick={()=>removeHabit(habit.id)}
                                >
                                    Remove
                                </Button>
                          </Box>
                      </Grid>
                    </Grid>

                    <Box sx={{mt:2}}>
                        <Typography>Current Streak :{getStreak(habit)}</Typography>  
                        <LinearProgress 
                        variant="determinate"
                        value={(getStreak(habit)/30) * 100}
                        sx={{mt:1}}
                        />       
                    </Box>
                </Paper>
            ))
        }
    </Box>
  )
}

export default HabitList
