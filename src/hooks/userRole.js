import { useAuth } from "../contexts/AuthContext";
import { USER_ROLES } from '../data/cinema.consts';

export const useRole = () => {
  const { user } = useAuth();

  const isSysAdmin = () => user?.role === USER_ROLES.SYS_ADMIN;
  const isCineAdmin = () => user?.role === USER_ROLES.CINE_ADMIN;
  const isUser = () => user?.role === USER_ROLES.USER;
  const isAdminOrAbove = () => isSysAdmin() || isCineAdmin();

  return {
    role: user?.role,
    isSysAdmin,
    isCineAdmin,
    isUser,
    isAdminOrAbove,
  };
};
