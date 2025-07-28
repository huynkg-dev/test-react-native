import { CircleAlertIcon } from 'lucide-nativewind';
import React, { forwardRef } from 'react';
import { Text, TextProps, View, ViewProps } from 'react-native';

const FormItem = forwardRef<React.ComponentRef<typeof View>, ViewProps>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={`mb-3 ${className}`}
    {...props}
  />
));

const FormLabel = forwardRef<React.ComponentRef<typeof Text>, TextProps>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={`text-base text-neutral-500 font-medium mb-1 ${className}`}
    {...props}
  />
));

interface FormMessageProps extends TextProps {
  invalid?: boolean;
}

const FormMessage = forwardRef<React.ComponentRef<typeof Text>, FormMessageProps>(({
  className,
  invalid,
  ...props
}, ref) => {
  if (!invalid) return null;

  return (
    <View className={'flex-row items-center mt-1'}>
      <CircleAlertIcon size={16} className='text-red-500 mr-1' />
      <Text
        ref={ref}
        className={`text-base text-red-500 ${className}`}
        {...props}
      />
    </View>
  );
});

export { FormItem, FormLabel, FormMessage };

