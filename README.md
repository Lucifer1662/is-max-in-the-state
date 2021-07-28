# Is Max in the State?

Deployed at:
<a href="https://ismaxinthestaate.web.app/"> Is Max in the State? </a>

<img src="/example.gif"/>

## Purpose
To ask the important question of, is <a href="https://github.com/maxcaddie">max</a> in the state? 
<br/>
This is required since he frequently jumps the border without notice. 


## Features

### Brilliant geo-location logic, flawless in design
``` typescript
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
    if (d < distance) {
      bestPlace = place;
      distance = d;
    }
  });

  return bestPlace;
}
```

## Privacy Concerns?
Only the current state is saved online, with a timestamp
