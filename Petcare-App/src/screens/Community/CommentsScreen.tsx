import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

// Mock data for comments
const MOCK_COMMENTS = [
  { id: '1', author: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?img=11', text: 'This is so cute! Absolutely adorable.', time: '2h ago' },
  { id: '2', author: 'Mike Ross', avatar: 'https://i.pravatar.cc/150?img=32', text: 'Great photo. Where was this taken?', time: '5h ago' },
  { id: '3', author: 'Sarah Smith', avatar: 'https://i.pravatar.cc/150?img=47', text: 'Aww my heart melts! What breed is that?', time: '1d ago' },
];

export const CommentsScreen = ({ navigation }: any) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(MOCK_COMMENTS);

  const handleSend = () => {
    if (commentText.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now().toString(),
          author: 'You',
          avatar: 'https://i.pravatar.cc/150?img=68',
          text: commentText,
          time: 'Just now'
        }
      ]);
      setCommentText('');
    }
  };

  return (
    <ScreenContainer>
      <Header title="Comments" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {comments.map(c => (
          <View key={c.id} style={styles.commentItem}>
            <Image source={{ uri: c.avatar }} style={styles.commentAvatar} />
            <View style={styles.commentContent}>
              <View style={styles.commentHeader}>
                <Text style={styles.commentAuthor}>{c.author}</Text>
                <Text style={styles.commentTime}>{c.time}</Text>
              </View>
              <Text style={styles.commentText}>{c.text}</Text>
              
              <View style={styles.commentActions}>
                <TouchableOpacity style={styles.actionBtn}>
                  <Text style={styles.actionText}>Like</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <Text style={styles.actionText}>Reply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Comment Input Wrapper */}
      <View style={styles.commentInputContainer}>
        <TextInput 
          style={styles.commentInput} 
          placeholder="Write a comment..." 
          value={commentText}
          onChangeText={setCommentText}
          multiline
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend} disabled={!commentText.trim()}>
          <MaterialDesignIcons name="send" size={24} color={commentText.trim() ? COLORS.primary : COLORS.border} />
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SPACING.sm,
  },
  commentContent: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    ...SHADOWS.small,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  commentTime: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  commentText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
    marginBottom: SPACING.sm,
  },
  commentActions: {
    flexDirection: 'row',
  },
  actionBtn: {
    marginRight: SPACING.md,
  },
  actionText: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  commentInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    paddingHorizontal: SPACING.md,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14,
  },
  sendBtn: {
    padding: SPACING.sm,
    marginLeft: SPACING.xs,
    justifyContent: 'center',
    marginBottom: 2,
  },
});
