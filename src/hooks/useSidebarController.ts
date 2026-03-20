import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, PanResponder } from "react-native";

type UseSidebarControllerParams = {
  sidebarWidth: number;
};

export default function useSidebarController({
  sidebarWidth,
}: UseSidebarControllerParams) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarOpenRef = useRef(false);
  const closeSidebarRef = useRef<(() => void) | null>(null);

  const slideAnim = useRef(new Animated.Value(-sidebarWidth)).current;
  const chatShiftAnim = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const closeSidebar = useCallback(() => {
    sidebarOpenRef.current = false;
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: -sidebarWidth, duration: 200, useNativeDriver: true }),
      Animated.timing(chatShiftAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(overlayOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start(() => setSidebarOpen(false));
  }, [chatShiftAnim, overlayOpacity, sidebarWidth, slideAnim]);

  const openSidebar = useCallback(() => {
    setSidebarOpen(true);
    sidebarOpenRef.current = true;
    slideAnim.setValue(-sidebarWidth);
    chatShiftAnim.setValue(0);
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
      Animated.timing(chatShiftAnim, { toValue: sidebarWidth, duration: 250, useNativeDriver: true }),
      Animated.timing(overlayOpacity, { toValue: 1, duration: 250, useNativeDriver: true }),
    ]).start();
  }, [chatShiftAnim, overlayOpacity, sidebarWidth, slideAnim]);

  useEffect(() => {
    closeSidebarRef.current = closeSidebar;
  }, [closeSidebar]);

  const swipePanHandlers = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        sidebarOpenRef.current &&
        gestureState.dx < -15 &&
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy) * 1.5,
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -40) {
          closeSidebarRef.current?.();
        }
      },
    })
  ).current.panHandlers;

  return {
    sidebarOpen,
    slideAnim,
    chatShiftAnim,
    overlayOpacity,
    openSidebar,
    closeSidebar,
    swipePanHandlers,
  };
}
