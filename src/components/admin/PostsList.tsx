'use client'

export const PostsList = () => {
  // Dummy data for demonstration
  const posts = [
    {
      id: 1,
      title: 'Sample Post 1',
      createdAt: '2024-03-20',
      thumbnail: '/images/sample-1.jpg'
    },
    {
      id: 2,
      title: 'Sample Post 2',
      createdAt: '2024-03-19',
      thumbnail: '/images/sample-2.jpg'
    }
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Published Posts</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thumbnail
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Created
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-12 w-12 relative">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="h-12 w-12 rounded object-cover"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{post.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{post.createdAt}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 