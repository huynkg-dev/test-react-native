import React, { forwardRef } from 'react';
import { View, ViewProps } from 'react-native';

const Card = forwardRef<React.ComponentRef<typeof View>, ViewProps>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={`w-full border border-gray-100 rounded-md bg-white ${className || ''}`}
    {...props}
  />
));

export { Card };

