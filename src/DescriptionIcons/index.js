import descriptionIcon from './DescriptionIcon';
import styles from './style.module.css';

class DescriptionIcons {
  template(icons) {
    const iconList = icons
      .map(
        (icon) =>
          `<li class="${styles.listItem}">
          ${descriptionIcon.template(icon)}
        </li>`
      )
      .join('');

    return `
      <ul class="${styles.iconList}">
        ${iconList}
      </ul>
    `;
  }
}

const descriptionIcons = new DescriptionIcons();
export default descriptionIcons;
