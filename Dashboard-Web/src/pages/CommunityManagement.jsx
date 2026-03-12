import React, { useState, useEffect } from 'react';
import { dashboardService } from '../services/apiService';
import { MessageSquare, Trash2, User, ThumbsUp, MessageCircle } from 'lucide-react';

const CommunityManagement = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const data = await dashboardService.getPosts();
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Moderation: Delete this post?")) {
      try {
        await dashboardService.deletePost(id);
        setPosts(posts.filter(p => p._id !== id));
      } catch (err) {
        alert("Action failed");
      }
    }
  };

  return (
    <div className="p-8 mt-16 ml-64 min-h-screen bg-slate-50">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Community Moderation</h1>
          <p className="text-slate-500">Monitor and moderate user-generated content.</p>
        </div>
        <div className="bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100 text-sm font-semibold text-indigo-600 flex items-center gap-2">
          <MessageSquare size={16} />
          Total Posts: {posts.length}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Content Snippet</th>
                <th className="px-6 py-4">Engagement</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-400">Loading posts...</td></tr>
              ) : posts.map((post) => (
                <tr key={post._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                        {post.userAvatar ? <img src={post.userAvatar} className="w-full h-full object-cover" /> : <User size={16} className="text-slate-400" />}
                      </div>
                      <p className="font-semibold text-slate-900">{post.userName}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 max-w-md">
                    <p className="line-clamp-1">{post.content}</p>
                    {post.image && <p className="text-[10px] text-blue-500 font-bold mt-1">📎 Has Image</p>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <ThumbsUp size={12} /> {post.likes}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <MessageCircle size={12} /> {post.comments}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 font-mono">
                    {new Date(post.timestamp || Date.now()).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDelete(post._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CommunityManagement;
