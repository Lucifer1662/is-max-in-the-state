import {firestore} from './firebase';

interface State{
   state: string,
   start: Date,
   end: Date
}

interface User{
   states: State[],
   state: State,
   stateTime: Date
}

export function setMaxsState(state: string){
   let maxDoc = firestore.collection("users").doc("max");

   // let data : User = (await maxDoc.get()).data() as User;
   // let history = data.states ? data.states : [];

   // const now = new Date(Date.now());
   // if(history.length == 0 || history[history.length-1].state !== state){
      
   //    history.push({state:state, start: now, end: now});
   // }else{
   //    let s = history[history.length-1];
   //    s.end = now;
   // }
   // const l = 5;
   // if(history.length - l > 0)
   //    history.splice(0, history.length - l);
   const data = {state, stateTime: new Date(Date.now())};
   maxDoc.set(data, {merge:true});
   return data;
}
