import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Share } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { Post } from '../../types';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { Avatar } from '../ui/Avatar';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface PostCardProps {
  post: Post;
  onPress?: () => void;
  onUserPress?: () => void;
  onLikePress?: () => void;
  onCommentPress?: () => void;
  onSharePress?: () => void;
  index?: number;
  currentUserId?: string;
}

export const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  onPress, 
  onUserPress, 
  onLikePress, 
  onCommentPress, 
  onSharePress,
  index = 0,
  currentUserId
}) => {
  const isLiked = currentUserId && post.likedBy?.includes(currentUserId);
  return (
    <Animated.View 
      entering={FadeInDown.delay(index * 100).duration(600)}
      style={styles.card}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={onUserPress} activeOpacity={0.7}>
          <Avatar source={{ uri: post.userAvatar }} size={44} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerInfo} onPress={onUserPress} activeOpacity={0.7}>
          <Text style={styles.userName}>{post.userName}</Text>
          <View style={styles.timeLocationRow}>
            <Text style={styles.timeAgo}>{post.timeAgo}</Text>
            {post.location && (
              <>
                <Text style={styles.dot}> • </Text>
                <MaterialDesignIcons name="map-marker" size={10} color={COLORS.textLight} />
                <Text style={styles.locationText}>{post.location}</Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity onPress={onPress} activeOpacity={0.9} disabled={!onPress}>
        {post.petId && (
          <View style={styles.tagBadge}>
            <MaterialDesignIcons name="paw" size={12} color={COLORS.primary} />
            <Text style={styles.tagText}>Tagged Pet</Text>
          </View>
        )}
        <Text style={styles.content}>{post.content}</Text>
        
        {post.image ? (
          <Image source={{ uri: post.image }} style={styles.image} resizeMode="cover" />
        ) : null}
      </TouchableOpacity>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={onLikePress}>
          <MaterialDesignIcons 
            name={isLiked ? "heart" : "heart-outline"} 
            size={22} 
            color={isLiked ? COLORS.accent : COLORS.text} 
          />
          <Text style={[styles.actionText, isLiked && { color: COLORS.accent }]}>{post.likes || 0}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionBtn} onPress={onCommentPress}>
          <MaterialDesignIcons name="message-outline" size={21} color={COLORS.text} />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.shareBtn} 
          onPress={() => {
            Share.share({
              message: post.content,
              url: post.image,
              title: 'Share Post'
            });
            onSharePress?.();
          }}
        >
          <MaterialDesignIcons name="share-variant-outline" size={21} color={COLORS.text} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: COLORS.border + '30',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  headerInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  userName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  timeAgo: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 1,
  },
  content: {
    fontSize: 15,
    color: COLORS.text,
    marginBottom: SPACING.md,
    lineHeight: 24,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.background,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: SPACING.sm,
    marginTop: SPACING.xs,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.xl,
    paddingVertical: 4,
  },
  shareBtn: {
    marginLeft: 'auto',
    paddingVertical: 4,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginLeft: 6,
  },
  timeLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  locationText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginLeft: 2,
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '10',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
    alignSelf: 'flex-start',
  },
  tagText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginLeft: 4,
  },
});
