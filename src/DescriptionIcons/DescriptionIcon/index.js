import styles from './style.module.css';

class DescriptionIcon {
  template({ label, bgColor, borderColor, icon = null, iconSize = '' }) {
    return `
      <div class="${styles.descriptionIcon}">
        <div 
          class="${styles.icon} ${iconSize ? styles[iconSize] : ''}" 
          style="background:${bgColor}; border-color:${borderColor};"
        >
          ${icon || ''}
        </div>
        <div class="${styles.label}">${label}</div>
      </div>
    `;
  }
}

const descriptionIcon = new DescriptionIcon();
export default descriptionIcon;
