import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { COLORS } from "../constants/theme";

let BlurViewComponent: React.ComponentType<any> | null = null;
try {
  const mod = require("expo-blur");
  BlurViewComponent = mod.BlurView || mod.default || null;
} catch {
  BlurViewComponent = null;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MIN_CARD_HEIGHT = 420;

type FloatingGlassModalProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  heightFraction?: number;
};

export default function FloatingGlassModal({
  visible,
  onClose,
  children,
  heightFraction = 0.62,
}: FloatingGlassModalProps) {
  const [render, setRender] = useState(visible);
  const closingFromUserRef = useRef(false);
  const onCloseRef = useRef(onClose);
  const prevVisibleRef = useRef(visible);
  const translateY = useRef(new Animated.Value(72)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.985)).current;
  const cardHeight = Math.max(SCREEN_HEIGHT * heightFraction, MIN_CARD_HEIGHT);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const animateIn = useCallback(() => {
    setRender(true);
    requestAnimationFrame(() => {
      translateY.setValue(72);
      opacity.setValue(0);
      scale.setValue(0.985);
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          damping: 22,
          stiffness: 240,
          mass: 0.9,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [opacity, scale, translateY]);

  const animateOut = useCallback(
    (notifyParent: boolean) => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 36,
          duration: 170,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.99,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setRender(false);
        closingFromUserRef.current = false;
        if (notifyParent) {
          onCloseRef.current();
        }
      });
    },
    [opacity, scale, translateY]
  );

  useEffect(() => {
    if (visible && !prevVisibleRef.current) {
      animateIn();
    }

    if (!visible && prevVisibleRef.current && render) {
      animateOut(false);
    }

    prevVisibleRef.current = visible;
  }, [animateIn, animateOut, render, visible]);

  useEffect(() => {
    if (visible && !render) {
      animateIn();
      prevVisibleRef.current = true;
    }
  }, [animateIn, render, visible]);

  const requestClose = useCallback(() => {
    if (closingFromUserRef.current) return;
    closingFromUserRef.current = true;
    animateOut(true);
  }, [animateOut]);

  if (!render) return null;

  const blurEnabled = !!BlurViewComponent;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={requestClose}
      statusBarTranslucent
      presentationStyle="overFullScreen"
      hardwareAccelerated
    >
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
        pointerEvents="box-none"
      >
        <Pressable style={styles.backdropPressable} onPress={requestClose}>
          <Animated.View style={[styles.backdrop, { opacity }]} />
        </Pressable>

        <View style={styles.stage} pointerEvents="box-none">
          <Animated.View
            style={[
              styles.card,
              {
                height: cardHeight,
                opacity,
                transform: [{ translateY }, { scale }],
              },
            ]}
          >
            {blurEnabled && BlurViewComponent ? (
              <BlurViewComponent intensity={52} tint="dark" style={styles.blurFill}>
                <View style={styles.glassTint}>{children}</View>
              </BlurViewComponent>
            ) : (
              <View style={styles.fallbackSurface}>{children}</View>
            )}
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 40,
  },
  backdropPressable: {
    ...StyleSheet.absoluteFillObject,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  stage: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "stretch",
    paddingHorizontal: 8,
    paddingTop: 56,
    paddingBottom: 12,
  },
  card: {
    alignSelf: "stretch",
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.glassCardBorder,
    backgroundColor: COLORS.glassCardFallback,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 20,
  },
  blurFill: {
    flex: 1,
  },
  glassTint: {
    flex: 1,
    backgroundColor: COLORS.glassCardTint,
  },
  fallbackSurface: {
    flex: 1,
    backgroundColor: COLORS.glassCardFallback,
  },
});
