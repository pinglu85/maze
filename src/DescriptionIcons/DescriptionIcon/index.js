import styles from './style.module.css';

class DescriptionIcon {
  template({ label, bgColor, borderColor, iconSrc = null }) {
    const icon = iconSrc ? `<img src="${iconSrc}" />` : '';

    return `
      <div class="${styles.descriptionIcon}">
        <div class="${styles.icon}" style="background:${bgColor}; border-color:${borderColor};">
          ${icon}
        </div>
        <div class="${styles.label}">${label}</div>
      </div>
    `;
  }
}

const descriptionIcon = new DescriptionIcon();
export default descriptionIcon;
