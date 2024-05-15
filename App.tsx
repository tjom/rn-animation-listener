/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect, useRef, useState } from 'react';
import { Animated, Button, Text, View } from 'react-native';

export default function App() {
  const [key, setKey] = useState('initial');
  const animatedValue = useRef(new Animated.Value(1)).current;
  const initialized = useRef(false);
  const [displayedValue, setDisplayedValue] = useState(1);

  if (!initialized.current) {
    animatedValue.addListener(({ value: v }) => {
      setDisplayedValue(v);
    });
    initialized.current = true;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      animatedValue.setValue(Math.random());
    }, 500);
    return () => clearInterval(interval);
  }, [animatedValue]);

  return (
    <View style={{ margin: 32, marginVertical: 64 }}>
      <Text />
      {key === 'initial' ? (
        <Text>This value updates:</Text>
      ) : (
        <Text>
          This value{' '}
          <Text style={{ fontWeight: 'bold' }}>no longer updates</Text>:
        </Text>
      )}

      <Text>{displayedValue}</Text>
      <Text />

      <Text>This square changes size:</Text>

      <Animated.View
        key={key}
        style={{
          transform: [{ scale: animatedValue }],
          backgroundColor: 'green',
          width: 100,
          height: 100,
        }}
      />

      <Button title="Remount animation" onPress={() => setKey('remounted')} />
    </View>
  );
}
