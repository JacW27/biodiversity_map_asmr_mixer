"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ImageIcon, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Post {
  id: string
  name: string
  title: string
  message: string
  imageUrl?: string
  timestamp: number
}

export function DiscussionBoard() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  // Form state
  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")

  // Fetch posts
  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts")
      const data = await response.json()
      setPosts(data.posts)
    } catch (error) {
      console.error("[v0] Error fetching posts:", error)
      toast({
        title: "Error",
        description: "Failed to load posts",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("title", title)
      formData.append("message", message)
      if (image) {
        formData.append("image", image)
      }

      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to create post")
      }

      const data = await response.json()

      // Add new post to the list
      setPosts([data.post, ...posts])

      // Reset form
      setName("")
      setTitle("")
      setMessage("")
      setImage(null)
      setImagePreview("")

      toast({
        title: "Success",
        description: "Your post has been published",
      })
    } catch (error) {
      console.error("[v0] Error creating post:", error)
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffDays === 0) {
      return "Today"
    } else if (diffDays === 1) {
      return "Yesterday"
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Post Creation Form */}
      <div className="lg:col-span-1">
        <Card className="p-6 sticky top-20">
          <h2 className="text-xl font-semibold mb-4">Share Your Observation</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post title"
                required
              />
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your observation..."
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="image">Image (optional)</Label>
              <div className="mt-2">
                <label
                  htmlFor="image"
                  className="flex items-center justify-center gap-2 border-2 border-dashed border-border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors"
                >
                  <ImageIcon className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{image ? image.name : "Upload an image"}</span>
                </label>
                <input id="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </div>
              {imagePreview && (
                <div className="mt-2 relative aspect-video rounded-lg overflow-hidden">
                  <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {submitting ? "Publishing..." : "Publish Post"}
            </Button>
          </form>
        </Card>
      </div>

      {/* Posts Feed */}
      <div className="lg:col-span-2 space-y-4">
        {loading ? (
          <Card className="p-8">
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          </Card>
        ) : posts.length === 0 ? (
          <Card className="p-8">
            <p className="text-center text-muted-foreground">No posts yet. Be the first to share an observation!</p>
          </Card>
        ) : (
          posts.map((post) => (
            <Card key={post.id} className="p-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback>{post.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold">{post.name}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(post.timestamp)}</p>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{post.message}</p>
                  {post.imageUrl && (
                    <div className="rounded-lg overflow-hidden">
                      <img src={post.imageUrl || "/placeholder.svg"} alt={post.title} className="w-full h-auto" />
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
