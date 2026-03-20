import { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  StatusBar,
  Animated,
  Dimensions,
  PanResponder,
} from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import SettingsSheet from "./SettingsSheet";

// Signal Logo (converted from PWA SVG)
const SignalLogo = ({ size = 22 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    <Defs>
      <LinearGradient id="sg_grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#E8E8E8" />
        <Stop offset="45%" stopColor="#DDDDD0" />
        <Stop offset="100%" stopColor="#888888" />
      </LinearGradient>
    </Defs>
    <Path
      d="M 100,18 H 20 V 60 H 100 V 102 H 20"
      stroke="url(#sg_grad)"
      strokeWidth="18"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </Svg>
);

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

interface ChatSession {
  id: string;
  title: string;
}

// Constants
const { width: W, height: H } = Dimensions.get("window");
const SIDEBAR_W = W * 0.78;

const COLORS = {
  bg: "#000000",
  sidebarBg: "#2c2c2c",
  surface: "#383838",
  border: "#404040",
  textPrimary: "#ececec",
  textSecondary: "#9a9a9a",
  textMuted: "#555555",
  accent: "#ffffff",
  userBubble: "#141414",
  inputBg: "#0d0d0d",
  green: "#4ade80",
  sessionActive: "#3a3a3a",
  searchBg: "#383838",
  avatarUserBg: "#19c37d",
  glassBg: "rgba(255,255,255,0.06)",
  glassBorder: "rgba(255,255,255,0.13)",
  glassShine: "rgba(255,255,255,0.04)",
};

const SUGGESTIONS = [
  "Dia nge-ghosting setelah jalan bareng",
  "Cara bikin dia penasaran sama gue",
  "Bedah screenshot chat gue",
];

const GREETING =
  "Yo bro, gue Signal AI - dating coach lo. Mau bedah chat, baca sinyal cewek, atau cari strategi? Drop aja di sini.";

const DUMMY_SESSIONS: ChatSession[] = [
  { id: "1", title: "Dia ghosting habis jalan" },
  { id: "2", title: "PDKT 7 hari game plan" },
  { id: "3", title: "Bedah chat screenshot" },
  { id: "4", title: "Cara reply kalau dia cold" },
];

// Avatars
const CoachAvatar = () => {
  return (
    <View style={styles.avatarCoach}>
      <Text style={styles.avatarCoachText}>S</Text>
    </View>
  );
};

const UserAvatar = ({ initials = "AB", size = 36 }: { initials?: string; size?: number }) => {
  return (
    <View style={[styles.userAvatar, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.userAvatarText, { fontSize: size * 0.36 }]}>{initials}</Text>
    </View>
  );
};

// Typing Indicator
const TypingIndicator = () => {
  const dots = [
    useRef(new Animated.Value(0.3)).current,
    useRef(new Animated.Value(0.3)).current,
    useRef(new Animated.Value(0.3)).current,
  ];

  useEffect(() => {
    const anims = dots.map((dot, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 160),
          Animated.timing(dot, { toValue: 1, duration: 380, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0.3, duration: 380, useNativeDriver: true }),
        ])
      )
    );
    anims.forEach((a) => a.start());
    return () => anims.forEach((a) => a.stop());
  }, []);

  return (
    <View style={styles.messageRow}>
      <CoachAvatar />
      <View style={styles.typingBubble}>
        {dots.map((op, i) => (
          <Animated.View key={i} style={[styles.dot, { opacity: op }]} />
        ))}
      </View>
    </View>
  );
};

// Message Bubble
const MessageBubble = ({ message }: { message: Message }) => {
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
      <View style={styles.assistantContent}>
        <Text style={styles.assistantText}>{message.content}</Text>
      </View>
    </View>
  );
};

// Greeting
const GreetingView = () => {
  return (
    <View style={styles.messageRow}>
      <CoachAvatar />
      <View style={styles.assistantContent}>
        <Text style={styles.assistantText}>{GREETING}</Text>
      </View>
    </View>
  );
};

// Input Bar
const InputBar = ({
  value,
  onChange,
  onSend,
  isLoading,
  showSuggestions,
  onSuggestion,
}: {
  value: string;
  onChange: (t: string) => void;
  onSend: () => void;
  isLoading: boolean;
  showSuggestions: boolean;
  onSuggestion: (t: string) => void;
}) => {
  const canSend = value.trim().length > 0 && !isLoading;
  return (
    <View style={styles.inputContainer}>
      {showSuggestions && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.suggestionsRow}
          style={styles.suggestionsScroll}
        >
          {SUGGESTIONS.map((s, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => onSuggestion(s)}
              style={styles.suggestionPill}
              activeOpacity={0.7}
            >
              <Text style={styles.suggestionText}>{s}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <View style={styles.inputWrapper}>
        <View style={styles.glassShineBar} />
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChange}
          placeholder="Cerita situasi lo di sini..."
          placeholderTextColor={COLORS.textMuted}
          multiline
          maxLength={2000}
          editable={!isLoading}
        />
        <View style={styles.inputFooter}>
          <View style={styles.inputPills}>
            <TouchableOpacity style={styles.pill} activeOpacity={0.7}>
              <Text style={styles.pillText}>🔥 Roast Me</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pill} activeOpacity={0.7}>
              <Text style={styles.pillText}>📋 Game Plan</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.sendBtn, !canSend && styles.sendBtnDisabled]}
            onPress={onSend}
            disabled={!canSend}
            activeOpacity={0.8}
          >
            <Text style={styles.sendBtnIcon}>↑</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.disclaimer}>
        Signal AI bisa salah. Verifikasi keputusan penting.
      </Text>
    </View>
  );
};

// Main Chat Screen
function MainScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const sidebarOpenRef = useRef(false);

  const swipePan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) =>
        sidebarOpenRef.current && g.dx < -15 && Math.abs(g.dx) > Math.abs(g.dy) * 1.5,
      onPanResponderRelease: (_, g) => {
        if (g.dx < -40) closeSidebarRef.current?.();
      },
    })
  ).current;
  const closeSidebarRef = useRef<(() => void) | null>(null);

  const slideAnim = useRef(new Animated.Value(-SIDEBAR_W)).current;
  const chatShiftAnim = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const openSidebar = useCallback(() => {
    setSidebarOpen(true);
    sidebarOpenRef.current = true;
    slideAnim.setValue(-SIDEBAR_W);
    chatShiftAnim.setValue(0);
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
      Animated.timing(chatShiftAnim, { toValue: SIDEBAR_W, duration: 250, useNativeDriver: true }),
      Animated.timing(overlayOpacity, { toValue: 1, duration: 250, useNativeDriver: true }),
    ]).start();
  }, []);

  const closeSidebar = useCallback(() => {
    sidebarOpenRef.current = false;
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: -SIDEBAR_W, duration: 200, useNativeDriver: true }),
      Animated.timing(chatShiftAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(overlayOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start(() => setSidebarOpen(false));
  }, []);

  useEffect(() => {
    closeSidebarRef.current = closeSidebar;
  }, [closeSidebar]);

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

  const isGreeting = messages.length === 0;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      {/* Sidebar */}
      <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
        <SafeAreaView style={styles.sidebarSafe}>
          <View style={styles.sidebarTopRow}>
            <View style={styles.searchBar}>
              <Text style={styles.searchIcon}>🔍</Text>
              <Text style={styles.searchPlaceholder}>Search</Text>
            </View>
            <TouchableOpacity
              style={styles.sidebarIconBtn}
              onPress={() => {
                setMessages([]);
                setActiveSessionId(null);
                closeSidebar();
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.sidebarIconText}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.navSection}>
            <TouchableOpacity
              style={styles.newChatBtn}
              onPress={() => {
                setMessages([]);
                setActiveSessionId(null);
                closeSidebar();
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.newChatBtnText}>+ New Chat</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.sessionList} showsVerticalScrollIndicator={false}>
            {DUMMY_SESSIONS.map((s) => (
              <TouchableOpacity
                key={s.id}
                style={[styles.sessionItem, activeSessionId === s.id && styles.sessionItemActive]}
                onPress={() => {
                  setActiveSessionId(s.id);
                  closeSidebar();
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.sessionItemText} numberOfLines={1}>
                  {s.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.sidebarFooter}>
            <TouchableOpacity
              style={styles.profileRowBtn}
              onPress={() => setSettingsVisible(true)}
              activeOpacity={0.8}
            >
              <UserAvatar initials="AB" size={38} />
              <Text style={styles.profileName}>Austin Bisnis</Text>
              <TouchableOpacity
                style={styles.upgradeBtn}
                activeOpacity={0.7}
                onPress={() => setSettingsVisible(true)}
              >
                <Text style={styles.upgradeBtnText}>Upgrade</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>

      {/* Chat Screen */}
      <Animated.View
        style={[styles.chatScreen, { transform: [{ translateX: chatShiftAnim }] }]}
        {...swipePan.panHandlers}
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
              <Text style={styles.headerStatus}>Alpha Mentor Online</Text>
            </View>

            <TouchableOpacity style={styles.creditBtn} activeOpacity={0.7}>
              <View style={styles.greenDot} />
              <Text style={styles.creditText}>5</Text>
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
                <GreetingView />
              ) : (
                <>
                  {messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} />
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
              onSuggestion={(s) => handleSend(s)}
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

// Root App
export default function App() {
  return (
    <SafeAreaProvider>
      <MainScreen />
    </SafeAreaProvider>
  );
}

// Styles
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.sidebarBg,
  },
  flex: {
    flex: 1,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: SIDEBAR_W,
    height: H,
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
    backgroundColor: "#1c1c1c",
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  searchIcon: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  searchPlaceholder: {
    color: "#666666",
    fontSize: 16,
  },
  sidebarIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1c1c1c",
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
    gap: 12,
    paddingHorizontal: 4,
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
    color: "#fff",
    fontWeight: "700",
  },
  avatarCoach: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.avatarUserBg,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarCoachText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  chatScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    width: W,
    height: H,
    backgroundColor: COLORS.bg,
    zIndex: 10,
  },
  safe: {
    flex: 1,
    backgroundColor: "transparent",
  },
  chatOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
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
    backgroundColor: "#aaaaaa",
  },
  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerStatus: {
    color: COLORS.textMuted,
    fontSize: 11,
    letterSpacing: 0.2,
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
  creditText: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: "600",
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
  assistantContent: {
    flex: 1,
    paddingTop: 4,
  },
  assistantText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    lineHeight: 24,
  },
  userBubble: {
    maxWidth: W * 0.8,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 20,
    borderBottomRightRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  userBubbleText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    lineHeight: 24,
  },
  typingBubble: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.textSecondary,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: "transparent",
  },
  suggestionsScroll: {
    marginBottom: 8,
  },
  suggestionsRow: {
    gap: 8,
    paddingHorizontal: 4,
  },
  suggestionPill: {
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  suggestionText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: "500",
  },
  inputWrapper: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  glassShineBar: {
    position: "absolute",
    top: 0,
    left: 24,
    right: 24,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 1,
  },
  textInput: {
    color: COLORS.textPrimary,
    fontSize: 16,
    lineHeight: 24,
    maxHeight: 120,
    minHeight: 36,
    paddingTop: 0,
    paddingBottom: 4,
  },
  inputFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  inputPills: {
    flexDirection: "row",
    gap: 8,
    flex: 1,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  pillText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: "500",
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  sendBtnDisabled: {
    opacity: 0.3,
  },
  sendBtnIcon: {
    color: "#000",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 22,
  },
  disclaimer: {
    textAlign: "center",
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 8,
    paddingBottom: 4,
  },
});