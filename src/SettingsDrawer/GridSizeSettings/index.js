import { createElement } from '../../utils';
import Section from '../../sharedComponents/Section';
import InputWithLabel from '../../sharedComponents/InputWithLabel';
import styles from './styles.module.css';

const GridSizeSettings = (props) => (
  <Section title="Grid Size">
    <div ref={props.warningRef} className={styles.warning}></div>
    <InputWithLabel
      inputRef={props.inputRowsRef}
      label="Rows"
      id="rows"
      handleInput={props.handleInput}
    />
    <InputWithLabel
      inputRef={props.inputColsRef}
      label="Cols"
      id="cols"
      handleInput={props.handleInput}
    />
  </Section>
);

export default GridSizeSettings;
