module.exports = {
  async rewrites() {
    return [
      {
        source: '/admin-dashboard',
        destination: '/admin-dashboard/users',
      },
      {
        source: '/admin-dashboard/:tab(users|studies)',
        destination: '/admin-dashboard/:tab',
      },
      {
        source: '/admin-dashboard/:tab(users|studies)/create',
        destination: '/admin-dashboard/:tab/create',
      },
      {
        source: '/admin-dashboard/:tab(users|studies)/:id/edit',
        destination: '/admin-dashboard/:tab/:id/edit',
      },
      {
        source: '/admin-dashboard/:tab(users|studies)/:id/view',
        destination: '/admin-dashboard/:tab/:id/view',
      },
      {
        source: '/dashboard',
        destination: '/dashboard/studies',
      },
    ]
  },
}
