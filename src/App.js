import React from 'react';
import PostList1 from './postList1';
import PostList2 from './postList2';
import Post from './post';
import CreatePost from './createPost';
import PostListPaginated from './postListPaginated';
import PostListInfinite from './postListInfinite';
import { useQueryClient } from 'react-query';
import { getPost } from './api/posts';

function App() {
  const [currentPage, setCurrentPage] = React.useState(<PostList1 />);
  const queryClient = useQueryClient();

  function onHoverPostOneLink() {
    queryClient.prefetchQuery({ queryKey: ['posts', 1], queryFn: () => getPost(1) });
  }

  return (
    <>
      <button onClick={() => setCurrentPage(<PostList1 />)}>Post List 1</button>
      <button onClick={() => setCurrentPage(<PostList2 />)}>Post List 2</button>
      <button onMouseEnter={onHoverPostOneLink} onClick={() => setCurrentPage(<Post id={1} />)}>
        First Post
      </button>
      <button onClick={() => setCurrentPage(<CreatePost onPageChange={setCurrentPage} />)}>
        New Post
      </button>
      <button onClick={() => setCurrentPage(<PostListPaginated />)}>Paginated List</button>
      <button onClick={() => setCurrentPage(<PostListInfinite />)}>Infinite List</button>

      <hr />

      {currentPage}
    </>
  );
}

export default App;
