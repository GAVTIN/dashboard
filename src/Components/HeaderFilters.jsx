/* eslint-disable react/prop-types */
import { Paper, Grid, Typography } from '@mui/material';

const HeaderFilters = ({ data, tableRenderer }) => {
  const handleClick = (name, value, index) => {
    tableRenderer(index)
    console.log(index)
  };

  return (
        <Grid container spacing={2.5} sx={{margin: "0 auto", paddingBottom: "10px"}}>
          {data?.map((paper, index) => (
            <Grid item xs={1.7} key={index}>
              <Paper
                onClick={() => handleClick(paper.name, paper.value, index)}
                sx={{
                  padding: 1,
                  cursor: 'pointer',
                  textAlign: 'center',
                  boxShadow: 3,
                  background: 'linear-gradient(to right, #64b5f6, #1976d2)',
                  // backgroundColor: "#80D0C7",
                  color: 'black',
                  height: '70%',
                  width: '80%'
                }}
              >
                <Typography variant="body1">{paper.name}</Typography>
                <Typography variant="body2">{paper.value}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
  );
};

export default HeaderFilters;