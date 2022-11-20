import PostList from "./components/PostList"
import PostCreate from "./components/PostCreate"

function App() {
  return (
    <div className="container">
      <h1>Create a New Post</h1>
      <PostCreate />
      <hr />
      <h1>Posts</h1>
      <PostList />
    </div>
  );
}

export default App;
