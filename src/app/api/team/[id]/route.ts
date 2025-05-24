import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/lib/sanity'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const updates = await request.json()

    console.log('API: Updating team member', id, 'with:', updates)

    const result = await writeClient.patch(id).set(updates).commit()
    
    return NextResponse.json({ success: true, data: result })
  } catch (error: unknown) {
    console.error('API: Error updating team member:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to update team member'
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    console.log('API: Deleting team member', id)

    const result = await writeClient.delete(id)
    
    return NextResponse.json({ success: true, data: result })
  } catch (error: unknown) {
    console.error('API: Error deleting team member:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete team member'
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage
      },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const teamMember = await writeClient.fetch(`
      *[_type == "teamMember" && _id == $id][0] {
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
    `, { id })
    
    if (!teamMember) {
      return NextResponse.json(
        { success: false, error: 'Team member not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, data: teamMember })
  } catch (error: unknown) {
    console.error('API: Error fetching team member:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch team member'
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage
      },
      { status: 500 }
    )
  }
} 