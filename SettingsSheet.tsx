import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import BottomSheet from "./BottomSheet";

// Colors
const C = {
  surface: "#2a2a2a",
  surface2: "#333333",
  border: "#3a3a3a",
  divider: "#333333",
  textPrimary: "#f0f0f0",
  textSecondary: "#8e8e8e",
  textMuted: "#555555",
  accent: "#ffffff",
  green: "#4ade80",
  red: "#ef4444",
  avatarGreen: "#19c37d",
};

// SVG Icons (Path-only, white outline)
const I = { size: 20, color: "#ffffff", sw: "2.4" };

const IconMail = () => (
  <Svg width={I.size} height={I.size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
      stroke={I.color}
      strokeWidth={I.sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 6l-10 7L2 6"
      stroke={I.color}
      strokeWidth={I.sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconSubscription = () => (
  <Svg width={I.size} height={I.size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
      stroke={I.color}
      strokeWidth={I.sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 8v8M8 12h8"
      stroke={I.color}
      strokeWidth={I.sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconBolt = () => (
  <Svg width={I.size} height={I.size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
      stroke="#facc15"
      strokeWidth={I.sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconBook = () => (
  <Svg width={I.size} height={I.size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 19.5A2.5 2.5 0 016.5 17H20"
      stroke={I.color}
      strokeWidth={I.sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"
      stroke={I.color}
      strokeWidth={I.sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconGlobe = () => (
  <Svg width={I.size} height={I.size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2a10 10 0 100 20 10 10 0 000-20z"
      stroke={I.color}
      strokeWidth={I.sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 12h20"
      stroke={I.color}
      strokeWidth={I.sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
      stroke={I.color}
      strokeWidth={I.sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconMoon = () => (
  <Svg width={I.size} height={I.size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
      stroke={I.color}
      strokeWidth={I.sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconBell = () => (
  <Svg width={I.size} height={I.size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"
      stroke={I.color}
      strokeWidth={I.sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.73 21a2 2 0 01-3.46 0"
      stroke={I.color}
      strokeWidth={I.sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconLock = () => (
  <Svg width={I.size} height={I.size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 11h14a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2z"
      stroke={I.color}
      strokeWidth={I.sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7 11V7a5 5 0 0110 0v4"
      stroke={I.color}
      strokeWidth={I.sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconFile = () => (
  <Svg width={I.size} height={I.size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
      stroke={I.color}
      strokeWidth={I.sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 2v6h6"
      stroke={I.color}
      strokeWidth={I.sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconAlert = () => (
  <Svg width={I.size} height={I.size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
      stroke={I.color}
      strokeWidth={I.sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 9v4M12 17h.01"
      stroke={I.color}
      strokeWidth={I.sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconTrash = () => (
  <Svg width={I.size} height={I.size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 6h18"
      stroke={I.color}
      strokeWidth={I.sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
      stroke={I.color}
      strokeWidth={I.sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconAt = () => (
  <Svg width={I.size} height={I.size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      stroke={I.color}
      strokeWidth={I.sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94"
      stroke={I.color}
      strokeWidth={I.sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconPhone = () => (
  <Svg width={I.size} height={I.size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
      stroke={I.color}
      strokeWidth={I.sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconCamera = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 17a4 4 0 100-8 4 4 0 000 8z"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ─── Row Component ────────────────────────────────────────────────────────────
const SettingsRow = ({
  icon,
  label,
  value,
  onPress,
  danger,
  showChevron = true,
  showDivider = true,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onPress?: () => void;
  danger?: boolean;
  showChevron?: boolean;
  showDivider?: boolean;
}) => (
  <>
    <TouchableOpacity style={ss.row} onPress={onPress} activeOpacity={0.6}>
      <View style={ss.rowIconWrap}>{icon}</View>
      <Text style={[ss.rowLabel, danger && { color: C.red }]}>{label}</Text>
      <View style={ss.rowRight}>
        {value ? <Text style={ss.rowValue}>{value}</Text> : null}
        {showChevron && <Text style={[ss.rowChevron, danger && { color: C.red }]}>›</Text>}
      </View>
    </TouchableOpacity>
    {showDivider && <View style={ss.divider} />}
  </>
);

const SectionHeader = ({ text }: { text: string }) => (
  <Text style={ss.sectionHeader}>{text}</Text>
);

// ─── Edit Profile Content ─────────────────────────────────────────────────────
const EditProfileContent = ({
  name,
  email,
  onSave,
  onCancel,
}: {
  name: string;
  email: string;
  onSave: () => void;
  onCancel: () => void;
}) => {
  const [nameVal, setNameVal] = useState(name);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <View style={ss.editContent}>
      <View style={ss.editAvatarCenter}>
        <View style={ss.editAvatarLarge}>
          <Text style={ss.editAvatarText}>{initials}</Text>
        </View>
        <TouchableOpacity style={ss.cameraCircle} activeOpacity={0.8}>
          <IconCamera />
        </TouchableOpacity>
      </View>

      <View style={ss.editFieldGroup}>
        <Text style={ss.editFieldLabel}>Name</Text>
        <TextInput
          style={ss.editInput}
          value={nameVal}
          onChangeText={setNameVal}
          placeholderTextColor={C.textMuted}
          selectionColor={C.accent}
        />
      </View>

      <View style={ss.editFieldGroup}>
        <Text style={ss.editFieldLabel}>Email</Text>
        <View style={[ss.editInput, ss.editInputDisabled]}>
          <Text style={{ color: C.textSecondary, fontSize: 16 }}>{email}</Text>
        </View>
      </View>

      <Text style={ss.editHelper}>
        Profil kamu membantu coach mengenali kamu. Nama juga digunakan di tampilan chat.
      </Text>

      <TouchableOpacity style={ss.savePill} onPress={onSave} activeOpacity={0.8}>
        <Text style={ss.savePillText}>Save profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={ss.cancelBtn} onPress={onCancel} activeOpacity={0.7}>
        <Text style={ss.cancelBtnText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

// ─── Plan Card ────────────────────────────────────────────────────────────────
const PlanCard = ({
  name,
  subtitle,
  price,
  originalPrice,
  savePct,
  features,
  includesFrom,
  isActive,
  isPopular,
  onPress,
}: {
  name: string;
  subtitle: string;
  price: string;
  originalPrice: string;
  savePct: string;
  features: string[];
  includesFrom?: string;
  isActive?: boolean;
  isPopular?: boolean;
  onPress: () => void;
}) => {
  return (
    <View style={[ss.planCard, isActive && ss.planCardActive]}>
      <View style={ss.planCardHeader}>
        <View style={ss.planNameRow}>
          <Text style={ss.planName}>{name}</Text>
          {isPopular && (
            <View style={ss.popularBadge}>
              <Text style={ss.popularBadgeText}>Popular</Text>
            </View>
          )}
          {isActive && (
            <View style={ss.activeBadge}>
              <Text style={ss.activeBadgeText}>Aktif</Text>
            </View>
          )}
        </View>
        <Text style={ss.planSubtitle}>{subtitle}</Text>
      </View>

      <View style={ss.planPriceRow}>
        <Text style={ss.planPrice}>{price}</Text>
        <Text style={ss.planPeriod}>/bln</Text>
        <Text style={ss.planOriginal}>{originalPrice}</Text>
        <View style={ss.saveBadge}>
          <Text style={ss.saveBadgeText}>Save {savePct}</Text>
        </View>
      </View>

      {includesFrom && (
        <Text style={ss.includesFrom}>Semua di {includesFrom}, plus</Text>
      )}

      <View style={ss.planFeatures}>
        {features.map((f, i) => (
          <View key={i} style={ss.featureRow}>
            <Text style={ss.featureCheck}>✓</Text>
            <Text style={ss.featureText}>{f}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[ss.planBtn, isActive && ss.planBtnActive]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text style={[ss.planBtnText, isActive && ss.planBtnTextActive]}>
          {isActive ? "✓ Paket Saat Ini" : `Ganti ke ${name}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// ─── Subscription Content ─────────────────────────────────────────────────────
const SubscriptionContent = ({ currentPlan }: { currentPlan: "lite" | "pro" | "max" }) => {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <PlanCard
        name="PRO"
        subtitle="Taktik & Kejelasan"
        price="Rp49.000"
        originalPrice="Rp99.000"
        savePct="50%"
        isPopular
        isActive={currentPlan === "pro"}
        includesFrom="LITE"
        features={[
          "500 Kredit / Bulan",
          "Upload Screenshot",
          "3 Taktik Balasan (Netral, Hangat, Dingin)",
        ]}
        onPress={() => {}}
      />
      <PlanCard
        name="MAX"
        subtitle="Dominasi Total"
        price="Rp149.000"
        originalPrice="Rp299.000"
        savePct="50%"
        isActive={currentPlan === "max"}
        includesFrom="PRO"
        features={[
          "2.500 Kredit / Bulan",
          "Prioritas AI (Model Terbaik)",
          'Mode "Roast Me" - Coach tampar lo kalau needy',
          "Analisis Manipulasi & Red Flag 100% Terbuka",
          "Game Plan 3-7 Hari (rencana taktis harian)",
        ]}
        onPress={() => {}}
      />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

// ─── Main SettingsSheet ───────────────────────────────────────────────────────
interface Props {
  visible: boolean;
  onClose: () => void;
  userName?: string;
  userEmail?: string;
  userPlan?: "lite" | "pro" | "max";
  credits?: number;
  onSignOut?: () => void;
  onUpgrade?: (plan: "pro" | "max") => void;
  onTopUp?: (credits: number) => void;
}

export default function SettingsSheet({
  visible,
  onClose,
  userName = "Austin Bisnis",
  userEmail = "austin@email.com",
  userPlan = "lite",
  credits = 5,
  onSignOut,
  onUpgrade,
  onTopUp,
}: Props) {
  const [editVisible, setEditVisible] = useState(false);
  const [subVisible, setSubVisible] = useState(false);

  const planLabel = userPlan === "max" ? "MAX" : userPlan === "pro" ? "PRO" : "Free Plan";
  const initials = userName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      {/* Main Settings — normal sheet, no blur, no float */}
      <BottomSheet visible={visible} onClose={onClose} title="Settings" heightFraction={0.93}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={ss.scrollContent} showsVerticalScrollIndicator={false} bounces={true}>
          <View style={ss.profileSection}>
            <View style={ss.avatarLarge}>
              <Text style={ss.avatarLargeText}>{initials}</Text>
            </View>
            <Text style={ss.profileName}>{userName}</Text>
            <Text style={ss.profileEmail}>{userEmail}</Text>
            <TouchableOpacity style={ss.editProfilePill} onPress={() => setEditVisible(true)} activeOpacity={0.7}>
              <Text style={ss.editProfilePillText}>Edit profile</Text>
            </TouchableOpacity>
          </View>

          <SectionHeader text="Account" />
          <View style={ss.card}>
            <SettingsRow icon={<IconMail />} label="Email" value={userEmail} showChevron={false} />
            <SettingsRow
              icon={<IconSubscription />}
              label="Subscription"
              value={planLabel}
              onPress={() => setSubVisible(true)}
            />
            <SettingsRow
              icon={<IconBolt />}
              label="Kredit"
              value={`${credits} kredit`}
              showChevron={false}
              showDivider={false}
            />
          </View>

          <SectionHeader text="Top Up Kredit" />
          <View style={ss.topupRow}>
            <TouchableOpacity style={ss.topupCard} onPress={() => onTopUp?.(100)} activeOpacity={0.7}>
              <Text style={ss.topupCredits}>
                100 <Text style={ss.topupKredit}>kredit</Text>
              </Text>
              <Text style={ss.topupPrice}>Rp19.000</Text>
              <Text style={ss.topupOnce}>sekali bayar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ss.topupCard} onPress={() => onTopUp?.(250)} activeOpacity={0.7}>
              <Text style={ss.topupCredits}>
                250 <Text style={ss.topupKredit}>kredit</Text>
              </Text>
              <Text style={ss.topupPrice}>Rp29.000</Text>
              <Text style={ss.topupOnce}>sekali bayar</Text>
            </TouchableOpacity>
          </View>

          <SectionHeader text="Aplikasi" />
          <View style={ss.card}>
            <SettingsRow icon={<IconBook />} label="Panduan" onPress={() => {}} />
            <SettingsRow icon={<IconGlobe />} label="Bahasa" value="Indonesia" onPress={() => {}} />
            <SettingsRow icon={<IconMoon />} label="Tampilan" value="Gelap" onPress={() => {}} />
            <SettingsRow icon={<IconBell />} label="Notifikasi" onPress={() => {}} showDivider={false} />
          </View>

          <SectionHeader text="Tentang" />
          <View style={ss.card}>
            <SettingsRow icon={<IconLock />} label="Kebijakan Privasi" onPress={() => {}} />
            <SettingsRow icon={<IconFile />} label="Syarat & Ketentuan" onPress={() => {}} />
            <SettingsRow icon={<IconAlert />} label="Disclaimer" onPress={() => {}} />
            <SettingsRow icon={<IconTrash />} label="Penghapusan Data" onPress={() => {}} showDivider={false} />
          </View>

          <SectionHeader text="Kontak" />
          <View style={ss.card}>
            <SettingsRow icon={<IconAt />} label="support@yoursignalai.com" showChevron={false} onPress={() => {}} />
          </View>

          <TouchableOpacity
            style={ss.signOutBtn}
            onPress={() => {
              onClose();
              onSignOut?.();
            }}
            activeOpacity={0.7}
          >
            <Text style={ss.signOutText}>Keluar</Text>
          </TouchableOpacity>

          <View style={{ height: 50 }} />
        </ScrollView>
      </BottomSheet>

      {/* Edit Profile - floating + blur, tanpa tombol X (karena sudah ada Cancel) */}
      <BottomSheet
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        title=""
        heightFraction={0.7}
        showClose={false} // Tombol X dihilangkan
        useBlur={true}
        floating={true}
      >
        <EditProfileContent
          name={userName}
          email={userEmail}
          onSave={() => setEditVisible(false)}
          onCancel={() => setEditVisible(false)}
        />
      </BottomSheet>

      {/* Subscription - normal sheet */}
      <BottomSheet
        visible={subVisible}
        onClose={() => setSubVisible(false)}
        title="Pilih Plan"
        heightFraction={0.93}
      >
        <SubscriptionContent currentPlan={userPlan} />
      </BottomSheet>
    </>
  );
}

// Styles
const ss = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileSection: {
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 24,
  },
  avatarLarge: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: C.avatarGreen,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  avatarLargeText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
  },
  profileName: {
    color: C.textPrimary,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  profileEmail: {
    color: C.textSecondary,
    fontSize: 14,
    marginBottom: 14,
  },
  editProfilePill: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.border,
  },
  editProfilePillText: {
    color: C.textPrimary,
    fontSize: 14,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    marginBottom: 16,
    overflow: "hidden",
  },
  sectionHeader: {
    color: C.textSecondary,
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 4,
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowIconWrap: {
    width: 36,
    alignItems: "center",
    marginRight: 12,
  },
  rowLabel: {
    flex: 1,
    color: C.textPrimary,
    fontSize: 16,
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  rowValue: {
    color: C.textSecondary,
    fontSize: 14,
  },
  rowChevron: {
    color: C.textMuted,
    fontSize: 20,
    lineHeight: 22,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginLeft: 58,
  },
  topupRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  topupCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  topupCredits: {
    color: C.textPrimary,
    fontSize: 20,
    fontWeight: "700",
  },
  topupKredit: {
    color: C.textSecondary,
    fontSize: 12,
    fontWeight: "400",
  },
  topupPrice: {
    color: C.textPrimary,
    fontSize: 15,
    fontWeight: "600",
    marginTop: 4,
  },
  topupOnce: {
    color: C.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  signOutBtn: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    marginTop: 8,
  },
  signOutText: {
    color: C.red,
    fontSize: 16,
    fontWeight: "600",
  },
  editContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    alignItems: "center",
    flex: 1,
  },
  editAvatarCenter: {
    alignItems: "center",
    marginBottom: 24,
    position: "relative",
  },
  editAvatarLarge: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: C.avatarGreen,
    alignItems: "center",
    justifyContent: "center",
  },
  editAvatarText: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "700",
  },
  cameraCircle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: C.surface2,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: C.surface,
  },
  editFieldGroup: {
    width: "100%",
    marginBottom: 16,
  },
  editFieldLabel: {
    color: C.textSecondary,
    fontSize: 13,
    marginBottom: 4,
    marginLeft: 4,
  },
  editInput: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: C.textPrimary,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  editInputDisabled: {
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  editHelper: {
    color: C.textSecondary,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
    marginTop: 8,
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  savePill: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 24,
    backgroundColor: C.accent,
    marginBottom: 12,
    width: "100%",
    alignItems: "center",
  },
  savePillText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
  },
  cancelBtn: {
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  cancelBtnText: {
    color: C.textSecondary,
    fontSize: 15,
  },
  planCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  planCardActive: {
    borderColor: "rgba(255,255,255,0.3)",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  planCardHeader: {
    marginBottom: 12,
  },
  planNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  planName: {
    color: C.textPrimary,
    fontSize: 18,
    fontWeight: "700",
  },
  popularBadge: {
    backgroundColor: C.green,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  popularBadgeText: {
    color: "#000",
    fontSize: 10,
    fontWeight: "700",
  },
  activeBadge: {
    backgroundColor: C.surface2,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.border,
  },
  activeBadgeText: {
    color: C.textSecondary,
    fontSize: 10,
  },
  planSubtitle: {
    color: C.textSecondary,
    fontSize: 13,
  },
  planPriceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    marginBottom: 12,
  },
  planPrice: {
    color: C.textPrimary,
    fontSize: 24,
    fontWeight: "700",
  },
  planPeriod: {
    color: C.textSecondary,
    fontSize: 14,
  },
  planOriginal: {
    color: C.textMuted,
    fontSize: 14,
    textDecorationLine: "line-through",
    marginLeft: 4,
  },
  saveBadge: {
    backgroundColor: C.green,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: "auto",
  },
  saveBadgeText: {
    color: "#000",
    fontSize: 10,
    fontWeight: "700",
  },
  includesFrom: {
    color: C.textSecondary,
    fontSize: 13,
    marginBottom: 8,
  },
  planFeatures: {
    gap: 8,
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  featureCheck: {
    color: C.green,
    fontSize: 12,
    lineHeight: 18,
  },
  featureText: {
    color: C.textSecondary,
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  planBtn: {
    backgroundColor: C.accent,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  planBtnActive: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  planBtnText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "700",
  },
  planBtnTextActive: {
    color: C.textSecondary,
  },
});