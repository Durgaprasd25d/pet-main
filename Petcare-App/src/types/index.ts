export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  location: string;
}

export interface Pet {
  id: string;
  ownerId: string;
  name: string;
  type: string;
  breed: string;
  age: number;
  weight: string;
  gender: string;
  image: string;
}

export interface Appointment {
  id: string;
  petId: string;
  vetId: string;
  date: string;
  time: string;
  reason: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface Vet {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
  clinicName: string;
  distance: string;
  about: string;
  address?: string;
  contactNumber?: string;
}

export interface Adoption {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: string;
  gender: string;
  shelter: string;
  image: string;
  description: string;
  weight?: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  image: string;
  content: string;
  likes: number;
  comments: number;
  timeAgo: string;
  timestamp?: string;
}

export interface LostAndFound {
  id: string;
  type: 'lost' | 'found';
  petName: string;
  breed: string;
  date: string;
  location: string;
  contact: string;
  image: string;
  description: string;
  reportedBy?: string;
  status?: 'Lost' | 'Found' | 'Resolved';
}
