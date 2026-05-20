import type { Block } from 'payload'

export const TrustBadgesBlock: Block = {
  slug: 'trust-badges',
  labels: {
    singular: 'Trust Badges',
    plural: 'Trust Badges',
  },
  fields: [
    // ============================================================
    // 🎨 SECTION‑WIDE COLOUR ROW (at the very top)
    // ============================================================
    {
      type: 'row',
      fields: [
        {
          name: 'backgroundColor',
          type: 'text',
          label: false, // swatch only
          admin: {
            width: '50%',
            components: { Field: '@/components/ThemeColorPicker#default' },
            description: 'Background colour for the entire section.',
          },
        },
        {
          name: 'textColor',
          type: 'text',
          label: false,
          admin: {
            width: '50%',
            components: { Field: '@/components/ThemeColorPicker#default' },
            description: 'Default text colour for all badges. Overridable per badge.',
          },
        },
      ],
    },

    // ============================================================
    // 🏷️ BADGES ARRAY
    // ============================================================
    {
      name: 'badges',
      type: 'array',
      label: 'Badges',
      minRows: 1,
      maxRows: 6,
      fields: [
        // ── Icon row: icon selector + icon colour swatch ──
        {
          type: 'row',
          fields: [
            {
              name: 'icon',
              type: 'select',
              label: 'Icon',
              options: [
                { label: 'Users', value: 'users' },
                { label: 'Shield', value: 'shield' },
                { label: 'Globe', value: 'globe' },
                { label: 'Star', value: 'star' },
                { label: 'Heart', value: 'heart' },
                { label: 'Award', value: 'award' },
                { label: 'Badge Check', value: 'badgeCheck' },
                { label: 'Thumbs Up', value: 'thumbsUp' },
                { label: 'Briefcase', value: 'briefcase' },
                { label: 'Handshake', value: 'handshake' },
              ],
              required: true,
              admin: { width: '60%' },
            },
            {
              name: 'iconColor',
              type: 'text',
              label: false,
              admin: {
                width: '40%',
                components: { Field: '@/components/ThemeColorPicker#default' },
              },
            },
          ],
        },

        // ── Text row: badge text + text colour override ──
        {
          type: 'row',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Badge Text',
              localized: true,
              required: true,
              admin: { width: '70%' },
            },
            {
              name: 'textColor',
              type: 'text',
              label: false,
              admin: {
                width: '30%',
                components: { Field: '@/components/ThemeColorPicker#default' },
              },
            },
          ],
        },
      ],
    },

    // ============================================================
    // 📐 COLUMNS
    // ============================================================
    {
      name: 'columns',
      type: 'select',
      label: 'Columns (Desktop)',
      defaultValue: '4',
      options: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
      ],
    },
  ],
}
