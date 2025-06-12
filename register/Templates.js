// Function to create participant template
function participantTemplate(count) {
  return `
    <section class="participant${count}">
      <p>Participant ${count}</p>
      <div class="item">
        <label for="fname${count}">First Name<span>*</span></label>
        <input id="fname${count}" type="text" name="fname${count}" required>
      </div>
      <div class="item activities">
        <label for="activities${count}">Activities<span>*</span></label>
        <select id="activities${count}" name="activities${count}" multiple>
          <option value="10">Swimming ($10)</option>
          <option value="15">Crafts ($15)</option>
          <option value="20">Dance ($20)</option>
          <option value="25">Music ($25)</option>
        </select>
        <p class="help-text">Hold Ctrl (or Cmd) to select multiple activities</p>
      </div>
      <div class="item">
        <label for="fee${count}">Fee ($)<span>*</span></label>
        <input id="fee${count}" type="number" name="fee${count}" readonly>
      </div>
      <div class="item">
        <label for="date${count}">Desired Date <span>*</span></label>
        <input id="date${count}" type="date" name="date${count}">
      </div>
      <div class="item">
        <p>Grade</p>
        <select id="grade${count}" name="grade${count}">
          <option selected value="" disabled></option>
          <option value="1">1st</option>
          <option value="2">2nd</option>
          <option value="3">3rd</option>
          <option value="4">4th</option>
          <option value="5">5th</option>
          <option value="6">6th</option>
          <option value="7">7th</option>
          <option value="8">8th</option>
          <option value="9">9th</option>
          <option value="10">10th</option>
          <option value="11">11th</option>
          <option value="12">12th</option>
        </select>
      </div>
    </section>
  `;
}

// Function to create success message template
function successTemplate(info) {
  return `
    Thank you ${info.name} for registering. You have registered ${info.participants} participants and owe $${info.fees} in Fees.
  `;
}

// Export the template functions
export { participantTemplate, successTemplate };