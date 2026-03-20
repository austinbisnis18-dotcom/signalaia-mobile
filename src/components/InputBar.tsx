import React, { useMemo, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Keyboard,
} from 'react-native';

type InputBarProps = {
  onSend: (content: string) => void;
};

const InputBar = ({ onSend }: InputBarProps) => {
  const [text, setText] = useState('');
  const [inputHeight, setInputHeight] = useState(44);

  const lineHeight = 20;
  const maxLines = 4;
  const maxHeight = useMemo(() => lineHeight * maxLines + 16, []);

  const handleSend = () => {
    const trimmed = text.trim();
    if (trimmed.length === 0) return;
    onSend(trimmed);
    setText('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { height: inputHeight }]}
        value={text}
        onChangeText={setText}
        placeholder="Type a message..."
        placeholderTextColor="rgba(255, 255, 255, 0.3)"
        multiline
        maxLength={500}
        numberOfLines={maxLines}
        onContentSizeChange={(e) => {
          // Cap height so it never grows beyond ~4 lines.
          const next = e.nativeEvent.contentSize.height;
          const capped = Math.min(maxHeight, Math.max(44, next));
          setInputHeight(capped);
        }}
        blurOnSubmit={false}
        onSubmitEditing={handleSend}
        returnKeyType="send"
        enablesReturnKeyAutomatically
      />
      <TouchableOpacity
        style={[styles.sendButton, !text.trim() && styles.sendButtonDisabled]}
        onPress={handleSend}
        disabled={!text.trim()}
        activeOpacity={0.7}
      >
        <Text style={styles.sendIcon}>↑</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 0,
    marginRight: 12,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.4,
  },
  sendIcon: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '700',
  },
});

export default InputBar;