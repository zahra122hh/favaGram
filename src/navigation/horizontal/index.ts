// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    title: 'Loginauth',
    path: '/loginauth/sendcode',
    icon: 'mdi:home-outline',
  },
  {
    title: 'Home',
    path: '/home',
    icon: 'mdi:home-outline',
  },
  {
    title: 'Login',
    path: '/auth/login',
    icon: 'mdi:lock-outline',
  },
  {
    title: 'Users',
    path: '/users',
    icon: 'mdi:account-outline',
  },
  {
    title: 'Post',
    path: '/employee',
    icon: 'mdi:transit-connection-horizontal',
  },
  {
    title: 'Calendar',
    path: '/calendar',
    icon: 'mdi:calendar-blank-outline',
  },
  {
    title: 'Second Page',
    path: '/second-page',
    icon: 'mdi:email-outline',
  },
  {
    path: '/acl',
    action: 'read',
    subject: 'acl-page',
    title: 'Access Control',
    icon: 'mdi:shield-outline',
  },
]

export default navigation
