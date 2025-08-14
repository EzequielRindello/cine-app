export const roleMap = {
  User: 1,
  CineAdmin: 2,
  SysAdmin: 3,
};

export const mapRoleToId = (role) => {
  return typeof role === "string" ? roleMap[role] : role;
};
