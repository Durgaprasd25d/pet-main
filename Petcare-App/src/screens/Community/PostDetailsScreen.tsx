import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, TextInput, Share } from 'react-native';
import { Portal, Modal } from 'react-native-paper';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { dataService } from '../../services/dataService';
import { Post } from '../../types';

import { useCommunityStore } from '../../store/useCommunityStore';
import { useAppStore } from '../../store/useAppStore';

export const PostDetailsScreen = ({ route, navigation }: any) => {
  const { postId } = route.params;
  const { posts, comments, fetchComments, addComment } = useCommunityStore();
  const { token, user } = useAppStore();
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  
  const post = posts.find(p => p.id === postId);

  useEffect(() => {
    fetchComments(postId);
    const disconnectSocket = useCommunityStore.getState().initializeSocket(token || '');
    return () => {
      disconnectSocket();
      useCommunityStore.getState().setCurrentPostId(null);
    };
  }, [postId, post, token]);

  const handleSend = async () => {
    if (commentText.trim() && token) {
      await addComment(postId, commentText, token);
      setCommentText('');
    }
  };

  const handleLike = async () => {
    if (token) {
      await useCommunityStore.getState().likePost(postId, token);
    }
  };

  const isPostLiked = user?.id && post?.likedBy?.includes(user.id);


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
            {post.location && (
              <View style={styles.locationBadge}>
                <MaterialDesignIcons name="map-marker" size={12} color={COLORS.primary} />
                <Text style={styles.locationText}>{post.location}</Text>
              </View>
            )}
          </View>

          {post.petId && (
            <View style={styles.tagBadge}>
              <MaterialDesignIcons name="paw" size={14} color={COLORS.primary} />
              <Text style={styles.tagText}>Tagged: Bruno</Text>
            </View>
          )}

          <Text style={styles.content}>{post.content}</Text>

          {post.image && (
            <Image source={{ uri: post.image }} style={styles.postImage} />
          )}

          <View style={styles.statsRow}>
            <TouchableOpacity style={styles.actionBtn} onPress={handleLike}>
              <MaterialDesignIcons 
                name={isPostLiked ? "heart" : "heart-outline"} 
                size={24} 
                color={isPostLiked ? COLORS.accent : COLORS.textLight} 
              />
              <Text style={[styles.actionText, isPostLiked && { color: COLORS.accent }]}>{post.likes} Like</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={() => setIsCommentsVisible(true)}>
              <MaterialDesignIcons name="comment-outline" size={24} color={COLORS.textLight} />
              <Text style={styles.actionText}>{post.comments} Comment</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionBtn}
              onPress={() => Share.share({
                message: post.content,
                url: post.image,
                title: 'Share Post'
              })}
            >
              <MaterialDesignIcons name="share-outline" size={24} color={COLORS.textLight} />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Portal>
          <Modal
            visible={isCommentsVisible}
            onDismiss={() => setIsCommentsVisible(false)}
            contentContainerStyle={styles.modalContainer}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Comments</Text>
              <TouchableOpacity onPress={() => setIsCommentsVisible(false)}>
                <MaterialDesignIcons name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalCommentsList}>
              {comments.map((c: any) => (
                <View key={c._id || c.id} style={styles.commentItem}>
                  <Image source={{ uri: c.authorAvatar || 'https://i.pravatar.cc/150?img=68' }} style={styles.commentAvatar} />
                  <View style={styles.commentContent}>
                    <View style={styles.commentHeader}>
                      <Text style={styles.commentAuthor}>{c.authorName}</Text>
                      <Text style={styles.commentTime}>{new Date(c.createdAt).toLocaleDateString()}</Text>
                    </View>
                    <Text style={styles.commentText}>{c.text}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.modalInputContainer}>
              <TextInput 
                style={styles.modalInput} 
                placeholder="Write a comment..." 
                value={commentText}
                onChangeText={setCommentText}
                autoFocus
              />
              <TouchableOpacity 
                style={styles.modalSendBtn} 
                onPress={handleSend}
                disabled={!commentText.trim()}
              >
                <MaterialDesignIcons name="send" size={24} color={commentText.trim() ? COLORS.primary : COLORS.border} />
              </TouchableOpacity>
            </View>
          </Modal>
        </Portal>

      </ScrollView>
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
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '10',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
    marginLeft: SPACING.sm,
  },
  locationText: {
    fontSize: 10,
    color: COLORS.primary,
    marginLeft: 2,
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary + '10',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
    alignSelf: 'flex-start',
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.secondary || COLORS.primary,
    marginLeft: 4,
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
  modalContainer: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    margin: SPACING.lg,
    borderRadius: RADIUS.xl,
    maxHeight: '80%',
    ...SHADOWS.medium,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border + '50',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  modalCommentsList: {
    flexGrow: 0,
    maxHeight: 400,
  },
  modalInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border + '50',
  },
  modalInput: {
    flex: 1,
    height: 45,
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    fontSize: 14,
    color: COLORS.text,
  },
  modalSendBtn: {
    marginLeft: SPACING.sm,
    padding: SPACING.xs,
  },
  commentsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
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
