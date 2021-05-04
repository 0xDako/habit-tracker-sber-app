import React from "react"

///////////////////////////////////
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
const MainPage = () => {
    return(
        <React.Fragment>
        <Grid item xs={4}>
          <Paper>item</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>item</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>item</Paper>
        </Grid>
        </React.Fragment>
    )
}

export default MainPage;
