import React,{useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [movieName, setmovieName] = useState('');
  const [movieReview, setmovieReview] = useState('');
  const [movieList, setmovieList] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:3001/api/get')
    .then((response)=>{
      setmovieList(response.data);
    });
  },[])

  const onSubmitReview = ()=>{
    axios.post('http://localhost:3001/api/insert',{
      movieName:movieName,
      movieReview:movieReview
    }).then(()=>{
      alert("Successfully inserted");
    })
  }

  return (
    <div className="App">
      <h1>CRUD Application</h1>
      <div className="form">
        <label>Movie Name</label>
        <input type='text' name='movieName' onChange={(e)=>{setmovieName(e.target.value)}}/>
        <label>Movie Review</label>
        <input type='text' name='movieReview' onChange={(e)=>{setmovieReview(e.target.value)}}/>
        <button onClick={onSubmitReview}>Submit</button>
      </div>
      <div>
        {movieList.map((movie)=>{
          return (
            <div>
              <h1>{movie.movieName} | {movie.movieReview}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
