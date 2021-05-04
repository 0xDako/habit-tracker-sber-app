
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

const HabitBox = ({habbitName, progressValue, maxValue}) => {
    const linearProgressValue = progressValue/maxValue*100;
    return (
        <Box m={2}> 
            <Paper elevation={3} >
                <Box p={1}>
                    <Box display="flex" flexDirection="row" justifyContent="space-between" pb={1} pt={3}>
                        <div>{habbitName}</div>
                        <div>{progressValue}/{maxValue}</div>
                    </Box>
                    <LinearProgress variant="determinate" value={linearProgressValue} />
                </Box>
            </Paper>
        </Box>
    )
}

export default HabitBox;