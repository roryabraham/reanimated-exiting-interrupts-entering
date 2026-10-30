import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function App() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        Press Show, then press Hide before the square has fully faded in. Expected: it fades out from its current
        opacity. Actual: it jumps to full opacity first.
      </Text>
      <Button title={isVisible ? 'Hide' : 'Show'} onPress={() => setIsVisible((value) => !value)} />
      <View style={styles.slot}>
        {isVisible && (
          <Animated.View
            testID="square"
            entering={FadeIn.duration(2000)}
            exiting={FadeOut.duration(2000)}
            style={styles.square}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    padding: 32,
    backgroundColor: '#fff',
  },
  instructions: {
    maxWidth: 400,
    textAlign: 'center',
  },
  slot: {
    width: 200,
    height: 200,
  },
  square: {
    width: 200,
    height: 200,
    backgroundColor: '#2563eb',
  },
});
