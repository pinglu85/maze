import styles from './style.module.css';

class DescriptionIcon {
  template({ label, bgColor, borderColor, iconSrc = null, iconSize = null }) {
    const icon = iconSrc ? `<img src="${iconSrc}" />` : '';
    let iconStyles = styles.icon;

    if (iconSize === 'big') {
      iconStyles += ` ${styles.iconBig}`;
    }

    return `
      <div class="${styles.descriptionIcon}">
        <div 
          class="${iconStyles}" 
          style="background:${bgColor}; border-color:${borderColor};"
        >
          ${icon}
        </div>
        <div class="${styles.label}">${label}</div>
      </div>
    `;
  }
}

const descriptionIcon = new DescriptionIcon();
export default descriptionIcon;
