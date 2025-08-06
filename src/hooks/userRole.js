import { useAuth } from "../contexts/AuthContext";

export const useRole = () => {
  const { user } = useAuth();

  const isSysAdmin = () => user?.role === "SysAdmin";
  const isCineAdmin = () => user?.role === "CineAdmin";
  const isUser = () => user?.role === "User";
  const isAdminOrAbove = () => isSysAdmin() || isCineAdmin();

  return {
    role: user?.role,
    isSysAdmin,
    isCineAdmin,
    isUser,
    isAdminOrAbove,
  };
};
