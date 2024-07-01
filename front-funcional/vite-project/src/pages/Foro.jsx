import React, { useEffect, useState } from "react";
import '../styles/foro.css'
import img from '../assets/fond1.jpeg'
import img2 from '../assets/2.png'

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
    <div className="container foro pt-5">
      <h2 className="text-center">Foro</h2>
      <p className="fs-3 fw-bold">¡Hola Ezequiel!</p>
      <p>Conectá con otros padres que están en la misma situación, o ya la pasaron.</p>
      <form onSubmit={handlePostSubmit} className="p-4">
        <p>Crear publicación</p>
        <div className="mb-3">
          <textarea 
            className="form-control" 
            rows="3" 
            value={newPost} 
            onChange={handlePostChange} 
            placeholder="Escribe tu pregunta o comentario aquí..."
          ></textarea>
        </div>
        <div className="form-container">    
          <div className="form-group">
            {/* <label htmlFor="imagen">Imagen</label> */}
            <input
              type="file"
              className="form-control cargaImg"
              id="imagen"
              name="imagen"
              accept="image/*"
              // onChange={handleChange}
              />
          </div>
          <button className="btn btn-primary" type="submit">Publicar</button>
        </div>
      </form>

      <div className="comentario mt-5">

        <ul className="list-group">
          {posts.map(post => (
            <li className="list-group-item custom-background mb-5" key={post.id}>
              <div className="">
                <img src={img} className="imgPerfilForo" alt="" />
                <strong>Ezequiel:</strong>
                <p className="m-2 p-2">{post.content}</p>
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
                {/* <p className="">Comentarios</p> */}
                {post.comments.map((comment, index) => (
                  <li className="list-group-item custom-background" key={index}>
                    <img src={img2} className="imgPerfilForo" alt="" />
                    Ezequiel: {comment}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        
      </div>
    </div>
  );
};

export default Foro;