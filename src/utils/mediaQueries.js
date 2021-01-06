export const checkIsMobile = () => {
  return window.matchMedia('(max-width: 576px)').matches;
};

export const checkIsTablet = () => {
  return window.matchMedia('(min-width: 577px) and (max-width: 768px)').matches;
};

export const checkIsBigTablet = () => {
  return window.matchMedia('(min-width: 769px) and (max-width: 1024px)')
    .matches;
};
