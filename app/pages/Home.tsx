import React, { ReactNode } from 'react';

const Home: React.FC<{children: ReactNode}> = ({ children }) => {
  return (
    <>
      <section>{children}</section>
    </>
  );
};

export default Home;
