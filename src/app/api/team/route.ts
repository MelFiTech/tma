import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/lib/sanity'

export async function POST(request: NextRequest) {
  try {
    const teamMemberData = await request.json()

    console.log('API: Creating team member:', teamMemberData)

    const result = await writeClient.create(teamMemberData)
    
    return NextResponse.json({ success: true, data: result })
  } catch (error: unknown) {
    console.error('API: Error creating team member:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to create team member'
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const teamMembers = await writeClient.fetch(`
      *[_type == "teamMember"] | order(_updatedAt desc) {
        _id,
        name,
        title,
        department,
        location,
        bio,
        linkedIn,
        order,
        isActive,
        image,
        _createdAt,
        _updatedAt
      }
    `)
    
    return NextResponse.json({ success: true, data: teamMembers })
  } catch (error: unknown) {
    console.error('API: Error fetching team members:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch team members'
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage
      },
      { status: 500 }
    )
  }
} 