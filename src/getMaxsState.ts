import {firestore} from './firebase';


export async function getMaxsState(){
   const data = await (await firestore.collection("users").doc("max").get()).data();
   return data?.state;
}

export async function getMaxsStateTime(){
   const data = await (await firestore.collection("users").doc("max").get()).data();
   return data?.stateTime?.toDate();
}

export async function getMaxsStates(){
   const data = await (await firestore.collection("users").doc("max").get()).data();
   
   if(data?.states === undefined)
      return []
   return data.states;
}
