"use client"

// =================================================
// Product Comment
// =================================================

interface CommentItem {
  user?: { firstName?: string; lastName?: string; email?: string }
  rating?: number
  content?: string
  createdAt?: string
}

interface ProductCommentProps {
  item: CommentItem
}

function StarRating({ value = 0 }: { value?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`size-4 ${star <= value ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function ProductComment({ item }: ProductCommentProps) {
  const name =
    item.user?.firstName && item.user?.lastName
      ? `${item.user.firstName} ${item.user.lastName}`
      : item.user?.email ?? "Anonymous"

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const date = item.createdAt
    ? new Date(item.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null

  return (
    <div className="flex flex-col gap-2 py-4 border-b border-black/10 last:border-0">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="size-9 rounded-full bg-[#353535] text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
          {initials}
        </div>

        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold text-[#353535]">{name}</span>
          {date && <span className="text-xs text-gray-400">{date}</span>}
        </div>

        <div className="ml-auto">
          <StarRating value={item.rating} />
        </div>
      </div>

      {item.content && (
        <p className="text-sm text-[#353535] leading-relaxed pl-12">{item.content}</p>
      )}
    </div>
  )
}