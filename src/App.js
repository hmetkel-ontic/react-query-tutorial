import React from 'react';
import PostList1 from './postList1';
import PostList2 from './postList2';
import Post from './post';
import CreatePost from './createPost';

function App() {
  const [currentPage, setCurrentPage] = React.useState(<PostList1 />);

  return (
    <>
      <button onClick={() => setCurrentPage(<PostList1 />)}>Post List 1</button>
      <button onClick={() => setCurrentPage(<PostList2 />)}>Post List 2</button>
      <button onClick={() => setCurrentPage(<Post id={1} />)}>First Post</button>
      <button onClick={() => setCurrentPage(<CreatePost onPageChange={setCurrentPage} />)}>
        New Post
      </button>

      <hr />

      {currentPage}
    </>
  );
}

export default App;
