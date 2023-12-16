import { AuthGuard } from 'src/guards/auth-guard';
import { useRouter } from 'next/router';

const ADMIN_ROLES = ["admin"];
const MEMBER_ROLES = ["admin", "member"];

const roles = {
  "/admin-dashboard": ADMIN_ROLES,
  "/admin-dashboard/users": ADMIN_ROLES,
  "/admin-dashboard/users/create": ADMIN_ROLES,
  "/admin-dashboard/users/[username]/edit": ADMIN_ROLES,
  "/admin-dashboard/studies": ADMIN_ROLES,
  "/admin-dashboard/studies/create": ADMIN_ROLES,
  "/admin-dashboard/studies/[study_id]/edit": ADMIN_ROLES,
  "/admin-dashboard/studies/[study_id]/view": ADMIN_ROLES,
  "/admin-dashboard/studies/[study_id]/participants": ADMIN_ROLES,
  "/admin-dashboard/studies/[study_id]/participants/[participant_id]": ADMIN_ROLES,
  "/admin-dashboard/account": ADMIN_ROLES,
  "/dashboard": MEMBER_ROLES,
  "/dashboard/account": MEMBER_ROLES,
  "/dashboard/notifications": MEMBER_ROLES,
  "/dashboard": MEMBER_ROLES,
  "/dashboard/create": MEMBER_ROLES,
  "/dashboard/studies/[study_id]/view": MEMBER_ROLES,
  "/dashboard/studies/[study_id]/participants": MEMBER_ROLES,
  "/dashboard/studies/[study_id]/participants/[participant_id]": MEMBER_ROLES,
  "/404": MEMBER_ROLES
};

export const withAuthGuard = (Component) => {
  const WrappedComponent = (props) => {
    const router = useRouter();
    const allowedRoles = roles[router.pathname] || [];

    return (
      <AuthGuard allowedRoles={allowedRoles}>
        <Component {...props} />
      </AuthGuard>
    );
  };

  return WrappedComponent;
};
