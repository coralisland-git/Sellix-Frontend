const user = window.localStorage.getItem('userId')

export const adminNavigation =  {
  items: [
    {
      name: 'Dashboard',
      url: `/admin/dashboard`,
      icon: 'fas fa-home fa-lg'
    },
    {
      name: 'Users',
      url: `/admin/users`,
      icon: 'fas fa-users',
    },
    {
      name: 'Top 50 users',
      url: `/admin/top`,
      icon: 'fas fa-star',
    },
    {
      name: 'Settings',
      url: `/admin/settings`,
      icon: 'fas fa-cog',
    },
    {
      name: 'Invoices',
      url: `/admin/invoices`,
      icon: 'fas fa-credit-card',
    },
    {
      name: 'Changelog',
      url: `/admin/changelog`,
      icon: 'fas fa-wrench',
    },
    
  ]
}

export const mainBrowserNavigation = () => {

  let { pathname } = window.location;

  return {
    items: [
      {
        name: 'Dashboard',
        url: `/dashboard/${user}/home`,
        icon: 'fas fa-home fa-lg'
      },
      {
        name: 'Products',
        url:
            pathname === `/dashboard/${user}/groups` && `/dashboard/${user}/groups` ||
            pathname.includes(`/dashboard/${user}/groups/new`) && `/dashboard/${user}/groups/new` ||
            pathname.includes(`/dashboard/${user}/groups/edit`) && `/dashboard/${user}/groups/edit` ||
            pathname === `/dashboard/${user}/products` && `/dashboard/${user}/products` ||
            pathname.includes(`/dashboard/${user}/products/new`) && `/dashboard/${user}/products/new` ||
            pathname.includes(`/dashboard/${user}/products/edit`) && `/dashboard/${user}/products/edit` ||
            pathname === `/dashboard/${user}/categories` && `/dashboard/${user}/categories` ||
            pathname.includes(`/dashboard/${user}/categories/new`) && `/dashboard/${user}/categories/new` ||
            pathname.includes(`/dashboard/${user}/categories/edit`) && `/dashboard/${user}/categories/edit` ||
            pathname === `/dashboard/${user}/sort/groups` && `/dashboard/${user}/sort/groups` ||
            pathname === `/dashboard/${user}/sort/products` && `/dashboard/${user}/sort/products` ||
            pathname === `/dashboard/${user}/sort/categories` && `/dashboard/${user}/sort/categories`,
        icon: 'fas fa-boxes',
        children: [
          {
            name: 'All Products',
            url: `/dashboard/${user}/products`
          },
          {
            name: 'Groups',
            url: `/dashboard/${user}/groups`,
          },
          {
            name: 'Categories',
            url: `/dashboard/${user}/categories`,
          },
          {
            name: 'Sort Products',
            url: `/dashboard/${user}/sort/products`,
          },
          {
            name: 'Sort Categories',
            url: `/dashboard/${user}/sort/categories`,
          },
          {
            name: 'Sort Groups',
            url: `/dashboard/${user}/sort/groups`,
          },
        ]
      },
      {
        name: 'Orders',
        url: `/dashboard/${user}/orders`,
        icon: 'fas fa-credit-card',
      },
      {
        name: 'Analytics',
        url: `/dashboard/${user}/analytics`,
        icon: 'fas fa-chart-bar',
        children: [
          {
            name: 'All Analytics',
            url: `/dashboard/${user}/analytics/stats`,
          },
          {
            name: 'Reports',
            url: `/dashboard/${user}/analytics/reports`,
          },
        ]
      },
      {
        name: 'Coupons',
        url: `/dashboard/${user}/coupons`,
        icon: 'fas fa-tags',
      },
      {
        name: 'Queries',
        url: `/dashboard/${user}/queries`,
        icon: 'fas fa-question-circle',
      },
      {
        name: 'Feedback',
        url: `/dashboard/${user}/feedback`,
        icon: "fas fa-comment-dots",
      },
      {
        name: 'Blacklist',
        url: `/dashboard/${user}/blacklist`,
        icon: 'fas fa-ban',
      },
      {
        name: 'Developer',
        url: `/dashboard/${user}/developer`,
        icon: 'fas fa-code',
        children: [
          {
            name: 'Documentation',
            url: `/documentation`,
            attributes: { 
              target: '_blank', 
              rel: "documentation"
            }
          },
          {
            name: 'Embed Products',
            url: `/dashboard/${user}/developer/embed`,
          },
          {
            name: 'Webhooks',
            url: `/dashboard/${user}/developer/webhooks/all`,
          },
          {
            name: 'Webhook Logs',
            url: `/dashboard/${user}/developer/webhooks/logs`,
          }
        ]
      },
      // {
      //   name: 'Pages',
      //   url: `/dashboard/${user}/pages`,
      //   icon: 'far fa-file',
      // }
    ]
  }
}


export const mainMobileNavigation = () => ({
  items: [
    {
      name: 'Dashboard',
      url: `/dashboard/${user}/home`,
      icon: 'fas fa-home fa-lg'
    },
    {
      name: 'Products',
      url: window.location.pathname,
      icon: 'fas fa-boxes',
      children: [
        {
          name: 'All Products',
          url: `/dashboard/${user}/products`
        },
        {
          name: 'Groups',
          url: `/dashboard/${user}/groups`
        },
        {
          name: 'Categories',
          url: `/dashboard/${user}/categories`,
        }
      ]
    },
    {
      name: 'Orders',
      url: `/dashboard/${user}/orders`,
      icon: 'fas fa-credit-card',
    },
    {
      name: 'Analytics',
      url: `/dashboard/${user}/analytics`,
      icon: 'fas fa-chart-bar',
      children: [
        {
          name: 'All Analytics',
          url: `/dashboard/${user}/analytics/stats`,
        },
        {
          name: 'Reports',
          url: `/dashboard/${user}/analytics/reports`,
        },
      ]
    },
    {
      name: 'Coupons',
      url: `/dashboard/${user}/coupons`,
      icon: 'fas fa-tags',
    },
    {
      name: 'Queries',
      url: `/dashboard/${user}/queries`,
      icon: 'fas fa-question-circle',
    },
    {
      name: 'Feedback',
      url: `/dashboard/${user}/feedback`,
      icon: "fas fa-comment-dots",
    },
    {
      name: 'Blacklist',
      url: `/dashboard/${user}/blacklist`,
      icon: 'fas fa-ban',
    },
    {
      name: 'Developer',
      url: `/dashboard/${user}/developer`,
      icon: 'fas fa-code',
      children: [
        {
          name: 'Webhooks',
          url: `/dashboard/${user}/developer/webhooks`,
        },
        {
          name: 'Webhook Logs',
          url: `/dashboard/${user}/developer/webhooks/logs`,
        }
      ]
    }
  ]
})
