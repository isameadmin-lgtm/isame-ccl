import type { Block } from 'payload'
import { richTextEditor } from '@/fields/richTextEditor'

export const TeamSectionBlock: Block = {
  slug: 'team-section',
  labels: {
    singular: 'Team Section',
    plural: 'Team Sections',
  },
  fields: [
    // ---------- SECTION BACKGROUND ----------
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Section Background Color',
      admin: {
        components: { Field: '@/components/ThemeColorPicker#default' },
        description: 'Leave empty for the theme default.',
      },
    },
    // ---------- CONTENT WIDTH ----------
    {
      name: 'contentWidth',
      type: 'select',
      label: 'Content Width',
      defaultValue: 'contained',
      options: [
        { label: 'Contained (max-width, centered)', value: 'contained' },
        { label: 'Full Width (edge to edge)', value: 'full' },
      ],
    },
    // ---------- IMAGE ----------
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Team Image',
      required: true,
    },
    // Optional gradient overlay on the image
    {
      type: 'collapsible',
      label: '🎨 Image Overlay Gradient',
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'overlayGradientStart',
              type: 'text',
              label: false, // swatches only
              admin: {
                width: '50%',
                components: { Field: '@/components/ThemeColorPicker#default' },
              },
            },
            {
              name: 'overlayGradientEnd',
              type: 'text',
              label: false,
              admin: {
                width: '50%',
                components: { Field: '@/components/ThemeColorPicker#default' },
              },
            },
          ],
        },
        {
          name: 'overlayOpacity',
          type: 'number',
          label: 'Overlay Opacity (0‑1)',
          defaultValue: 0.1,
          min: 0,
          max: 1,
          admin: { step: 0.05 },
        },
      ],
    },
    // ---------- HEADING (row: text + color swatch) ----------
    {
      type: 'row',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
          localized: true,
          required: true,
          defaultValue: 'About the Team',
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
    // ---------- CONTENT (rich text) ----------
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      editor: richTextEditor,
      localized: true,
      required: true,
      admin: {
        description: 'Use the toolbar to format text, add multiple paragraphs, bold, etc.',
      },
    },
    // ---------- QUOTE BOX ----------
    {
      type: 'collapsible',
      label: '💬 Quote Box (optional)',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'quoteText',
          type: 'text',
          label: 'Quote Text',
          localized: true,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'quoteBorderColor',
              type: 'text',
              label: false,
              admin: {
                width: '50%',
                components: { Field: '@/components/ThemeColorPicker#default' },
              },
            },
            {
              name: 'quoteTextColor',
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
