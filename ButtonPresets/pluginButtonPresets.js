/*
    Button Presets v1.0.1 by AAD
    https://github.com/AmateurAudioDude
*/

// ###################################### Start of migration code ######################################

// Check if "buttonPresets" exists in localStorage
const oldStorageKey = 'buttonPresets';
const newStorageKey = 'buttonPresetsA';

// Function to migrate old presets to new bank A
function migratePresets() {
  const oldData = JSON.parse(localStorage.getItem(oldStorageKey));

  if (oldData) {
    // Import old data to "buttonPresetsA"
    localStorage.setItem(newStorageKey, JSON.stringify(oldData));
    
    // Remove the old key from localStorage
    localStorage.removeItem(oldStorageKey);
  }
}

// Migrate presets on script load
migratePresets();

// ###################################### End of migration code ######################################

// Create a style element
var styleButtonPresets = document.createElement('style');
styleButtonPresets.innerHTML = `
  /* Force hide dropdown menu in portrait mode */
  @media only screen and (max-width: 768px) {
      #button-presets-bank-dropdown {
          display: none !important;
      }
  }

  @media only screen and (min-width: 960px) {
    .button-presets {
      margin-top: -12px;
    }
  }

  @media only screen and (min-height: 861px) {
    .button-presets {
      margin-top: 20px;
    }
  }

  @media only screen and (max-width: 800px) {
    .button-presets {
      margin-bottom: 24px;
    }
    #button-preset-ps {
      font-size: 0.8em;
    }
  }

  /* Correct tooltips for mobile devices in portrait mode */
  @media only screen and (max-width: 480px) {
    #setFrequencyButton5::after,
    #setFrequencyButton6::after,
    #setFrequencyButton7::after,
    #setFrequencyButton8::after,
    #setFrequencyButton9::after {
      top: 120%;
      bottom: inherit !important;
    }
  }

  /* Tooltip styling */
  .tooltip-presets {
    position: relative;
    flex-grow: .1;
    margin: 0 4px;
  }

  .tooltip-presets::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 120%;
    left: 50%;
    transform: translateX(-50%);
    padding: 6px 26px;
    background-color: var(--color-3);
    color: #efeffe;
    border-radius: 15px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s;
    pointer-events: none;
    z-index: 1;
  }

  .tooltip-presets:hover::after {
    opacity: .99;
    visibility: visible;
  }

  .tooltip-presets[data-tooltip=""]::after {
    display: none;
  }
`;

// Append the style to the head of the document
document.head.appendChild(styleButtonPresets);

var tooltipFirstLoad = false; // TODO: is it needed?
const DISPLAY_KEY = 'buttonPresetsHidden';

// Create a container for the buttons
var buttonContainer = document.createElement("div");
buttonContainer.id = "plugin-button-presets";
buttonContainer.classList.add('button-presets', 'flex-container', 'flex-center', 'show-phone');
buttonContainer.style.display = "flex";
buttonContainer.style.flexWrap = "wrap";
buttonContainer.style.gap = "4px";
buttonContainer.style.marginLeft = "6px";
buttonContainer.style.marginRight = "6px";

// Function to get stored button values and data-ps values from localStorage
function getStoredData(bank) {
  const key = `buttonPresets${bank}`;
  return JSON.parse(localStorage.getItem(key)) || { values: Array(10).fill(87.5), ps: Array(10).fill('') };
}

// Function to save button values and data-ps values to localStorage
function saveToLocalStorage(bank, values, ps) {
  const key = `buttonPresets${bank}`;
  localStorage.setItem(key, JSON.stringify({ values: values, ps: ps }));
}

// Default to Bank A
let currentBank = 'A';

// Create a custom dropdown menu
var dropdownContainer = document.createElement('div');
dropdownContainer.classList.add('panel-50', 'w-50', 'no-bg', 'h-100', 'm-0', 'dropdown', 'hide-phone');
dropdownContainer.id = 'button-presets-bank-dropdown'; // Dropdown ID

var dropdownInput = document.createElement('input');
dropdownInput.type = 'text';
dropdownInput.placeholder = 'Bank A'; // Bank text
dropdownInput.readOnly = true;
dropdownInput.tabIndex = 0;
dropdownContainer.appendChild(dropdownInput);

var dropdownOptions = document.createElement('ul');
dropdownOptions.classList.add('options', 'open-top');
dropdownOptions.tabIndex = -1;
['A', 'B', 'C'].forEach(bank => {
  var option = document.createElement('li');
  option.classList.add('option');
  option.dataset.value = bank;
  option.tabIndex = 0;
  option.textContent = `Bank ${bank}`; // Bank text
  dropdownOptions.appendChild(option);
});
dropdownContainer.appendChild(dropdownOptions);

// Toggle dropdown options visibility
dropdownInput.addEventListener('click', function() {
  dropdownOptions.classList.toggle('opened');
});

// Update bank and input value when an option is selected
dropdownOptions.addEventListener('click', function(event) {
  if (event.target && event.target.matches('li.option')) {
    currentBank = event.target.dataset.value;
    dropdownInput.value = `Bank ${currentBank}`; // Bank text
    updateButtons(); // Update the buttons when the bank changes
    dropdownOptions.classList.remove('opened');
  }
});

// Insert the dropdown menu before the specified element
var targetElement = document.querySelector('.panel-50.no-bg.br-0.h-100.m-0.button-ims');
if (targetElement) {
  targetElement.parentNode.insertBefore(dropdownContainer, targetElement);
}

// Optional: Hide dropdown menu when clicking outside
document.addEventListener('click', function(event) {
  if (!dropdownContainer.contains(event.target)) {
    dropdownOptions.classList.remove('opened');
  }
});

// Update buttons based on the selected bank
function updateButtons() {
  buttonContainer.innerHTML = ''; // Clear existing buttons
  const storedData = getStoredData(currentBank);
  const buttonValues = storedData.values;
  const psValues = storedData.ps;

  for (let i = 0; i < 10; i++) {
    (function(index) {
      var button = document.createElement("button");
      button.id = `setFrequencyButton${index}`;
      button.classList.add('tooltip-presets', 'tooltip-presets-once');
      button.setAttribute('data-tooltip', psValues[index]);
      button.style.minWidth = "60px";
      button.style.width = "8%";
      button.style.height = "48px";

      updateButton(button, buttonValues[index], index);

      button.addEventListener('click', function() {
        var commandInput = document.getElementById('commandinput');
        const presetInput = buttonValues[index];

        if (socket.readyState === WebSocket.OPEN) {
          tuneTo(presetInput);
        }
        checkBankASum();
      });

      button.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        var dataFrequencyElement = document.getElementById('data-frequency');
        var dataPsElement = document.getElementById('data-ps');
        var dataFrequency = dataFrequencyElement ? dataFrequencyElement.textContent : '87.5';
        var dataPs = dataPsElement ? dataPsElement.textContent : '';

        buttonValues[index] = parseFloat(dataFrequency) || 87.5;
        psValues[index] = dataPs;
        updateButton(button, buttonValues[index], index);
        checkBankASum();
      });

      button.addEventListener('mousedown', function(e) {
        if (e.button === 1 || e.ctrlKey || (e.shiftKey && e.button === 0)) {
          if (e.button === 1 || (e.shiftKey && e.button === 0)) {
            buttonValues[index] = 87.5;
            psValues[index] = '';
          } else if (e.ctrlKey) {
            var dataFrequencyElement = document.getElementById('data-frequency');
            var dataPsElement = document.getElementById('data-ps');
            var dataFrequency = dataFrequencyElement ? dataFrequencyElement.textContent : '87.5';
            var dataPs = dataPsElement ? dataPsElement.textContent : '';

            buttonValues[index] = parseFloat(dataFrequency) || 87.5;
            psValues[index] = dataPs;
          }
          updateButton(button, buttonValues[index], index);
          checkBankASum();
        }
      });

      function updateButton(button, value, index) {
        const psValue = psValues[index];
        const displayText = psValue ? `${formatValue(value).trim()}<span id="button-preset-ps" style="display: block; margin-top: -2px; white-space: nowrap; overflow: hidden; font-weight: 600;">${psValue.trim()}</span>` : formatValue(value).trim();
        button.innerHTML = displayText;
        button.setAttribute('data-tooltip', psValue.trim());
        saveToLocalStorage(currentBank, buttonValues, psValues);
      }

      function formatValue(value) {
        const fixedValue = value.toFixed(2);
        return fixedValue.endsWith('0') ? fixedValue.slice(0, -1) : fixedValue;
      }

      buttonContainer.appendChild(button);
    })(i);
  }
}

// Set default bank to A and update buttons on load
currentBank = 'A';
updateButtons();

// Find the container to insert the button container after
var container = document.querySelector('#wrapper-outer #wrapper .flex-container');

// Insert the button container after the container
if (document.getElementById('rt-container')) {
    container.parentNode.insertBefore(buttonContainer, container.nextSibling);
}

// Function to toggle the visibility of the button container
function toggleButtonContainer() {
    // Check the localStorage value
    const isHidden = JSON.parse(localStorage.getItem(DISPLAY_KEY)) == true;
    if (isHidden) {
        var element = document.getElementById('plugin-button-presets');
        element.style.setProperty('display', 'none');
        document.getElementById('button-presets-bank-dropdown').style.display = 'none';
        var infoIconContainer = document.getElementById('button-presets-info-icon-container');
        if (infoIconContainer) {
            infoIconContainer.style.display = 'none';
        }
    } else {
        var element = document.getElementById('plugin-button-presets');
        element.style.setProperty('display', 'flex');
        if (window.innerWidth >= 768) { document.getElementById('button-presets-bank-dropdown').style.display = 'block'; }
        var infoIconContainer = document.getElementById('button-presets-info-icon-container');
        if (infoIconContainer) {
            infoIconContainer.style.display = 'flex';
        }
        checkBankASum();
    }
}

// Initial tooltip
function oncePresetTooltips() {
    $('.tooltip-presets-once').hover(function(e){
        // Never display again after first click
        if (tooltipFirstLoad == true) { return; } else { tooltipFirstLoad = true; }
        $(document).on('mousedown', () => { clearTimeout($(this).data('timeout')); return; });
        if (!document.querySelector('.tooltip-presets-once')) { return; }
        if (!/Mobi|Android|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)) {
            var tooltipText = `
            <strong><i>Left-click</i></strong> to recall the preset.<br>
            <strong><i>Right-click</i></strong> or <strong><i>CTRL+click</i></strong> to store the preset.<br>
            <strong><i>Middle-click</i></strong> or <strong><i>SHIFT+click</i></strong> to reset the preset.<br>
            <strong>Stored presets do not affect other browsers.</strong>
            `;
        } else {
            var tooltipText = `
            Tap to recall the preset.<br>
            Long press to store the preset.<br>
            <strong>Stored presets do not affect other browsers.</strong>
            `;
        }
        // Add a delay of 500 milliseconds before creating and appending the tooltip
        $(this).data('timeout', setTimeout(() => {
            var tooltip = $('<div class="tooltiptext"></div>').html(tooltipText);
            $('body').append(tooltip);

            var posX = e.pageX;
            var posY = e.pageY;

            var tooltipWidth = tooltip.outerWidth();
            var tooltipHeight = tooltip.outerHeight();
            posX -= tooltipWidth / 2;
            posY -= tooltipHeight + 10;
            tooltip.css({ top: posY, left: posX, opacity: .99 }); // Set opacity to 1
            // For touchscreen devices
            if ((/Mobi|Android|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)) && ('ontouchstart' in window || navigator.maxTouchPoints)) {
                setTimeout(() => { $('.tooltiptext').remove(); }, 10000);
                document.addEventListener('touchstart', function() { setTimeout(() => { $('.tooltiptext').remove(); }, 500); });
            }
        }, 500));
    }, function() {
        // Clear the timeout if the mouse leaves before the delay completes
        clearTimeout($(this).data('timeout'));
        $('.tooltiptext').remove();
    }).mousemove(function(e){
        var tooltipWidth = $('.tooltiptext').outerWidth();
        var tooltipHeight = $('.tooltiptext').outerHeight();
        var posX = e.pageX - tooltipWidth / 2;
        var posY = e.pageY - tooltipHeight - 10;

        $('.tooltiptext').css({ top: posY, left: posX });
    });
}

// #################### SIDE BAR MENU SETTINGS #################### \\

// ********** Display additional options in side menu **********
function AdditionalCheckboxesButtonPresets() {
    // Insert HTML after second element with class 'form-group checkbox'
    function insertHtmlAfterSecondCheckbox() {
        // Select all elements with class 'form-group checkbox'
        const checkboxes = document.querySelectorAll('.modal-panel-content .form-group.checkbox');
        
        // Check if there are at least two such elements
        if (checkboxes.length >= 2) {
            // Create new HTML element
            const newDiv = document.createElement('div');
            newDiv.className = 'form-group checkbox';
            newDiv.innerHTML = `
                <input type="checkbox" tabindex="0" id="hide-preset-buttons">
                <label for="hide-preset-buttons">Hide Preset Buttons</label>
            `;
            
            // Insert new element after second 'form-group checkbox'
            const secondCheckbox = checkboxes[1];
            secondCheckbox.insertAdjacentElement('afterend', newDiv);
        } else {
            console.warn('There are less than two elements with class "form-group checkbox".');
        }
    }
    insertHtmlAfterSecondCheckbox();

    var isButtonPresetsHidden = localStorage.getItem(DISPLAY_KEY);
    if (isButtonPresetsHidden === "true") {
        $("#hide-preset-buttons").prop("checked", true);
    }

    $("#hide-preset-buttons").change(function() {
        var isChecked = $(this).is(":checked");
        localStorage.setItem(DISPLAY_KEY, isChecked);
        toggleButtonContainer();
    });
}

// Display additional options in side menu and tooltips
AdditionalCheckboxesButtonPresets();
oncePresetTooltips();

// Function to check if all preset values in bank A add up to 875
function checkBankASum() {
    // Fetch values for bank A
    const storedData = getStoredData('A');
    const buttonValues = storedData.values;

    // Calculate the sum of all preset values
    const sum = buttonValues.reduce((acc, value) => acc + value, 0);

    // Check if the sum is equal to 875
    if (sum === 875) {
        showInfoIcon();
    } else {
        hideInfoIcon();
    }
}

// Function to execute when the sum is 875
function executeInfoCode() {
    // Create a new div for the info icon
    var infoIconContainer = document.createElement('div');
    infoIconContainer.id = 'button-presets-info-icon-container'; // Assign an ID for later use
    infoIconContainer.style.position = 'absolute';
    infoIconContainer.style.bottom = '60px';
    infoIconContainer.style.right = '36px';
    infoIconContainer.style.display = 'flex';
    infoIconContainer.style.flexDirection = 'column';
    infoIconContainer.style.alignItems = 'center';
    infoIconContainer.style.imageRendering = 'auto';

    // Create the FontAwesome info icon
    var infoIcon = document.createElement('i');
    infoIcon.id = 'info-icon'; // Assign an ID to the icon itself
    infoIcon.classList.add('fa-solid', 'fa-circle-question');
    infoIcon.style.fontSize = '20px';
    infoIcon.style.cursor = 'pointer';

    // Add event listener to show alert when icon is clicked
    infoIcon.addEventListener('click', function() {
        if (typeof pluginThemedPopup !== 'undefined') {
            alert(`<strong>PRESET BUTTONS</strong>
            <i>This feature allows you to store up to 30 presets, with 10 presets per bank.
            To store a frequency:</i>

            <strong><i>Left-click</i></strong> to recall the preset.
            <strong><i>Right-click</i></strong> or <strong><i>CTRL+click</i></strong> to store the preset.
            <strong><i>Middle-click</i></strong> or <strong><i>SHIFT+click</i></strong> to reset the preset.
            
            Use the <b>Bank</b> dropdown menu to select from Banks <i>A</i>, <i>B</i>, or <i>C</i>.

            <strong>Stored presets are saved only on the current browser.</strong><br>
            `, 'Close');
        } else {
            alert(`\t\t\t\t\t PRESET BUTTONS \t\t\t\t\n\nThis feature allows you to store up to 30 presets, with 10 presets per bank. To store a frequency:\n\nLeft-click to recall the preset.\n\nRight-click or CTRL+click to store the preset.\n\nMiddle-click or SHIFT+click to reset the preset.\n\nUse the Bank dropdown menu to select from Banks A, B, or C.\n\nStored presets are saved only on the current browser.`);
        }
    });

    // Append the icon to the container and the container to the body
    infoIconContainer.appendChild(infoIcon);
    document.body.appendChild(infoIconContainer);
}

// Function to hide the info icon
function hideInfoIcon() {
    var infoIconContainer = document.getElementById('button-presets-info-icon-container');
    if (infoIconContainer) {
        infoIconContainer.style.display = 'none';
    }
}

// Function to show the info icon
function showInfoIcon() {
    var infoIconContainer = document.getElementById('button-presets-info-icon-container');
    if (infoIconContainer) {
        infoIconContainer.style.display = 'flex';
    }
}

// Initialize the info icon and check the bank A presets sum
executeInfoCode();
checkBankASum();

// Call the toggle function on page load
toggleButtonContainer();
