export default function checkDevice() {
  if (window.matchMedia('(max-width: 576px)').matches) {
    return 'mobile';
  }

  if (window.matchMedia('(min-width: 577px) and (max-width: 768px)').matches) {
    return 'tablet';
  }

  if (window.matchMedia('(min-width: 769px) and (max-width: 1024px)').matches) {
    return 'bigTablet';
  }

  return 'desktop';
}
