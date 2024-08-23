/*
    Button Presets v1.1.0 by AAD
    https://github.com/AmateurAudioDude/FM-DX-Webserver-Plugin-Button-Presets
*/

//////////////////////////////////////////////////

const bankMenuLocation = 'ims' // ims, bw, ant, eq, hidden
const bankMenuPosition = 'after' // before, after
const bankMenuPaddingLeft = '15' // value in px
const bankMenuPaddingRight = '0' // value in px
const bankMenuBorderLeftRadius = true; // true, false
const bankMenuBorderRightRadius = true; // true, false
const bankMenuCustomWidth = 'default'; // default, value in px or %
const optionHidePresetButtons = true; // true, false
const infoIcon = true; // true, false

//////////////////////////////////////////////////

// Create a style element
var styleButtonPresets = document.createElement('style');
styleButtonPresets.innerHTML = `
  /* Prevent cropped text on mobile */
  @media only screen and not (min-width: 960px) {
      #plugin-button-presets button {
          padding: 4px !important;
      }
  }

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
    .button-text {
      font-size: 14px;
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

var tooltipFirstLoad = false;
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

// Function to get stored button values, data-ps values, and images from localStorage
function getStoredData(bank) {
  const key = `buttonPresets${bank}`;
  const data = JSON.parse(localStorage.getItem(key)) || { values: Array(10).fill(87.5), ps: Array(10).fill(''), images: Array(10).fill('') };
  return data;
}

// Function to save button values, data-ps values, and images to localStorage
function saveToLocalStorage(bank, buttonValues, psValues, buttonImages, tooltipValues) {
    const sanitizedButtonValues = buttonValues.map(value => value === null ? "" : value);
    const sanitizedPsValues = psValues.map(value => value === null ? "" : value);
    const sanitizedButtonImages = buttonImages.map(value => value === null ? "" : value);
    const sanitizedTooltipValues = tooltipValues.map(value => value === null ? "" : value);

    localStorage.setItem(`buttonPresets${bank}`, JSON.stringify({
        values: sanitizedButtonValues,
        ps: sanitizedPsValues,
        images: sanitizedButtonImages,
        tooltips: sanitizedTooltipValues
    }));
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
var targetElement;
if (bankMenuLocation !== 'hidden') {
    if (bankMenuLocation == 'ims') {
        targetElement = document.querySelector('.panel-50.no-bg.br-0.h-100.m-0.button-ims');
    } else if (bankMenuLocation == 'bw') {
        targetElement = document.querySelector('#data-bw.panel-50');
    } else if (bankMenuLocation == 'ant') {
        targetElement = document.querySelector('#data-ant.panel-50');
    } else if (bankMenuLocation == 'eq') {
        targetElement = document.querySelector('.panel-50.no-bg.br-0.h-100.m-0.button-eq');
    }
}

if (targetElement) {
    
    dropdownContainer.style.setProperty('margin-left', bankMenuPaddingLeft + 'px', 'important');
    dropdownContainer.style.setProperty('margin-right', bankMenuPaddingRight + 'px', 'important');

    if (!bankMenuBorderLeftRadius) { dropdownContainer.querySelector('input').style.setProperty('border-top-left-radius', '0px'); dropdownContainer.querySelector('input').style.setProperty('border-bottom-left-radius', '0px'); }

    if (!bankMenuBorderRightRadius) { dropdownContainer.querySelector('input').style.setProperty('border-top-right-radius', '0px'); dropdownContainer.querySelector('input').style.setProperty('border-bottom-right-radius', '0px'); }

    if (bankMenuPosition == 'before') {
        targetElement.parentNode.insertBefore(dropdownContainer, targetElement);
    } else {
        targetElement.parentNode.insertBefore(dropdownContainer, targetElement.nextSibling);
    }
}

// Optional: Hide dropdown menu when clicking outside
document.addEventListener('click', function(event) {
  if (!dropdownContainer.contains(event.target)) {
    dropdownOptions.classList.remove('opened');
  }
});

// Define the getTooltipValue function outside updateButtons
function getTooltipValue() {
    const dataStationNameElement = document.getElementById('data-station-name');
    const dataPsElement = document.getElementById('data-ps');

    // Check if #data-station-name exists and is visible
    if (dataStationNameElement && dataStationNameElement.offsetParent !== null) {
        return dataStationNameElement.textContent.trim();
    }

    if (bankMenuCustomWidth !== 'default') {
        dropdownContainer.style.width = bankMenuCustomWidth;
    }

    // Fallback to #data-ps if #data-station-name doesn't exist or isn't visible
    return dataPsElement ? dataPsElement.textContent.trim() : '';
}

// Update buttons based on the selected bank
function updateButtons() {
  buttonContainer.innerHTML = ''; // Clear existing buttons
  const storedData = getStoredData(currentBank);
  const buttonValues = storedData.values;
  const psValues = storedData.ps;
  const buttonImages = storedData.images || []; // Ensure buttonImages is an array
  const tooltipValues = storedData.tooltips || []; // Ensure tooltipValues is an array

  for (let i = 0; i < 10; i++) {
    (function(index) {
      var button = document.createElement("button");
      button.id = `setFrequencyButton${index}`;
      button.classList.add('tooltip-presets', 'tooltip-presets-once');
      button.setAttribute('data-tooltip', tooltipValues[index] || psValues[index]); // Tooltip uses data-station-name if available, otherwise psValue
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
        var dataStationNameElement = document.getElementById('data-station-name');
        var dataFrequency = dataFrequencyElement ? dataFrequencyElement.textContent : '87.5';
        var dataPs = dataPsElement ? dataPsElement.textContent : '';
        var tooltipValue = (dataStationNameElement && dataStationNameElement.offsetParent !== null) ? dataStationNameElement.textContent : dataPs;

        buttonValues[index] = parseFloat(dataFrequency) || 87.5;
        psValues[index] = dataPs;
        tooltipValues[index] = tooltipValue;
        buttonImages[index] = getImageSrc();
        updateButton(button, buttonValues[index], index);
        checkBankASum();
      });

    button.addEventListener('mousedown', function(e) {
        if (e.button === 1 || e.ctrlKey || (e.shiftKey && e.button === 0)) {
            if (e.button === 1 || (e.shiftKey && e.button === 0)) {
                buttonValues[index] = 87.5;
                psValues[index] = '';
                buttonImages[index] = '';
                tooltipValues[index] = ''; // Reset the tooltip value as well
            } else if (e.ctrlKey) {
                var dataFrequencyElement = document.getElementById('data-frequency');
                var dataPsElement = document.getElementById('data-ps');
                var dataFrequency = dataFrequencyElement ? dataFrequencyElement.textContent : '87.5';
                var dataPs = dataPsElement ? dataPsElement.textContent : '';

                buttonValues[index] = parseFloat(dataFrequency) || 87.5;
                psValues[index] = dataPs;
                buttonImages[index] = getImageSrc();
                tooltipValues[index] = getTooltipValue() || '';  // Ensures tooltipValue is not null
            }
            updateButton(button, buttonValues[index], index);
            checkBankASum();
        }
    });

    function updateButton(button, value, index) {
      const psValue = psValues[index] || ''; // Ensure psValue is always used for button text
      const tooltipValue = tooltipValues[index] || psValue; // Fallback to psValue if tooltipValue is undefined
      const imageSrc = (buttonImages && buttonImages[index]) || ''; // Ensure imageSrc is a valid string
      const padding = "6px";
      const displayText = `${formatValue(value).trim()}<span id="button-preset-ps" style="display: block; margin-top: -2px; white-space: nowrap; overflow: hidden; font-weight: 500;">${psValue.trim()}</span>`;

      button.style.position = "relative"; // Ensure button is positioned to contain the image
      button.style.padding = padding;
      button.style.backgroundColor = 'var(--color-1)';

      // Remove existing image if present
      const existingImg = button.querySelector('img');
      if (existingImg) {
        button.removeChild(existingImg);
      }

      // Remove existing text if present
      const existingText = button.querySelector('.button-text');
      if (existingText) {
        button.removeChild(existingText);
      }

      // Append the image if it exists
      if (imageSrc) {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.style.position = "absolute";
        img.style.top = padding;
        img.style.left = padding;
        img.style.right = padding;
        img.style.bottom = padding;
        img.style.width = `calc(100% - ${padding} * 2)`;
        img.style.height = `calc(100% - ${padding} * 2)`;
        img.style.objectFit = "contain";
        img.style.transition = "opacity 0.3s";
        img.style.borderRadius = "6px";
        button.appendChild(img);

        // Create and append the text element
        const textElement = document.createElement('span');
        textElement.className = 'button-text';
        textElement.innerHTML = displayText;
        textElement.style.position = "absolute";
        textElement.style.top = padding;
        textElement.style.left = padding;
        textElement.style.right = padding;
        textElement.style.bottom = padding;
        textElement.style.visibility = "hidden";
        textElement.style.color = "var(--color-text)";
        textElement.style.fontFamily = window.getComputedStyle(document.getElementById('data-ps')).fontFamily;
        button.appendChild(textElement);

        // Add hover effect for image and text
        button.addEventListener('mouseover', function() {
          button.style.backgroundColor = 'var(--color-3)';
          img.style.opacity = "0.1";
          textElement.style.visibility = "visible"; // Show text on hover
        });
        button.addEventListener('mouseout', function() {
          button.style.backgroundColor = 'var(--color-1)';
          img.style.opacity = "1"; // Reset opacity when not hovered
          textElement.style.visibility = "hidden"; // Hide text when not hovered
        });
      } else {
        // If no image, ensure text is visible and positioned correctly
        const textElement = document.createElement('span');
        textElement.className = 'button-text';
        textElement.innerHTML = displayText;
        textElement.style.position = "relative";
        textElement.style.color = "var(--color-text)";
        textElement.style.fontFamily = window.getComputedStyle(document.getElementById('data-ps')).fontFamily;
        button.appendChild(textElement);

        // Add hover effect for buttons without an image
        button.addEventListener('mouseover', function() {
          button.style.backgroundColor = 'var(--color-3)';
        });
        button.addEventListener('mouseout', function() {
          button.style.backgroundColor = 'var(--color-1)';
        });
      }

      button.setAttribute('data-tooltip', tooltipValue.trim());
      saveToLocalStorage(currentBank, buttonValues, psValues, buttonImages, tooltipValues);
    }

      function formatValue(value) {
        const fixedValue = value.toFixed(2);
        return fixedValue.endsWith('0') ? fixedValue.slice(0, -1) : fixedValue;
      }

    // Function to determine if the image is local or external
    function isImageLocal(imageUrl) {
      try {
        const imageUrlObj = new URL(imageUrl);
        const siteOrigin = window.location.origin;
        return imageUrlObj.origin === siteOrigin;
      } catch (e) {
        // Handle the case where the URL might be invalid or not absolute
        return false;
      }
    }

    // Function to get the image source and determine if it’s local or external
    function getImageSrc() {
      const logoImg = document.getElementById('station-logo');
      if (logoImg && logoImg.src && !logoImg.src.startsWith('data:image/png;base64') && !logoImg.src.includes('default')) {
        const imageUrl = logoImg.src;
        if (isImageLocal(imageUrl)) {
          // Handle local image
          //console.log("imageLocal");
          return new URL(imageUrl).pathname; // Store only the path
        } else {
          // Handle external image
          //console.log("imageExternal");
          return imageUrl; // Store the full URL
        }
      }
      return '';
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

        if (window.innerWidth >= 768) {
          var dropdown = document.getElementById('button-presets-bank-dropdown');
          if (dropdown) {
            dropdown.style.display = 'block';
          }
        }

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
if (optionHidePresetButtons) {
    AdditionalCheckboxesButtonPresets();
}

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
            alert(`\t\t\t\t\t PRESET BUTTONS \t\t\t\t\n\nThis feature allows you to store up to 30 presets, with 10 presets per bank. To store a frequency:\n\nLeft-click to recall the preset.\nRight-click or CTRL+click to store the preset.\nMiddle-click or SHIFT+click to reset the preset.\n\nUse the Bank dropdown menu to select from Banks A, B, or C.\n\nStored presets are saved only on the current browser.`);
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
if (infoIcon) {
    executeInfoCode();
}

checkBankASum();

// Call the toggle function on page load
toggleButtonContainer();
