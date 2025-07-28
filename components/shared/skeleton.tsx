import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface SkeletonLoaderProps {
  height: any;
  width: any;
  className?: string;
  backgroundColor?: string;
}

export const SkeletonLoader = ({
  height,
  width,
  className,
  backgroundColor = '#DDEAF5'
}: SkeletonLoaderProps) => {
  //to move the gradient view across x direction
  const translatex = useSharedValue(0);

  //to create pulse animation by increasing and decreasing opacity of parent
  const opacity = useSharedValue(1);

  //track dimensions of child (gradient view) for deciding movable boundaries
  const [gradientDimensions, setGradientDimensions] = useState({
    height: -1,
    width: -1,
  });

  //track dimensions of parent view (parent of gradient view) for deciding movable boundaries
  const [parentDimensions, setParentDimensions] = useState({
    height: -1,
    width: -1,
  });

  //to toggle between different direction of move
  const [coordinates, setCoordinates] = useState({
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  });

  useEffect(() => {
    return () => {
      cancelAnimation(translatex);
      cancelAnimation(opacity);
    };
  }, []);

  useEffect(() => {
    setCoordinates({
      start: { x: 0, y: 0 },
      end: { x: 1, y: 0 },
    });
  }, []);

  const animatedStyleX = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translatex.value,
        },
      ],
    };
  });

  const animatedStyleParent = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const animateAcrossXDirection = () => {
    /*
    We need overflowOffset because we start moving animation little bit before actual start
    Also we end moving animation little bit after actual end.
    We hide those overflowed views using overflow: "hidden" on parent view
    */
    const overflowOffset = parentDimensions.width * 0.75;

    /*
    In case of leftToRight direction, we start animation from leftMostEnd
    In case of rightToLeft direction, we stop animation at leftMostEnd
    */
    const leftMostEnd = -overflowOffset;

    /*
    In case of leftToRight direction, we stop animation at rightMostEnd
    In case of rightToLeft direction, we start animation at rightMostEnd
    We subtract gradientDimensions.width because animation should end (in case of leftToRight)/start(in case of rightToLeft) 
     when leftmost end of gradient view touches the right most end of parent view
    */
    const rightMostEnd =
      parentDimensions.width - gradientDimensions.width + overflowOffset;
    translatex.value = leftMostEnd;
    translatex.value = withRepeat(
      withDelay(
        800, // Delay before the next iteration of animation starts
        withTiming(
          rightMostEnd,
          {
            duration: 500,
            easing: Easing.linear,
          }
        )
      ),
      -1
    );
  };
  
  useEffect(() => {
    if (
      parentDimensions.height !== -1 &&
      parentDimensions.width !== -1 &&
      gradientDimensions.height !== -1 &&
      gradientDimensions.width !== -1 
    ) {
      animateAcrossXDirection();
    }
  }, [parentDimensions, gradientDimensions]);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.4, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
      true
    );
  }, []);

  return (
    <Animated.View
      onLayout={(event) => {
        setParentDimensions({
          width: event.nativeEvent.layout.width,
          height: event.nativeEvent.layout.height,
        });
      }}
      className={`overflow-hidden ${className}`}
      style={[
        { height, width, backgroundColor },
        animatedStyleParent,
      ]}
    >
      <Animated.View
        onLayout={(event) => {
          if (
            gradientDimensions.width === -1 &&
            gradientDimensions.height === -1
          ) {
            setGradientDimensions({
              width: event.nativeEvent.layout.width,
              height: event.nativeEvent.layout.height,
            });
          }
        }}
        style={animatedStyleX}
      >
        <LinearGradient
          colors={[
            'rgba(255,255,255,0)',
            'rgba(255,255,255,0.1)',
            'rgba(255,255,255,0.4)',
            'rgba(255,255,255,0.6)',
            'rgba(255,255,255,0.7)',
            'rgba(255,255,255,0.6)',
            'rgba(255,255,255,0.4)',
            'rgba(255,255,255,0.1)',
            'rgba(255,255,255,0)',
          ]}
          start={coordinates.start}
          end={coordinates.end}
          className='h-full w-full'
        />
      </Animated.View>
    </Animated.View>
  );
};