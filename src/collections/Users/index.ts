import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { isAdmin } from '../../access/isAdmin'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name',
  },
  auth: {
    tokenExpiration: 7200, // 2 hours – you can increase this if you want longer sessions
    // ✅ Netlify‑safe cookie settings
    cookies: {
      sameSite: 'Lax', // works on all Netlify domains
      secure: true, // HTTPS is always on Netlify
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      defaultValue: [],
      access: {
        // Only admins can update roles – your user already has 'admin', so this is fine
        update: ({ req: { user } }) => user?.roles?.includes('admin') ?? false,
        create: ({ req: { user } }) => user?.roles?.includes('admin') ?? false,
      },
    },
  ],
  timestamps: true,
}
