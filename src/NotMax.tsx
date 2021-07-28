import React, { useEffect, useState } from 'react';
import { getMaxsState, getMaxsStates, getMaxsStateTime } from './getMaxsState';
import { Button, Switch, Typography } from '@material-ui/core';

export function NotMax() {
  const [state, setState] = useState(undefined);
  const [time, setStateTime] = useState<Date | undefined>(undefined);
  const [states, setStates] = useState([]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    pullData().then(() => setRefreshing(false));
  }, []);

  const pullData = async ()=>{
    setState(await getMaxsState());
    setStateTime(await getMaxsStateTime())
  }

  useEffect(() => {
    pullData();
  }, []);


  let lastSeenTime = undefined;
  if (time) {
    const dif = Date.now() - time.getTime();
    const milliseconds = dif;
    const seconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);

    lastSeenTime = "";
    if (years > 0) {
      lastSeenTime += years + " years ago"
    } else if (days > 0) {
      lastSeenTime += days + " days ago"
    } else if (hours > 0) {
      lastSeenTime += hours + " hours ago"
    } else if (minutes > 0) {
      lastSeenTime += minutes + " minutes ago"
    } else if (seconds > 0) {
      lastSeenTime += seconds + " seconds ago"
    }

  }

  let content = null;
  if (state)
    content = <div>
      <Typography align='center'  variant="h5"> Last in {state} </Typography>
      <Typography align='center'  variant="h6"> {lastSeenTime} </Typography>

    </div>
  else
    content = <Typography align='center'  variant="h5">Finding Max...</Typography>



    

    return  <div
    // contentContainerStyle={{justifyContent: 'center', height:"100%" }}
    // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
    {content}
  </div>
}

// const styles = StyleSheet.create({
//   titleText: {
//     fontSize: 24,
//     textAlign: 'center'
//   }
// });