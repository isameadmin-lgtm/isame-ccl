import type { Block } from 'payload'

export const ValuesBlock: Block = {
  slug: 'values',
  labels: { singular: 'Values Section', plural: 'Values Sections' },
  fields: [
    // Section background – prominent at the top
    {
      name: 'sectionBackgroundColor',
      type: 'text',
      label: 'Section Background Colour',
      admin: {
        components: { Field: '@/components/ThemeColorPicker#default' },
        description: 'Leave empty for theme default.',
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
          defaultValue: 'Our Values',
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

    // ---------- SUBHEADING ROW ----------
    {
      type: 'row',
      fields: [
        {
          name: 'subheading',
          type: 'text',
          label: 'Subheading',
          localized: true,
          defaultValue: 'The principles that guide everything we do',
          admin: { width: '70%' },
        },
        {
          name: 'subheadingColor',
          type: 'text',
          label: false,
          admin: {
            width: '30%',
            components: { Field: '@/components/ThemeColorPicker#default' },
          },
        },
      ],
    },

    // ---------- VALUE CARDS ----------
    {
      name: 'values',
      type: 'array',
      label: 'Value Cards',
      minRows: 1,
      maxRows: 12,
      fields: [
        // ── Icon row: icon selector + two swatches ──
        {
          type: 'row',
          fields: [
            {
              name: 'icon',
              type: 'select',
              label: 'Icon',
              options: [
                { label: 'Heart', value: 'heart' },
                { label: 'Award', value: 'award' },
                { label: 'Target', value: 'target' },
                { label: 'Globe', value: 'globe' },
                { label: 'Star', value: 'star' },
                { label: 'Shield', value: 'shield' },
                { label: 'Thumbs Up', value: 'thumbsUp' },
                { label: 'Briefcase', value: 'briefcase' },
                { label: 'Handshake', value: 'handshake' },
              ],
              required: true,
              admin: { width: '40%' },
            },
            {
              name: 'iconBackgroundColor',
              type: 'text',
              label: false,
              admin: {
                width: '30%',
                components: { Field: '@/components/ThemeColorPicker#default' },
              },
            },
            {
              name: 'iconColor',
              type: 'text',
              label: false,
              admin: {
                width: '30%',
                components: { Field: '@/components/ThemeColorPicker#default' },
              },
            },
          ],
        },

        // ── Title row: title + titleColor ──
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              localized: true,
              required: true,
              admin: { width: '70%' },
            },
            {
              name: 'titleColor',
              type: 'text',
              label: false,
              admin: {
                width: '30%',
                components: { Field: '@/components/ThemeColorPicker#default' },
              },
            },
          ],
        },

        // ── Description row: description + descriptionColor ──
        {
          type: 'row',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
              localized: true,
              required: true,
              admin: { width: '70%' },
            },
            {
              name: 'descriptionColor',
              type: 'text',
              label: false,
              admin: {
                width: '30%',
                components: { Field: '@/components/ThemeColorPicker#default' },
              },
            },
          ],
        },

        // ── Card background colour (standalone, no label) ──
        {
          name: 'cardBackgroundColor',
          type: 'text',
          label: false,
          admin: {
            width: '100%',
            components: { Field: '@/components/ThemeColorPicker#default' },
            description: 'Card background colour',
          },
        },
      ],
    },

    // Animation toggle
    {
      name: 'enableAnimation',
      type: 'checkbox',
      label: 'Enable scroll animation',
      defaultValue: true,
    },
  ],
}
