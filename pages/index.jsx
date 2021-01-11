import React from 'react';
import { useCurrentUser } from '@/hooks/index';
import PostEditor from '@/components/post/editor';
import Posts from '@/components/post/posts';
import RepSpecs from '@/components/repSpec/repSpecs';
import RepSpecEditor from '@/components/repSpec/editor';

const IndexPage = () => {
  const [user] = useCurrentUser();

  return (
    <>
      <style jsx>
        {`
          p {
            text-align: center;
            color: #888;
          }
          h3 {
            color: #555;
          }
        `}
      </style>
      <div style={{ marginBottom: '2rem' }}>
        <h2>
          Hello,
          {' '}
          {user ? user.name : 'stranger'}
          !
        </h2>
        <p>Let's lift some heavy shit! </p>

        <p>Enter Weight + Reps of any lift attempt to calculate 1RM!</p>
      </div>
      <div>
        <RepSpecEditor />
        <RepSpecs />
      </div>
    </>
  );
};

export default IndexPage;
