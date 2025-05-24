import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const type = searchParams.get('type') // 'teamMember' | 'blogPost' | null for all
    const since = searchParams.get('since') // ISO date string for filtering

    // Build the filter condition
    let typeFilter = ''
    if (type && ['teamMember', 'blogPost'].includes(type)) {
      typeFilter = ` && _type == "${type}"`
    }

    // Build date filter condition
    let dateFilter = ''
    if (since) {
      try {
        const sinceDate = new Date(since)
        if (!isNaN(sinceDate.getTime())) {
          dateFilter = ` && _updatedAt >= "${sinceDate.toISOString()}"`
        }
      } catch {
        console.warn('Invalid since date parameter:', since)
      }
    }

    console.log('API: Fetching activity with limit:', limit, 'offset:', offset, 'type:', type, 'since:', since)

    // Fetch activity data with comprehensive information
    const activities = await client.fetch(`
      *[_type in ["teamMember", "blogPost"]${typeFilter}${dateFilter}] | order(_updatedAt desc)[${offset}...${offset + limit}] {
        _id,
        _type,
        _rev,
        _createdAt,
        _updatedAt,
        "title": select(_type == "blogPost" => title, _type == "teamMember" => name),
        "name": select(_type == "teamMember" => name),
        "slug": select(_type == "blogPost" => slug.current),
        "department": select(_type == "teamMember" => department),
        "category": select(_type == "blogPost" => category),
        "featured": select(_type == "blogPost" => featured, _type == "teamMember" => false),
        "isActive": select(_type == "teamMember" => isActive, _type == "blogPost" => true)
      }
    `)

    // Also get total count for pagination
    const totalCount = await client.fetch(`
      count(*[_type in ["teamMember", "blogPost"]${typeFilter}${dateFilter}])
    `)

    // Process activities with enhanced metadata
    const processedActivities = (activities || []).map((item: Record<string, unknown>) => {
      const createdTime = new Date(item._createdAt as string).getTime()
      const updatedTime = new Date(item._updatedAt as string).getTime()
      
      // More accurate detection of creation vs update
      const isNewlyCreated = (updatedTime - createdTime) < 30000 // 30 second buffer
      const now = new Date().getTime()
      const isRecentlyCreated = createdTime > now - (7 * 24 * 60 * 60 * 1000) // 7 days
      
      return {
        ...item,
        isNew: isRecentlyCreated && isNewlyCreated,
        changeType: isNewlyCreated ? 'created' : 'updated',
        daysSinceCreated: Math.floor((now - createdTime) / (24 * 60 * 60 * 1000)),
        hoursSinceUpdated: Math.floor((now - updatedTime) / (60 * 60 * 1000))
      }
    })
    
    return NextResponse.json({ 
      success: true, 
      data: {
        activities: processedActivities,
        totalCount,
        hasMore: (offset + limit) < totalCount,
        pagination: {
          limit,
          offset,
          totalPages: Math.ceil(totalCount / limit),
          currentPage: Math.floor(offset / limit) + 1
        },
        filters: {
          type,
          since,
          appliedDateFilter: !!dateFilter,
          appliedTypeFilter: !!typeFilter
        }
      }
    })
  } catch (error: unknown) {
    console.error('API: Error fetching activity:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch activity'
    const statusCode = error instanceof Error && 'statusCode' in error && typeof (error as { statusCode: unknown }).statusCode === 'number' 
      ? (error as { statusCode: number }).statusCode 
      : 500
    
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage
      },
      { status: statusCode }
    )
  }
}

// Get activity stats
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, since } = body

    if (action === 'stats') {
      console.log('API: Fetching activity stats', since ? `since ${since}` : '')

      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      const weekAgo = new Date(today)
      weekAgo.setDate(weekAgo.getDate() - 7)

      // If 'since' parameter is provided, use it as the base date for filtering
      let baseDate = weekAgo
      if (since) {
        try {
          const sinceDate = new Date(since)
          if (!isNaN(sinceDate.getTime())) {
            baseDate = sinceDate
          }
        } catch {
          console.warn('Invalid since date in stats request:', since)
        }
      }

      const [
        todayActivity,
        yesterdayActivity,
        weekActivity,
        totalTeamMembers,
        totalBlogPosts,
        recentCreations,
        filteredActivity
      ] = await Promise.all([
        // Today's activity
        client.fetch(`
          count(*[_type in ["teamMember", "blogPost"] && _updatedAt >= $today])
        `, { today: today.toISOString() }),
        
        // Yesterday's activity
        client.fetch(`
          count(*[_type in ["teamMember", "blogPost"] && _updatedAt >= $yesterday && _updatedAt < $today])
        `, { yesterday: yesterday.toISOString(), today: today.toISOString() }),
        
        // Week's activity
        client.fetch(`
          count(*[_type in ["teamMember", "blogPost"] && _updatedAt >= $weekAgo])
        `, { weekAgo: weekAgo.toISOString() }),
        
        // Total counts
        client.fetch(`count(*[_type == "teamMember"])`),
        client.fetch(`count(*[_type == "blogPost"])`),
        
        // Recent creations (last 7 days)
        client.fetch(`
          count(*[_type in ["teamMember", "blogPost"] && _createdAt >= $weekAgo])
        `, { weekAgo: weekAgo.toISOString() }),

        // Activity in the filtered period (if since is provided)
        since ? client.fetch(`
          count(*[_type in ["teamMember", "blogPost"] && _updatedAt >= $since])
        `, { since: baseDate.toISOString() }) : 0
      ])

      return NextResponse.json({
        success: true,
        data: {
          activity: {
            today: todayActivity,
            yesterday: yesterdayActivity,
            thisWeek: weekActivity,
            filtered: since ? filteredActivity : null
          },
          totals: {
            teamMembers: totalTeamMembers,
            blogPosts: totalBlogPosts
          },
          recentCreations,
          trend: {
            direction: todayActivity > yesterdayActivity ? 'up' : todayActivity < yesterdayActivity ? 'down' : 'stable',
            percentage: yesterdayActivity > 0 ? Math.round(((todayActivity - yesterdayActivity) / yesterdayActivity) * 100) : 0
          },
          filters: {
            since: since || null,
            baseDate: baseDate.toISOString()
          }
        }
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error: unknown) {
    console.error('API: Error processing activity request:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to process activity request'
    const statusCode = error instanceof Error && 'statusCode' in error && typeof (error as { statusCode: unknown }).statusCode === 'number' 
      ? (error as { statusCode: number }).statusCode 
      : 500
    
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage
      },
      { status: statusCode }
    )
  }
} 