import { Box, Container, Typography } from "@mui/material";
import useHabitStore from "./store/store";
import AddHabitForm from './components/add-habit-form';
import HabitList from "./components/habit-list";

function App() {
  const store = useHabitStore();
  console.log(store)
  return (
    <>
      <Container>
        <Box>
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Habit Tracker
          </Typography>
          {/* form */}
          <AddHabitForm />
          {/* habit list */}
          <HabitList></HabitList>
          {/* stats */}
        </Box>
      </Container>
    </>
  )
}

export default App
