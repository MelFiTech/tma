import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'adminUser',
  title: 'Admin User',
  type: 'document',
  fields: [
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(50),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'password',
      title: 'Password Hash',
      type: 'string',
      description: 'Encrypted password - not visible in studio',
      validation: (Rule) => Rule.required(),
      // Hide from studio for security
      hidden: true,
    }),
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'Super Admin', value: 'super_admin' },
          { title: 'Admin', value: 'admin' },
          { title: 'Editor', value: 'editor' },
        ],
      },
      initialValue: 'admin',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'User can login when active',
      initialValue: true,
    }),
    defineField({
      name: 'lastLogin',
      title: 'Last Login',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'loginAttempts',
      title: 'Failed Login Attempts',
      type: 'number',
      description: 'Number of consecutive failed login attempts',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'lockedUntil',
      title: 'Locked Until',
      type: 'datetime',
      description: 'Account locked until this time',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'twoFactorEnabled',
      title: '2FA Enabled',
      type: 'boolean',
      description: 'Two-factor authentication enabled',
      initialValue: false,
    }),
    defineField({
      name: 'twoFactorSecret',
      title: '2FA Secret',
      type: 'string',
      description: 'Two-factor authentication secret key',
      hidden: true,
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'username',
      media: 'profileImage',
      role: 'role',
      isActive: 'isActive',
      lockedUntil: 'lockedUntil',
    },
    prepare(selection) {
      const { title, subtitle, media, role, isActive, lockedUntil } = selection
      const isLocked = lockedUntil && new Date(lockedUntil) > new Date()
      
      let status = ''
      if (!isActive) status = '(Inactive)'
      else if (isLocked) status = '(Locked)'
      
      return {
        title: title || subtitle,
        subtitle: `@${subtitle} • ${role} ${status}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Full Name',
      name: 'fullNameAsc',
      by: [{ field: 'fullName', direction: 'asc' }],
    },
    {
      title: 'Last Login',
      name: 'lastLoginDesc',
      by: [{ field: 'lastLogin', direction: 'desc' }],
    },
    {
      title: 'Role',
      name: 'roleAsc',
      by: [{ field: 'role', direction: 'asc' }],
    },
  ],
}) 