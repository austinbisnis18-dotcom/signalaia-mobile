import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ChatBubble from "../components/ChatBubble";
import EditProfileModal from "../components/EditProfileModal";
import InputBar from "../components/InputBar";
import SettingsSheet from "../components/SettingsSheet";
import type { Message } from "../../App";

const COLORS = {
  bg: "#000000",
  text: "#ffffff",
  textMuted: "rgba(255,255,255,0.55)",
  surface: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.08)",
};

const INPUT_BAR_HEIGHT = 68;

const ChatScreen = () => {
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList<Message> | null>(null);

  const [showSettings, setShowSettings] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-welcome",
      role: "assistant",
      content: "Yo. Cerita situasi lo di sini, gue bantu bedah sinyal dan susun reply.",
    },
  ]);

  const invertedData = useMemo(() => [...messages].reverse(), [messages]);

  useEffect(() => {
    // Inverted list: offset 0 corresponds to the "bottom" of the chat.
    requestAnimationFrame(() => {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    });
  }, [messages.length]);

  const handleSend = useCallback((content: string) => {
    const text = content.trim();
    if (!text) return;

    const userMessage: Message = {
      id: `u-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simple placeholder AI response (swap with real integration later).
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}-${Math.random().toString(16).slice(2)}`,
          role: "assistant",
          content: `Oke. Gue tangkep: "${text}". Kasih gue detail kecilnya (konteks & terakhir chat lo).`,
        },
      ]);
    }, 650);
  }, []);

  const renderMessage = useCallback(({ item }: { item: Message }) => {
    return <ChatBubble message={item} />;
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={insets.top}
    >
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View>
          <Text style={styles.title}>Signal AI</Text>
          <Text style={styles.subtitle}>Dating Coach</Text>
        </View>

        <TouchableOpacity
          style={styles.settingsBtn}
          activeOpacity={0.8}
          onPress={() => setShowSettings(true)}
        >
          <Text style={styles.settingsIcon}>⚙</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={listRef}
        data={invertedData}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        inverted
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: INPUT_BAR_HEIGHT + insets.bottom + 18 },
        ]}
      />

      <View style={[styles.inputWrapper, { paddingBottom: insets.bottom }]}>
        <InputBar onSend={handleSend} />
      </View>

      <SettingsSheet
        visible={showSettings}
        onClose={() => setShowSettings(false)}
        onEditProfile={() => setShowEditProfile(true)}
      />

      <EditProfileModal
        visible={showEditProfile}
        onClose={() => setShowEditProfile(false)}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "700",
  },
  subtitle: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    alignItems: "center",
    justifyContent: "center",
  },
  settingsIcon: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "700",
    marginTop: -1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    flexGrow: 1,
  },
  inputWrapper: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 0,
    // keep it visually separate from the chat area
    backgroundColor: "transparent",
    zIndex: 20,
  },
});

export default ChatScreen;