/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';

export default function LoadingSkeleton({ className = '' }) {
  return <div className={`skeleton ${className}`} />;
}
