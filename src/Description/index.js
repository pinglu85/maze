import descriptionIcons from '../DescriptionIcons';
import algoDescriptions from './algoDescriptions';
import styles from './style.module.css';

class Description {
  constructor() {
    this.root = document.getElementById('description');
    this.visualizeBtn = null;
  }

  render = (algo, handleVisualize) => {
    if (algo === '') {
      this.root.innerHTML = `
        <div class="${styles.encouragement}">
          Pick a maze algorithm and visualize it!
        </div>
      `;
      return;
    }

    this.root.innerHTML = this._template(algo);
    this.visualizeBtn = this.root.querySelector('#visualize-btn');
    this.visualizeBtn.addEventListener('click', () => {
      handleVisualize(algo);
    });
  };

  _template(algo) {
    const algoDescription = algoDescriptions[algo];
    const btnLabel = algo === 'Open Grid' ? 'Open Grid' : 'Visualize';

    return `
      <div class="${styles.description}">
        ${descriptionIcons.template(algoDescription.icons)}
        <div class="${styles.text}">${algoDescription.text}</div>
        <div class="${styles.actions}">
          <button type="button" class="btn btn--primary" id="visualize-btn">
            ${btnLabel}
          </button>
        </div>
      </div>
    `;
  }
}

const description = new Description();
export default description;
