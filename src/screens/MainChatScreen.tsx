import React, { useCallback, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputBar from "../components/InputBar";
import MessageBubble from "../components/MessageBubble";
import Sidebar from "../components/Sidebar";
import SignalLogo from "../components/SignalLogo";
import TypingIndicator from "../components/TypingIndicator";
import { COLORS, DUMMY_SESSIONS, GREETING, Message } from "../constants/theme";
import useSidebarController from "../hooks/useSidebarController";
import SettingsSheet from "../sheets/SettingsSheet";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const SIDEBAR_WIDTH = screenWidth * 0.78;

const greetingMessage: Message = {
  id: "greeting",
  role: "assistant",
  content: GREETING,
  createdAt: "",
};

export default function MainChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [settingsVisible, setSettingsVisible] = useState(false);

  const scrollRef = useRef<ScrollView>(null);
  const {
    sidebarOpen,
    slideAnim,
    chatShiftAnim,
    overlayOpacity,
    openSidebar,
    closeSidebar,
    swipePanHandlers,
  } = useSidebarController({ sidebarWidth: SIDEBAR_WIDTH });

  const scrollToBottom = useCallback(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  }, []);

  const handleSend = useCallback(
    async (overrideText?: string) => {
      const text = (overrideText ?? inputText).trim();
      if (!text || isLoading) return;

      setMessages((prev) => [
        ...prev,
        {
          id: `u-${Date.now()}`,
          role: "user",
          content: text,
          createdAt: new Date().toISOString(),
        },
      ]);
      setInputText("");
      setIsLoading(true);
      scrollToBottom();

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: "assistant",
            content:
              "Oke bro, gue dengerin lo. Situasinya menarik - gue lagi analisa pola dia. Sebentar ya...\n\n(Placeholder - Phase 3 konek ke AI beneran.)",
            createdAt: new Date().toISOString(),
          },
        ]);
        setIsLoading(false);
        scrollToBottom();
      }, 2000);
    },
    [inputText, isLoading, scrollToBottom]
  );

  const resetChat = useCallback(() => {
    setMessages([]);
    setActiveSessionId(null);
    closeSidebar();
  }, [closeSidebar]);

  const openSettingsFromSidebar = useCallback(() => {
    setSettingsVisible(true);
  }, []);

  const isGreeting = messages.length === 0;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      <Sidebar
        slideAnim={slideAnim}
        width={SIDEBAR_WIDTH}
        height={screenHeight}
        sessions={DUMMY_SESSIONS}
        activeSessionId={activeSessionId}
        onSelectSession={(sessionId) => {
          setActiveSessionId(sessionId);
          closeSidebar();
        }}
        onNewChat={resetChat}
        onOpenSettings={openSettingsFromSidebar}
        userName="Austin Bisnis"
        userInitials="AB"
      />

      <Animated.View
        style={[styles.chatScreen, { transform: [{ translateX: chatShiftAnim }] }]}
        {...swipePanHandlers}
      >
        <SafeAreaView style={styles.safe}>
          {sidebarOpen && (
            <TouchableWithoutFeedback onPress={closeSidebar}>
              <Animated.View style={[styles.chatOverlay, { opacity: overlayOpacity }]} />
            </TouchableWithoutFeedback>
          )}

          <View style={styles.header}>
            <TouchableOpacity style={styles.menuBtn} onPress={openSidebar} activeOpacity={0.7}>
              <View style={styles.hamburgerIcon}>
                <View style={[styles.hamburgerLine, { width: 18 }]} />
                <View style={[styles.hamburgerLine, { width: 13 }]} />
              </View>
            </TouchableOpacity>

            <View style={styles.headerCenter}>
              <SignalLogo size={20} />
            </View>

            <TouchableOpacity style={styles.creditBtn} activeOpacity={0.7}>
              <View style={styles.greenDot} />
            </TouchableOpacity>
          </View>

          <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
          >
            <ScrollView
              ref={scrollRef}
              style={styles.messagesArea}
              contentContainerStyle={styles.messagesContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              bounces={false}
              overScrollMode="never"
            >
              {isGreeting ? (
                <MessageBubble message={greetingMessage} />
              ) : (
                <>
                  {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))}
                  {isLoading && <TypingIndicator />}
                </>
              )}
            </ScrollView>

            <InputBar
              value={inputText}
              onChange={setInputText}
              onSend={() => handleSend()}
              isLoading={isLoading}
              showSuggestions={isGreeting}
              onSuggestion={(suggestion) => handleSend(suggestion)}
            />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Animated.View>

      <SettingsSheet
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        userName="Austin Bisnis"
        userEmail="austin@email.com"
        userPlan="lite"
        credits={5}
        onSignOut={() => console.log("sign out")}
        onUpgrade={(plan) => console.log("upgrade", plan)}
        onTopUp={(credits) => console.log("topup", credits)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.sidebarBg,
  },
  flex: {
    flex: 1,
  },
  chatScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
    backgroundColor: COLORS.bg,
    zIndex: 10,
  },
  safe: {
    flex: 1,
    backgroundColor: "transparent",
  },
  chatOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
    zIndex: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  hamburgerIcon: {
    gap: 6,
    alignItems: "flex-start",
  },
  hamburgerLine: {
    height: 1.8,
    borderRadius: 2,
    backgroundColor: COLORS.hamburger,
  },
  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  creditBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.green,
  },
  messagesArea: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
    gap: 20,
    flexGrow: 1,
  },
});
