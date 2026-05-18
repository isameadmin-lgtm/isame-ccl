import type { CollectionConfig } from 'payload'

export const Forms: CollectionConfig = {
  slug: 'forms',
  labels: {
    singular: 'Form',
    plural: 'Forms',
  },
  admin: {
    useAsTitle: 'title',
  },
  // @ts-ignore – localization works but isn't in the type for this version
  localization: true,
}
