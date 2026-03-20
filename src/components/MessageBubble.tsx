import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, Message } from "../constants/theme";

type MessageBubbleProps = {
  message: Message;
};

export function CoachAvatar({ size = 36 }: { size?: number }) {
  return (
    <View style={[styles.coachAvatar, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.coachAvatarText, { fontSize: size * 0.5 }]}>S</Text>
    </View>
  );
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  if (message.role === "user") {
    return (
      <View style={styles.userMessageRow}>
        <View style={styles.userBubble}>
          <Text style={styles.userBubbleText}>{message.content}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.messageRow}>
      <CoachAvatar />
      <View style={styles.assistantBubble}>
        <Text style={styles.assistantText}>{message.content}</Text>
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
  userMessageRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 8,
  },
  assistantBubble: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: COLORS.glassBg,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  assistantText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    lineHeight: 24,
  },
  userBubble: {
    maxWidth: "80%",
    backgroundColor: COLORS.userBubble,
    borderRadius: 20,
    borderBottomRightRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.userBubbleBorder,
  },
  userBubbleText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    lineHeight: 24,
  },
  coachAvatar: {
    backgroundColor: COLORS.avatarUserBg,
    alignItems: "center",
    justifyContent: "center",
  },
  coachAvatarText: {
    color: COLORS.accent,
    fontWeight: "700",
  },
});
