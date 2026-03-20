import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import BottomSheet from "./BottomSheet"; // adjust path as needed

const C = {
  surface: "#252525",
  border: "#383838",
  textPrimary: "#ececec",
  textSecondary: "#8a8a8a",
  textMuted: "#4a4a4a",
  accent: "#ffffff",
  green: "#4ade80",
};

const PlanSelectionScreen = () => {
  const [sheetVisible, setSheetVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => setSheetVisible(true)}
        style={styles.openButton}
      >
        <Text style={styles.openButtonText}>Pilih Plan</Text>
      </TouchableOpacity>

      <BottomSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        title="Pilih Plan"
        mode="full"
      >
        <ScrollView
          style={styles.sheetContent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 16 }}
        >
          {/* Card PRO */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.nameRow}>
                <Text style={styles.cardTitle}>PRO</Text>
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>Populer</Text>
                </View>
              </View>
              <Text style={styles.cardSubtitle}>Taktik & Kejelasan</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>Rp49.000</Text>
              <Text style={styles.pricePeriod}>/bln</Text>
              <Text style={styles.originalPrice}>Rp99.000</Text>
              <View style={styles.saveBadge}>
                <Text style={styles.saveBadgeText}>Save 50%</Text>
              </View>
            </View>
            <Text style={styles.includesFrom}>Semua di LITE, plus ↓</Text>
            <View style={styles.features}>
              <FeatureItem text="500 Kredit / Bulan" />
              <FeatureItem text="Upload Screenshot" />
              <FeatureItem text="3 Taktik Balasan (Netral, Hangat, Dingin)" />
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Ganti ke PRO</Text>
            </TouchableOpacity>
          </View>

          {/* Card MAX */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>MAX</Text>
              <Text style={styles.cardSubtitle}>Dominasi Total</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>Rp149.000</Text>
              <Text style={styles.pricePeriod}>/bln</Text>
              <Text style={styles.originalPrice}>Rp299.000</Text>
              <View style={styles.saveBadge}>
                <Text style={styles.saveBadgeText}>Save 50%</Text>
              </View>
            </View>
            <Text style={styles.includesFrom}>Semua di PRO, plus ↓</Text>
            <View style={styles.features}>
              <FeatureItem text="2.500 Kredit / Bulan" />
              <FeatureItem text="Prioritas AI (Model Terbaik)" />
              <FeatureItem text='Mode "Roast Me" — Coach tampar lo kalau needy' />
              <FeatureItem text="Analisis Manipulasi & Red Flag 100% Terbuka" />
              <FeatureItem text="Game Plan 3–7 Hari (rencana taktis harian)" />
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Ganti ke MAX</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};

const FeatureItem = ({ text }: { text: string }) => (
  <View style={styles.featureRow}>
    <Text style={styles.featureCheck}>✓</Text>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  openButton: {
    backgroundColor: "#333",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  openButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  sheetContent: {
    flex: 1,
  },
  card: {
    backgroundColor: C.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: C.border,
  },
  cardHeader: {
    marginBottom: 8,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: C.textPrimary,
  },
  popularBadge: {
    backgroundColor: "#1a3a1a",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  popularText: {
    color: C.green,
    fontSize: 10,
    fontWeight: "700",
  },
  cardSubtitle: {
    fontSize: 12,
    color: C.textSecondary,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: "700",
    color: C.textPrimary,
  },
  pricePeriod: {
    fontSize: 12,
    color: C.textSecondary,
  },
  originalPrice: {
    fontSize: 12,
    color: C.textMuted,
    textDecorationLine: "line-through",
  },
  saveBadge: {
    backgroundColor: "#1a2a1a",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  saveBadgeText: {
    color: C.green,
    fontSize: 10,
    fontWeight: "700",
  },
  includesFrom: {
    color: C.textSecondary,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
    fontStyle: "italic",
  },
  features: {
    gap: 7,
    marginBottom: 14,
  },
  featureRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-start",
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
  button: {
    backgroundColor: C.accent,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "700",
  },
});

export default PlanSelectionScreen;
