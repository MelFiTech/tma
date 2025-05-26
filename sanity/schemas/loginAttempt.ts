import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'loginAttempt',
  title: 'Login Attempt',
  type: 'document',
  fields: [
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ipAddress',
      title: 'IP Address',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'userAgent',
      title: 'User Agent',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'success',
      title: 'Success',
      type: 'boolean',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'timestamp',
      title: 'Timestamp',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'failureReason',
      title: 'Failure Reason',
      type: 'string',
      description: 'Reason for login failure (if applicable)',
    }),
  ],
  preview: {
    select: {
      username: 'username',
      success: 'success',
      timestamp: 'timestamp',
      ipAddress: 'ipAddress',
      failureReason: 'failureReason',
    },
    prepare(selection) {
      const { username, success, timestamp, ipAddress, failureReason } = selection
      const date = new Date(timestamp).toLocaleString()
      const status = success ? '✅ Success' : '❌ Failed'
      const reason = failureReason ? ` (${failureReason})` : ''
      
      return {
        title: `${username} - ${status}${reason}`,
        subtitle: `${date} • ${ipAddress}`,
      }
    },
  },
  orderings: [
    {
      title: 'Most Recent',
      name: 'timestampDesc',
      by: [{ field: 'timestamp', direction: 'desc' }],
    },
    {
      title: 'Username',
      name: 'usernameAsc',
      by: [{ field: 'username', direction: 'asc' }],
    },
    {
      title: 'Failed Only',
      name: 'failedFirst',
      by: [
        { field: 'success', direction: 'asc' },
        { field: 'timestamp', direction: 'desc' }
      ],
    },
  ],
}) 