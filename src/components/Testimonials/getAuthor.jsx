import { getUserDetailsById } from '../../api/users.js';
import React, { useEffect, useState } from 'react';

export const getAuthor = async ({ id }) => {
  const author = await getUserDetailsById({ id });
  return author;
};
export const getAuthorName = async ({ id }) => {
  try {
    const author = await getUserDetailsById({ id });
    return {
      name: author.name,
    };
  } catch (error) {
    console.error('Error fetching author details:', error);
    throw error;
  }
};

const AuthorTestimonialsInfo = ({ author }) => {
  const [authorName, setAuthorName] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { name } = await getAuthorName({ id: author });
        setAuthorName(name);
      } catch (error) {
        console.error('Error fetching author name:', error);
      }
    })();
  }, [author]);

  return <div>{authorName}</div>;
};
export default AuthorTestimonialsInfo;
