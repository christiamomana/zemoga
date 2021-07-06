export const postsSchema: any = {
  name: 'posts',
  properties: {
    id: { type: 'int', default: -1 },
    description: 'string',
    read: 'bool',
    favorite: 'bool',
  },
}

export const commentsSchema: any = {
  name: 'comments',
  properties: {
    id: { type: 'int', default: -1 },
    body: 'string',
    postId: 'int',
  },
}

export const profilesSchema: any = {
  name: 'profiles',
  properties: {
    id: { type: 'int', default: -1 },
    name: 'string',
    email: 'string',
    phone: 'string',
    website: 'string',
  },
}