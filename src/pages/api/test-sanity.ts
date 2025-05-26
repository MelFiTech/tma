import { NextApiRequest, NextApiResponse } from 'next'
import { client } from '@/lib/sanity'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Test basic connectivity
    const result = await client.fetch('*[_type == "teamMember"][0...5]{ _id, name, title }')
    
    res.status(200).json({
      success: true,
      message: 'Sanity connection successful',
      data: result,
      config: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        hasWriteToken: !!process.env.SANITY_API_WRITE_TOKEN
      }
    })
  } catch (error) {
    console.error('Sanity test error:', error)
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      config: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        hasWriteToken: !!process.env.SANITY_API_WRITE_TOKEN
      }
    })
  }
} 