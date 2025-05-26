'use client'

import { useState, useEffect, useMemo } from 'react'
import { client } from '@/lib/sanity'

interface ActivityItem {
  _id: string
  _type: string
  title?: string
  name?: string
  _createdAt: string
  _updatedAt: string
  _rev: string
  isNew?: boolean
  changeType?: 'created' | 'updated'
  daysSinceCreated?: number
  hoursSinceUpdated?: number
}

type TimeFilter = 'today' | '7days' | '30days' | '90days' | '180days' | '1year' | 'all'

interface FilterOption {
  value: TimeFilter
  label: string
  days?: number
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)
  const [useApiRoute, setUseApiRoute] = useState(true) // Toggle between API and direct query
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('7days')
  const [filteredCount, setFilteredCount] = useState(0)

  const filterOptions: FilterOption[] = useMemo(() => [
    { value: 'today', label: 'Today', days: 0 },
    { value: '7days', label: 'Last 7 days', days: 7 },
    { value: '30days', label: 'Last 30 days', days: 30 },
    { value: '90days', label: 'Last 90 days', days: 90 },
    { value: '180days', label: 'Last 180 days', days: 180 },
    { value: '1year', label: 'Last year', days: 365 },
    { value: 'all', label: 'All time' }
  ], [])

  useEffect(() => {
    const getDateFilterForQuery = (filter: TimeFilter): string => {
      if (filter === 'all') return ''
      
      const now = new Date()
      let startDate: Date
      
      if (filter === 'today') {
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      } else {
        const filterOption = filterOptions.find(opt => opt.value === filter)
        const daysBack = filterOption?.days || 7
        startDate = new Date(now.getTime() - (daysBack * 24 * 60 * 60 * 1000))
      }
      
      return ` && _updatedAt >= "${startDate.toISOString()}"`
    }

    async function fetchActivity() {
      try {
        setLoading(true)
        const dateFilter = getDateFilterForQuery(timeFilter)
        
        if (useApiRoute) {
          // Use the dedicated activity API for better performance and tracking
          const params = new URLSearchParams({
            limit: '50',
            offset: '0'
          })
          
          // Add date filter parameter for API
          if (timeFilter !== 'all') {
            const now = new Date()
            let startDate: Date
            
            if (timeFilter === 'today') {
              startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            } else {
              const filterOption = filterOptions.find(opt => opt.value === timeFilter)
              const daysBack = filterOption?.days || 7
              startDate = new Date(now.getTime() - (daysBack * 24 * 60 * 60 * 1000))
            }
            
            params.append('since', startDate.toISOString())
          }
          
          const response = await fetch(`/api/activity?${params.toString()}`)
          const result = await response.json()
          
          if (result.success) {
            setActivities(result.data.activities || [])
            setFilteredCount(result.data.totalCount || 0)
          } else {
            console.warn('Activity API failed, falling back to direct query:', result.error)
            setUseApiRoute(false)
            return fetchActivity() // Retry with direct query
          }
        } else {
          // Fallback to direct Sanity query with date filtering
          const query = `
            *[_type in ["teamMember", "blogPost"]${dateFilter}] | order(_updatedAt desc)[0...50] {
              _id,
              _type,
              _rev,
              "title": select(_type == "blogPost" => title, _type == "teamMember" => name),
              "name": select(_type == "teamMember" => name),
              _createdAt,
              _updatedAt
            }
          `
          
          const countQuery = `count(*[_type in ["teamMember", "blogPost"]${dateFilter}])`
          
          const [recent, totalCount] = await Promise.all([
            client.fetch(query),
            client.fetch(countQuery)
          ])
          
          // Process activities with better change detection
          const now = new Date()
          const processedActivities = (recent || []).map((item: ActivityItem) => {
            const createdTime = new Date(item._createdAt).getTime()
            const updatedTime = new Date(item._updatedAt).getTime()
            
            // More generous buffer for creation vs update detection (30 seconds)
            const isNewlyCreated = (updatedTime - createdTime) < 30000
            
            // Consider something "new" if created within last 7 days
            const isRecentlyCreated = createdTime > now.getTime() - (7 * 24 * 60 * 60 * 1000)
            
            return {
              ...item,
              isNew: isRecentlyCreated && isNewlyCreated,
              changeType: isNewlyCreated ? 'created' : 'updated'
            }
          })
          
          setActivities(processedActivities)
          setFilteredCount(totalCount || 0)
        }
      } catch (error) {
        console.error('Error fetching activity:', error)
        // If API fails, try direct query
        if (useApiRoute) {
          setUseApiRoute(false)
          return fetchActivity()
        }
      } finally {
        setLoading(false)
      }
    }

    fetchActivity()
    
    // Set up periodic refresh to catch new activity (only for recent filters)
    let interval: NodeJS.Timeout | null = null
    if (['today', '7days'].includes(timeFilter)) {
      interval = setInterval(fetchActivity, 30000) // Refresh every 30 seconds for recent data
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [useApiRoute, timeFilter, filterOptions])

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) {
      return 'Just now'
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60)
      if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`
      } else {
        const diffInDays = Math.floor(diffInHours / 24)
        if (diffInDays < 7) {
          return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`
        } else {
          return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
            hour: '2-digit',
            minute: '2-digit'
          })
        }
      }
    }
  }

  const getActivityDetails = (item: ActivityItem) => {
    const isCreated = item.changeType === 'created'
    
    if (item._type === 'teamMember') {
      if (isCreated) {
        return {
          action: 'created',
          description: 'New team member added',
          entity: item.name || 'Unnamed Member',
          icon: 'user-plus',
          color: 'emerald',
          timestamp: item._createdAt
        }
      } else {
        return {
          action: 'updated',
          description: 'Team member profile updated',
          entity: item.name || 'Unnamed Member',
          icon: 'user-edit',
          color: 'blue',
          timestamp: item._updatedAt
        }
      }
    } else if (item._type === 'blogPost') {
      if (isCreated) {
        return {
          action: 'published',
          description: 'New blog post published',
          entity: item.title || 'Untitled Post',
          icon: 'document-plus',
          color: 'purple',
          timestamp: item._createdAt
        }
      } else {
        return {
          action: 'updated',
          description: 'Blog post updated',
          entity: item.title || 'Untitled Post',
          icon: 'document-edit',
          color: 'amber',
          timestamp: item._updatedAt
        }
      }
    }
    
    return {
      action: 'modified',
      description: 'Content updated',
      entity: item.title || item.name || 'Unknown',
      icon: 'pencil',
      color: 'gray',
      timestamp: item._updatedAt
    }
  }

  const getIcon = (iconName: string, colorClass: string) => {
    const iconProps = {
      className: `h-5 w-5 ${colorClass}`,
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
      strokeWidth: 2
    }

    switch (iconName) {
      case 'user-plus':
        return (
          <svg {...iconProps}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        )
      case 'user-edit':
        return (
          <svg {...iconProps}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        )
      case 'document-plus':
        return (
          <svg {...iconProps}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        )
      case 'document-edit':
        return (
          <svg {...iconProps}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
          </svg>
        )
      default:
        return (
          <svg {...iconProps}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
          </svg>
        )
    }
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'emerald':
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          text: 'text-emerald-700',
          badge: 'bg-emerald-100 text-emerald-800',
          ring: 'ring-emerald-50'
        }
      case 'blue':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-700',
          badge: 'bg-blue-100 text-blue-800',
          ring: 'ring-blue-50'
        }
      case 'purple':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          text: 'text-purple-700',
          badge: 'bg-purple-100 text-purple-800',
          ring: 'ring-purple-50'
        }
      case 'amber':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          text: 'text-amber-700',
          badge: 'bg-amber-100 text-amber-800',
          ring: 'ring-amber-50'
        }
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-700',
          badge: 'bg-gray-100 text-gray-800',
          ring: 'ring-gray-50'
        }
    }
  }

  // Group activities by date for better organization
  const groupActivitiesByDate = (activities: ActivityItem[]) => {
    const groups: { [key: string]: ActivityItem[] } = {}
    
    activities.forEach(activity => {
      const details = getActivityDetails(activity)
      const date = new Date(details.timestamp)
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      
      let groupKey: string
      if (date.toDateString() === today.toDateString()) {
        groupKey = 'Today'
      } else if (date.toDateString() === yesterday.toDateString()) {
        groupKey = 'Yesterday'
      } else {
        // For older dates, include year if different from current year
        const options: Intl.DateTimeFormatOptions = { 
          month: 'short', 
          day: 'numeric' 
        }
        if (date.getFullYear() !== today.getFullYear()) {
          options.year = 'numeric'
        }
        groupKey = date.toLocaleDateString('en-US', options)
      }
      
      if (!groups[groupKey]) {
        groups[groupKey] = []
      }
      groups[groupKey].push(activity)
    })
    
    return groups
  }

  const activityGroups = groupActivitiesByDate(activities)
  const selectedFilter = filterOptions.find(opt => opt.value === timeFilter)

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filteredCount > 0 && (
                <>
                  {filteredCount} {filteredCount === 1 ? 'activity' : 'activities'} 
                  {timeFilter !== 'all' && ` in ${selectedFilter?.label.toLowerCase()}`}
                </>
              )}
            </p>
          </div>
          
          {/* Filter Dropdown */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
                className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
              >
                {filterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {useApiRoute ? 'Live Tracking' : 'Direct Query'}
              </span>
              {activities.length > 0 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {activities.length} shown
                </span>
              )}
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-start space-x-3 p-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : activities.length > 0 ? (
          <div className="space-y-6">
            {Object.entries(activityGroups).map(([dateGroup, groupActivities]) => (
              <div key={dateGroup}>
                <h4 className="text-sm font-medium text-gray-500 mb-3">{dateGroup}</h4>
                <div className="flow-root">
                  <ul className="-mb-8">
                    {groupActivities.map((item, index) => {
                      const details = getActivityDetails(item)
                      const colors = getColorClasses(details.color)
                      const isLast = index === groupActivities.length - 1
                      
                      return (
                        <li key={`${item._id}-${item._rev}`}>
                          <div className="relative pb-8">
                            {!isLast && (
                              <span
                                className="absolute top-10 left-5 -ml-px h-full w-0.5 bg-gray-200"
                                aria-hidden="true"
                              />
                            )}
                            <div className="relative flex items-start space-x-3">
                              <div className="relative px-1">
                                <div className={`h-10 w-10 rounded-lg ${colors.bg} ${colors.border} border-2 flex items-center justify-center ring-8 ring-white shadow-sm`}>
                                  {getIcon(details.icon, colors.text)}
                                </div>
                                {item.isNew && (
                                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 border-2 border-white rounded-full"></div>
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <p className="text-sm font-medium text-gray-900">
                                      {details.description}
                                    </p>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colors.badge}`}>
                                      {details.action}
                                    </span>
                                  </div>
                                  <time className="text-xs text-gray-500 whitespace-nowrap">
                                    {formatDateTime(details.timestamp)}
                                  </time>
                                </div>
                                <div className="mt-1">
                                  <p className="text-sm text-gray-600 truncate">
                                    <span className="font-medium">{details.entity}</span>
                                    <span className="text-gray-400 mx-1">•</span>
                                    <span className="capitalize">{item._type.replace('Post', ' Post')}</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="mx-auto h-16 w-16 text-gray-400 mb-4">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              No activity {timeFilter !== 'all' ? `in ${selectedFilter?.label.toLowerCase()}` : 'found'}
            </h3>
            <p className="text-sm text-gray-500">
              {timeFilter !== 'all' 
                ? `Try selecting a different time period or create some content.`
                : 'Activity will appear here as content is created and updated.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 