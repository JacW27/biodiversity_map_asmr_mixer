export interface Post {
  id: string
  name: string
  title: string
  message: string
  imageUrl?: string
  timestamp: number
}

// In-memory store for posts
let posts: Post[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Spotted a rare Baltimore Oriole!",
    message:
      "Just saw this beautiful Baltimore Oriole in Central Park this morning. The vibrant orange plumage was stunning against the spring foliage. Has anyone else spotted them in the area?",
    imageUrl: "/baltimore-oriole-bird.jpg",
    timestamp: Date.now() - 86400000 * 2,
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "Red-tailed Hawk nest location",
    message:
      "Found an active Red-tailed Hawk nest near the north meadow. Please observe from a distance to avoid disturbing the nesting pair. They seem to be raising chicks!",
    timestamp: Date.now() - 86400000,
  },
]

export function getPosts(): Post[] {
  return posts.sort((a, b) => b.timestamp - a.timestamp)
}

export function addPost(post: Omit<Post, "id" | "timestamp">): Post {
  const newPost: Post = {
    ...post,
    id: Date.now().toString(),
    timestamp: Date.now(),
  }
  posts = [newPost, ...posts]
  return newPost
}
