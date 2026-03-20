import React, { useEffect, useState } from "react";
import { BlurView } from "expo-blur";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import EditProfileCard from "../components/EditProfileCard";
import FloatingGlassModal from "../components/FloatingGlassModal";
import { COLORS } from "../constants/theme";
import BottomSheet from "./BottomSheet";

const ICON = { size: 20, color: COLORS.white, strokeWidth: 2.4 };
const HEADER_HEIGHT = 86;
const HEADER_UNDERLAP = 28;

function IconMail() {
  return (
    <Svg width={ICON.size} height={ICON.size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
        stroke={ICON.color}
        strokeWidth={ICON.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22 6 12 13 2 6"
        stroke={ICON.color}
        strokeWidth={ICON.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function IconSubscription() {
  return (
    <Svg width={ICON.size} height={ICON.size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
        stroke={ICON.color}
        strokeWidth={ICON.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 8v8M8 12h8"
        stroke={ICON.color}
        strokeWidth={ICON.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function IconBolt() {
  return (
    <Svg width={ICON.size} height={ICON.size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"
        stroke={COLORS.warning}
        strokeWidth={ICON.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function IconBook() {
  return (
    <Svg width={ICON.size} height={ICON.size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
        stroke={ICON.color}
        strokeWidth={ICON.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
        stroke={ICON.color}
        strokeWidth={ICON.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function IconGlobe() {
  return (
    <Svg width={ICON.size} height={ICON.size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"
        stroke={ICON.color}
        strokeWidth={ICON.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2 12h20"
        stroke={ICON.color}
        strokeWidth={ICON.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
        stroke={ICON.color}
        strokeWidth={ICON.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function IconMoon() {
  return (
    <Svg width={ICON.size} height={ICON.size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        stroke={ICON.color}
        strokeWidth={ICON.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function IconBell() {
  return (
    <Svg width={ICON.size} height={ICON.size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"
        stroke={ICON.color}
        strokeWidth={ICON.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.73 21a2 2 0 0 1-3.46 0"
        stroke={ICON.color}
        strokeWidth={ICON.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function IconLock() {
  return (
    <Svg width={ICON.size} height={ICON.size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z"
        stroke={ICON.color}
        strokeWidth={ICON.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7 11V7a5 5 0 0 1 10 0v4"
        stroke={ICON.color}
        strokeWidth={ICON.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function IconFile() {
  return (
    <Svg width={ICON.size} height={ICON.size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        stroke={ICON.color}
        strokeWidth={ICON.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 2v6h6"
        stroke={ICON.color}
        strokeWidth={ICON.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function IconAlert() {
  return (
    <Svg width={ICON.size} height={ICON.size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
        stroke={ICON.color}
        strokeWidth={ICON.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 9v4M12 17h.01"
        stroke={ICON.color}
        strokeWidth={ICON.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function IconTrash() {
  return (
    <Svg width={ICON.size} height={ICON.size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 6h18"
        stroke={ICON.color}
        strokeWidth={ICON.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
        stroke={ICON.color}
        strokeWidth={ICON.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function IconAt() {
  return (
    <Svg width={ICON.size} height={ICON.size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"
        stroke={ICON.color}
        strokeWidth={ICON.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"
        stroke={ICON.color}
        strokeWidth={ICON.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

type SettingsRowProps = {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onPress?: () => void;
  danger?: boolean;
  showChevron?: boolean;
  showDivider?: boolean;
};

function SettingsRow({
  icon,
  label,
  value,
  onPress,
  danger = false,
  showChevron = true,
  showDivider = true,
}: SettingsRowProps) {
  return (
    <>
      <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.rowIconWrap}>{icon}</View>
        <Text style={[styles.rowLabel, danger && styles.rowLabelDanger]}>{label}</Text>
        <View style={styles.rowRight}>
          {value ? <Text style={styles.rowValue}>{value}</Text> : null}
          {showChevron ? (
            <Text style={[styles.rowChevron, danger && styles.rowLabelDanger]}>{">"}</Text>
          ) : null}
        </View>
      </TouchableOpacity>
      {showDivider ? <View style={styles.divider} /> : null}
    </>
  );
}

function SectionHeader({ text }: { text: string }) {
  return <Text style={styles.sectionHeader}>{text}</Text>;
}

type PlanCardProps = {
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
};

function PlanCard({
  name,
  subtitle,
  price,
  originalPrice,
  savePct,
  features,
  includesFrom,
  isActive = false,
  isPopular = false,
  onPress,
}: PlanCardProps) {
  return (
    <View style={[styles.planCard, isActive && styles.planCardActive]}>
      <View style={styles.planCardHeader}>
        <View style={styles.planNameRow}>
          <Text style={styles.planName}>{name}</Text>
          {isPopular ? (
            <View style={styles.popularBadge}>
              <Text style={styles.popularBadgeText}>Popular</Text>
            </View>
          ) : null}
          {isActive ? (
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>Current</Text>
            </View>
          ) : null}
        </View>
        <Text style={styles.planSubtitle}>{subtitle}</Text>
      </View>

      <View style={styles.planPriceRow}>
        <Text style={styles.planPrice}>{price}</Text>
        <Text style={styles.planPeriod}>/bln</Text>
        <Text style={styles.planOriginal}>{originalPrice}</Text>
        <View style={styles.saveBadge}>
          <Text style={styles.saveBadgeText}>Save {savePct}</Text>
        </View>
      </View>

      {includesFrom ? <Text style={styles.includesFrom}>Semua di {includesFrom}, plus</Text> : null}

      <View style={styles.planFeatures}>
        {features.map((feature) => (
          <View key={feature} style={styles.featureRow}>
            <Text style={styles.featureCheck}>+</Text>
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.planBtn, isActive && styles.planBtnActive]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text style={[styles.planBtnText, isActive && styles.planBtnTextActive]}>
          {isActive ? "Current plan" : `Ganti ke ${name}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function SubscriptionContent({
  currentPlan,
  topInset,
}: {
  currentPlan: "lite" | "pro" | "max";
  topInset: number;
}) {
  return (
    <ScrollView
      style={styles.subscriptionScroll}
      contentContainerStyle={[styles.subscriptionContent, { paddingTop: topInset }]}
      showsVerticalScrollIndicator={false}
    >
      <PlanCard
        name="PRO"
        subtitle="Taktik dan kejelasan"
        price="Rp49.000"
        originalPrice="Rp99.000"
        savePct="50%"
        isPopular
        isActive={currentPlan === "pro"}
        includesFrom="LITE"
        features={[
          "500 kredit per bulan",
          "Upload screenshot",
          "3 taktik balasan: netral, hangat, dingin",
        ]}
        onPress={() => {}}
      />
      <PlanCard
        name="MAX"
        subtitle="Dominasi total"
        price="Rp149.000"
        originalPrice="Rp299.000"
        savePct="50%"
        isActive={currentPlan === "max"}
        includesFrom="PRO"
        features={[
          "2.500 kredit per bulan",
          "Prioritas AI model terbaik",
          "Mode Roast Me",
          "Analisis manipulasi dan red flag",
          "Game plan 3-7 hari",
        ]}
        onPress={() => {}}
      />
      <View style={styles.subscriptionBottomSpacer} />
    </ScrollView>
  );
}

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

  useEffect(() => {
    if (!visible) {
      setEditVisible(false);
      setSubVisible(false);
    }
  }, [visible]);

  const planLabel = userPlan === "max" ? "MAX" : userPlan === "pro" ? "PRO" : "Free Plan";
  const initials =
    userName
      .trim()
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "SA";

  const closeAllSheets = () => {
    setEditVisible(false);
    setSubVisible(false);
    onClose();
  };

  return (
    <>
      <BottomSheet
        visible={visible}
        onClose={closeAllSheets}
        heightFraction={0.93}
        showClose={false}
        showBack={false}
        showHandle={false}
        showHeader={false}
      >
        <View style={styles.sheetBody}>
          <View style={styles.stickyHeader} pointerEvents="box-none">
            <BlurView intensity={58} tint="dark" style={styles.stickyHeaderBlur}>
              <View style={styles.stickyHeaderOverlay}>
                <View style={styles.stickyHeaderRow}>
                  {subVisible ? (
                    <TouchableOpacity
                      onPress={() => setSubVisible(false)}
                      style={styles.headerActionBtn}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.headerActionText}>{"<"}</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.headerActionSpacer} />
                  )}

                  <Text style={styles.stickyHeaderTitle}>
                    {subVisible ? "Pilih Plan" : "Settings"}
                  </Text>

                  <TouchableOpacity
                    onPress={closeAllSheets}
                    style={styles.headerCloseBtn}
                    activeOpacity={0.7}
                    hitSlop={10}
                  >
                    <View style={styles.headerCloseCircle}>
                      <Text style={styles.headerCloseText}>x</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.stickyHeaderFade} />
              </View>
            </BlurView>
          </View>

          {subVisible ? (
            <SubscriptionContent
              currentPlan={userPlan}
              topInset={HEADER_HEIGHT - HEADER_UNDERLAP}
            />
          ) : (
            <ScrollView
              style={styles.settingsScroll}
              contentContainerStyle={[
                styles.scrollContent,
                { paddingTop: HEADER_HEIGHT - HEADER_UNDERLAP },
              ]}
              showsVerticalScrollIndicator={false}
              scrollEnabled={!editVisible}
              pointerEvents={editVisible ? "none" : "auto"}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.profileSection}>
                <View style={styles.avatarLarge}>
                  <Text style={styles.avatarLargeText}>{initials}</Text>
                </View>
                <Text style={styles.profileName}>{userName}</Text>
                <Text style={styles.profileEmail}>{userEmail}</Text>
                <TouchableOpacity
                  style={styles.editProfilePill}
                  onPress={() => setEditVisible(true)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.editProfilePillText}>Edit profile</Text>
                </TouchableOpacity>
              </View>

              <SectionHeader text="Account" />
              <View style={styles.card}>
                <SettingsRow
                  icon={<IconMail />}
                  label="Email"
                  value={userEmail}
                  showChevron={false}
                />
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
              <View style={styles.topupRow}>
                <TouchableOpacity
                  style={styles.topupCard}
                  onPress={() => onTopUp?.(100)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.topupCredits}>
                    100 <Text style={styles.topupKredit}>kredit</Text>
                  </Text>
                  <Text style={styles.topupPrice}>Rp19.000</Text>
                  <Text style={styles.topupOnce}>sekali bayar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.topupCard}
                  onPress={() => onTopUp?.(250)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.topupCredits}>
                    250 <Text style={styles.topupKredit}>kredit</Text>
                  </Text>
                  <Text style={styles.topupPrice}>Rp29.000</Text>
                  <Text style={styles.topupOnce}>sekali bayar</Text>
                </TouchableOpacity>
              </View>

              <SectionHeader text="Aplikasi" />
              <View style={styles.card}>
                <SettingsRow icon={<IconBook />} label="Panduan" onPress={() => {}} />
                <SettingsRow icon={<IconGlobe />} label="Bahasa" value="Indonesia" onPress={() => {}} />
                <SettingsRow icon={<IconMoon />} label="Tampilan" value="Gelap" onPress={() => {}} />
                <SettingsRow
                  icon={<IconBell />}
                  label="Notifikasi"
                  onPress={() => {}}
                  showDivider={false}
                />
              </View>

              <SectionHeader text="Tentang" />
              <View style={styles.card}>
                <SettingsRow icon={<IconLock />} label="Kebijakan Privasi" onPress={() => {}} />
                <SettingsRow icon={<IconFile />} label="Syarat dan Ketentuan" onPress={() => {}} />
                <SettingsRow icon={<IconAlert />} label="Disclaimer" onPress={() => {}} />
                <SettingsRow
                  icon={<IconTrash />}
                  label="Penghapusan Data"
                  onPress={() => {}}
                  showDivider={false}
                />
              </View>

              <SectionHeader text="Kontak" />
              <View style={styles.card}>
                <SettingsRow
                  icon={<IconAt />}
                  label="support@yoursignalai.com"
                  onPress={() => {}}
                  showChevron={false}
                  showDivider={false}
                />
              </View>

              <TouchableOpacity
                style={styles.signOutBtn}
                onPress={() => {
                  closeAllSheets();
                  onSignOut?.();
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.signOutText}>Keluar</Text>
              </TouchableOpacity>

              <View style={styles.bottomSpacer} />
            </ScrollView>
          )}

          <FloatingGlassModal
            visible={editVisible}
            onClose={() => setEditVisible(false)}
            heightFraction={0.62}
          >
            <EditProfileCard
              name={userName}
              email={userEmail}
              onSave={() => setEditVisible(false)}
              onCancel={() => setEditVisible(false)}
            />
          </FloatingGlassModal>
        </View>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  sheetBody: {
    flex: 1,
  },
  stickyHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 30,
  },
  stickyHeaderBlur: {
    overflow: "hidden",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  stickyHeaderOverlay: {
    backgroundColor: "rgba(14,14,14,0.3)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  stickyHeaderRow: {
    height: HEADER_HEIGHT,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stickyHeaderFade: {
    height: 10,
    backgroundColor: "rgba(10,10,10,0.08)",
  },
  headerActionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  headerActionSpacer: {
    width: 36,
    height: 36,
  },
  headerActionText: {
    color: COLORS.headerAction,
    fontSize: 18,
    fontWeight: "600",
  },
  stickyHeaderTitle: {
    flex: 1,
    textAlign: "center",
    color: COLORS.textHeading,
    fontSize: 17,
    fontWeight: "700",
  },
  headerCloseBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCloseCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerCloseText: {
    color: COLORS.headerIcon,
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 18,
  },
  settingsScroll: {
    flex: 1,
  },
  subscriptionScroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  subscriptionContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 24,
  },
  avatarLarge: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: COLORS.avatarUserBg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  avatarLargeText: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: "500",
  },
  profileName: {
    color: COLORS.textHeading,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  profileEmail: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginBottom: 14,
  },
  editProfilePill: {
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surfaceSoft,
  },
  editProfilePillText: {
    color: COLORS.textPrimary,
    fontSize: 14,
  },
  card: {
    backgroundColor: COLORS.surfaceSoft,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.borderSoft,
    marginBottom: 16,
    overflow: "hidden",
  },
  sectionHeader: {
    color: COLORS.textSecondary,
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
    color: COLORS.textPrimary,
    fontSize: 16,
  },
  rowLabelDanger: {
    color: COLORS.danger,
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  rowValue: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  rowChevron: {
    color: COLORS.textMuted,
    fontSize: 20,
    lineHeight: 22,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.divider,
    marginLeft: 58,
  },
  topupRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  topupCard: {
    flex: 1,
    backgroundColor: COLORS.surfaceSoft,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.borderSoft,
  },
  topupCredits: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: "700",
  },
  topupKredit: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: "400",
  },
  topupPrice: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: "600",
    marginTop: 4,
  },
  topupOnce: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  signOutBtn: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: COLORS.surfaceSoft,
    borderWidth: 1,
    borderColor: COLORS.borderSoft,
    marginTop: 8,
  },
  signOutText: {
    color: COLORS.danger,
    fontSize: 16,
    fontWeight: "600",
  },
  planCard: {
    backgroundColor: COLORS.surfaceSoft,
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.borderSoft,
  },
  planCardActive: {
    borderColor: COLORS.borderStrong,
    backgroundColor: COLORS.surfaceStrong,
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
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: "700",
  },
  popularBadge: {
    backgroundColor: COLORS.green,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  popularBadgeText: {
    color: COLORS.textInverse,
    fontSize: 10,
    fontWeight: "700",
  },
  activeBadge: {
    backgroundColor: COLORS.surfaceElevated,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeBadgeText: {
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  planSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  planPriceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    marginBottom: 12,
  },
  planPrice: {
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: "700",
  },
  planPeriod: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  planOriginal: {
    color: COLORS.textMuted,
    fontSize: 14,
    textDecorationLine: "line-through",
    marginLeft: 4,
  },
  saveBadge: {
    backgroundColor: COLORS.green,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: "auto",
  },
  saveBadgeText: {
    color: COLORS.textInverse,
    fontSize: 10,
    fontWeight: "700",
  },
  includesFrom: {
    color: COLORS.textSecondary,
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
    color: COLORS.green,
    fontSize: 12,
    lineHeight: 18,
  },
  featureText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  planBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  planBtnActive: {
    backgroundColor: COLORS.surfaceSoft,
    borderWidth: 1,
    borderColor: COLORS.borderSoft,
  },
  planBtnText: {
    color: COLORS.textInverse,
    fontSize: 14,
    fontWeight: "700",
  },
  planBtnTextActive: {
    color: COLORS.textSecondary,
  },
  bottomSpacer: {
    height: 50,
  },
  subscriptionBottomSpacer: {
    height: 40,
  },
});
