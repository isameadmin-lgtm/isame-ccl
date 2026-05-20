import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonials',
    plural: 'Testimonials',
  },
  fields: [
    // ---------- SECTION BACKGROUND (standalone, no content to pair) ----------
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Section Background Color',
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
          label: 'Section Heading',
          localized: true,
          defaultValue: 'Support from the Business Community',
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
          defaultValue: 'Trusted by Belizean businesses across all sectors',
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

    // ---------- TESTIMONIALS ----------
    {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonials',
      minRows: 1,
      maxRows: 12,
      fields: [
        // ── Quote row: textarea + quote color (NEW) ──
        {
          type: 'row',
          fields: [
            {
              name: 'quote',
              type: 'textarea',
              label: 'Quote',
              localized: true,
              required: true,
              admin: { width: '70%' },
            },
            {
              name: 'quoteColor', // 🆕 Added this field
              type: 'text',
              label: false,
              admin: {
                width: '30%',
                components: { Field: '@/components/ThemeColorPicker#default' },
              },
            },
          ],
        },

        // ── Author row: text + color ──
        {
          type: 'row',
          fields: [
            {
              name: 'author',
              type: 'text',
              label: 'Author Name',
              localized: true,
              required: true,
              admin: { width: '70%' },
            },
            {
              name: 'authorColor',
              type: 'text',
              label: false,
              admin: {
                width: '30%',
                components: { Field: '@/components/ThemeColorPicker#default' },
              },
            },
          ],
        },

        // ── Business row: text + color ──
        {
          type: 'row',
          fields: [
            {
              name: 'business',
              type: 'text',
              label: 'Business / Location',
              localized: true,
              admin: { width: '70%' },
            },
            {
              name: 'businessColor',
              type: 'text',
              label: false,
              admin: {
                width: '30%',
                components: { Field: '@/components/ThemeColorPicker#default' },
              },
            },
          ],
        },

        // ── Card styling (collapsible – two rows of swatches) ──
        {
          type: 'collapsible',
          label: '🎨 Card Styling (optional)',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'cardBgColor',
                  type: 'text',
                  label: false,
                  admin: {
                    width: '33%',
                    components: { Field: '@/components/ThemeColorPicker#default' },
                  },
                },
                {
                  name: 'cardBorderColor',
                  type: 'text',
                  label: false,
                  admin: {
                    width: '33%',
                    components: { Field: '@/components/ThemeColorPicker#default' },
                  },
                },
                {
                  name: 'quoteIconColor',
                  type: 'text',
                  label: false,
                  admin: {
                    width: '34%',
                    components: { Field: '@/components/ThemeColorPicker#default' },
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    // ---------- COLUMNS ----------
    {
      name: 'columns',
      type: 'select',
      label: 'Desktop Columns',
      defaultValue: '2',
      options: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
      ],
    },

    // ---------- CTA ----------
    {
      type: 'collapsible',
      label: '🔘 Call to Action (optional)',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'CTA Label',
          localized: true,
        },
        {
          name: 'ctaUrl',
          type: 'text',
          label: 'CTA URL',
        },
        {
          name: 'ctaNewTab',
          type: 'checkbox',
          label: 'Open in new tab',
          defaultValue: false,
        },
        // CTA button colors row
        {
          type: 'row',
          fields: [
            {
              name: 'ctaBgColor',
              type: 'text',
              label: false,
              admin: {
                width: '50%',
                components: { Field: '@/components/ThemeColorPicker#default' },
              },
            },
            {
              name: 'ctaTextColor',
              type: 'text',
              label: false,
              admin: {
                width: '50%',
                components: { Field: '@/components/ThemeColorPicker#default' },
              },
            },
          ],
        },
      ],
    },

    // ---------- ANIMATION ----------
    {
      name: 'enableAnimation',
      type: 'checkbox',
      label: 'Enable scroll animation',
      defaultValue: true,
    },
  ],
}
