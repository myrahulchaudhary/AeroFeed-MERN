export default function PostCard({ post, onLike, onSave, showSave }) {
  return (
    <div className="bg-white shadow rounded-xl p-5 mb-4">
      <h3 className="font-semibold text-lg">{post.title}</h3>
      <p className="text-gray-600 mt-2">{post.content}</p>

      <div className="flex justify-between mt-4">
        <button onClick={() => onLike(post._id)} className="text-red-500">
          ❤️ {post.likes.length}
        </button>

        {showSave && (
          <button
            onClick={() => onSave(post._id)}
            className="text-green-600"
          >
            💾 Save
          </button>
        )}
      </div>
    </div>
  );
}