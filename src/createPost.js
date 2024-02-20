import { useMutation, useQueryClient } from 'react-query';
import { useRef } from 'react';
import { createPost } from './api/posts';
import Post from './post';

export default function CreatePost({ onPageChange }) {
  const titleRef = useRef();
  const bodyRef = useRef();
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    // onmutate runs before mutation function
    onMutate: () => ({ hi: 'Bye' }),
    onSuccess: (data, variables, context) => {
      // manually updating the cache for the new post so the fetch query is faster
      queryClient.setQueryData(['posts', data.id], data);
      onPageChange(<Post id={data.id} />);
      queryClient.invalidateQueries(['posts'], {
        exact: true, //  only invalidate those query key which have exact match
      });
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    createPostMutation.mutate({
      title: titleRef.current.value,
      body: bodyRef.current.value,
    });
  }

  return (
    <div>
      {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <input id="body" ref={bodyRef} />
        </div>
        <button disabled={createPostMutation.isLoading}>
          {createPostMutation.isLoading ? 'Loading...' : 'Create'}
        </button>
      </form>
    </div>
  );
}
