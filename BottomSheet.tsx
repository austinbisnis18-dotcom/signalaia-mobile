import React, { useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  PanResponder,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Safe import expo-blur
let BlurViewComponent: React.ComponentType<any> | null = null;
try {
  const mod = require("expo-blur");
  BlurViewComponent = mod.BlurView || mod.default || null;
} catch (e) {
  BlurViewComponent = null;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type BottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title?: string;
  heightFraction?: number;
  showClose?: boolean;
  useBlur?: boolean;
  floating?: boolean;
};

const SPRING = {
  damping: 26,
  stiffness: 220,
  mass: 0.9,
  useNativeDriver: true,
};

const SHEET_BG = "#212121";

export default function BottomSheet({
  visible,
  onClose,
  children,
  title,
  heightFraction = 0.93,
  showClose = true,
  useBlur = false,
  floating = false,
}: BottomSheetProps) {
  const insets = useSafeAreaInsets();
  const sheetHeight = SCREEN_HEIGHT * heightFraction;
  const translateY = useRef(new Animated.Value(sheetHeight)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const mounted = useRef(false);
  const [render, setRender] = React.useState(false);

  const open = useCallback(() => {
    setRender(true);
    requestAnimationFrame(() => {
      Animated.parallel([
        Animated.spring(translateY, { toValue: 0, ...SPRING }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [sheetHeight]);

  const close = useCallback(() => {
    Animated.parallel([
      Animated.spring(translateY, { toValue: sheetHeight, ...SPRING }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setRender(false);
      onClose();
    });
  }, [sheetHeight, onClose]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, g) => {
        return Math.abs(g.dy) > Math.abs(g.dx) && g.dy > 0;
      },
      onPanResponderMove: (_, g) => {
        if (g.dy > 0) {
          translateY.setValue(g.dy);
        }
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy > sheetHeight * 0.3 || g.vy > 0.5) {
          close();
        } else {
          Animated.spring(translateY, { toValue: 0, ...SPRING }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible && !render) {
      open();
    } else if (!visible && render) {
      close();
    }
  }, [visible, render, open, close]);

  if (!render) return null;

  const shouldBlur = useBlur && BlurViewComponent;

  const innerContent = (
    <>
      {/* Handle / drag indicator */}
      <Animated.View style={styles.handleWrap} {...panResponder.panHandlers}>
        <View style={styles.handle} />
      </Animated.View>

      {/* Header with title and close button */}
      {(title || showClose) && (
        <View style={styles.header}>
          {showClose && <View style={styles.headerSpacer} />}
          {title && <Text style={styles.headerTitle}>{title}</Text>}
          {showClose && (
            <TouchableOpacity onPress={close} style={styles.closeBtn} activeOpacity={0.7}>
              <View style={styles.closeBtnCircle}>
                <Text style={styles.closeBtnText}>✕</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Content */}
      <View style={styles.content}>{children}</View>
    </>
  );

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <TouchableWithoutFeedback onPress={close}>
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.sheet,
          floating && styles.sheetFloating,
          shouldBlur
            ? { backgroundColor: "transparent" }
            : { backgroundColor: SHEET_BG },
          {
            height: sheetHeight,
            transform: [{ translateY }],
          },
        ]}
      >
        {shouldBlur ? (
          <BlurViewComponent intensity={80} tint="dark" style={styles.blurFill}>
            {/* Light frosted glass tint — NOT dark opaque */}
            <View style={styles.glassTint}>{innerContent}</View>
          </BlurViewComponent>
        ) : (
          <View style={styles.solidBg}>{innerContent}</View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
    zIndex: 100,
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 101,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 24,
  },
  sheetFloating: {
    bottom: 12,
    left: 12,
    right: 12,
    borderRadius: 28,
  },
  blurFill: {
    flex: 1,
    overflow: "hidden",
  },
  glassTint: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  solidBg: {
    flex: 1,
  },
  handleWrap: {
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 6,
  },
  handle: {
    width: 36,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 2,
    paddingBottom: 14,
  },
  headerSpacer: {
    width: 36,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#f0f0f0",
    fontSize: 17,
    fontWeight: "700",
  },
  closeBtn: {},
  closeBtnCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnText: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 15,
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
});