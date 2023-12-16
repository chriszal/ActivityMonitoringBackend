import UserCircleIcon from '@heroicons/react/24/solid/UserCircleIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import AcademicCapIcon from '@heroicons/react/24/solid/AcademicCapIcon';
import { SvgIcon } from '@mui/material';
import QuestionMarkCircleIcon from '@heroicons/react/24/solid/QuestionMarkCircleIcon';
import PhotoIcon from '@heroicons/react/24/solid/PhotoIcon';
import UserGroupIcon from '@heroicons/react/24/solid/UserGroupIcon';
import ClipboardDocumentListIcon from '@heroicons/react/24/solid/ClipboardDocumentListIcon';
import CalendarDaysIcon from '@heroicons/react/24/solid/CalendarDaysIcon';
 

export const getMemberItems = (study_id) => [

 {
    title: 'Study Overview',
    path: `/dashboard/studies/${study_id}/view`,
    icon: (
      <SvgIcon fontSize="small">
        <AcademicCapIcon />
      </SvgIcon>
    )
  }, 
  {
    title: 'Participants',
    path: `/dashboard/studies/${study_id}/participants`,
    icon: (
      <SvgIcon fontSize="small">
        <UserGroupIcon />
      </SvgIcon>
    )
  }, 
  {
    title: 'Quessionaires',
    path: `/dashboard/studies/${study_id}/quessionaires`,
    icon: (
      <SvgIcon fontSize="small">
        <ClipboardDocumentListIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Schedule',
    path: `/dashboard/studies/${study_id}/schedule`,
    icon: (
      <SvgIcon fontSize="small">
        <CalendarDaysIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Meal Gallery',
    path: `/dashboard/studies/${study_id}/meal-gallery`,
    icon: (
      <SvgIcon fontSize="small">
        <PhotoIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Account',
    path: '/dashboard/account',
    icon: (
      <SvgIcon fontSize="small">
        <UserCircleIcon />
      </SvgIcon>
    )
  }

];

export const supportItem = {
  title: 'Contact Support',
  path: '/dashboard/contact-support',
  icon: (
    <SvgIcon fontSize="small">
      <QuestionMarkCircleIcon />
    </SvgIcon>
  )
};
