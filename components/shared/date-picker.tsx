import { CONTROL_HEIGHT } from '@/shared/helper';
import { eachDayOfInterval, format, isBefore } from 'date-fns';
import { CalendarDaysIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-nativewind';
import React, { forwardRef, useMemo } from 'react';
import {
  Modal,
  Pressable,
  PressableProps,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps
} from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import XDate from 'xdate';

type DateRange = {
  start?: Date;
  end?: Date;
}

type DateControl = {
  year: number;
  month: number;
  day: number;
  date?: Date;
  dateString: string;
};

type RangeControl = {
  year: number;
  month: number;
  day: number;
  range?: DateRange;
  startDateString: string;
  endDateString: string;
}

type CalendarView = {
  mode: 'day' | 'month';
  current: string;
}

const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];

const convertDateData = (date: Date = new Date()): DateData => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    timestamp: date.getTime(),
    dateString: format(date, 'yyyy-MM-dd')
  };
}

const convertDateControl = (date?: Date): DateControl => {
  if (date) {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      date: date,
      dateString: format(date, 'yyyy-MM-dd')
    };
  }
  else {
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      dateString: format(now, 'yyyy-MM-dd')
    };
  }
};

const convertRangeControl = (range?: DateRange): RangeControl => {
  const now = new Date();
  if (range) {
    return {
      year: range.start ? range.start.getFullYear() : now.getFullYear(),
      month: range.start ? range.start.getMonth() + 1 : now.getMonth() + 1,
      day: range.start ? range.start.getDate() : now.getDate(),
      range: range,
      startDateString: range.start ? format(range.start, 'yyyy-MM-dd') : '',
      endDateString: range.end ? format(range.end, 'yyyy-MM-dd') : ''
    };
  }
  else {
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      startDateString: '',
      endDateString: ''
    };
  }
};

const convertDateString = (month: number, year: number): string => {
  const day = 1;

  const paddedMonth = month.toString().padStart(2, '0');
  const paddedDay = day.toString().padStart(2, '0');

  return `${year}-${paddedMonth}-${paddedDay}`;
};

/* ----------------------------------------COMPONENTS-------------------------------------------- */

interface MonthItemProps extends TouchableOpacityProps {
  date?: DateData;
  month: { value: number; label: string };
}

const MonthItem = forwardRef<React.ComponentRef<typeof TouchableOpacity>, MonthItemProps>(({
  month,
  date,
  ...props
}, ref) => {
  if (date) {
    if (month.value === date.month) {
      return (
        <TouchableOpacity
          ref={ref}
          className={'bg-sky-500 rounded-full py-3 mb-1'}
          {...props}
        >
          <Text className='text-center text-white'>{month.label}</Text>
        </TouchableOpacity>
      );
    }
  }

  return (
    <TouchableOpacity
      ref={ref}
      className={'bg-white rounded-full border border-neutral-300 py-3 mb-1'}
      {...props}
    >
      <Text className='text-center'>{month.label}</Text>
    </TouchableOpacity>
  );
});

interface MonthModalProps extends ViewProps {
  date?: string;
  goBack: () => void;
  onSubmitMonth: (view: CalendarView) => void;
}

const MonthModal = forwardRef<React.ComponentRef<typeof View>, MonthModalProps>(({
  date,
  goBack,
  onSubmitMonth,
  ...props
}, ref) => {
  const [selectDate, setSelectDate] = React.useState<DateData>(convertDateData(new Date(date || '')));

  const onChangeMonth = (month: number) => {
    setSelectDate((prev) => (
      {
        ...prev,
        month: month,
      }
    ));
  };

  const onChangeYear = (year: number) => {
    setSelectDate((prev) => (
      {
        ...prev,
        year: prev.year + year,
      }
    ));
  };

  const onApply = () => {
    const dateString = convertDateString(selectDate.month, selectDate.year);
    onSubmitMonth({
      mode: 'day',
      current: dateString
    });
  };

  return (
    <View
      ref={ref}
      className={'w-full'}
      {...props}
    >
      <View className='flex-row justify-center items-center gap-2 mt-2 mb-4 mx-4'>
        <TouchableOpacity
          className='flex-1 justify-center items-center bg-white rounded-lg border border-neutral-300 py-3'
          onPress={() => onChangeYear(-1)}
        >
          <ChevronLeftIcon size={20} className='text-neutral-500' />
        </TouchableOpacity>
        <View className='flex-[5] flex-row justify-center items-center'>
          <Text className='text-lg text-center font-medium'>{selectDate.year}</Text>
        </View>
        <TouchableOpacity
          className='flex-1 justify-center items-center bg-white rounded-lg border border-neutral-300 py-3'
          onPress={() => onChangeYear(1)}
        >
          <ChevronRightIcon size={20} className='text-neutral-500' />
        </TouchableOpacity>
      </View>
      <View className='w-full flex-wrap flex-row justify-between items-center'>
        {MONTHS.map((month, index) => (
          <View key={index} className='w-1/3 p-2'>
            <MonthItem
              date={selectDate}
              month={month}
              onPress={() => onChangeMonth(month.value)}
            />
          </View>
        ))}
      </View>
      <CalendarFooter>
        <View className='flex-row justify-end items-center gap-2'>
          <TouchableOpacity
            className='flex-1 border border-neutral-300 rounded p-3'
            onPress={goBack}>
            <Text className='text-base text-center'>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity className='flex-1 bg-sky-500 rounded p-3' onPress={onApply}>
            <Text className='text-white text-base text-center'>Apply</Text>
          </TouchableOpacity>
        </View>
      </CalendarFooter>
    </View>
  );
});

interface CalendarHeaderProps extends ViewProps {
  date?: XDate;
  changeView?: (view: CalendarView) => void;
  gotoMonths?: (months: number) => void;
}

const CalendarHeader = forwardRef<React.ComponentRef<typeof View>, CalendarHeaderProps>(({ date, changeView, gotoMonths, ...props }, ref) => {
  const previousMonth = () => {
    gotoMonths && gotoMonths(-1);
  };

  const nextMonth = () => {
    gotoMonths && gotoMonths(1);
  };

  const changeMonthView = () => {
    changeView && changeView({
      mode: 'month',
      current: date?.toString('yyyy-MM-dd') || format(new Date(), 'yyyy-MM-dd')
    });
  };


  return (
    <View
      ref={ref}
      className='flex-row justify-center items-center w-full gap-2 mt-2 mb-4'
      {...props}
    >
      <TouchableOpacity
        className='flex-1 justify-center items-center bg-white rounded-lg border border-neutral-300 py-3'
        onPress={previousMonth}
      >
        <ChevronLeftIcon size={20} className='text-neutral-500' />
      </TouchableOpacity>
      <View className='flex-[5] flex-row justify-center items-center'>
        <TouchableOpacity
          className='flex-1'
          onPress={changeMonthView}
        >
          <Text className='text-lg text-center font-medium'>{date?.toString('MMMM yyyy')}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className='flex-1 justify-center items-center bg-white rounded-lg border border-neutral-300 py-3'
        onPress={nextMonth}
      >
        <ChevronRightIcon size={20} className='text-neutral-500' />
      </TouchableOpacity>
    </View>
  );
});

const CalendarFooter = forwardRef<React.ComponentRef<typeof View>, ViewProps>(({ ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={'py-2 mt-2 mx-4'}
      {...props}
    />
  );
});

interface CalendarModalProps extends ViewProps {
  date?: Date;
  onSelect?: (date: Date) => void;
  onClose: () => void;
}

const CalendarModal = forwardRef<React.ComponentRef<typeof View>, CalendarModalProps>(({ date, onSelect, onClose, ...props }, ref) => {
  const [contentReady, setContentReady] = React.useState<boolean>(false);
  const [dateControl, setDateControl] = React.useState<DateControl>(convertDateControl(date));
  const [view, setView] = React.useState<CalendarView>({
    mode: 'day',
    current: dateControl.dateString
  });
  const [markedDates, setMarkedDates] = React.useState<any>();

  const onDayPress = (day: DateData) => {
    setDateControl({
      ...day,
      date: new Date(day.timestamp)
    });
    setMarkedDates({ [day.dateString]: { selected: true, selectedTextColor: 'white' } });
  };

  const onSubmit = () => {
    if (dateControl.date) {
      onSelect && onSelect(dateControl.date);
    }
    onClose();
  };

  const onSubmitMonth = (view: CalendarView) => {
    setView(view);
  };

  React.useEffect(() => {
    // Start the animation after a small delay
    setTimeout(() => {
      setContentReady(true);
    }, 10);

    if (date) {
      setMarkedDates({ [dateControl.dateString]: { selected: true, selectedTextColor: 'white' } });
    }
  }, []);

  if (view.mode === 'month') {
    return (
      <View
        ref={ref}
        className='w-full bg-white border border-neutral-300 rounded-t-3xl shadow-xl p-2 pt-4 h-auto'
        {...props}
      >
        <MonthModal
          date={view.current}
          goBack={() => setView({ mode: 'day', current: dateControl.dateString })}
          onSubmitMonth={onSubmitMonth}
        />
      </View>
    );
  }

  return (
    <>
      {contentReady && (
        <Animated.View
          ref={ref}
          className='w-full h-auto bg-white border border-neutral-300 rounded-t-3xl shadow-lg p-2'
          {...props}
          entering={SlideInDown.duration(400)}
          exiting={SlideOutDown.duration(200)}
        >
          <Calendar
            current={view.current}
            hideArrows={true}
            onPressArrowLeft={(subtractMonth: any) => subtractMonth()}
            renderHeader={(date?: XDate, gotoMonths?: () => void) =>
              <CalendarHeader
                date={date}
                changeView={setView}
                gotoMonths={gotoMonths}
              />
            }
            markingType={'dot'}
            markedDates={markedDates}
            onDayPress={onDayPress}
          />
          <CalendarFooter>
            <View className='flex-row justify-between items-center gap-2'>
              <TouchableOpacity className='flex-1 border border-neutral-300 rounded p-3' onPress={onClose}>
                <Text className='text-base text-center'>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity className='flex-1 bg-sky-500 rounded p-3' onPress={onSubmit}>
                <Text className='text-white text-base text-center'>Apply</Text>
              </TouchableOpacity>
            </View>
          </CalendarFooter>
        </Animated.View>
      )}
    </>
  );
});

/* ----------------------------------------DATE PICKER-------------------------------------------- */

interface DatePickerProps extends PressableProps {
  value?: Date;
  placeholder?: string;
  onChange?: (value: Date) => void;
}

const DatePicker = forwardRef<React.ComponentRef<typeof Pressable>, DatePickerProps>(({
  value,
  placeholder,
  className,
  onChange,
  ...props
}, ref) => {
  const [open, setOpen] = React.useState(false);

  const displayDate = useMemo(() => {
    if (value) {
      return value.toLocaleDateString('en-GB');
    }
    else {
      return undefined;
    }
  }, [value]);

  const handlePress = () => {
    setOpen(!open);
  };

  const onSelect = (value: Date) => {
    onChange && onChange(value);
  };

  return (
    <View ref={ref} className={className}>
      <Pressable
        className={'flex-row items-center w-full bg-white border border-neutral-300 rounded px-2'}
        style={{ height: CONTROL_HEIGHT }}
        onPress={handlePress}
        {...props}
      >
        <TextInput
          value={displayDate}
          className='flex-1 no-border text-base text-neutral-800'
          placeholder={placeholder}
          placeholderTextColor={'#bcbcbc'}
          selectionColor={'#2986cc'}
          editable={false}
          selectTextOnFocus={false}
        />
        <CalendarDaysIcon size={22} className='text-neutral-500' />
      </Pressable>
      <Modal visible={open} animationType={'none'} transparent={true}>
        <View className='flex-1 justify-end'>
          <Pressable
            className='absolute top-0 bottom-0 left-0 right-0'
            onPress={() => setOpen(!open)}
          />
          <CalendarModal
            date={value}
            onSelect={onSelect}
            onClose={() => setOpen(false)}
          />
        </View>
      </Modal>
    </View>
  );
});

/* ----------------------------------------DATE RANGE PICKER-------------------------------------------- */

interface CalendarRangeModalProps extends ViewProps {
  range?: DateRange;
  marked: any;
  onSelect?: (date: DateRange, marked: any) => void;
  onClose: () => void;
}

const CalendarRangeModal = forwardRef<React.ComponentRef<typeof View>, CalendarRangeModalProps>(({
  range,
  marked,
  onSelect,
  onClose,
  ...props
}, ref) => {
  const [contentReady, setContentReady] = React.useState<boolean>(false);
  const [rangeControl, setRangeControl] = React.useState<RangeControl>(convertRangeControl(range));
  const [view, setView] = React.useState<CalendarView>({
    mode: 'day',
    current: rangeControl.startDateString
  });
  const [markedDates, setMarkedDates] = React.useState<any>(marked);

  const onDayPress = (day: DateData) => {
    const range = rangeControl.range;
    const selected = new Date(day.timestamp);
    if (!range?.start || (range.start && range.end)) {
      setMarkedDates({ [day.dateString]: { startingDay: true, color: '#0689ff', textColor: 'white' } });
      setRangeControl((prev) => ({
        ...prev,
        range: { start: selected },
        startDateString: day.dateString
      }));
    }
    else if (!range.end) {
      if (isBefore(range.start, selected)) {
        let marked: any = {};
        const dates = eachDayOfInterval({
          start: range.start,
          end: selected
        })
        dates.map((date, index) => {
          if (index === 0)
            marked[format(date, 'yyyy-MM-dd')] = { startingDay: true, color: '#0689ff', textColor: 'white' };
          else if (index === dates.length - 1)
            marked[format(date, 'yyyy-MM-dd')] = { endingDay: true, color: '#0689ff', textColor: 'white' };
          else
            marked[format(date, 'yyyy-MM-dd')] = { color: '#f0f8ff', textColor: '#0689ff' };
        });
        setMarkedDates(marked);
        setRangeControl((prev) => ({
          ...prev,
          range: { start: range.start, end: selected },
          endDateString: format(dates[dates.length - 1], 'yyyy-MM-dd')
        }));
      }
      else {
        setMarkedDates({ [day.dateString]: { startingDay: true, color: '#0689ff', textColor: 'white' } });
        setRangeControl((prev) => ({
          ...prev,
          range: { start: selected },
          startDateString: day.dateString
        }));
      }
    }
  };

  const onSubmit = () => {
    if (rangeControl.range) {
      onSelect && onSelect(rangeControl.range, markedDates);
    }
    onClose();
  };

  const onSubmitMonth = (view: CalendarView) => {
    setView(view);
  };

  React.useEffect(() => {
    // Start the animation after a small delay
    setTimeout(() => {
      setContentReady(true);
    }, 10);
  }, []);

  if (view.mode === 'month') {
    return (
      <View
        ref={ref}
        className='w-full bg-white border border-neutral-300 rounded-t-3xl shadow-xl p-2 pt-4 h-auto'
        {...props}
      >
        <MonthModal
          date={view.current}
          goBack={() => setView({ mode: 'day', current: rangeControl.startDateString })}
          onSubmitMonth={onSubmitMonth}
        />
      </View>
    );
  }

  return (
    <>
      {contentReady && (
        <Animated.View
          ref={ref}
          className='w-full h-auto bg-white border border-neutral-300 rounded-t-3xl shadow-lg p-2'
          {...props}
          entering={SlideInDown.duration(400)}
          exiting={SlideOutDown.duration(200)}
        >
          <Calendar
            current={view.current}
            hideArrows={true}
            onPressArrowLeft={(subtractMonth: any) => subtractMonth()}
            renderHeader={(date?: XDate, gotoMonths?: () => void) =>
              <CalendarHeader
                date={date}
                gotoMonths={gotoMonths}
              />
            }
            markingType={'period'}
            markedDates={markedDates}
            onDayPress={onDayPress}
          />
          <CalendarFooter>
            <View className='flex-row justify-between items-center gap-2'>
              <TouchableOpacity className='flex-1 border border-neutral-300 rounded p-3' onPress={onClose}>
                <Text className='text-base text-center'>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity className='flex-1 bg-sky-500 rounded p-3' onPress={onSubmit}>
                <Text className='text-white text-base text-center'>Apply</Text>
              </TouchableOpacity>
            </View>
          </CalendarFooter>
        </Animated.View>
      )}
    </>
  );
});

interface DateRangePickerProps extends PressableProps {
  value?: DateRange;
  placeholder?: string;
  onChange?: (value: DateRange) => void;
}

const DateRangePicker = forwardRef<React.ComponentRef<typeof Pressable>, DateRangePickerProps>(({
  value,
  placeholder,
  className,
  onChange,
  ...props
}, ref) => {
  const [open, setOpen] = React.useState(false);
  const [markedDates, setMarkedDates] = React.useState<any>();

  const displayRange = useMemo(() => {
    if (value) {
      return `${value.start ? value.start.toLocaleDateString('en-GB') : ''} - ${value.end ? value.end.toLocaleDateString('en-GB') : ''}`;
    }
    else {
      return undefined;
    }
  }, [value]);

  const handlePress = () => {
    setOpen(!open);
  };

  const onSelect = (value: DateRange, marked: any) => {
    setMarkedDates(marked);
    onChange && onChange(value);
  };

  return (
    <View ref={ref} className={className}>
      <Pressable
        className={'flex-row items-center w-full bg-white border border-neutral-300 rounded px-2'}
        style={{ height: CONTROL_HEIGHT }}
        onPress={handlePress}
        {...props}
      >
        <TextInput
          value={displayRange}
          className='flex-1 no-border text-base text-neutral-800'
          placeholder={placeholder}
          placeholderTextColor={'#bcbcbc'}
          selectionColor={'#2986cc'}
          editable={false}
          selectTextOnFocus={false}
        />
        <CalendarDaysIcon size={22} className='text-neutral-500' />
      </Pressable>
      <Modal visible={open} animationType={'fade'} transparent={true}>
        <View className='flex-1 justify-end'>
          <Pressable
            className='absolute top-0 bottom-0 left-0 right-0'
            onPress={() => setOpen(!open)}
          />
          <CalendarRangeModal
            range={value}
            marked={markedDates}
            onSelect={onSelect}
            onClose={() => setOpen(false)}
          />
        </View>
      </Modal>
    </View>
  );
});

export { DatePicker, DateRange, DateRangePicker };

