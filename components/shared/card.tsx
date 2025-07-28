import React, { forwardRef } from 'react';
import { View, ViewProps } from 'react-native';

const Card = forwardRef<React.ComponentRef<typeof View>, ViewProps>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={`w-full rounded-md bg-white shadow ${className || ''}`}
    {...props}
  />
));

const CardHeader = forwardRef<React.ComponentRef<typeof View>, ViewProps>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={`mx-4 py-2 border-b border-neutral-300 ${className || ''}`}
    {...props}
  />
));

const CardBody = forwardRef<React.ComponentRef<typeof View>, ViewProps>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={`p-4 ${className || ''}`}
    {...props}
  />
));

const CardFooter = forwardRef<React.ComponentRef<typeof View>, ViewProps>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={`px-4 py-2 border-t border-neutral-300 ${className || ''}`}
    {...props}
  />
));

export { Card, CardBody, CardFooter, CardHeader };

