const { createClient } = require('@sanity/client')
const bcrypt = require('bcryptjs')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

async function setupDefaultAdmin() {
  try {
    console.log('🔍 Checking for existing admin users...')
    
    // Check if any admin users exist
    const existingUsers = await client.fetch(`count(*[_type == "adminUser"])`)
    
    if (existingUsers > 0) {
      console.log(`ℹ️  Found ${existingUsers} existing admin user(s). Skipping setup.`)
      return
    }

    console.log('👤 Creating default admin user...')

    // Create default admin user with strong password
    const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'TMA@Admin2024!'
    const hashedPassword = await bcrypt.hash(defaultPassword, 12)
    
    const adminUser = await client.create({
      _type: 'adminUser',
      username: 'admin',
      email: 'admin@tma.com',
      password: hashedPassword,
      fullName: 'System Administrator',
      role: 'super_admin',
      isActive: true,
    })

    console.log('✅ Default admin user created successfully!')
    console.log('')
    console.log('🔐 SECURITY NOTICE:')
    console.log('📋 Login details:')
    console.log('   👤 Username: admin')
    console.log('   📧 Email: admin@tma.com')
    console.log('   🔑 Password:', defaultPassword)
    console.log('')
    console.log('🚨 IMPORTANT SECURITY STEPS:')
    console.log('   1. Change the password immediately after first login!')
    console.log('   2. Set strong environment variables:')
    console.log('      - JWT_SECRET=your-very-secure-jwt-secret-key')
    console.log('      - ENCRYPTION_KEY=your-32-character-encryption-key!')
    console.log('      - DEFAULT_ADMIN_PASSWORD=your-strong-password')
    console.log('   3. Enable HTTPS in production')
    console.log('   4. Monitor login attempts in Sanity Studio')
    console.log('')
    console.log('🌐 Access admin at: http://localhost:3000/admin')
    
  } catch (error) {
    console.error('❌ Error setting up admin user:', error)
    process.exit(1)
  }
}

// Run the setup
setupDefaultAdmin()
  .then(() => {
    console.log('🎉 Setup completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Setup failed:', error)
    process.exit(1)
  }) 