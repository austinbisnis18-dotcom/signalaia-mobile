import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { COLORS } from "../constants/theme";
import { CoachAvatar } from "./MessageBubble";

export default function TypingIndicator() {
  const dots = [
    useRef(new Animated.Value(0.3)).current,
    useRef(new Animated.Value(0.3)).current,
    useRef(new Animated.Value(0.3)).current,
  ];

  useEffect(() => {
    const animations = dots.map((dot, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 160),
          Animated.timing(dot, { toValue: 1, duration: 380, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0.3, duration: 380, useNativeDriver: true }),
        ])
      )
    );

    animations.forEach((animation) => animation.start());
    return () => animations.forEach((animation) => animation.stop());
  }, [dots]);

  return (
    <View style={styles.messageRow}>
      <CoachAvatar />
      <View style={styles.typingBubble}>
        {dots.map((opacity, index) => (
          <Animated.View key={index} style={[styles.dot, { opacity }]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 8,
  },
  typingBubble: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.glassBg,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.textSecondary,
  },
});
