import type { Block } from 'payload'
import { richTextEditor } from '@/fields/richTextEditor'

export const MediaContent: Block = {
  slug: 'mediaContent',
  labels: {
    singular: 'Media & Content',
    plural: 'Media & Content',
  },
  fields: [
    // ---------- SECTION BACKGROUND (standalone) ----------
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
          defaultValue: 'Our Story',
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

    // ---------- RICH TEXT CONTENT ----------
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      editor: richTextEditor,
      localized: true,
      required: true,
    },
    {
      name: 'textColor',
      type: 'text',
      label: 'Text Colour',
      admin: {
        components: { Field: '@/components/ThemeColorPicker#default' },
        description: 'Applied to all text inside the content block.',
      },
    },

    // ---------- IMAGE ----------
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
      required: true,
    },
    {
      name: 'imageFit',
      type: 'select',
      label: 'Image Fit',
      defaultValue: 'cover',
      options: [
        { label: 'Cover (crop to fill)', value: 'cover' },
        { label: 'Contain (letterbox)', value: 'contain' },
      ],
    },
    {
      name: 'imageMaxHeight',
      type: 'text',
      label: 'Image Max Height (CSS)',
      admin: {
        placeholder: 'e.g., 500px or 100%',
        description: 'Leave empty for auto height based on content.',
      },
    },

    // ---------- LAYOUT ----------
    {
      name: 'imagePosition',
      type: 'select',
      label: 'Image Position',
      defaultValue: 'right',
      options: [
        { label: 'Image on Right', value: 'right' },
        { label: 'Image on Left', value: 'left' },
      ],
    },

    // ---------- IMAGE OVERLAY (collapsible) ----------
    {
      name: 'enableOverlay',
      type: 'checkbox',
      label: 'Enable image overlay',
      defaultValue: false,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'overlayColor',
          type: 'text',
          label: false,
          admin: {
            width: '50%',
            condition: (_, siblingData) => siblingData?.enableOverlay,
            components: { Field: '@/components/ThemeColorPicker#default' },
          },
        },
        {
          name: 'overlayOpacity',
          type: 'number',
          label: 'Opacity',
          defaultValue: 0.3,
          min: 0,
          max: 1,
          admin: {
            width: '50%',
            condition: (_, siblingData) => siblingData?.enableOverlay,
            step: 0.05,
          },
        },
      ],
    },

    // ---------- ANIMATION ----------
    {
      name: 'enableAnimation',
      type: 'checkbox',
      label: 'Enable scroll animations',
      defaultValue: true,
    },
  ],
}
