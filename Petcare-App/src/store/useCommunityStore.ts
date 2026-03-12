import { create } from 'zustand';
import { Post } from '../types';
import { dataService, API_URL } from '../services/dataService';


interface CommunityState {
  posts: Post[];
  comments: any[];
  loading: boolean;
  fetchPosts: () => Promise<void>;
  fetchComments: (postId: string) => Promise<void>;
  createPost: (data: any, token: string) => Promise<void>;
  addComment: (postId: string, text: string, token: string) => Promise<void>;
}

export const useCommunityStore = create<CommunityState>((set) => ({
  posts: [],
  comments: [],
  loading: false,
  fetchPosts: async () => {
    set({ loading: true });
    try {
      const posts = await dataService.getPosts();
      set({ posts, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
  fetchComments: async (postId) => {
    set({ loading: true });
    try {
      const resp = await fetch(`${API_URL}/community/${postId}/comments`);
      const comments = await resp.json();
      set({ comments, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
  createPost: async (data, token) => {
    await dataService.createPost(data, token);
    const posts = await dataService.getPosts();
    set({ posts });
  },
  addComment: async (postId, text, token) => {
    await dataService.addComment(postId, text, token);
    // Refresh comments
    const resp = await fetch(`${API_URL}/community/${postId}/comments`);
    const comments = await resp.json();
    set({ comments });
  }
}));

