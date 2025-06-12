
// Import template functions from Templates.js
import { participantTemplate, successTemplate } from './Templates.js';

// Initialize participant count
let participantCount = 1;

// Function to calculate total fees
function totalFees() {
  let feeElements = document.querySelectorAll("[id^=fee]");
  feeElements = [...feeElements];
  return feeElements.reduce((total, element) => {
    return total + Number(element.value || 0);
  }, 0);
}

// Add participant button handler
document.getElementById('addParticipant').addEventListener('click', () => {
  participantCount++;
  const newParticipant = participantTemplate(participantCount);
  document.getElementById('addParticipant').insertAdjacentHTML('beforebegin', newParticipant);
});

// Replace the first participant with our template when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const firstParticipant = participantTemplate(1);
  document.querySelector('.participant1').outerHTML = firstParticipant;
});

// Form submission handler
document.getElementById('registrationForm').addEventListener('submit', (event) => {
  event.preventDefault();
  
  const adultName = document.getElementById('adult_name').value;
  const totalFee = totalFees();
  
  const formElement = document.getElementById('registrationForm');
  const summaryElement = document.getElementById('summary');
  
  formElement.style.display = 'none';
  summaryElement.style.display = 'block';
  
  summaryElement.innerHTML = successTemplate({
    name: adultName,
    participants: participantCount,
    fees: totalFee
  });
});

// Activity selection handler to update fees
document.addEventListener('change', (event) => {
  if (event.target.id.startsWith('activities')) {
    const participantNum = event.target.id.replace('activities', '');
    const feeInput = document.getElementById(`fee${participantNum}`);
    const selectedOptions = [...event.target.selectedOptions];
    
    const total = selectedOptions.reduce((sum, option) => {
      return sum + Number(option.value);
    }, 0);
    
    feeInput.value = total;
  }
});

