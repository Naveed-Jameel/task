import './App.css';
import { Routes, Route } from 'react-router-dom';
import Posts from './pages/posts';
import PostDetail from './pages/postDetail';
import Sidebar from './components/sidebar';
import AddPost from './pages/addPost';
import { useState } from 'react';
import Signin from './pages/signIn';
import Signup from './pages/signUp';

function App() {

  const [loginpop, setLoginpop] = useState(false);
  const [signuppop, setSignuppop] = useState(false);
  
  return (
    <div className="App">
      <Sidebar setLoginpop={ setLoginpop } setSignuppop={ setSignuppop }/>

      { loginpop && <Signin setLoginpop={ setLoginpop } setSignuppop={ setSignuppop }/> } 
      { signuppop && <Signup setLoginpop={ setLoginpop } setSignuppop={ setSignuppop }/> }

      <Routes>
        <Route exact path="/" element={<Posts/>} />
        <Route exact path="/post/:id" element={ <PostDetail/> } />
        <Route exact path="/add" element={ <AddPost/> } />
      </Routes>
    </div>
  );
}

export default App;
