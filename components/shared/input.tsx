import { CONTROL_HEIGHT } from '@/shared/helper';
import React, { forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';

const Input = forwardRef<React.ComponentRef<typeof TextInput>, TextInputProps>(({
  className,
  ...props
}, ref) => (
  <TextInput
    ref={ref}
    className={`w-full bg-white border border-gray-100 text-neutral-800 rounded px-4 ${className || ''}`}
    style={{ height: CONTROL_HEIGHT }}
    placeholderTextColor={'#bcbcbc'}
    selectionColor={'#2986cc'}
    {...props}
  />
));

export { Input };

