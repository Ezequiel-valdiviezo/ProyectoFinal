import React, { useEffect, useState } from "react";

function Foro(){

    const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts'));
    if (storedPosts) {
      setPosts(storedPosts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      const updatedPosts = [
        ...posts,
        { id: Date.now(), content: newPost, comments: [] },
      ];
      setPosts(updatedPosts);
      setNewPost('');
    }
  };

  const handleCommentSubmit = (postId, comment) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <div className="container my-4">
      <h1>Foro para Padres Primerizos</h1>
      <form onSubmit={handlePostSubmit}>
        <div className="mb-3">
          <textarea 
            className="form-control" 
            rows="3" 
            value={newPost} 
            onChange={handlePostChange} 
            placeholder="Escribe tu pregunta o comentario aquí..."
          ></textarea>
        </div>
        <button className="btn btn-primary mb-4" type="submit">Publicar</button>
      </form>
      <ul className="list-group">
        {posts.map(post => (
          <li className="list-group-item" key={post.id}>
            <div className="d-flex justify-content-between">
              <strong>Ezequiel:</strong>
              <span>{post.content}</span>
            </div>
            <div className="mt-3">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Añadir un comentario..." 
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    handleCommentSubmit(post.id, e.target.value.trim());
                    e.target.value = '';
                  }
                }}
              />
            </div>
            <ul className="list-group list-group-flush mt-2">
              {post.comments.map((comment, index) => (
                <li className="list-group-item" key={index}>
                  Ezequiel: {comment}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Foro;