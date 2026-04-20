# Expo Mobile App

A lightweight Expo + React Native mobile shell that loads an existing website inside a WebView and adds mobile-friendly controls.

## What We Did

- Created an Expo React Native app scaffold.
- Embedded the web experience from https://www.fedex.esm.lk/ using react-native-webview.
- Added loading UI with ActivityIndicator while pages load.
- Added pull-to-refresh support in the WebView.
- Added floating action controls:
  - Refresh button
  - Conditional back button when navigation history exists
- Wired Android hardware back button behavior to WebView navigation.
- Added app metadata and Android package config in app.json.
- Added EAS build profiles for preview APK and production AAB.

## Tech Stack

- Expo SDK 54
- React 19
- React Native 0.81
- react-native-webview 13
- expo-status-bar
- @expo/vector-icons (MaterialIcons)
- EAS Build configuration

## Project Structure

- App.js: Main app screen with WebView and floating controls.
- index.js: App entry point.
- app.json: Expo app configuration (name, slug, Android package, icons, splash).
- eas.json: EAS build profiles.
- assets/: App icons and splash assets.

## How To Get It Running

### 1) Prerequisites

- Node.js LTS (recommended: 18 or 20)
- npm
- Expo Go app on your phone (for device testing)
- Optional for local emulators:
  - Android Studio (Android emulator)
  - Xcode on macOS (iOS simulator)

### 2) Install Dependencies

Run in the project root:

npm install

### 3) Start The Development Server

npm run start

Then choose one target:

- Press a for Android emulator
- Press i for iOS simulator (macOS only)
- Press w for web
- Or scan the QR code with Expo Go

### 4) Platform Shortcuts

You can also run:

- npm run android
- npm run ios
- npm run web

## EAS Build (Optional)

This project includes EAS build profiles in eas.json:

- preview: Android APK output
- production: Android App Bundle (AAB) output

Example commands:

eas build --platform android --profile preview
eas build --platform android --profile production

## Notes For Devs

- Android package id is set to: com.chinookz.expomobileapp
- New architecture is currently disabled in app.json (newArchEnabled: false)
- WebView start URL is defined in App.js and can be swapped if needed

## Future Improvements

- Add environment-based URL switching (dev/staging/prod)
- Add offline/error fallback screen for failed page loads
- Add CI workflow for lint/build checks
