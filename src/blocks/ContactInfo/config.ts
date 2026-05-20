import type { Block } from 'payload'

export const ContactInfoBlock: Block = {
  slug: 'contactInfo',
  labels: {
    singular: 'Contact Info',
    plural: 'Contact Info',
  },
  fields: [
    // ---------- BACKGROUND (standalone, no content to pair) ----------
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Background Colour',
      admin: {
        components: { Field: '@/components/ThemeColorPicker#default' },
        description: 'Leave empty for the theme default.',
      },
    },

    // ---------- HEADING ROW ----------
    {
      type: 'row',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
          localized: true,
          required: true,
          defaultValue: 'Contact Information',
          admin: { width: '70%' },
        },
        {
          name: 'headingColor',
          type: 'text',
          label: false,
          admin: {
            width: '30%',
            components: { Field: '@/components/ThemeColorPicker#default' },
          },
        },
      ],
    },

    // ---------- GLOBAL TEXT COLOUR (for contact details) ----------
    {
      name: 'textColor',
      type: 'text',
      label: 'Text Colour (for details)',
      admin: {
        components: { Field: '@/components/ThemeColorPicker#default' },
        description: 'Applied to all contact item labels, values, and subtitles.',
      },
    },

    // ---------- GLOBAL ICON COLOURS (grouped) ----------
    {
      type: 'row',
      fields: [
        {
          name: 'iconBackgroundColor',
          type: 'text',
          label: false,
          admin: {
            width: '50%',
            components: { Field: '@/components/ThemeColorPicker#default' },
            description: 'Icon circle background',
          },
        },
        {
          name: 'iconColor',
          type: 'text',
          label: false,
          admin: {
            width: '50%',
            components: { Field: '@/components/ThemeColorPicker#default' },
            description: 'Icon colour',
          },
        },
      ],
    },

    // ---------- CONTACT ITEMS ----------
    {
      name: 'contactItems',
      type: 'array',
      label: 'Contact Items',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'Phone', value: 'phone' },
            { label: 'Mail', value: 'mail' },
            { label: 'Map Pin', value: 'mapPin' },
            { label: 'Globe', value: 'globe' },
            { label: 'Clock', value: 'clock' },
            { label: 'Building', value: 'building' },
            { label: 'User', value: 'user' },
            { label: 'Message Circle', value: 'messageCircle' },
            { label: 'Smartphone', value: 'smartphone' },
            { label: 'External Link', value: 'externalLink' },
            { label: 'Help Circle', value: 'helpCircle' },
          ],
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          localized: true,
          required: true,
        },
        {
          name: 'value',
          type: 'textarea',
          label: 'Value',
          localized: true,
          required: true,
          admin: {
            description: 'Supports line breaks for multiple lines (e.g., address).',
          },
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle (optional)',
          localized: true,
        },
      ],
    },

    // ---------- MAP ----------
    {
      name: 'enableMap',
      type: 'checkbox',
      label: 'Show a Google Map embed at the bottom',
      defaultValue: false,
    },
    {
      name: 'mapEmbedUrl',
      type: 'text',
      label: 'Map Embed URL',
      admin: {
        condition: (_, siblingData) => siblingData?.enableMap,
        description: 'Paste the full Google Maps embed URL.',
      },
    },
    {
      name: 'mapHeight',
      type: 'text',
      label: 'Map Height (CSS)',
      defaultValue: '16rem',
      admin: {
        condition: (_, siblingData) => siblingData?.enableMap,
      },
    },

    // ---------- ANIMATION ----------
    {
      name: 'enableAnimation',
      type: 'checkbox',
      label: 'Enable scroll animations',
      defaultValue: false,
    },
  ],
}
