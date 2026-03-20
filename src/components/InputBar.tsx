import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, SUGGESTIONS } from "../constants/theme";

type InputBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
  showSuggestions: boolean;
  onSuggestion: (value: string) => void;
};

export default function InputBar({
  value,
  onChange,
  onSend,
  isLoading,
  showSuggestions,
  onSuggestion,
}: InputBarProps) {
  const canSend = value.trim().length > 0 && !isLoading;

  return (
    <View style={styles.inputContainer}>
      {showSuggestions ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.suggestionsRow}
          style={styles.suggestionsScroll}
        >
          {SUGGESTIONS.map((suggestion) => (
            <TouchableOpacity
              key={suggestion}
              onPress={() => onSuggestion(suggestion)}
              style={styles.suggestionPill}
              activeOpacity={0.7}
            >
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : null}

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
              <Text style={styles.pillText}>Roast Me</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pill} activeOpacity={0.7}>
              <Text style={styles.pillText}>Game Plan</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.sendBtn, !canSend && styles.sendBtnDisabled]}
            onPress={onSend}
            disabled={!canSend}
            activeOpacity={0.8}
          >
            <Text style={styles.sendBtnIcon}>^</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.disclaimer}>Signal AI bisa salah. Verifikasi keputusan penting.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: COLORS.glassBg,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  suggestionText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: "500",
  },
  inputWrapper: {
    backgroundColor: COLORS.glassBg,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: COLORS.black,
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
    backgroundColor: COLORS.glassShine,
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
    backgroundColor: COLORS.surfaceSoft,
    borderWidth: 1,
    borderColor: COLORS.borderSoft,
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
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  sendBtnDisabled: {
    opacity: 0.3,
  },
  sendBtnIcon: {
    color: COLORS.textInverse,
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
