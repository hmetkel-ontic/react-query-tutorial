import { useQuery } from 'react-query';
import { getPosts } from './api/posts';

export default function PostList1() {
  const postQuery = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  if (postQuery.status === 'error') {
    return <h1> {JSON.stringify(postQuery.error)}</h1>;
  }

  if (postQuery.status === 'loading') {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>Post List 1</h1>
      <ul>
        {postQuery.data.map(item => (
          <ol key={item.id}>{item.title}</ol>
        ))}
      </ul>
    </>
  );
}
