const warningDiv = document.getElementById('warning');
const warningMessage = document.getElementById('warning-message');
const dismissBtn = document.getElementById('dismiss-btn');

const MESSAGE = 'You did not';

function generateMessage(content) {
  switch (content) {
    case 'rows':
    case 'columns':
      return `${MESSAGE} enter a valid number for ${content}.`;
    case 'algorithm':
      return `${MESSAGE} select an ${content}.`;
    case 'maze':
      return `${MESSAGE} generate a ${content}.`;
    default:
      return '';
  }
}

function showWarning(content) {
  warningDiv.classList.add('is-active');
  warningMessage.textContent = generateMessage(content);
  dismissBtn.addEventListener('click', hideWarning);
}

function hideWarning() {
  warningDiv.classList.remove('is-active');
  warningMessage.textContent = '';
  dismissBtn.removeEventListener('click', hideWarning);
}

export default showWarning;
