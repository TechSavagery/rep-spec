import React from 'react';
import { useSWRInfinite } from 'swr';
import Link from 'next/link';
import { useUser } from '@/hooks/index';
import fetcher from '@/lib/fetch';
import { defaultProfilePicture } from '@/lib/default';

function RepSpec({ repSpec }) {
  const user = useUser(repSpec.creatorId);
  return (
    <>
      <style jsx>
        {`
          div {
            box-shadow: 0 5px 10px rgba(0,0,0,0.12);
            padding: 1.5rem;
            margin-bottom: 0.5rem;
            transition: box-shadow 0.2s ease 0s;
          }
          div:hover {
            box-shadow: 0 8px 30px rgba(0,0,0,0.12);
          }
          small {
            color: #777;
          }
        `}
      </style>
      <div>
        {user && (
          <Link href={`/user/${user._id}`}>
            <a style={{ display: 'inline-flex', alignItems: 'center' }}>
              <img width="27" height="27" style={{ borderRadius: '50%', objectFit: 'cover', marginRight: '0.3rem' }} src={user.profilePicture || defaultProfilePicture(user._id)} alt={user.name} />
              <b>{user.name}</b>
            </a>
          </Link>
        )}
        <pre>
          {JSON.stringify(repSpec, undefined, 4)}
        </pre>
        <small>{new Date(repSpec.createdAt).toLocaleString()}</small>
      </div>
    </>
  );
}

const PAGE_SIZE = 10;

export function useRepSpecPages({ creatorId } = {}) {
  return useSWRInfinite((index, previousPageData) => {
    // reached the end
    if (previousPageData && previousPageData.posts.length === 0) return null;

    // first page, previousPageData is null
    if (index === 0) {
      return `/api/rep-specs?limit=${PAGE_SIZE}${
        creatorId ? `&by=${creatorId}` : ''
      }`;
    }

    // using oldest posts createdAt date as cursor
    // We want to fetch posts which has a datethat is
    // before (hence the .getTime() - 1) the last post's createdAt
    const from = new Date(
      new Date(
        previousPageData.respspecs[previousPageData.posts.length - 1].createdAt,
      ).getTime() - 1,
    ).toJSON();

    return `/api/rep-specs?from=${from}&limit=${PAGE_SIZE}${
      creatorId ? `&by=${creatorId}` : ''
    }`;
  }, fetcher, {
    refreshInterval: 10000, // Refresh every 10 seconds
  });
}

export default function RepSpecs({ creatorId }) {
  const {
    data, error, size, setSize,
  } = useRepSpecPages({ creatorId });

  const repSpecs = data ? data.reduce((acc, val) => [...acc, ...val.repSpecs], []) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore = isLoadingInitialData || (data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0].repSpecs?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.repSpecs.length < PAGE_SIZE);

  return (
    <div>
      {repSpecs.map((repSpec) => <RepSpec key={repSpec._id} repSpec={repSpec} />)}
      {!isReachingEnd && (
      <button
        type="button"
        style={{
          background: 'transparent',
          color: '#000',
        }}
        onClick={() => setSize(size + 1)}
        disabled={isReachingEnd || isLoadingMore}
      >
        {isLoadingMore ? '. . .' : 'load more'}
      </button>
      )}
    </div>
  );
}
