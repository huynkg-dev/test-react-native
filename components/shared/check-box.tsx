import { Responsive } from '@/shared/helper';
import React, { forwardRef } from 'react';
import BouncyCheckbox, { BouncyCheckboxProps } from 'react-native-bouncy-checkbox';

const Checkbox = forwardRef<React.ComponentRef<typeof BouncyCheckbox>, BouncyCheckboxProps>(({ ...props }, ref) => (
  <BouncyCheckbox
    size={Responsive({ base: 30, lg: 35 })}
    fillColor='#3F51B5'
    innerIconStyle={{ borderRadius: 2 }}
    iconStyle={{ borderRadius: 2 }}
    {...props}
  />
));

export { Checkbox };