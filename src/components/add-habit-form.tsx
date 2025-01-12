
import { Box, FormControl, InputLabel, Select, TextField, MenuItem, Button } from '@mui/material';
import { useState } from 'react';
import useHabitStore from '../store/store';

function AddHabitForm() {
    const [name, setName] = useState('');
    const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
    

    const {habits,addHabit} = useHabitStore();
    console.log(habits);
    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
       if(name.trim() ){
           addHabit(name,frequency);
           setName('');
       }
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
      <Box sx={{display: 'flex', gap: 2}}>
        <TextField 
        label="habit name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Enter habit name'
        fullWidth
        ></TextField>
        <FormControl fullWidth>
            <InputLabel>Frequency</InputLabel>
            <Select
            label="Frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as "daily" | "weekly")}
            >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                
            </Select>
        </FormControl>
        <Button variant="contained" color="primary" type='submit'>Add Habit</Button>
      </Box>
      </form>
    </div>
  )
}

export default AddHabitForm
