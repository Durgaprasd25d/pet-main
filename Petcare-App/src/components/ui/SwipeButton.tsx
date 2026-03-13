import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { COLORS, RADIUS, SHADOWS } from '../../theme/theme';

const { width } = Dimensions.get('window');
const BUTTON_WIDTH = width * 0.85;
const BUTTON_HEIGHT = 65;
const HANDLE_SIZE = 48;
const SWIPE_RANGE = BUTTON_WIDTH - HANDLE_SIZE - 10;

interface SwipeButtonProps {
  onSwipeComplete: () => void;
  title?: string;
}

export const SwipeButton: React.FC<SwipeButtonProps> = ({ 
  onSwipeComplete,
  title = "Swipe to Get Started" 
}) => {
  const pan = useRef(new Animated.Value(0)).current;
  const [completed, setCompleted] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (completed) return;
        
        let newX = gestureState.dx;
        if (newX < 0) newX = 0;
        if (newX > SWIPE_RANGE) newX = SWIPE_RANGE;
        
        pan.setValue(newX);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (completed) return;

        if (gestureState.dx > SWIPE_RANGE * 0.75) {
          // Complete
          Animated.timing(pan, {
            toValue: SWIPE_RANGE,
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            setCompleted(true);
            onSwipeComplete();
            // Reset after a delay if needed, but usually we navigate away
          });
        } else {
          // Reset
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const translateX = pan;
  
  const textOpacity = pan.interpolate({
    inputRange: [0, SWIPE_RANGE / 2],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* Track */}
      <View style={styles.track}>
        <Animated.Text style={[styles.title, { opacity: textOpacity }]}>
          {title}
        </Animated.Text>
        
        {/* Progress Fill */}
        <Animated.View 
          style={[
            styles.progressFill, 
            { width: Animated.add(translateX, HANDLE_SIZE) }
          ]} 
        />

        {/* Handle */}
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.handle,
            {
              transform: [{ translateX }],
            },
          ]}
        >
          <View style={styles.innerHandle}>
            <MaterialDesignIcons name="paw" size={30} color={COLORS.primary} />
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: BUTTON_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  track: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    backgroundColor: COLORS.primary + '15',
    borderRadius: RADIUS.round,
    justifyContent: 'center',
    paddingHorizontal: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
  },
  title: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  progressFill: {
    position: 'absolute',
    left: 0,
    height: '100%',
    backgroundColor: COLORS.primary + '20',
    borderRadius: RADIUS.round,
  },
  handle: {
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
    backgroundColor: COLORS.primary,
    borderRadius: HANDLE_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  innerHandle: {
    width: HANDLE_SIZE - 6,
    height: HANDLE_SIZE - 6,
    borderRadius: (HANDLE_SIZE - 6) / 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
