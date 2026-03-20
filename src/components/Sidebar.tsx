import React from "react";
import { Animated, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChatSession, COLORS } from "../constants/theme";

type SidebarProps = {
  slideAnim: Animated.Value;
  width: number;
  height: number;
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
  onNewChat: () => void;
  onOpenSettings: () => void;
  userName: string;
  userInitials?: string;
};

function UserAvatar({ initials = "AB", size = 38 }: { initials?: string; size?: number }) {
  return (
    <View style={[styles.userAvatar, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.userAvatarText, { fontSize: size * 0.36 }]}>{initials}</Text>
    </View>
  );
}

export default function Sidebar({
  slideAnim,
  width,
  height,
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  onOpenSettings,
  userName,
  userInitials = "AB",
}: SidebarProps) {
  return (
    <Animated.View style={[styles.sidebar, { width, height, transform: [{ translateX: slideAnim }] }]}>
      <SafeAreaView style={styles.sidebarSafe}>
        <View style={styles.sidebarTopRow}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>Search</Text>
          </View>
          <TouchableOpacity style={styles.sidebarIconBtn} onPress={onNewChat} activeOpacity={0.7}>
            <Text style={styles.sidebarIconText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.navSection}>
          <TouchableOpacity style={styles.newChatBtn} onPress={onNewChat} activeOpacity={0.7}>
            <Text style={styles.newChatBtnText}>+ New Chat</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.sessionList} showsVerticalScrollIndicator={false}>
          {sessions.map((session) => (
            <TouchableOpacity
              key={session.id}
              style={[
                styles.sessionItem,
                activeSessionId === session.id && styles.sessionItemActive,
              ]}
              onPress={() => onSelectSession(session.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.sessionItemText} numberOfLines={1}>
                {session.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sidebarFooter}>
          <Pressable
            style={({ pressed }) => [styles.profileRowBtn, pressed && styles.profileRowBtnPressed]}
            onPress={onOpenSettings}
            hitSlop={10}
          >
            <View style={styles.profileMeta}>
              <UserAvatar initials={userInitials} size={38} />
              <Text style={styles.profileName}>{userName}</Text>
            </View>
            <View style={styles.upgradeBtn}>
              <Text style={styles.upgradeBtnText}>Upgrade</Text>
            </View>
          </Pressable>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: COLORS.sidebarBg,
    zIndex: 20,
  },
  sidebarSafe: {
    flex: 1,
  },
  sidebarTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
    paddingTop: Platform.OS === "android" ? 44 : 12,
    paddingBottom: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: COLORS.sidebarPanel,
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  searchIcon: {
    fontSize: 16,
    color: COLORS.textPlaceholder,
  },
  sidebarIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.sidebarPanel,
    alignItems: "center",
    justifyContent: "center",
  },
  sidebarIconText: {
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  navSection: {
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  newChatBtn: {
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 10,
    backgroundColor: COLORS.sessionActive,
  },
  newChatBtnText: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: "500",
  },
  sessionList: {
    flex: 1,
    paddingHorizontal: 8,
  },
  sessionItem: {
    paddingHorizontal: 12,
    paddingVertical: 11,
    borderRadius: 8,
    marginBottom: 1,
  },
  sessionItemActive: {
    backgroundColor: COLORS.sessionActive,
  },
  sessionItemText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  sidebarFooter: {
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  profileRowBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 18,
  },
  profileRowBtnPressed: {
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  profileMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  profileName: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: "600",
  },
  upgradeBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  upgradeBtnText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: "600",
  },
  userAvatar: {
    backgroundColor: COLORS.avatarUserBg,
    alignItems: "center",
    justifyContent: "center",
  },
  userAvatarText: {
    color: COLORS.accent,
    fontWeight: "700",
  },
});
