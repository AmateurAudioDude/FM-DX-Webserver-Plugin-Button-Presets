/*
    Button Presets v1.2.2 by AAD
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
const bankName = 'Bank'; // dropdown menu name
const optionHidePresetButtons = false; // true, false
const optionHideDisplayAll = false; // true, false
const displayDefaultLogo = true; // true, false
const enableDefaultLogo = 'unnamed'; // all, named, unnamed
const infoIcon = true; // true, false
const defaultPresetData = {
  values: [87.5, 87.5, 87.5, 87.5, 87.5, 87.5, 87.5, 87.5, 87.5, 87.5],
  names: ['', '', '', '', '', '', '', '', '', ''],
  urls: ['', '', '', '', '', '', '', '', '', '']
};

//////////////////////////////////////////////////

/*

  defaultPresetData examples:

  values: [99.7, ...
  names: ['Example', ...
  urls: ['/logos/Example.png', ...

  values: [99.7, ...
  names: ['Example', ...
  urls: ['https://tef.noobish.eu/logos/EXA/Example.png', ...

*/

// Initial value
var bankDisplayAll = false;

// Global variables for other plugins
pluginButtonPresets = true;

// Create default logo
var defaultButtonPresetImagePath = ' data:image/png;base64,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';

// Create a style element
var styleButtonPresets = document.createElement('style');
styleButtonPresets.innerHTML = `
/* Frosted glass effect */
#plugin-button-presets button,
.tooltip-presets::after {
  backdrop-filter: blur(5px);
  transition: 0.6s ease background-color;
}

#plugin-button-presets button:hover {
  transition: 0.3s ease background-color;
}

#plugin-button-presets button:hover img {
  transition: opacity 0.3s ease-out !important;
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
  background-color: var(--color-4-transparent);
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
  opacity: 1;
  visibility: visible;
}

.tooltip-presets[data-tooltip=""]::after {
  display: none;
}

/* Media Queries */

/* Preserve bottom margin (panels.css:93) */
@media only screen and (min-width: 960px) and (max-height: 860px) {
  #plugin-button-presets {
    padding-right: 8px;
  }

  /* Fix spacing when chat is enabled */
  #wrapper-outer #wrapper .flex-container .panel-10.no-bg.m-0 {
    padding-bottom: 0;
  }

  #wrapper-outer #wrapper .flex-container .panel-10.no-bg.m-0 .panel-10.no-bg.h-100 {
    height: 80px !important;
  }
}

/* Add spacing below bottom containers */
@media only screen and (min-width: 768px) {
  #plugin-button-presets {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .button-text {
    font-size: 14px;
  }
}

/* Mobile device spacing */
@media only screen and (max-width: 480px) {
  #plugin-button-presets {
    margin-bottom: 40px;
  }
}

/* Prevent cropped text on mobile */
@media only screen and not (min-width: 960px) {
  #plugin-button-presets button {
    padding: 4px !important;
  }
}

/* Force hide dropdown menu in portrait mode */
@media only screen and (max-width: 768px) {
  #button-presets-bank-dropdown,
  #button-presets-info-icon-container {
    display: none !important;
  }
}

@media only screen and (min-height: 861px) {
  .button-presets {
    margin-top: 20px;
  }
}

/* Adjustments for screen width */
@media only screen and (max-width: 800px) {
  .button-presets {
    margin-bottom: 40px;
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

/* Import/Export buttons */
#plugin-button-presets {
    position: relative;
}
#import-button-preset,
#export-button-preset {
  opacity: .48;
  transition: opacity 0.8s !important;
}
#import-button-preset:hover,
#export-button-preset:hover {
  opacity: .96;
  transition: opacity 0.8s !important;
}

/* 30 button display */
#plugin-button-presets.button-presets {
  display: flex;
  flex-wrap: wrap;
}
`;
// Append the style to the head of the document
document.head.appendChild(styleButtonPresets);

// 30 button display
function bankDisplayAllGap() {
  if (bankDisplayAll) {
      const styleElement = document.createElement('style');
      styleElement.textContent = `
          #plugin-button-presets.button-presets {
              gap: 8px !important;
          }
      `;
      document.head.appendChild(styleElement);
  } else {
      const styleElement = document.createElement('style');
      styleElement.textContent = `
          #plugin-button-presets.button-presets {
              gap: 4px !important;
          }
      `;
      document.head.appendChild(styleElement);
  }
}

var tooltipFirstLoad = false;
const DISPLAY_KEY_ButtonPresets = 'buttonPresetsHidden';

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
  var dataButtonPresets;
  if (bank === "A") {
    dataButtonPresets = JSON.parse(localStorage.getItem(key)) || { values: [...defaultPresetData.values], ps: [...defaultPresetData.names], images: [...defaultPresetData.urls] };
  } else {
    dataButtonPresets = JSON.parse(localStorage.getItem(key)) || { values: Array(10).fill(87.5), ps: Array(10).fill(''), images: Array(10).fill('') };
  }
  return dataButtonPresets;
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
dropdownInput.placeholder = `${bankName} A`; // Bank text
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
  option.textContent = `${bankName} ${bank}`; // Bank text
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
    dropdownInput.value = `${bankName} ${currentBank}`; // Bank text
    updateButtons(); // Update the buttons when the bank changes
    dropdownOptions.classList.remove('opened');
  }
});

// Insert the dropdown menu before the specified element
var targetElement;
if (bankMenuLocation !== 'hidden' && !bankDisplayAll) {
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
  
  if (!bankMenuBorderLeftRadius) {
    dropdownContainer.querySelector('input').style.setProperty('border-top-left-radius', '0px');
    dropdownContainer.querySelector('input').style.setProperty('border-bottom-left-radius', '0px');
  }
  
  if (!bankMenuBorderRightRadius) {
    dropdownContainer.querySelector('input').style.setProperty('border-top-right-radius', '0px');
    dropdownContainer.querySelector('input').style.setProperty('border-bottom-right-radius', '0px');
  }
  
  if (bankMenuCustomWidth !== 'default') {
    dropdownContainer.style.width = bankMenuCustomWidth;
  }
  
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
  
  // Fallback to #data-ps if #data-station-name doesn't exist or isn't visible
  return dataPsElement ? dataPsElement.textContent.trim() : '';
}

// Update buttons on orientation change
function updateButtonsDelayed() {
  setTimeout(updateButtons, 200);
}

// Update buttons based on the selected bank
function updateButtons() {
  buttonContainer.innerHTML = ''; // Clear existing buttons
  // 30 button display
  let buttonRows = 1;

  if (bankDisplayAll) {
    buttonRows = 3;
  } else {
    buttonRows = 1;
  }

  for (let iAll = 0; iAll < buttonRows; iAll++) {
    // 30 button display
    if (bankDisplayAll) {
      switch (iAll) {
        case 0:
          currentBank = 'A';
          break;
        case 1:
          currentBank = 'B';
          break;
        case 2:
          currentBank = 'C';
          break;
        default:
          break;
      }
    }

    let storedData = getStoredData(currentBank);
    let buttonValues = storedData.values;
    let psValues = storedData.ps;
    let buttonImages = storedData.images || [];
    let tooltipValues = storedData.tooltips || [];

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
            // tuneTo(presetInput); causes rounding error
            socket.send("T" + ((presetInput).toFixed(3) * 1000));
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
        
        // Handle keyboard events for SHIFT + S and SHIFT + R
        document.addEventListener('keydown', function(e) {
          var isButtonFocused = document.activeElement === button;

          if (isButtonFocused) {
            if (e.shiftKey && e.key === 'S') {
              // SHIFT + S key combination
              var dataFrequencyElement = document.getElementById('data-frequency');
              var dataPsElement = document.getElementById('data-ps');
              var dataFrequency = dataFrequencyElement ? dataFrequencyElement.textContent : '87.5';
              var dataPs = dataPsElement ? dataPsElement.textContent : '';
              
              buttonValues[index] = parseFloat(dataFrequency) || 87.5;
              psValues[index] = dataPs;
              buttonImages[index] = getImageSrc();
              tooltipValues[index] = getTooltipValue() || ''; // Ensures tooltipValue is not null
              updateButton(button, buttonValues[index], index);
              checkBankASum();
            } else if (e.shiftKey && e.key === 'R') {
              // SHIFT + R key combination
              buttonValues[index] = 87.5;
              psValues[index] = '';
              buttonImages[index] = '';
              tooltipValues[index] = ''; // Reset the tooltip value as well
              updateButton(button, buttonValues[index], index);
              checkBankASum();
            }
          }
        });

        // Handle mouse events
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
              tooltipValues[index] = getTooltipValue() || ''; // Ensures tooltipValue is not null
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
          button.style.backgroundColor = 'var(--color-1-transparent)';
          
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
            img.src = imageSrc || defaultButtonPresetImagePath;
            img.style.position = "absolute";
            img.style.top = padding;
            img.style.left = padding;
            img.style.right = padding;
            img.style.bottom = padding;
            img.style.width = `calc(100% - ${padding} * 2)`;
            img.style.height = `calc(100% - ${padding} * 2)`;
            img.style.objectFit = "contain";
            img.style.transition = "opacity 0.8s";
            img.style.borderRadius = "6px";
            button.style.userSelect = 'none';
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
              button.style.backgroundColor = 'var(--color-4-transparent)';
              img.style.opacity = "0.1";
              textElement.style.visibility = "visible"; // Show text on hover
            });
            button.addEventListener('mouseout', function() {
              button.style.backgroundColor = 'var(--color-1-transparent)';
              img.style.opacity = "1"; // Reset opacity when not hovered
              textElement.style.visibility = "hidden"; // Hide text when not hovered
            });
          } else {
            if (displayDefaultLogo && window.matchMedia("(max-width: 860px) and (orientation: portrait)").matches) {
              paddingMobile = "0px";
            } else {
              paddingMobile = "-8px"; // Default or landscape mode padding
            }
            
            // Event listener for orientation change
            document.addEventListener("DOMContentLoaded", function () {
                function debounce(func, wait) {
                    let timeout;
                    return function(...args) {
                        clearTimeout(timeout);
                        timeout = setTimeout(() => func.apply(this, args), wait);
                    };
                }
                
                const debouncedUpdateButtons = debounce(updateButtonsDelayed, 400);
                
                // Add debounced event listener for orientationchange
                window.addEventListener('orientationchange', debouncedUpdateButtons);
            });
            
            // Display default logo
            if (displayDefaultLogo) {
              const paddingDefaultLogo = paddingMobile;
              const img = document.createElement('img');
              img.src = imageSrc || defaultButtonPresetImagePath;
              img.style.position = "absolute";
              
              if (enableDefaultLogo !== 'all' && (enableDefaultLogo === 'unnamed' && psValues[index]) || (enableDefaultLogo === 'named' && !psValues[index])) {
                img.style.opacity = "0";
              } else {
                img.style.opacity = "0.12";
                
                // Add hover effect for image and text
                button.addEventListener('mouseover', function() {
                  button.style.backgroundColor = 'var(--color-4-transparent)';
                  img.style.opacity = "0.08";
                  textElement.style.visibility = "visible"; // Show text on hover
                });
                button.addEventListener('mouseout', function() {
                  button.style.backgroundColor = 'var(--color-1-transparent)';
                  img.style.opacity = "0.12"; // Reset opacity when not hovered
                });
              }
              
              img.style.top = paddingDefaultLogo;
              img.style.left = paddingDefaultLogo;
              img.style.right = paddingDefaultLogo;
              img.style.bottom = paddingDefaultLogo;
              img.style.width = `calc(100% - ${paddingDefaultLogo} * 2)`;
              img.style.height = `calc(100% - ${paddingDefaultLogo} * 2)`;
              img.style.objectFit = "contain";
              img.style.transition = "opacity 0.8s";
              img.style.borderRadius = "0px";
              button.style.userSelect = 'none';
              button.appendChild(img);
              
              img.addEventListener('mousedown', (e) => {
                if (e.button === 0) {
                      e.preventDefault(); // Prevent the default drag behavior
                  }
              });
            }
            
            // If no image, ensure text is visible and positioned correctly
            const textElement = document.createElement('span');
            textElement.className = 'button-text';
            textElement.innerHTML = displayText;
            textElement.style.position = "relative";
            textElement.style.color = "var(--color-text)";
            textElement.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.8)';
            textElement.style.fontFamily = window.getComputedStyle(document.getElementById('data-ps')).fontFamily;
            button.appendChild(textElement);
            
            // Add hover effect for buttons without an image
            button.addEventListener('mouseover', function() {
              button.style.backgroundColor = 'var(--color-4-transparent)';
            });
            button.addEventListener('mouseout', function() {
              button.style.backgroundColor = 'var(--color-1-transparent)';
            });
          }
          
          button.setAttribute('data-tooltip', tooltipValue.trim());
          // 30 button display
          if (bankDisplayAll) {
            switch (iAll) {
              case 0:
                currentBank = 'A';
                break;
              case 1:
                currentBank = 'B';
                break;
              case 2:
                currentBank = 'C';
                break;
              default:
                break;
            }
          }
          saveToLocalStorage(currentBank, buttonValues, psValues, buttonImages, tooltipValues);
        }
        
        function formatValue(value) {
          if (value === undefined) {
            value = 87.5;
          }

          //   0-27 MHz : 3 decimal places
          //  27-76 MHz : 2 decimal places
          // 76-108 MHz : 1 decimal place
          let fixedValue;

          switch (true) {
            case (value <= 27):
              fixedValue = value.toFixed(4);
              break;
            case (value > 27 && value < 76):
              fixedValue = value.toFixed(3);
              break;
            case (value >= 76 && value <= 108):
              fixedValue = value.toFixed(2);
              break;
            default:
              fixedValue = value.toFixed(3);
          }

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
              return new URL(imageUrl).pathname; // Store only the path
            } else {
              // Handle external image
              return imageUrl; // Store the full URL
            }
          }
          return '';
        }
        
        buttonContainer.appendChild(button);
      })(i);
    } // i
  } // iAll
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
  const isHidden = JSON.parse(localStorage.getItem(DISPLAY_KEY_ButtonPresets)) == true;
  if (isHidden) {
    var element = document.getElementById('plugin-button-presets');
    element.style.setProperty('display', 'none');
    document.getElementById('button-presets-bank-dropdown').style.display = 'none';
    var infoIconContainer = document.getElementById('button-presets-info-icon-container');
    
    if (infoIconContainer) {
      infoIconContainer.style.display = 'none';

      var styleButtonPresetsHide = document.createElement('style');
      styleButtonPresetsHide.innerHTML = `
        /* Preserve bottom margin (panels.css:93) */
        @media only screen and (min-width: 960px) and (max-height: 860px) {
            #wrapper-outer #wrapper .flex-container .panel-10.no-bg.m-0 .panel-10.no-bg.h-100 {
                height: 120px !important;
            }
        }
      `;
      // Append the style to the head of the document
      document.head.appendChild(styleButtonPresetsHide);
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

      var styleButtonPresetsHide = document.createElement('style');
      styleButtonPresetsHide.innerHTML = `
        /* Preserve bottom margin (panels.css:93) */
        @media only screen and (min-width: 960px) and (max-height: 860px) {
            #wrapper-outer #wrapper .flex-container .panel-10.no-bg.m-0 .panel-10.no-bg.h-100 {
                height: 80px !important;
            }
        }
      `;
      // Append the style to the head of the document
      document.head.appendChild(styleButtonPresetsHide);
    }
    checkBankASum();
  }
}

// Initial tooltip
function oncePresetTooltips() {
  $('.tooltip-presets-once').hover(function(e) {
    // Never display again after first click
    if (tooltipFirstLoad == true) { return; } else { tooltipFirstLoad = true; }
    $(document).on('mousedown', () => { clearTimeout($(this).data('timeout')); return; });
    if (!document.querySelector('.tooltip-presets-once')) { return; }
    if (!/Mobi|Android|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)) {
      var tooltipText = `
            <strong><i>Left-click</i></strong> or <strong><i>ENTER</i></strong> to recall the preset.<br>
            <strong><i>Right-click</i></strong>, <strong><i>CTRL+click</i></strong>, or <strong><i>SHIFT+S</i></strong> to store the preset.<br>
            <strong><i>Middle-click</i></strong> or <strong><i>SHIFT+click</i></strong>, or <strong><i>SHIFT+R</i></strong> to reset the preset.<br>
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
  }).mousemove(function(e) {
    var tooltipWidth = $('.tooltiptext').outerWidth();
    var tooltipHeight = $('.tooltiptext').outerHeight();
    var posX = e.pageX - tooltipWidth / 2;
    var posY = e.pageY - tooltipHeight - 10;
    
    $('.tooltiptext').css({ top: posY, left: posX });
  });
}

// #################### SIDE BAR MENU SETTINGS #################### //

// ********** Display additional options in side menu **********
function AdditionalCheckboxesDisplayAll() { // ########## SHOW ALL BUTTON PRESETS ##########
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
                <input type="checkbox" tabindex="0" id="show-all-preset-buttons">
                <label for="show-all-preset-buttons">Show All Button Presets</label>
            `;
            
            // Insert new element after second 'form-group checkbox'
            const secondCheckbox = checkboxes[1];
            secondCheckbox.insertAdjacentElement('afterend', newDiv);
        } else {
            console.warn('There are less than two elements with class "form-group checkbox".');
        }
    }
    insertHtmlAfterSecondCheckbox();

    var isDisplayAll = localStorage.getItem("buttonPresetsDisplayAll");
    if (isDisplayAll === "true") {
        $("#show-all-preset-buttons").prop("checked", true);
    }

    $("#show-all-preset-buttons").change(function() {
        var isChecked = $(this).is(":checked");
        localStorage.setItem("buttonPresetsDisplayAll", isChecked);
        setDisplayAll();
    });

    function setDisplayAll() {
        if(localStorage.getItem('buttonPresetsDisplayAll') != 'true') {
          currentBank = 'A';
          bankDisplayAll = false;
          bankDisplayAllGap();
          toggleButtonContainer();
          updateButtons();
          console.log("buttonPresetsDisplayAll = false");
        } else {
          bankDisplayAll = true;
          bankDisplayAllGap();
          toggleButtonContainer();
          document.getElementById('button-presets-bank-dropdown').style.display = 'none';
          updateButtons();
          console.log("buttonPresetsDisplayAll = true");
        }
    }

    // Create a MutationObserver instance
    const observerBackgroundImage = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const bodyElement = document.body;

                // Check if background style is set
                if (window.getComputedStyle(bodyElement).background !== 'none') {
                    // Stop observing once background is set
                    observerBackgroundImage.disconnect();
                    
                    // Run function
                    setDisplayAll();
                }
            }
        }
    });
    // Configuration of observer
    const config = {
        attributes: true,           // Observe attribute changes
        attributeFilter: ['style'], // Only observe changes to 'style' attribute
    };
    // Start observer
    observerBackgroundImage.observe(document.body, config);
}

// Display additional options in side menu and tooltips
if (!optionHideDisplayAll) {
  AdditionalCheckboxesDisplayAll();
}

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
  
  var isButtonPresetsHidden = localStorage.getItem(DISPLAY_KEY_ButtonPresets);
  if (isButtonPresetsHidden === "true") {
    $("#hide-preset-buttons").prop("checked", true);
  }
  
  $("#hide-preset-buttons").change(function() {
    var isChecked = $(this).is(":checked");
    localStorage.setItem(DISPLAY_KEY_ButtonPresets, isChecked);
    toggleButtonContainer();
  });
}

// Display additional options in side menu and tooltips
if (!optionHidePresetButtons) {
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
  const sumDefault = defaultPresetData.values.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  
  // Check if the sum is equal to 875
  if (sum === 875 || sum === sumDefault) {
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

            <strong><i>Left-click</i></strong> or <strong><i>ENTER</i></strong> to recall the preset.
            <strong><i>Right-click</i></strong>, <strong><i>CTRL+click</i></strong>, or <strong><i>SHIFT+S</i></strong> to store the preset.
            <strong><i>Middle-click</i></strong>, <strong><i>SHIFT+click</i></strong>, or <strong><i>SHIFT+R</i></strong> to reset the preset.
            
            Use the <b>Bank</b> dropdown menu to select from Banks <i>A</i>, <i>B</i>, or <i>C</i>.

            <strong>Stored presets are saved only on the current browser.</strong><br>
            `, 'Close');
    } else {
      alertButtonPresets(`<strong>PRESET BUTTONS</strong>
            <i>This feature allows you to store up to 30 presets, with 10 presets per bank.
            To store a frequency:</i>

            <strong><i>Left-click</i></strong> or <strong><i>ENTER</i></strong> to recall the preset.
            <strong><i>Right-click</i></strong>, <strong><i>CTRL+click</i></strong>, or <strong><i>SHIFT+S</i></strong> to store the preset.
            <strong><i>Middle-click</i></strong>, <strong><i>SHIFT+click</i></strong>, or <strong><i>SHIFT+R</i></strong> to reset the preset.
            
            Use the <b>Bank</b> dropdown menu to select from Banks <i>A</i>, <i>B</i>, or <i>C</i>.

            <strong>Stored presets are saved only on the current browser.</strong><br>
            `, 'Close');
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

// Replace any missing logos with default logo
const containerButtonPresets = document.getElementById('plugin-button-presets');

if (containerButtonPresets) {
  containerButtonPresets.querySelectorAll('img').forEach(img => {
    img.onerror = () => {
      img.src = defaultButtonPresetImagePath;
      img.style.filter = 'grayscale(100%)';
      img.style.maxWidth = '92px';
      img.style.maxHeight = '36px';
      img.style.opacity = '0.5';
    };

    img.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
            e.preventDefault(); // Prevent the default drag behavior
        }
    });
  });
}

// Export presets to file
function exportLocalStorageToFile() {
  const data = {
    buttonPresetsA: localStorage.getItem('buttonPresetsA'),
    buttonPresetsB: localStorage.getItem('buttonPresetsB'),
    buttonPresetsC: localStorage.getItem('buttonPresetsC'),
  };

  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'FM-DX_Webserver_Presets.json';
  a.style.display = 'none';  // Hide the link
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

// Import presets from file
function createFileInputAndImport() {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.json';
  fileInput.style.display = 'none';  // Hide the input

  document.body.appendChild(fileInput);

  fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      importLocalStorageFromFile(file);
    }
  });

  fileInput.click();

  fileInput.remove();
}

function importLocalStorageFromFile(file) {
  const reader = new FileReader();

  reader.onload = function(event) {
    try {
      const data = JSON.parse(event.target.result);

      if (data.buttonPresetsA) localStorage.setItem('buttonPresetsA', data.buttonPresetsA);
      if (data.buttonPresetsB) localStorage.setItem('buttonPresetsB', data.buttonPresetsB);
      if (data.buttonPresetsC) localStorage.setItem('buttonPresetsC', data.buttonPresetsC);
      
      updateButtons();
      
      setTimeout(() => {
          createImportExportButtons();
      }, 100);

      console.log('Button Preset LocalStorage updated successfully');
    } catch (e) {
      console.error('Error importing localStorage data:', e);
    }
  };

  reader.onerror = function(event) {
    console.error('Error reading file:', event);
  };

  reader.readAsText(file);
}

// Create and append import/export buttons
function createImportExportButtons() {
  // Create the export button
  const exportButton = document.createElement('button');
  exportButton.id = 'export-button-preset';
  exportButton.classList.add('tooltip-presets');
  exportButton.setAttribute('data-tooltip', 'Export presets to file');
  exportButton.style.fontSize = '14px';
  exportButton.style.backgroundColor = '#990903';
  exportButton.style.border = 'none';
  exportButton.style.borderRadius = '50%';
  exportButton.style.width = '12px';
  exportButton.style.height = '12px';
  exportButton.style.cursor = 'pointer';
  exportButton.style.position = 'absolute';
  exportButton.style.transform = 'scale(0.8)';
  exportButton.style.right = '-2px';
  exportButton.style.bottom = '26px';
  if (!/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    exportButton.style.marginRight = '0';
  }

  // Create the import button
  const importButton = document.createElement('button');
  importButton.id = 'import-button-preset';
  importButton.classList.add('tooltip-presets');
  importButton.setAttribute('data-tooltip', 'Import presets from file');
  importButton.style.fontSize = '14px';
  importButton.style.backgroundColor = '#036009';
  importButton.style.border = 'none';
  importButton.style.borderRadius = '50%';
  importButton.style.width = '12px';
  importButton.style.height = '12px';
  importButton.style.cursor = 'pointer';
  importButton.style.position = 'absolute';
  importButton.style.transform = 'scale(0.8)';
  importButton.style.right = '-2px';
  importButton.style.bottom = '10px';
  if (!/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    importButton.style.marginRight = '0';
  }

  // Add click event listeners
  importButton.addEventListener('click', createFileInputAndImport);
  exportButton.addEventListener('click', exportLocalStorageToFile);

  // Add the buttons to the #plugin-button-presets element
  const pluginButtonPresets = document.querySelector('#plugin-button-presets');
  pluginButtonPresets.appendChild(importButton);
  pluginButtonPresets.appendChild(exportButton);


  // Add hover effect for the #plugin-button-presets
  pluginButtonPresets.addEventListener('mouseover', () => {
    importButton.style.display = 'inline-block';
    exportButton.style.display = 'inline-block';
  });

  if (!/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    pluginButtonPresets.addEventListener('mouseout', () => {
      importButton.style.display = 'none';
      exportButton.style.display = 'none';
    });

    // Initially hide the buttons
    importButton.style.display = 'none';
    exportButton.style.display = 'none';
  }
}

// Call function to create and append import/export buttons
createImportExportButtons();

/*
    Themed Popups v1.1.0 by AAD
    https://github.com/AmateurAudioDude/FM-DX-Webserver-Plugin-Themed-Popups
*/

var styleElementButtonPresets = document.createElement('style');
var cssCodeThemedPopupsButtonPresets = `
/* Themed Popups CSS */
.popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-2); /* Background */
    color: var(--color-main-bright); /* Text */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: opacity 0.3s ease-in;
    z-index: 9999;
}

.popup-content {
    text-align: center;
}

.popup button {
    margin-top: 10px;
}

.popup.open {
    opacity: .99;
}
`;
styleElementButtonPresets.appendChild(document.createTextNode(cssCodeThemedPopupsButtonPresets));
document.head.appendChild(styleElementButtonPresets);

// Function to create the alert popup
function alertButtonPresets(popupMessage, popupButton) {
    if (typeof popupButton === 'undefined') {
        popupButton = 'OK';
    }
    if (!popupOpened) { // Check if a popup is not already open
        popup = document.createElement('div');
        popup.classList.add('popup');
        popup.innerHTML = `<div class="popup-content">${popupMessage.replace(/\n/g, '<br>')}<button id="popup-close">${popupButton}</button></div>`;
        document.body.appendChild(popup);

        var closeButton = popup.querySelector('#popup-close');
        closeButton.addEventListener('click', closePopup);

        popup.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent event propagation
        });

        // Trigger the fade-in effect
        setTimeout(function() {
            popup.classList.add('open');
            popupOpened = true; // Set popupOpened flag to true
            blurBackground(true);
        }, 10);
    }
}

function blurBackground(status) {
    // Blur background
    if (status === true) {
      if (idModal) {
          idModal.style.display = 'block';
        setTimeout(function() {
          idModal.style.opacity = '1';
        }, 40);
      }
    } else {
      // Restore background
      if (idModal) {
        setTimeout(function() {
          idModal.style.display = 'none';
        }, 400);
          idModal.style.opacity = '0';
      }
    }
}

// Global variables for popup state
var popupOpened = false;
var popup;

var popupPromptOpened = false;
var idModal = document.getElementById('myModal');

// Function to close the popup
function closePopup(event) {
    event.stopPropagation(); // Prevent event propagation
    popupOpened = false; // Set popupOpened flag to false
    popup.classList.remove('open'); // Fade out
    setTimeout(function() {
        popup.remove();
        blurBackground(false);
    }, 300); // Remove after fade-out transition
}

// Event listener for ESC key to close popup
document.addEventListener('keydown', function(event) {
    if ((event.key === 'Escape' || event.key === 'Enter') && popupOpened) {
        closePopup(event);
        blurBackground(false);
    }
});
