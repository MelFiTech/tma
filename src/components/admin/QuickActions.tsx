import Link from 'next/link'

export default function QuickActions() {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/team"
            className="relative group bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 p-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg hover:from-blue-100 hover:to-indigo-200 transition-all duration-200 block"
          >
            <div className="flex items-center">
              <span className="rounded-lg inline-flex p-3 bg-white shadow-sm border border-blue-200">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </span>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-blue-900">
                  Manage Team Members
                </h3>
                <p className="mt-1 text-sm text-blue-700">
                  Add, edit, or remove team members from your organization.
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/blog"
            className="relative group bg-gradient-to-br from-emerald-50 to-green-100 border border-emerald-200 p-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-500 rounded-lg hover:from-emerald-100 hover:to-green-200 transition-all duration-200 block"
          >
            <div className="flex items-center">
              <span className="rounded-lg inline-flex p-3 bg-white shadow-sm border border-emerald-200">
                <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </span>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-emerald-900">
                  Manage Blog Posts
                </h3>
                <p className="mt-1 text-sm text-emerald-700">
                  Create, edit, and publish blog posts for your website.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
} 