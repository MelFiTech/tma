import {defineField, defineType} from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required().min(50).max(1000),
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }
      ]
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          {title: 'Administration', value: 'Administration'},
          {title: 'Academic', value: 'Academic'},
          {title: 'Medical', value: 'Medical'},
          {title: 'Support', value: 'Support'},
          {title: 'Security', value: 'Security'},
          {title: 'Leadership', value: 'Leadership'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Campus Location',
      type: 'string',
      options: {
        list: [
          {title: 'Katsina', value: 'Katsina'},
          {title: 'Kaduna', value: 'Kaduna'},
          {title: 'Abuja', value: 'Abuja'},
          {title: 'Lagos', value: 'Lagos'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkedIn',
      title: 'LinkedIn Profile',
      type: 'url',
      description: 'Optional LinkedIn profile URL',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this team member should appear (lower numbers appear first)',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'isActive',
      title: 'Active Team Member',
      type: 'boolean',
      description: 'Toggle to show/hide this team member',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'},
        {field: 'name', direction: 'asc'}
      ]
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [
        {field: 'name', direction: 'asc'}
      ]
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image',
      location: 'location',
      department: 'department',
    },
    prepare(selection) {
      const {title, subtitle, media, location, department} = selection
      return {
        title,
        subtitle: `${subtitle} • ${department} • ${location}`,
        media,
      }
    },
  },
}) 