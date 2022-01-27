import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React, {useMemo, useRef} from 'react';
import {Platform, Pressable, StyleSheet} from 'react-native';

const DEFAULT_OPACITY = Platform.OS === 'ios' ? 0.5 : 0.6;
const DEFAULT_APPEARS_ON_INDEX = 1;
const DEFAULT_DISAPPEARS_ON_INDEX = -1;
const DEFAULT_BACKDROP_COLOR = '#000000';

interface IProps {
  animatedIndex: Animated.SharedValue<number>;
  onPress: () => void;
}

const BackdropComponent = (props: IProps) => {
  const {animatedIndex, onPress} = props;
  const containerRef = useRef(null);

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, DEFAULT_DISAPPEARS_ON_INDEX, DEFAULT_APPEARS_ON_INDEX],
      [0, 0, DEFAULT_OPACITY],
      Extrapolate.CLAMP,
    ),
    flex: 1,
  }));
  const containerStyle = useMemo(
    () => [{backgroundColor: DEFAULT_BACKDROP_COLOR}, containerAnimatedStyle],
    [containerAnimatedStyle],
  );
  return (
    <Pressable
      style={[styles.backdrop, StyleSheet.absoluteFill]}
      onPress={onPress}>
      <Animated.View ref={containerRef} style={containerStyle} />
    </Pressable>
  );
};
export default BackdropComponent;
const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  pressableContainer: {
    flex: 1,
  },
});
