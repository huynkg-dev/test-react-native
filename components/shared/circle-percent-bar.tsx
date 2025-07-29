import React, { useState, useEffect } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface CirclePercentBarProps {
  percentage?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  animationDuration?: number;
  showPercentage?: boolean;
}

const CirclePercentBar: React.FC<CirclePercentBarProps> = ({
  percentage = 75,
  size = 100,
  strokeWidth = 8,
  color = '#45FF8F',
  backgroundColor = '#042541',
  animationDuration = 1000,
  showPercentage = true
}) => {
  const [animatedValue] = useState(new Animated.Value(0));
  const [displayPercentage, setDisplayPercentage] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  useEffect(() => {
    animatedValue.addListener(({ value }) => {
      setDisplayPercentage(Math.round(value * percentage));
    });

    Animated.timing(animatedValue, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();

    return () => {
      animatedValue.removeAllListeners();
    };
  }, [percentage, animationDuration]);

  const strokeDasharray = circumference;
  const strokeDashoffset = circumference * (1 - (displayPercentage / 100));

  return (
    <View className='justify-center items-center'>
      <View className='relative p-1 rounded-full' style={{ backgroundColor: backgroundColor }}>
        <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
          {/* Background Circle */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={'#D0D2D366'}
            strokeWidth={strokeWidth}
            fill='none'
          />
          {/* Progress Circle */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill='none'
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap='round'
          />
        </Svg>
        {showPercentage && (
          <View className='absolute top-0 left-0 right-0 bottom-0 justify-center items-center'>
            <Text className='text-xl text-white font-extrabold'>
              {displayPercentage}%
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default CirclePercentBar;