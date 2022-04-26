import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import APOD from "./APOD";
import Photo from "./MarsRover";
import EPIC from './EPIC'

const Dashboard = () => {
    const [ photo, setPhoto ] = useState()
    const [ photoDate, setPhotoDate ] = useState(undefined)
  const theme = createTheme({ palette: { mode: "dark" } });
  const date = new Date()
  const apodDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() - 1}`
  const getPhoto = async() => {
    let response = await fetch(`https://api.nasa.gov/EPIC/api/natural/date?api_key=JTfR8HeFYXa1mNFjcZN9GfBgRHDXgBYF5mlGn5dV`, {
        method: 'GET'
    })
    let json = await response.json()
    setPhotoDate(json[0].date.split('-'))
    setPhoto(json[0])
}


useEffect(() => {
    getPhoto()
}, [])



  return (
    <Box
      id='box'
      sx={{   
        "& > :not(style)": {
          m: 1,
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <div id="dashboard">
          <Paper
            id='left'
            elevation={3}
          >
            <EPIC photo={photo} photoDate={photoDate}/>
            <Photo />
          </Paper>
          <div id='right'>
          <Paper
            elevation={3}
            className="section"
            style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
          >
               <APOD />
           
          </Paper>
          <Paper
            elevation={3}
            className="section"
          >
            <APOD date={apodDate} />
          </Paper>
          </div>
        </div>
      </ThemeProvider>
    </Box>
  );
};

export default Dashboard;
