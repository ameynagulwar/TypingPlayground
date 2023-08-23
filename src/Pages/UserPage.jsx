import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import TableUserData from '../Components/TableUserData';
import Graph from '../Components/Graph.jsx';
import UserInfo from '../Components/UserInfo';

const UserPage = () => {

  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([])
  const [user, loading] = useAuthState(auth)
  const [dataLoading, setDataLoading] = useState(true)
  const navigate = useNavigate();

  const fetchUserData = () => {
     const resultsRef = db.collection('Results');
     const {uid} = auth.currentUser;
     let tempData = [];
     let tempGraphdata = [];
     resultsRef.where('userId', '==', uid).orderBy('timeStamp','desc').get().then((snapshot) => {
        snapshot.docs.forEach((doc) => {
           tempData.push({...doc.data()});
           tempGraphdata.push([doc.data().timeStamp.toDate().toLocaleString().split(',')[0], doc.data().wpm])
        })
        setData(tempData);
        setDataLoading(false)
        setGraphData(tempGraphdata.reverse())
     })
  }

  useEffect(() => {
     if(!loading && user){
       fetchUserData();
     }
     if(!loading && !user){
      navigate('/')
     }
  },[loading])

  if(loading || dataLoading){
    <div className="center-os">
      <CircularProgress size={200}/>
    </div>
  }

  return (
    <div className='canvas'>
         <span id='user-pagelogo'><i>T</i>P</span>
         <UserInfo totalTestTaken={data.length}/>
      <div className="graph-user-page">
         <Graph graphData={graphData} type='date'/>
      </div>
      <TableUserData data={data}/>
    </div>
  )
}

export default UserPage