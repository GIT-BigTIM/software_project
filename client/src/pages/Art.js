import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';

function Art() {
  let { id } = useParams();

  const [ artObject, setArtObject] = useState({});
  const [ listOfComment, setListOfComment] = useState([]);
  const [ newComment, setNewComment] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/art/byId/${id}`).then((response) => {
      if(!response.data) {
        setArtObject({});
      } else {
        setArtObject(response.data);
      }
    });

    axios.get(`http://localhost:3001/comment/${id}`).then((response) => {
      if(!response.data) {
        setListOfComment([]);
      } else {
        setListOfComment(response.data);
      }
    });
  }, []);

  const addComment = () => {
    axios.post('http://localhost:3001/comment', {commentBody: newComment, ArtId: id},
      {
        headers: {
          accessToken: localStorage.getItem('accessToken')
        },
      }
    ).then((response) => {
      if(response.data.error) {
        alert('You Should Log In First');
        console.log(response.data.error);
      } else {
        console.log('Comment added!!!');
        const commentToAdd = {commentBody: newComment};
        setListOfComment([...listOfComment, commentToAdd]);
        setNewComment("");
      }
      
    });
  }

  return (
    <div className='artPost'>
      {id}
      <div className='postSection'>
        <div className="title">{artObject.title}</div>
        <div classname="price">{artObject.price}</div>
        <div className="size">{artObject.size}</div>
        <div className="desciption">{artObject.desciption}</div>
      </div>
      <div classname='commentSection'>
        <div claaname='addCommentContainer'>
          <input type='text' placeholder='Comment...' autoComplete='off' value={newComment} onChange={(event) => {setNewComment(event.target.value)}}/>
          <button onClick={addComment}> Add Comment </button>
        </div>
        <div className='listOfComment'></div>
        {listOfComment.map((comment, key) => {
          return (<div key={key} className='comment'> {comment.commetBody} </div>)
        })}
      </div>
    </div>

  )
}

export default Art
