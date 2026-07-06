export const ADMIN_UNLOCK_KEY = 'adminPortalUnlocked';
export const ADMIN_UNLOCK_CLICKS = 5;
export const ADMIN_UNLOCK_RESET_MS = 3000;

export const unlockAdminPortal = () => {
    sessionStorage.setItem(ADMIN_UNLOCK_KEY, 'true');
};

export const isAdminPortalUnlocked = () => {
    return sessionStorage.getItem(ADMIN_UNLOCK_KEY) === 'true';
};

export const lockAdminPortal = () => {
    sessionStorage.removeItem(ADMIN_UNLOCK_KEY);
};
