# Reanimated: interrupting `FadeIn` with `FadeOut` jumps to full opacity

Minimal reproduction for a `react-native-reanimated` bug on web and iOS: when an `Animated.View` with `entering={FadeIn}` and `exiting={FadeOut}` unmounts while its entering animation is still running, the exiting animation starts from `FadeOut`'s initial opacity of 1 instead of the view's current opacity. The view jumps to full opacity, then fades out.

All of the code is in [`App.tsx`](./App.tsx). It's a blank Expo app with Reanimated added.

## Run it

```sh
npm install
npx expo start --web
```

To run it on iOS in Expo Go, run `npx expo start --ios`, or run `npx expo start` and scan the QR code with Expo Go.

## Steps

1. Press **Show**. The blue square fades in over 2s.
2. Press **Hide** before the square has fully faded in, for example after about 1s.

**Expected:** the square fades out from its current opacity.

**Actual:** the square jumps to full opacity, then fades out over 2s.

## Recordings

- [Web](./docs/exiting-interrupts-entering-web.webm): Hide is pressed about 800ms after Show, twice. The square's opacity goes from about 0.40 to 1.00 in one frame. The dark readout is test instrumentation injected by Playwright, not part of the app.
- [iOS](./docs/exiting-interrupts-entering-ios.mp4): recorded in Expo Go on the iOS simulator, with `App.tsx` temporarily changed to press Show and Hide on its own, 800ms apart. The square's opacity goes from 0.33 to 1.00 in one frame.

## Versions

| Package | Version |
|---|---|
| react-native-reanimated | 4.7.1 (also reproduces on web on `4.8.0-nightly-20261029-c51fd79b3`) |
| react-native-worklets | 0.13.0 (`0.14.0-nightly-20261030-c51fd79b3` with the Reanimated nightly) |
| react-native | 0.88.1 |
| react-native-web | 0.21.4 |
| expo | 58.0.21 (SDK 58) |
| Browser | Chrome 156 on macOS |
| iOS | Expo Go 58.0.7 on an iPhone 17 Pro simulator, iOS 26.5 |

Not tested on Android.
