import { CONTROL_HEIGHT, Responsive } from '@/shared/helper';
import { FlashList } from '@shopify/flash-list';
import { ChevronDownIcon, ChevronRightIcon, SearchIcon } from 'lucide-nativewind';
import React, { forwardRef, useCallback, useEffect } from 'react';
import { Dimensions, Modal, Pressable, PressableProps, Text, TextInput, View, ViewProps } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';

const SCREEN_HEIGHT = Dimensions.get('window').height;
// VARIABLE FOR CALCULATING MODAL HEIGHT (CHANGE TO RESPONSIVE LATER)
const MARGIN = Responsive({ base: 5 });
const EMPTY_MODAL_HEIGHT = Responsive({ base: 100 });
const MAX_MODAL_HEIGHT = Responsive({ base: 300 });
const ITEM_HEIGHT = Responsive({ base: 50 });

type SelectOption = {
  label: string;
  value: string | number;
};

const SelectContainer = forwardRef<React.ComponentRef<typeof View>, ViewProps>(({ className, ...props }, ref) => {
  return (
    <Animated.View
      ref={ref}
      className={`bg-white border border-neutral-300 rounded shadow-lg ${className || ''}`}
      entering={FadeInUp.duration(200)}
      exiting={FadeOutUp.duration(200)}
      {...props}
    />
  );
});

interface SelectSearchProps extends ViewProps {
  keyword?: string;
  onChange: (value: string) => void;
}

const SelectSearch = forwardRef<React.ComponentRef<typeof View>, SelectSearchProps>(({
  keyword,
  onChange,
  className,
  ...props
}, ref) => {
  return (
    <View
      ref={ref}
      style={{ height: ITEM_HEIGHT }}
      className={`flex-row items-center border-b border-neutral-300 px-3 ${className || ''}`}
      {...props}
    >
      <SearchIcon size={18} className='text-neutral-500' />
      <TextInput
        value={keyword}
        className='w-full no-border text-base text-neutral-800 p-3'
        placeholder={'Search ...'}
        placeholderTextColor={'#bcbcbc'}
        selectionColor={'#2986cc'}
        onChangeText={onChange}
      />
    </View>
  );
});

const SelectEmpty = forwardRef<React.ComponentRef<typeof View>, ViewProps>(({ ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={{ height: EMPTY_MODAL_HEIGHT }}
      className='flex justify-center items-center'
      {...props}
    >
      <Text className='text-base text-neutral-500'>No data</Text>
    </View>
  );
});

interface SelectOptionsProps {
  value?: string | number;
  options: SelectOption[];
  onChange?: (value: any) => void;
}

const SelectOptions = forwardRef<React.ComponentRef<typeof FlashList>, SelectOptionsProps>(({
  value,
  options,
  onChange
}, ref) => {
  const renderItem = useCallback(({ item }: { item: SelectOption }) => {
    return (
      <Pressable
        key={`option_${item.value}`}
        style={{ height: ITEM_HEIGHT }}
        className={'p-2'}
        onPress={() => onChange && onChange(item.value)}>
        <View className={`h-full justify-center px-4 rounded ${item.value === value && 'bg-blue-sky'}`}>
          <Text className={`text-base ${item.value === value && 'text-white'}`}>{item.label}</Text>
        </View>
      </Pressable>
    )
  }, [value]);

  return (
    <FlashList
      data={options}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      estimatedItemSize={ITEM_HEIGHT}
    />
  );
});

interface SelectBoxProps extends PressableProps {
  value?: string | number;
  datasource: SelectOption[];
  placeholder?: string;
  disableSearch?: boolean;
  onChange?: (value: any) => void;
}

const SelectBox = forwardRef<React.ComponentRef<typeof Pressable>, SelectBoxProps>(({
  value,
  datasource,
  placeholder,
  disableSearch = false,
  className,
  onChange,
  ...props
}, ref) => {
  const inputRef = React.useRef<React.ComponentRef<typeof Pressable>>(null);
  const [selected, setSelected] = React.useState<string>();
  const [open, setOpen] = React.useState(false);
  const [keyword, setKeyword] = React.useState<string>('');
  const [position, setPosition] = React.useState({ x: 0, y: 0, width: 0, height: 0 });
  const [options, setOptions] = React.useState<SelectOption[]>(datasource);

  const modalHeight = React.useMemo(() => {
    if (options.length > 0) {
      return Math.min(options.length * ITEM_HEIGHT + (disableSearch ? 0 : ITEM_HEIGHT), MAX_MODAL_HEIGHT);
    }
    else {
      return EMPTY_MODAL_HEIGHT + (disableSearch ? 0 : ITEM_HEIGHT);
    }
  }, [options]);

  useEffect(() => {
    if (datasource.length > 0) {
      setOptions(datasource);
    }
  }, [datasource]);

  // Set selected value if value prop is changed
  useEffect(() => {
    if (value) {
      const selectedItem = options.find(item => item.value === value);
      if (selectedItem) {
        setSelected(selectedItem.label);
      }
    }
  }, [value]);

  // Search by keyword
  useEffect(() => {
    if (datasource.length > 0) {
      setOptions(datasource.filter(e => e.label.toLowerCase().includes(keyword.toLowerCase())));
    }
  }, [keyword]);

  const handlePress = () => {
    if (inputRef.current) {
      // Calculate the position of the options modal to show in screen
      inputRef.current.measureInWindow((x, y, width, height) => {
        let calculateY = y + height;

        if (calculateY > SCREEN_HEIGHT - modalHeight) {
          calculateY = y - modalHeight - MARGIN;
        } else {
          calculateY = calculateY + MARGIN;
        }
        setPosition({ x, y: calculateY, width, height });
        setOpen(!open);
      });
    }
  };

  const handleClose = () => {
    setKeyword('');
    setOpen(!open);
  };

  const handleChange = (value: any) => {
    onChange && onChange(value);
    setOpen(!open);
  };

  return (
    <View ref={ref}>
      <Pressable
        ref={inputRef}
        className={`flex-row items-center w-full bg-white border border-gray-100 rounded px-2 ${className || ''}`}
        style={{ height: CONTROL_HEIGHT }}
        onPress={handlePress}
        {...props}
      >
        <TextInput
          value={selected}
          className='flex-1 no-border text-base text-neutral-800'
          placeholder={placeholder}
          placeholderTextColor={'#bcbcbc'}
          selectionColor={'#2986cc'}
          editable={false}
          selectTextOnFocus={false}
        />
        {open ? (
          <ChevronDownIcon size={20} className='text-neutral-500' />
        ) : (
          <ChevronRightIcon size={20} className='text-neutral-500' />
        )}
      </Pressable>
      <Modal visible={open} animationType={'fade'} transparent={true}>
        <View className='flex-1 justify-end'>
          <Pressable
            className='absolute top-0 bottom-0 left-0 right-0'
            onPress={handleClose}
          />
          <SelectContainer
            style={{
              position: 'absolute',
              top: position.y,
              left: position.x,
              width: position.width,
              height: modalHeight
            }}>
            {!disableSearch && (
              <SelectSearch
                keyword={keyword}
                onChange={setKeyword}
              />
            )}
            {options.length > 0 ? (
              <SelectOptions
                value={value}
                options={datasource}
                onChange={handleChange}
              />
            ) : (
              <SelectEmpty />
            )}
          </SelectContainer>
        </View>
      </Modal>
    </View>
  );
});

const UnderlineSelect = forwardRef<React.ComponentRef<typeof Pressable>, SelectBoxProps>(({
  value,
  datasource,
  placeholder,
  disableSearch = false,
  className,
  onChange,
  ...props
}, ref) => {
  const inputRef = React.useRef<React.ComponentRef<typeof Pressable>>(null);
  const [selected, setSelected] = React.useState<string>();
  const [open, setOpen] = React.useState(false);
  const [keyword, setKeyword] = React.useState<string>('');
  const [position, setPosition] = React.useState({ x: 0, y: 0, width: 0, height: 0 });
  const [options, setOptions] = React.useState<SelectOption[]>(datasource);

  const modalHeight = React.useMemo(() => {
    if (options.length > 0) {
      return Math.min(options.length * ITEM_HEIGHT + (disableSearch ? 0 : ITEM_HEIGHT), MAX_MODAL_HEIGHT);
    }
    else {
      return EMPTY_MODAL_HEIGHT + (disableSearch ? 0 : ITEM_HEIGHT);
    }
  }, [options]);

  useEffect(() => {
    if (datasource.length > 0) {
      setOptions(datasource);
    }
  }, [datasource]);

  // Set selected value if value prop is changed
  useEffect(() => {
    if (value) {
      const selectedItem = options.find(item => item.value === value);
      if (selectedItem) {
        setSelected(selectedItem.label);
      }
    }
  }, [value]);

  // Search by keyword
  useEffect(() => {
    if (datasource.length > 0) {
      setOptions(datasource.filter(e => e.label.toLowerCase().includes(keyword.toLowerCase())));
    }
  }, [keyword]);

  const handlePress = () => {
    if (inputRef.current) {
      // Calculate the position of the options modal to show in screen
      inputRef.current.measureInWindow((x, y, width, height) => {
        let calculateY = y + height;

        if (calculateY > SCREEN_HEIGHT - modalHeight) {
          calculateY = y - modalHeight - MARGIN;
        } else {
          calculateY = calculateY + MARGIN;
        }
        setPosition({ x, y: calculateY, width, height });
        setOpen(!open);
      });
    }
  };

  const handleClose = () => {
    setKeyword('');
    setOpen(!open);
  };

  const handleChange = (value: any) => {
    onChange && onChange(value);
    setOpen(!open);
  };

  return (
    <View ref={ref}>
      <Pressable
        ref={inputRef}
        className={`w-36 border-b-2 border-blue-sky rounded-none flex-row items-center bg-white px-2 ${className || ''}`}
        onPress={handlePress}
        {...props}
      >
        <TextInput
          value={selected}
          className='flex-1 no-border text-base text-blue-sky font-bold pb-2'
          placeholder={placeholder}
          placeholderTextColor={'#bcbcbc'}
          selectionColor={'#2986cc'}
          editable={false}
          selectTextOnFocus={false}
        />
        <ChevronDownIcon size={20} className='text-blue-sky' />
      </Pressable>
      <Modal visible={open} animationType={'fade'} transparent={true}>
        <View className='flex-1 justify-end'>
          <Pressable
            className='absolute top-0 bottom-0 left-0 right-0'
            onPress={handleClose}
          />
          <SelectContainer
            style={{
              position: 'absolute',
              top: position.y,
              left: position.x,
              width: position.width,
              height: modalHeight
            }}>
            {options.length > 0 && (
              <SelectOptions
                value={value}
                options={datasource}
                onChange={handleChange}
              />
            )}
          </SelectContainer>
        </View>
      </Modal>
    </View>
  );
});

export { SelectBox, UnderlineSelect, SelectOption };

