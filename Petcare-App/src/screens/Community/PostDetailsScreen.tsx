import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { dataService } from '../../services/dataService';
import { Post } from '../../types';

export const PostDetailsScreen = ({ route, navigation }: any) => {
  const { postId } = route.params;
  const [post, setPost] = useState<Post | null>(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const posts = await dataService.getPosts();
      const p = posts.find(p => p.id === postId);
      if (p) setPost(p);
    };
    fetchPost();
  }, [postId]);

  if (!post) {
    return (
      <ScreenContainer>
        <Header title="Post" onBackPress={() => navigation.goBack()} />
        <View style={styles.loading}>
          <Text>Loading...</Text>
        </View>
      </ScreenContainer>
    );
  }

  // Formatting date nicely
  const formattedDate = new Date(post.timestamp || 0).toLocaleDateString() + ' ' + new Date(post.timestamp || 0).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <ScreenContainer>
      <Header title="Post Details" onBackPress={() => navigation.goBack()} rightIcon="dots-vertical" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.postCard}>
          <View style={styles.authorRow}>
            <TouchableOpacity onPress={() => navigation.navigate('UserCommunityProfile', { userId: post.userId })}>
              <Image source={{ uri: post.userAvatar }} style={styles.avatar} />
            </TouchableOpacity>
            <View style={styles.authorInfo}>
              <TouchableOpacity onPress={() => navigation.navigate('UserCommunityProfile', { userId: post.userId })}>
                <Text style={styles.authorName}>{post.userName}</Text>
              </TouchableOpacity>
              <Text style={styles.timeText}>{formattedDate}</Text>
            </View>
          </View>

          <Text style={styles.content}>{post.content}</Text>

          {post.image && (
            <Image source={{ uri: post.image }} style={styles.postImage} />
          )}

          <View style={styles.statsRow}>
            <Text style={styles.statText}>{post.likes} Likes</Text>
            <Text style={styles.statText} onPress={() => navigation.navigate('Comments', { postId: post.id })}>
              {post.comments} Comments
            </Text>
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionBtn}>
              <MaterialDesignIcons name="heart-outline" size={24} color={COLORS.textLight} />
              <Text style={styles.actionText}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('Comments', { postId: post.id })}>
              <MaterialDesignIcons name="comment-outline" size={24} color={COLORS.textLight} />
              <Text style={styles.actionText}>Comment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <MaterialDesignIcons name="share-outline" size={24} color={COLORS.textLight} />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mock Comments Section */}
        <Text style={styles.commentsHeader}>Comments</Text>
        <View style={styles.commentItem}>
          <Image source={{ uri: 'https://i.pravatar.cc/150?img=11' }} style={styles.commentAvatar} />
          <View style={styles.commentContent}>
            <View style={styles.commentHeader}>
              <Text style={styles.commentAuthor}>Jane Doe</Text>
              <Text style={styles.commentTime}>2h ago</Text>
            </View>
            <Text style={styles.commentText}>This is so cute! Absolutely adorable.</Text>
          </View>
        </View>
        <View style={styles.commentItem}>
          <Image source={{ uri: 'https://i.pravatar.cc/150?img=32' }} style={styles.commentAvatar} />
          <View style={styles.commentContent}>
            <View style={styles.commentHeader}>
              <Text style={styles.commentAuthor}>Mike Ross</Text>
              <Text style={styles.commentTime}>5h ago</Text>
            </View>
            <Text style={styles.commentText}>Great photo. Where was this taken?</Text>
          </View>
        </View>

      </ScrollView>

      {/* Quick Comment Input */}
      <View style={styles.commentInputContainer}>
        <TextInput 
          style={styles.commentInput} 
          placeholder="Write a comment..." 
          value={commentText}
          onChangeText={setCommentText}
        />
        <TouchableOpacity style={styles.sendBtn} disabled={!commentText.trim()}>
          <MaterialDesignIcons name="send" size={24} color={commentText.trim() ? COLORS.primary : COLORS.border} />
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  postCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.border,
    marginRight: SPACING.sm,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  timeText: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  content: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 22,
    marginBottom: SPACING.md,
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: SPACING.sm,
  },
  statText: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
  },
  actionText: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '500',
    marginLeft: 6,
  },
  commentsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  commentItem: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: SPACING.sm,
  },
  commentContent: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: SPACING.sm,
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
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  commentInput: {
    flex: 1,
    height: 40,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    paddingHorizontal: SPACING.md,
    fontSize: 14,
  },
  sendBtn: {
    padding: SPACING.sm,
  },
});
