import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Platform,
  Pressable,
  StatusBar as RNStatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

export default function App() {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const androidTopInset = Platform.OS === 'android' ? (RNStatusBar.currentHeight ?? 0) : 0;

  const handleRefreshPress = useCallback(() => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  }, []);

  const handleBackPress = useCallback(() => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }

    return false;
  }, [canGoBack]);

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return undefined;
    }

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    return () => subscription.remove();
  }, [handleBackPress]);

  return (
    <View style={[styles.container, { paddingTop: androidTopInset }]}>
      <StatusBar style="auto" />
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://www.fedex.esm.lk/' }}
        pullToRefreshEnabled
        bounces
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0a84ff" />
          </View>
        )}
        onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
      />
      <Pressable
        style={[styles.floatingActionButton, styles.floatingRefreshButton]}
        onPress={handleRefreshPress}
      >
        <MaterialIcons name="refresh" size={20} color="#ffffff" />
      </Pressable>
      {canGoBack ? (
        <Pressable
          style={[styles.floatingActionButton, styles.floatingBackButton]}
          onPress={handleBackPress}
        >
          <MaterialIcons name="arrow-back" size={20} color="#ffffff" />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  floatingActionButton: {
    position: 'absolute',
    right: 8,
    padding: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.54)',
    opacity: 0.45,
  },
  floatingRefreshButton: {
    bottom: 16,
  },
  floatingBackButton: {
    bottom: 60,
  },
});
