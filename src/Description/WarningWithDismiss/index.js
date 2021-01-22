import { createElement } from '../../utils';
import Warning from '../../shared/Warning';
import Button from '../../shared/Button';
import dismissIcon from '../../assets/x.svg';

const WarningWithDismiss = ({ rootRef, message }) => {
  const handleDismiss = function () {
    if (rootRef.current) {
      rootRef.current.innerHTML = '';
    }
    this.removeEventListener('click', handleDismiss);
  };

  return (
    <Warning message={message}>
      <Button
        style="smallIcon opacityChangeOnHover"
        handleClick={handleDismiss}
      >
        {dismissIcon}
        <span className="sr-only">Dismiss Warning</span>
      </Button>
    </Warning>
  );
};

export default WarningWithDismiss;
