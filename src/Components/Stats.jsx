import React, { useEffect } from 'react'
import Graph from './Graph.jsx'
import { auth, db } from '../firebaseConfig.js';
import { toast } from 'react-toastify';

const Stats = (
    {wpm,
    accuracy,
    correctChar,
    incorrectChar,
    missedChar,
    extrachar,
    graphData}
) => {

   let timeSet = new Set();
   const newGraph = graphData.filter((i) => {
    if(!timeSet.has(i[0])){
      timeSet.add(i[0]);
      return i;
    }
   })

   const pushDataToDB = () => {
     if(isNaN(accuracy)){
      toast.error('Invalid Test...!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        return;
     }

     const resultsRef = db.collection('Results');
     const {uid} = auth.currentUser;
     resultsRef.add({
      wpm : wpm,
      accuracy : accuracy,
      timeStamp : new Date(),
      characters : `${correctChar}/${incorrectChar}/${missedChar}/${extrachar}`,
      userId : uid
     }).then((resolve) => {
        toast.success('Results saved to DataBase...!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
     }).catch((error) => {
        toast.error('Not able to saved results to DataBase...!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "Dark",
        });
     })
   }

   useEffect(() => {
     
    if(auth.currentUser){
      pushDataToDB();
    }
    else{
      toast.warning('Logged In to saved results to DataBase...!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "Dark",
        });
    }



   }, [])

  return (
    <div className='stats-box'>
        <div className='stats-left'>
            <div className="title">WPM</div>
            <div className="sub-title">{wpm}</div>
            <div className="title">Accuracy</div>
            <div className="sub-title">{accuracy}</div>
            <div className="title">Character</div>
            <div className="sub-title">{correctChar}/{incorrectChar}/{missedChar}/{extrachar}</div>
        </div>
        <div className="stats-right">
          <Graph graphData={newGraph}/>
        </div>
    </div>
  )
}

export default Stats