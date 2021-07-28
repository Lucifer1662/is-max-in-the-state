import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import { setMaxsState } from './setMaxsState';
import { getMaxsState, getMaxsStateTime } from './getMaxsState';


interface LocationMesssage {
  locations: any[]
}



function closestPlace(longitude: number, latitude: number) {
  const PLACES = [
    { latitude: -33.8688, longitude: 151.2093, state: "NSW", place: "Sydney" },
    { latitude: -35.2809, longitude: 149.1300, state: "ACT", place: "Canbera" },
    { latitude: -37.8136, longitude: 144.9631, state: "VIC", place: "Melbourne" },
    { latitude: -16.9203, longitude: 145.7710, state: "QLD", place: "Cairns" },
    { latitude: -27.4705, longitude: 153.0260, state: "QLD", place: "Brisbane" }

  ]

  let distance = 1000000000000000000;
  let bestPlace = { state: "", place: "" };
  PLACES.forEach((place) => {
    const d = Math.abs(longitude - place.longitude + latitude - place.latitude);
    console.log(d + place.place)
    if (d < distance) {
      bestPlace = place;
      distance = d;
    }
  });

  return bestPlace;
}






export default function Max() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [state, setState] = useState<any>(undefined);
  const [time, setStateTime] = useState<Date | undefined>(undefined);


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    pullData().then(() => setRefreshing(false));
  }, []);

  const pullData = async () => {
    setState(await getMaxsState());
    setStateTime(await getMaxsStateTime());
  }


  let lastSeenTime = undefined;
  if (time) {
    const dif = Date.now() - time.getTime();
    const milliseconds = dif;
    const seconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);

    lastSeenTime = "Updated ";
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
    } else {
      lastSeenTime += "now";
    }

  }

  let content = null;
  if (state)
    content = <div>
      <Typography align='center' variant="h5"> Last in {state} </Typography>
      <Typography align='center' variant="h6"> {lastSeenTime} </Typography>

    </div>
  else
    content = <div>Finding Max...</div>


  useEffect(() => {
    pullData();
    const getPosition = (location: any) => {
      console.log(location)
      if (location && location.coords && location.coords.latitude && location.coords.longitude) {
        const place = closestPlace(location.coords.latitude, location.coords.longitude);
        if (place && place.state !== undefined) {
          //@ts-ignore
          const state = setMaxsState(place.state);
          console.log(state)
          setState(state.state);
          setStateTime(state.stateTime)
        }

      }
    }

    navigator.geolocation.getCurrentPosition(getPosition);
  }, []);

  return <div
  // contentContainerStyle={{ justifyContent: 'center', height: "100%" }}
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