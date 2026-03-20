import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import BottomSheet from '../../BottomSheet';

type SettingsSheetProps = {
  visible: boolean;
  onClose: () => void;
  onEditProfile: () => void;
};

const SettingsSheet = ({ visible, onClose, onEditProfile }: SettingsSheetProps) => {
  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title={undefined}
      showClose={true}
      useBlur={true}
      heightFraction={0.5}
      floating={false}
    >
      <View style={styles.content}>
        <TouchableOpacity style={styles.editProfileBtn} onPress={onEditProfile} activeOpacity={0.85}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
          <Text style={styles.editProfileArrow}>→</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  editProfileText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  editProfileArrow: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.65)',
    marginLeft: 12,
  },
});

export default SettingsSheet;