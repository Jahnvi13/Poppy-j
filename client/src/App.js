import React from 'react'
import { Typography, AppBar } from '@material-ui/core'; 
import { makeStyles } from '@material-ui/core/styles';
import VideoPlayer from './components/video';
import Notifications from './components/button';
import Options from './components/bar';

const useStyles = makeStyles((theme) => ({
    appBar: {
      display: 'flex',
      margin: '30px 100px',
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      width: '600px',
      borderRadius: 10,
      border: '2px solid black',
  
      [theme.breakpoints.down('xs')]: {
        width: '90%',
      },
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
    image: {
      marginLeft: '15px',
    },
    
}));

const App = () => {
    const classes = useStyles();
    return ( 
        <div className ={classes.wrapper}>
           <AppBar className={classes.appBar} position="static" colour="inherit">
                <Typography variant="h2" align="center">Poppy</Typography>
            </AppBar>
            <VideoPlayer/>
            <Options>
                <Notifications/>
            </Options>
            
            
        </div>
     );
}
 
export default App;