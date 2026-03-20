import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { COLORS } from "../constants/theme";

type EditProfileCardProps = {
  name: string;
  email: string;
  onSave: (nextName: string) => void;
  onCancel: () => void;
};

function CameraIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path
        d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
        stroke={COLORS.white}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
        stroke={COLORS.white}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function EditProfileCard({
  name,
  email,
  onSave,
  onCancel,
}: EditProfileCardProps) {
  const [draftName, setDraftName] = useState(name);

  const initials = useMemo(
    () =>
      draftName
        .trim()
        .split(" ")
        .filter(Boolean)
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "SA",
    [draftName]
  );

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      bounces={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.avatarCenter}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <TouchableOpacity style={styles.cameraCircle} activeOpacity={0.8}>
          <CameraIcon />
        </TouchableOpacity>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Name</Text>
        <TextInput
          style={styles.input}
          value={draftName}
          onChangeText={setDraftName}
          placeholder="Your name"
          placeholderTextColor={COLORS.textMuted}
          selectionColor={COLORS.accent}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Email</Text>
        <View style={[styles.input, styles.inputDisabled]}>
          <Text style={styles.disabledText}>{email}</Text>
        </View>
      </View>

      <Text style={styles.helperText}>
        Profil kamu membantu Signal AI mengenali kamu. Nama juga dipakai di tampilan chat.
      </Text>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => onSave(draftName.trim() || name)}
        activeOpacity={0.8}
      >
        <Text style={styles.saveButtonText}>Save profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={onCancel} activeOpacity={0.7}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 26,
    paddingTop: 26,
    paddingBottom: 22,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  avatarCenter: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatarLarge: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: COLORS.avatarUserBg,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 42,
    fontWeight: "500",
  },
  cameraCircle: {
    position: "absolute",
    right: 2,
    bottom: 2,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.black,
    borderWidth: 2,
    borderColor: COLORS.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
  },
  fieldGroup: {
    width: "100%",
    marginBottom: 16,
  },
  fieldLabel: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    minHeight: 58,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.borderSoft,
    backgroundColor: COLORS.surfaceSoft,
    color: COLORS.textPrimary,
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontSize: 17,
  },
  inputDisabled: {
    justifyContent: "center",
  },
  disabledText: {
    color: COLORS.textSecondary,
    fontSize: 17,
  },
  helperText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 2,
    marginBottom: 24,
  },
  saveButton: {
    minWidth: 214,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    marginBottom: 12,
  },
  saveButtonText: {
    color: COLORS.textInverse,
    fontSize: 17,
    fontWeight: "700",
  },
  cancelButton: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: COLORS.textPrimary,
    fontSize: 16,
  },
});
