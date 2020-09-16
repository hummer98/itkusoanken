import React from 'react'
import './App.css'
import { useEffect, useState } from 'react'
import { CircularProgress } from '@material-ui/core'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import * as Ballcap from '@1amageek/ballcap'
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Anken } from './models/Anken';
import { app } from 'firebase'

const initFirebase = async () => {
  if (firebase.apps.length === 0) {
    const response = await fetch("/__/firebase/init.json");
    const config = await response.json();

    const app = firebase.initializeApp(config);
    const db = firebase.firestore();
    if (window.location.hostname === "localhost") {
      db.settings({
        host: "localhost:8080",
        ssl: false
      });
    }
    Ballcap.initialize(app)
    await firebase.auth().signInAnonymously()
  } else {
    console.log('firebase.apps.notfound')
  }
}

const App = () => {
  const [firebaseLoaded, setFirebaseLoaded] = useState<Boolean>(false);
  useEffect(() => {
    const load = async () => {
      await initFirebase()
      setFirebaseLoaded(true)
    }

    load()
  }, [])

  if(!firebaseLoaded) return (<CircularProgress />)
  
  return (
    <>
    <ItemList />
    </>
  )
}
 
const ItemList: React.FC = () => {
  
  const [
    values,
    ,
    error,
  ] = useCollectionData<Anken>(app().firestore().collection(`version/1/anken`), {
    idField: "id",
  })

  if (error) {
    console.log(error)
    return <div>{`Error: ${error.message}`}</div>;
  }
  if (values === undefined) {
    return <div>まだ投稿がありません</div>
  }
  return (
    <>
    {values && values.map((value) => <div>{value.body}</div>)}
    </>
  )
}

export default App;