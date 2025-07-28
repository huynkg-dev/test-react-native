import { CONTROL_HEIGHT } from '@/shared/helper';
import React, { forwardRef } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

const Button = forwardRef<React.ComponentRef<typeof TouchableOpacity>, TouchableOpacityProps>(({ className, ...props }, ref) => (
  <TouchableOpacity
    ref={ref}
    activeOpacity={0.7}
    style={{ height: CONTROL_HEIGHT }}
    className={`flex-row justify-center items-center gap-2 w-full bg-primary rounded ${className || ''}`}
    {...props}
  />
));

const ButtonIcon = forwardRef<React.ComponentRef<typeof TouchableOpacity>, TouchableOpacityProps>(({ className, ...props }, ref) => (
  <TouchableOpacity
    ref={ref}
    activeOpacity={0.7}
    className={`min-h-12 min-w-12 justify-center items-center rounded-full bg-primary ${className || ''}`}
    {...props}
  />
));

export { Button, ButtonIcon };

