import React
// , { useState, useEffect }
from "react";
// import axios from "axios";

const CommentList = ({ comments }) => {
  // const [comments, setComments] = useState(postComments);

  // const fetchData = async () => {
  //   const res = await axios.get(
  //     `http://localhost:4001/posts/${postId}/comments`
  //   );

  //   setComments(res.data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const renderedComments = comments.map((comment) => {
    switch(comment.status){
      case "approved":
        return <li key={comment.id}>{comment.content}</li>;
      case "rejected":
        return <li key={comment.id}>
          <i className="text-danger">This comment include rude words !!!</i>
        </li>;
      default:
        return <li className="text-warning" key={comment.id}>This comment is still waiting approval</li>;

    }
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
