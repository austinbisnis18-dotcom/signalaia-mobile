import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
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
const SPRING = { damping: 26, stiffness: 210, mass: 0.95, useNativeDriver: true };
const SHEET_BG = COLORS.sheetBg;

export type BottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title?: string;
  heightFraction?: number;
  showClose?: boolean;
  showBack?: boolean;
  onBack?: () => void;
  showHandle?: boolean;
  useBlur?: boolean;
  floating?: boolean;
  disabled?: boolean;
  showHeader?: boolean;
};

export default function BottomSheet({
  visible,
  onClose,
  children,
  title,
  heightFraction = 0.93,
  showClose = true,
  showBack = false,
  onBack,
  showHandle = true,
  useBlur = false,
  floating = false,
  disabled = false,
  showHeader = true,
}: BottomSheetProps) {
  const sheetHeight = SCREEN_HEIGHT * heightFraction;
  const translateY = useRef(new Animated.Value(sheetHeight)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const onCloseRef = useRef(onClose);
  const prevVisibleRef = useRef(visible);
  const [render, setRender] = useState(visible);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const animateIn = useCallback(() => {
    setRender(true);
    requestAnimationFrame(() => {
      translateY.setValue(sheetHeight);
      overlayOpacity.setValue(0);
      Animated.parallel([
        Animated.spring(translateY, { toValue: 0, ...SPRING }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 280,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [overlayOpacity, sheetHeight, translateY]);

  const animateOut = useCallback(
    (notifyParent: boolean) => {
      Animated.parallel([
        Animated.spring(translateY, { toValue: sheetHeight, ...SPRING }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setRender(false);
        if (notifyParent) {
          onCloseRef.current();
        }
      });
    },
    [overlayOpacity, sheetHeight, translateY]
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
    animateOut(true);
  }, [animateOut]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > Math.abs(gestureState.dx) && gestureState.dy > 8,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > sheetHeight * 0.3 || gestureState.vy > 0.5) {
          requestClose();
          return;
        }

        Animated.spring(translateY, { toValue: 0, ...SPRING }).start();
      },
    })
  ).current;

  if (!render) return null;

  const shouldBlur = useBlur && !!BlurViewComponent;

  return (
    <Modal
      transparent
      visible={render}
      animationType="none"
      onRequestClose={requestClose}
      statusBarTranslucent
    >
      <View style={styles.modalRoot}>
        <Pressable style={styles.backdropPressable} onPress={requestClose}>
          <Animated.View style={[styles.backdropArea, { opacity: overlayOpacity }]} />
        </Pressable>

        <Animated.View
          style={[
            styles.sheetFrame,
            floating && styles.sheetFloatingFrame,
            { height: sheetHeight, transform: [{ translateY }] },
          ]}
          pointerEvents="box-none"
        >
          <View
            style={[
              styles.sheet,
              shouldBlur ? { backgroundColor: "transparent" } : { backgroundColor: SHEET_BG },
            ]}
            pointerEvents="auto"
          >
            {shouldBlur && BlurViewComponent ? (
              <BlurViewComponent intensity={95} tint="light" style={styles.blurFill}>
                <View style={styles.glassTint}>
                  <View style={{ flex: 1 }} pointerEvents={disabled ? "none" : "auto"}>
                    {showHandle && (
                      <View style={styles.handleWrap} {...panResponder.panHandlers}>
                        <View style={styles.handle} />
                      </View>
                    )}
                    {showHeader ? (
                      <View style={styles.header}>
                        {showBack ? (
                          <TouchableOpacity
                            onPress={onBack}
                            style={styles.headerActionBtn}
                            activeOpacity={0.7}
                          >
                            <Text style={styles.headerActionText}>{"<"}</Text>
                          </TouchableOpacity>
                        ) : (
                          <View style={styles.headerSpacer} />
                        )}
                        {title ? (
                          <Text style={styles.headerTitle}>{title}</Text>
                        ) : (
                          <View style={{ flex: 1 }} />
                        )}
                        {showClose ? (
                          <TouchableOpacity
                            onPress={requestClose}
                            style={styles.closeBtn}
                            activeOpacity={0.7}
                            hitSlop={10}
                          >
                            <View style={styles.closeBtnCircle}>
                              <Text style={styles.closeBtnText}>x</Text>
                            </View>
                          </TouchableOpacity>
                        ) : (
                          <View style={styles.headerSpacer} />
                        )}
                      </View>
                    ) : null}
                    <View style={styles.content}>{children}</View>
                  </View>
                </View>
              </BlurViewComponent>
            ) : (
              <View style={styles.solidBg}>
                <View style={{ flex: 1 }} pointerEvents={disabled ? "none" : "auto"}>
                  {showHandle && (
                    <View style={styles.handleWrap} {...panResponder.panHandlers}>
                      <View style={styles.handle} />
                    </View>
                  )}
                  {showHeader ? (
                    <View style={styles.header}>
                      {showBack ? (
                        <TouchableOpacity
                          onPress={onBack}
                          style={styles.headerActionBtn}
                          activeOpacity={0.7}
                        >
                          <Text style={styles.headerActionText}>{"<"}</Text>
                        </TouchableOpacity>
                      ) : (
                        <View style={styles.headerSpacer} />
                      )}
                      {title ? (
                        <Text style={styles.headerTitle}>{title}</Text>
                      ) : (
                        <View style={{ flex: 1 }} />
                      )}
                      {showClose ? (
                        <TouchableOpacity
                          onPress={requestClose}
                          style={styles.closeBtn}
                          activeOpacity={0.7}
                          hitSlop={10}
                        >
                          <View style={styles.closeBtnCircle}>
                            <Text style={styles.closeBtnText}>x</Text>
                          </View>
                        </TouchableOpacity>
                      ) : (
                        <View style={styles.headerSpacer} />
                      )}
                    </View>
                  ) : null}
                  <View style={styles.content}>{children}</View>
                </View>
              </View>
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    ...StyleSheet.absoluteFillObject,
  },
  backdropPressable: {
    ...StyleSheet.absoluteFillObject,
  },
  backdropArea: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.sheetBackdrop,
  },
  sheetFrame: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  sheetFloatingFrame: {
    left: 12,
    right: 12,
    bottom: 12,
  },
  sheet: {
    flex: 1,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: "hidden",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 30,
  },
  sheetFloating: {
    borderRadius: 28,
  },
  blurFill: {
    flex: 1,
    overflow: "hidden",
  },
  glassTint: {
    flex: 1,
    backgroundColor: COLORS.glassCardBorder,
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
    backgroundColor: COLORS.handle,
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
    height: 36,
  },
  headerActionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  headerActionText: {
    color: COLORS.headerAction,
    fontSize: 18,
    fontWeight: "600",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: COLORS.textHeading,
    fontSize: 17,
    fontWeight: "700",
  },
  closeBtn: {},
  closeBtnCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.headerIconBg,
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnText: {
    color: COLORS.headerIcon,
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 18,
  },
  content: {
    flex: 1,
  },
});
