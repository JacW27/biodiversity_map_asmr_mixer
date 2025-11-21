import { type NextRequest, NextResponse } from "next/server"
import { getPosts, addPost } from "@/lib/posts-store"

export async function GET() {
  try {
    const posts = getPosts()
    return NextResponse.json({ posts })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const name = formData.get("name") as string
    const title = formData.get("title") as string
    const message = formData.get("message") as string
    const image = formData.get("image") as File | null

    if (!name || !title || !message) {
      return NextResponse.json({ error: "Name, title, and message are required" }, { status: 400 })
    }

    let imageUrl: string | undefined = undefined

    // Handle image upload - for demo purposes, we'll use a placeholder
    // In production, you would upload to blob storage or similar
    if (image && image.size > 0) {
      // Convert image to base64 for demo purposes
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const base64 = buffer.toString("base64")
      imageUrl = `data:${image.type};base64,${base64}`
    }

    const post = addPost({
      name,
      title,
      message,
      imageUrl,
    })

    return NextResponse.json({ post }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
