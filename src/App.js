import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const posts = [
  {
    id: 1,
    title: 'Post 1',
  },
  {
    id: 2,
    title: 'Post 2',
  },
];

function wait(duration) {
  return new Promise((resolve, reject) => setTimeout(resolve, duration));
}

function App() {
  const queryCache = useQueryClient();

  const postQuery = useQuery({
    queryKey: ['posts'],
    queryFn: () => wait(1000).then(() => [...posts]),
  });

  const newPostMutation = useMutation({
    mutationFn: title =>
      wait(1000).then(() => {
        posts.push({ id: crypto.randomUUID, title });
      }),
    onSuccess: () => {
      queryCache.invalidateQueries('posts');
    },
  });

  if (postQuery.error) {
    return <h3>{JSON.stringify(postQuery.error)}</h3>;
  }
  if (postQuery.isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="App">
      <h1>Tanstack react-query</h1>
      {postQuery.data.map(post => (
        <h4 key={post.id}>{post.title}</h4>
      ))}

      <button
        disabled={newPostMutation.isLoading}
        onClick={() => newPostMutation.mutate('New Post')}
      >
        Add New
      </button>
    </div>
  );
}

export default App;
