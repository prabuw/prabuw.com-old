import React from 'react';

export const Container = ({ className, children }) => (
  <div className={`${className} container mx-auto max-w-3xl px-8`}>{children}</div>
);
