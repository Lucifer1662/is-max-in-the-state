import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Divider, Switch, Typography } from '@material-ui/core';
import Max from './Max';
import { NotMax } from './NotMax';
import { Background } from './Background';

async function save(key: string, value: string) {
  localStorage.setItem(key, value);
}

function getValueFor(key: string) {
  return localStorage.getItem(key);
}





export default function App() {
  const [iAmMax, setIamMax] = useState(false);

  useEffect(() => {
    const isMax = getValueFor('isMax');
    if (isMax) {
      setIamMax(isMax === 'true');
    }

  });

  const dark = '';
  const light = '';

  return (
    <div style={{ display: 'flex', width: '100%', height: "100%", flexDirection: 'column', alignItems: 'center', }} >
      <div style={{
        width: "100%", background: dark,
        flex: 'display', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        backgroundColor:'white'
      }}>
        <Typography align='center' variant='h4' style={{ color: 'black', marginTop: 25, marginBottom: 25 }}>{"Is Max in The State?"}</Typography>

      </div>


      <Divider style={{ width: '100%' }} />
      <Background style={{position:'absolute', zIndex:-1}}/>
      
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>
        <Card style={{ margin: 20 }}>
          <CardContent>
            {iAmMax ? <Max /> : <NotMax />}
            <Divider style={{ width: '100%', marginTop: 10, marginBottom:10 }} />
            <div style={{width:'100%', flexDirection:'row', display:'flex', justifyContent:'center', alignItems:'center'}}>
          
            <Typography variant='body1' style={{ display: 'inline' }}>{iAmMax ? "I am Max" : "I am not Max"}</Typography>
            <Switch
              size='medium'
              checked={iAmMax} onChange={(e: any) => {
                const isMax = e.target.checked;
                console.log(e.target.checked)
                setIamMax(isMax); save('isMax', isMax ? 'true' : 'false')
              }} />
              </div>
          </CardContent>
        </Card>
      </div>
      
    </div>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: Constants.statusBarHeight
//   },
//   titleText: {
//     fontSize: 30,
//     fontWeight: "bold"
//   }
// });
