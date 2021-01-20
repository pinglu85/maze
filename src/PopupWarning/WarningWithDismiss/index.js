import { createElement } from '../../utils';
import Warning from '../../shared/Warning';
import Button from '../../shared/Button';
import dismissIcon from '../../assets/x.svg';

const WarningWithDismiss = ({ message, handleDismiss }) => (
  <Warning message={message}>
    <Button style="smallIcon opacityChangeOnHover" handleClick={handleDismiss}>
      {dismissIcon}
      <span className="sr-only">Dismiss Warning</span>
    </Button>
  </Warning>
);

export default WarningWithDismiss;
