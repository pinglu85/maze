import { createElement } from '../../utils';
import Section from '../../shared/Section';
import InputWithLabel from '../../shared/InputWithLabel';
import styles from './styles.module.css';

const GridSizeSetting = (props) => (
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

export default GridSizeSetting;
