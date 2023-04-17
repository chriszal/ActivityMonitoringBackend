import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import AcademicCapIcon from '@heroicons/react/24/solid/AcademicCapIcon';
import { SvgIcon } from '@mui/material';

export const items = [

 {
    title: 'My Studies',
    path: '/dashboard/studies',
    icon: (
      <SvgIcon fontSize="small">
        <AcademicCapIcon />
      </SvgIcon>
    )
  }, {
    title: 'Account',
    path: '/dashboard/account',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  }

];
