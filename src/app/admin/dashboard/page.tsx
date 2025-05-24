import { PostEditor } from '@/components/admin/PostEditor'
import { PostsList } from '@/components/admin/PostsList'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <PostsList />
            
            {/* Bottom dummy section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Quick Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-500">Total Posts</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-500">Total Views</p>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <PostEditor />
          </div>
        </div>
      </div>
    </div>
  )
} 