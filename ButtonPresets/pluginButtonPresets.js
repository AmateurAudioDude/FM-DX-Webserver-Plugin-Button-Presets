/*
    Preset Buttons v1.3.1 by AAD
    https://github.com/AmateurAudioDude/FM-DX-Webserver-Plugin-Button-Presets
*/

(() => {

//////////////////////////////////////////////////

const bankMenuLocation = 'ims' // ims, bw, ant, eq, top, top-replace, hidden
const bankMenuPosition = 'after' // before, after
const bankMenuPaddingLeft = '15' // value in px
const bankMenuPaddingRight = '0' // value in px
const bankMenuBorderLeftRadius = true; // true, false
const bankMenuBorderRightRadius = true; // true, false
const bankMenuCustomWidth = 'default'; // default, value in px or %
const bankName = 'Bank'; // dropdown menu name
const bankQuantity = 4; // total number of banks ranging from 3-8
const optionHidePresetButtons = false; // true, false
const optionHideDisplayAll = true; // true, false
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

const pluginVersion = '1.3.1';
const pluginName = "Preset Buttons";
const pluginHomepageUrl = "https://github.com/AmateurAudioDude/FM-DX-Webserver-Plugin-Button-Presets";
const pluginUpdateUrl = "https://raw.githubusercontent.com/AmateurAudioDude/FM-DX-Webserver-Plugin-Button-Presets/refs/heads/main/ButtonPresets/pluginButtonPresets.js";
const pluginSetupOnlyNotify = true;
const CHECK_FOR_UPDATES = true;

// Initial value
let bankDisplayAll = false;

// Global variables for other plugins
pluginButtonPresets = true;

// Create default logo
let defaultButtonPresetImagePath = ' data:image/png;base64,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';

// Create a style element
let styleButtonPresets = document.createElement('style');
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

#plugin-button-presets button img {
  transition: transform 0.2s ease, opacity 0.3s ease-out !important;
  transform: scale(1);
}

#plugin-button-presets button:hover img {
  transition: transform 0.2s ease, opacity 0.3s ease-out !important;
  transform: scale(1.05);
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
  padding: 5px 25px;
  background-color: var(--color-3-transparent);
  border: 2px solid var(--color-3);
  color: var(--color-text);
  border-radius: 15px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s;
  pointer-events: none;
  text-align: center;
  font-size: 14px;
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
    /* padding-right: 8px; */ /* Not needed for FM-DX Webserver v1.3.5+ */
  }

  /* Fix spacing when chat is enabled */
  .wrapper-outer #wrapper .flex-container .panel-10.no-bg.m-0 {
    padding-bottom: 0;
  }

  .wrapper-outer #wrapper .flex-container .panel-10.no-bg.m-0 .panel-10.no-bg.h-100 {
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

.w-50 {
    min-width: 50px !important;
}

/* Move import/export if not enough width */
@media only screen and (max-width: 1300px) {
  #export-button-preset,
  #import-button-preset {
   left: -8px;
  }
}

/* 30+ button display */
#plugin-button-presets.button-presets {
  display: flex;
  flex-wrap: wrap;
}

/* 2 rows of 5 buttons for low resolution */
@media screen and (max-width: 728px) {
    #plugin-button-presets {
      display: grid !important;
      padding: 0;
      grid-template-columns: repeat(5, 16%);
        @media screen and (max-width: 440px) {
          padding: 0 60px 0 60px;
          grid-template-columns: repeat(5, 1fr);
        }
    }
    #plugin-button-presets.button-presets button[id^="setFrequencyButton"] {
        width: calc(100% - 12px) !important;
    }
}
`;
// Append the style to the head of the document
document.head.appendChild(styleButtonPresets);

// 30+ button display
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

let tooltipFirstLoad = false;
const DISPLAY_KEY_ButtonPresets = 'buttonPresetsHidden';
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// Create a container for the buttons
let buttonContainer = document.createElement("div");
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
  let dataButtonPresets;
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
let dropdownContainer = document.createElement('div');
dropdownContainer.classList.add('panel-50', 'w-50', 'no-bg', 'h-100', 'm-0', 'dropdown', 'dropdown-up', 'hide-phone');
dropdownContainer.id = 'button-presets-bank-dropdown'; // Dropdown ID

let dropdownInput = document.createElement('input');
dropdownInput.type = 'text';
dropdownInput.placeholder = `${bankName} A`; // Bank text
dropdownInput.readOnly = true;
dropdownInput.tabIndex = 0;
dropdownContainer.appendChild(dropdownInput);

let dropdownOptions = document.createElement('ul');
dropdownOptions.classList.add('options', 'open-top');
dropdownOptions.tabIndex = -1;
let bankNames;
if (bankQuantity >= 3 && bankQuantity <= 8) {
  bankNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].slice(0, bankQuantity);
} else {
  bankNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].slice(0, 3);
}
bankNames.forEach(bank => {
  let option = document.createElement('li');
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

// Function to replace F1-F4 preset buttons
function replacePresets() {
    document.addEventListener("DOMContentLoaded", () => {
        let replaceOriginals;

        const presets = {
            preset1: { bank: "A", label: `${bankName} A` },
            preset2: { bank: "B", label: `${bankName} B` },
            preset3: { bank: "C", label: `${bankName} C` },
            preset4: { bank: "D", label: `${bankName} D` }
        };

        const extraPresets = {
            preset5: { bank: "E", label: `${bankName} E` },
            preset6: { bank: "F", label: `${bankName} F` },
            preset7: { bank: "G", label: `${bankName} G` },
            preset8: { bank: "H", label: `${bankName} H` }
        };

        if (bankMenuLocation === 'top-replace') {
            replaceOriginals = true;
        } else {
            replaceOriginals = false;
        }

        // Get parent of existing buttons
        const firstButton = document.querySelector('#dashboard-panel-description .flex-container .flex-center #preset1');
        let originalContainer, parentNode;
        if (firstButton) {
            originalContainer = firstButton.parentNode;
            parentNode = originalContainer.parentNode;
        }

        let newContainer1, newContainer2;
        if (!replaceOriginals && originalContainer && parentNode) {
            newContainer1 = document.createElement('div');
            newContainer1.style.display = 'flex';
            newContainer1.style.flexWrap = 'wrap';
            newContainer1.style.maxWidth = originalContainer.style.width || '100%';
            parentNode.insertBefore(newContainer1, originalContainer.nextSibling);

            if (bankQuantity === 8) {
                newContainer2 = document.createElement('div');
                newContainer2.style.display = 'flex';
                newContainer2.style.flexWrap = 'wrap';
                newContainer2.style.maxWidth = originalContainer.style.width || '100%';
                parentNode.insertBefore(newContainer2, newContainer1.nextSibling);
            }
        }

        Object.entries(presets).forEach(([id, { bank, label }], index) => {
            const button = document.querySelector(`#${id}.no-bg.color-4.hover-brighten`);

            if (button) {
                if (replaceOriginals) {
                    // Style
                    button.addEventListener("click", (event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        currentBank = bank;
                        updateButtons();
                    }, true);

                    if (bankQuantity === 8 && originalContainer && parentNode && !newContainer1) {
                        newContainer1 = document.createElement('div');
                        newContainer1.style.display = 'flex';
                        newContainer1.style.flexWrap = 'wrap';
                        newContainer1.style.maxWidth = originalContainer.style.width || '100%';
                        parentNode.insertBefore(newContainer1, originalContainer.nextSibling);
                    }

                    if (bankQuantity === 8) {
                        const clonedButton = button.cloneNode(true);
                        const newId = `preset${index + 5}`;
                        // Style
                        clonedButton.id = newId;

                        const clonedSpan = clonedButton.querySelector(`#${id}-text`);
                        if (clonedSpan) {
                            clonedSpan.id = `${newId}-text`;
                            clonedSpan.textContent = extraPresets[newId].label;
                        }

                        newContainer1.appendChild(clonedButton);

                        clonedButton.addEventListener("click", (event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            currentBank = extraPresets[newId].bank;
                            updateButtons();
                        }, true);
                    }
                } else {
                    const newButton = button.cloneNode(true);
                    const newId = `button-${id}`;
                    // Style
                    newButton.id = newId;
                    newButton.style.height = '64px';
                    newButton.style.filter = 'hue-rotate(45deg)';

                    const newSpan = newButton.querySelector(`#${id}-text`);
                    if (newSpan) {
                        newSpan.id = `${newId}-text`;
                        newSpan.textContent = label;
                    }

                    newContainer1.appendChild(newButton);

                    newButton.addEventListener("click", (event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        currentBank = bank;
                        updateButtons();
                    }, true);
                }
            }
        });

        if (!replaceOriginals && bankQuantity === 8) {
            Object.entries(extraPresets).forEach(([id, { bank, label }], index) => {
                const origButton = document.querySelector(`#preset${index + 1}.no-bg.color-4.hover-brighten`);
                if (origButton) {
                    const extraButton = origButton.cloneNode(true);
                    // Style
                    extraButton.id = id;
                    extraButton.style.height = '64px';
                    extraButton.style.filter = 'hue-rotate(45deg)';

                    const extraSpan = extraButton.querySelector(`#preset${index + 1}-text`);
                    if (extraSpan) {
                        extraSpan.id = `${id}-text`;
                        extraSpan.textContent = label;
                    }

                    newContainer2.appendChild(extraButton);

                    extraButton.addEventListener("click", (event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        currentBank = bank;
                        updateButtons();
                    }, true);
                }
            });
        }

        Object.entries(presets).forEach(([id, { label }]) => {
            const span = document.querySelector(`#${id}-text`);
            if (span && replaceOriginals) {
                const observer = new MutationObserver((mutations, obs) => {
                    mutations.forEach(mutation => {
                        if (mutation.type === "childList" && span.textContent.trim() !== "") {
                            span.textContent = label;
                            obs.disconnect();
                        }
                    });
                });

                observer.observe(span, { childList: true, subtree: true });

                if (span.textContent.trim() !== "") {
                    span.textContent = label;
                    observer.disconnect();
                }
            }
        });
    });
}

// Insert the dropdown menu before the specified element
let targetElement;
if (bankMenuLocation !== 'hidden' && !bankDisplayAll) {
  if (bankMenuLocation == 'ims') {
    targetElement = document.querySelector('.panel-50.no-bg.br-0.h-100.m-0.button-ims');
  } else if (bankMenuLocation == 'bw') {
    targetElement = document.querySelector('#data-bw.panel-50');
  } else if (bankMenuLocation == 'ant') {
    targetElement = document.querySelector('#data-ant.panel-50');
  } else if (bankMenuLocation == 'eq') {
    targetElement = document.querySelector('.panel-50.no-bg.br-0.h-100.m-0.button-eq');
  } else if (bankMenuLocation == 'top' || bankMenuLocation == 'top-replace') {
    replacePresets();
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
  setTimeout(checkImageErrors, 200);
}

// Update buttons based on the selected bank
function updateButtons() {
  buttonContainer.innerHTML = ''; // Clear existing buttons
  // 30+ button display
  let buttonRows = 1;

  if (bankDisplayAll) {
    buttonRows = bankQuantity || 3;
  } else {
    buttonRows = 1;
  }

  for (let iAll = 0; iAll < buttonRows; iAll++) {
    // 30+ button display
    if (bankDisplayAll) {
      if (iAll >= 0 && iAll < bankQuantity) {
        currentBank = bankNames[iAll];
      } else {
        currentBank = '';
      }
    }

    let storedData = getStoredData(currentBank);
    let buttonValues = storedData.values;
    let psValues = storedData.ps;
    let buttonImages = storedData.images || [];
    let tooltipValues = storedData.tooltips || [];

    for (let i = 0; i < 10; i++) {
      (function(index) {
        let button = document.createElement("button");
        button.id = `setFrequencyButton${index}`;
        button.classList.add('tooltip-presets', 'tooltip-presets-once');
        button.setAttribute('data-tooltip', tooltipValues[index] || psValues[index]); // Tooltip uses data-station-name if available, otherwise psValue
        button.style.minWidth = "60px";
        button.style.width = "8%";
        button.style.height = "48px";
        
        updateButton(button, buttonValues[index], index);
        
        if (!isIOS) {
          // Default button handling
          button.addEventListener('click', function() {
            let commandInput = document.getElementById('commandinput');
            const presetInput = buttonValues[index];
            
            if (socket.readyState === WebSocket.OPEN) {
              socket.send("T" + (Math.round((presetInput).toFixed(3) * 1000)));
            }
            checkBankASum();
          });
          
          button.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            let dataFrequencyElement = document.getElementById('data-frequency');
            let dataPsElement = document.getElementById('data-ps');
            let dataStationNameElement = document.getElementById('data-station-name');
            let dataFrequency = dataFrequencyElement ? dataFrequencyElement.textContent : '87.5';
            let dataPs = dataPsElement ? dataPsElement.textContent : '';
            let tooltipValue = (dataStationNameElement && dataStationNameElement.offsetParent !== null) ? dataStationNameElement.textContent : dataPs;
            
            buttonValues[index] = parseFloat(dataFrequency) || 87.5;
            psValues[index] = dataPs;
            tooltipValues[index] = tooltipValue;
            buttonImages[index] = getImageSrc();
            updateButton(button, buttonValues[index], index);
            checkBankASum();
            if (typeof sendToast === 'function') { sendToast('info', 'Preset Buttons', `Frequency <strong>${buttonValues[index]} MHz</strong> saved to preset bank <b>${currentBank}</b>, button <b>#${(index + 1)}</b>.`, false, false); }
            console.log(`[${pluginName}] Preset saved:`, buttonValues[index], currentBank, (index + 1));
          });
        } else {
          // iOS button handling
          let longPressTimer;
          const LONG_PRESS_THRESHOLD = 500; // Long press functionality
          
          button.addEventListener('mousedown', function(e) {
              e.preventDefault();
              longPressTimer = setTimeout(() => {
                  savePreset();
              }, LONG_PRESS_THRESHOLD);
          });
          
          button.addEventListener('mouseup', function(e) {
              clearTimeout(longPressTimer);
              if (!e.defaultPrevented) {
                  recallPreset();
              }
          });
          
          button.addEventListener('touchstart', function(e) {
              e.preventDefault();
              longPressTimer = setTimeout(() => {
                  savePreset();
              }, LONG_PRESS_THRESHOLD);
          });
          
          button.addEventListener('touchend', function(e) {
              clearTimeout(longPressTimer);
              if (!e.defaultPrevented) {
                  recallPreset();
              }
          });
          
          function savePreset() {
            let dataFrequencyElement = document.getElementById('data-frequency');
            let dataPsElement = document.getElementById('data-ps');
            let dataStationNameElement = document.getElementById('data-station-name');
            let dataFrequency = dataFrequencyElement ? dataFrequencyElement.textContent : '87.5';
            let dataPs = dataPsElement ? dataPsElement.textContent : '';
            let tooltipValue = (dataStationNameElement && dataStationNameElement.offsetParent !== null) ? dataStationNameElement.textContent : dataPs;
            
            buttonValues[index] = parseFloat(dataFrequency) || 87.5;
            psValues[index] = dataPs;
            tooltipValues[index] = tooltipValue;
            buttonImages[index] = getImageSrc();
            updateButton(button, buttonValues[index], index);
            checkBankASum();
            if (typeof sendToast === 'function') { sendToast('info', 'Preset Buttons', `Frequency <strong>${buttonValues[index]} MHz</strong> saved to preset bank <b>${currentBank}</b>, button <b>#${(index + 1)}</b>.`, false, false); }
            console.log(`[${pluginName}] Preset saved:`, buttonValues[index], currentBank, (index + 1));
          }
          
          function recallPreset() {
            let commandInput = document.getElementById('commandinput');
            const presetInput = buttonValues[index];
            
            if (socket.readyState === WebSocket.OPEN) {
              socket.send("T" + (Math.round((presetInput).toFixed(3) * 1000)));
            }
            checkBankASum();
          }
        }
        
        // Handle keyboard events for SHIFT + S and SHIFT + R
        document.addEventListener('keydown', function(e) {
          let isButtonFocused = document.activeElement === button;

          if (isButtonFocused) {
            if (e.shiftKey && e.key === 'S') {
              // SHIFT + S key combination
              let dataFrequencyElement = document.getElementById('data-frequency');
              let dataPsElement = document.getElementById('data-ps');
              let dataFrequency = dataFrequencyElement ? dataFrequencyElement.textContent : '87.5';
              let dataPs = dataPsElement ? dataPsElement.textContent : '';
              
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
              let dataFrequencyElement = document.getElementById('data-frequency');
              let dataPsElement = document.getElementById('data-ps');
              let dataFrequency = dataFrequencyElement ? dataFrequencyElement.textContent : '87.5';
              let dataPs = dataPsElement ? dataPsElement.textContent : '';
              
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
            if (window.location.pathname !== '/setup') textElement.style.fontFamily = window.getComputedStyle(document.getElementById('data-ps')).fontFamily;
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
          // 30+ button display
          if (bankDisplayAll) {
            if (iAll >= 0 && iAll < bankQuantity) {
              currentBank = bankNames[iAll];
            } else {
              currentBank = '';
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
  createImportExportButtons();
}

// Set default bank to A and update buttons on load
currentBank = 'A';
updateButtons();

// Find the container to insert the button container after
const container = document.querySelector('.wrapper-outer #wrapper .flex-container') || document.querySelector('#wrapper-outer #wrapper .flex-container');

// Insert the button container after the container
if (document.getElementById('rt-container')) {
  container.parentNode.insertBefore(buttonContainer, container.nextSibling);
}

// Function to toggle the visibility of the button container
function toggleButtonContainer(statusToast) {
  // Check the localStorage value
  const isHidden = JSON.parse(localStorage.getItem(DISPLAY_KEY_ButtonPresets)) == true;
  if (isHidden) {
    if (typeof sendToast === 'function') {
      sendToast('info', 'Preset Buttons', 'Preset Buttons hidden.', false, false);
      console.log(`[${pluginName}] Button Preset plugin hidden`);
    }
    let element = document.getElementById('plugin-button-presets');
    element.style.setProperty('display', 'none');
    const buttonPresetsBankDropdown = document.getElementById('button-presets-bank-dropdown');
    if (buttonPresetsBankDropdown) buttonPresetsBankDropdown.style.display = 'none';
    let infoIconContainer = document.getElementById('button-presets-info-icon-container');
    
    if (infoIconContainer) {
      infoIconContainer.style.display = 'none';

      let styleButtonPresetsHide = document.createElement('style');
      styleButtonPresetsHide.innerHTML = `
        /* Preserve bottom margin (panels.css:93) */
        @media only screen and (min-width: 960px) and (max-height: 860px) {
            .wrapper-outer #wrapper .flex-container .panel-10.no-bg.m-0 .panel-10.no-bg.h-100 {
                height: 120px !important;
            }
        }
      `;
      // Append the style to the head of the document
      document.head.appendChild(styleButtonPresetsHide);
    }
    
  } else {
    if (typeof sendToast === 'function' && statusToast) {
      sendToast('info', 'Preset Buttons', 'Preset Buttons restored.', false, false);
      console.log(`[${pluginName}] Button Preset plugin restored`);
    }
    let element = document.getElementById('plugin-button-presets');
    if (window.location.pathname !== '/setup') element.style.setProperty('display', 'flex');
    
    if (window.innerWidth >= 768) {
      let dropdown = document.getElementById('button-presets-bank-dropdown');
      if (dropdown) {
        dropdown.style.display = 'block';
      }
    }
    
    let infoIconContainer = document.getElementById('button-presets-info-icon-container');
    if (infoIconContainer) {
      infoIconContainer.style.display = 'flex';

      let styleButtonPresetsHide = document.createElement('style');
      styleButtonPresetsHide.innerHTML = `
        /* Preserve bottom margin (panels.css:93) */
        @media only screen and (min-width: 960px) and (max-height: 860px) {
            .wrapper-outer #wrapper .flex-container .panel-10.no-bg.m-0 .panel-10.no-bg.h-100 {
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
  let tooltipText;
  $('.tooltip-presets-once').hover(function(e) {
    // Never display again after first click
    if (tooltipFirstLoad == true) { return; } else { tooltipFirstLoad = true; }
    $(document).on('mousedown', () => { clearTimeout($(this).data('timeout')); return; });
    if (!document.querySelector('.tooltip-presets-once')) { return; }
    if (!/Mobi|Android|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)) {
      tooltipText = `
            <strong><i>Left-click</i></strong> or <strong><i>ENTER</i></strong> to recall the preset.<br>
            <strong><i>Right-click</i></strong>, <strong><i>CTRL+click</i></strong>, or <strong><i>SHIFT+S</i></strong> to store the preset.<br>
            <strong><i>Middle-click</i></strong> or <strong><i>SHIFT+click</i></strong>, or <strong><i>SHIFT+R</i></strong> to reset the preset.<br>
            <strong>Stored presets do not affect other browsers.</strong>
            `;
    } else {
      tooltipText = `
            Tap to recall the preset.<br>
            Long press to store the preset.<br>
            <strong>Stored presets do not affect other browsers.</strong>
            `;
    }
    // Add a delay of 500 milliseconds before creating and appending the tooltip
    $(this).data('timeout', setTimeout(() => {
      let tooltip = $('<div class="tooltiptext"></div>').html(tooltipText);
      $('body').append(tooltip);
      
      let posX = e.pageX;
      let posY = e.pageY;
      
      let tooltipWidth = tooltip.outerWidth();
      let tooltipHeight = tooltip.outerHeight();
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
    let tooltipWidth = $('.tooltiptext').outerWidth();
    let tooltipHeight = $('.tooltiptext').outerHeight();
    let posX = e.pageX - tooltipWidth / 2;
    let posY = e.pageY - tooltipHeight - 10;
    
    $('.tooltiptext').css({ top: posY, left: posX });
  });
}

// #################### SIDE BAR MENU SETTINGS #################### //

// ********** Display additional options in side menu **********
function AdditionalCheckboxesDisplayAll() { // ########## SHOW ALL PRESET BUTTONS ##########
    // Insert HTML after second element with class 'form-group checkbox'
    function insertHtmlAfterSecondCheckbox() {
        // Select all elements with class 'form-group checkbox'
        const checkboxes = document.querySelectorAll('.modal-panel-content .form-group');
        
        // Check if there are at least two such elements
        if (checkboxes.length > 0) {
            // Create new HTML element
            const newDiv = document.createElement('div');
            newDiv.className = 'form-group';
            newDiv.innerHTML = `
                <div class="switch flex-container flex-phone flex-phone-column flex-phone-center">
                    <input type="checkbox" tabindex="0" id="show-all-preset-buttons" aria-label="Show all preset buttons">
                    <label for="show-all-preset-buttons" class="tooltip" data-tooltip="Enable to display all preset banks on screen."></label>
                    <span class="text-smaller text-uppercase text-bold color-4 p-10">Show All Presets</span>
                </div>
            `;
            
            // Insert new element after last
            const lastCheckbox = checkboxes[checkboxes.length - 1];
            lastCheckbox.insertAdjacentElement('afterend', newDiv);
        } else {
            console.warn(`[${pluginName}] There are less than two elements with class "form-group checkbox".`);
        }
    }
    insertHtmlAfterSecondCheckbox();

    let isDisplayAll = localStorage.getItem("buttonPresetsDisplayAll");
    if (isDisplayAll === "true") {
        $("#show-all-preset-buttons").prop("checked", true);
    }

    $("#show-all-preset-buttons").change(function() {
        let isChecked = $(this).is(":checked");
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
          console.log(`[${pluginName}] buttonPresetsDisplayAll = false`);
        } else {
          bankDisplayAll = true;
          bankDisplayAllGap();
          toggleButtonContainer();
          const buttonPresetsBankDropdown = document.getElementById('button-presets-bank-dropdown');
          if (buttonPresetsBankDropdown) buttonPresetsBankDropdown.style.display = 'none';
          updateButtons();
          console.log(`[${pluginName}] buttonPresetsDisplayAll = true`);
        }
        checkImageErrors();
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
    const checkboxes = document.querySelectorAll('.modal-panel-content .form-group');
    
    // Check if there are at least two such elements
    if (checkboxes.length > 0) {
      // Create new HTML element
      const newDiv = document.createElement('div');
      newDiv.className = 'form-group';
      newDiv.innerHTML = `
                <div class="switch flex-container flex-phone flex-phone-column flex-phone-center">
                    <input type="checkbox" tabindex="0" id="hide-preset-buttons" aria-label="Hide preset buttons">
                    <label for="hide-preset-buttons" class="tooltip" data-tooltip="Enable if you do not want to use the preset buttons."></label>
                    <span class="text-smaller text-uppercase text-bold color-4 p-10">Hide Preset Buttons</span>
                </div>
            `;
      
      // Insert new element after last
      const lastCheckbox = checkboxes[checkboxes.length - 1];
      lastCheckbox.insertAdjacentElement('afterend', newDiv);
    } else {
      console.warn(`[${pluginName}] There are less than two elements with class "form-group checkbox".`);
    }
  }
  insertHtmlAfterSecondCheckbox();
  
  let isButtonPresetsHidden = localStorage.getItem(DISPLAY_KEY_ButtonPresets);
  if (isButtonPresetsHidden === "true") {
    $("#hide-preset-buttons").prop("checked", true);
  }
  
  $("#hide-preset-buttons").change(function() {
    let isChecked = $(this).is(":checked");
    localStorage.setItem(DISPLAY_KEY_ButtonPresets, isChecked);
    toggleButtonContainer(true);
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
  let infoIconContainer = document.createElement('div');
  infoIconContainer.id = 'button-presets-info-icon-container'; // Assign an ID for later use
  infoIconContainer.style.position = 'absolute';
  infoIconContainer.style.bottom = '60px';
  infoIconContainer.style.right = '36px';
  infoIconContainer.style.display = 'flex';
  infoIconContainer.style.flexDirection = 'column';
  infoIconContainer.style.alignItems = 'center';
  infoIconContainer.style.imageRendering = 'auto';
  
  // Create the FontAwesome info icon
  let infoIcon = document.createElement('i');
  infoIcon.id = 'info-icon'; // Assign an ID to the icon itself
  infoIcon.classList.add('fa-solid', 'fa-circle-question');
  infoIcon.style.fontSize = '20px';
  infoIcon.style.cursor = 'pointer';
  
  // Add event listener to show alert when icon is clicked
  infoIcon.addEventListener('click', function() {
    if (typeof pluginThemedPopup !== 'undefined') {
      alert(`<strong>PRESET BUTTONS</strong>
            <i>This feature allows you to store up to ${bankQuantity * 10} presets, with 10 presets per bank.
            To store a frequency:</i>

            <strong><i>Left-click</i></strong> or <strong><i>ENTER</i></strong> to recall the preset.
            <strong><i>Right-click</i></strong>, <strong><i>CTRL+click</i></strong>, or <strong><i>SHIFT+S</i></strong> to store the preset.
            <strong><i>Middle-click</i></strong>, <strong><i>SHIFT+click</i></strong>, or <strong><i>SHIFT+R</i></strong> to reset the preset.
            
            Use the <b>Bank</b> dropdown menu to select from Banks <i>A</i>, <i>B</i>, or <i>C</i>.

            <strong>Stored presets are saved only on the current browser.</strong><br>
            `, 'Close');
    } else {
      alertButtonPresets(`<strong>PRESET BUTTONS</strong>
            <i>This feature allows you to store up to ${bankQuantity * 10} presets, with 10 presets per bank.
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
  if (window.location.pathname !== '/setup') document.body.appendChild(infoIconContainer);
}

// Function to hide the info icon
function hideInfoIcon() {
  let infoIconContainer = document.getElementById('button-presets-info-icon-container');
  if (infoIconContainer) {
    infoIconContainer.style.display = 'none';
  }
}

// Function to show the info icon
function showInfoIcon() {
  let infoIconContainer = document.getElementById('button-presets-info-icon-container');
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

function checkImageErrors() {
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
}

checkImageErrors();

// Export presets to file
function exportLocalStorageToFile() {
  const data = {};
  bankNames.forEach(bank => {
    const key = `buttonPresets${bank}`;
    const value = localStorage.getItem(key);
    if (value !== null) { // Check if bank exists in localStorage
      data[key] = value;
    }
  });

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

      bankNames.forEach(bank => {
        const key = `buttonPresets${bank}`;
        if (data[key]) {
          localStorage.setItem(key, data[key]);
        }
      });

      updateButtons();

      setTimeout(() => {
        createImportExportButtons();
      }, 100);

      checkImageErrors();

      if (typeof sendToast === 'function') {
        sendToast('success', 'Preset Buttons Import', 'Preset data successfully imported.', false, false);
      }
      console.log(`[${pluginName}] Button Preset localStorage updated successfully`);
    } catch (e) {
      if (typeof sendToast === 'function') {
        sendToast('error', 'Preset Buttons Import', 'Error importing preset data.', false, false);
      }
      console.error('Unable to import localStorage preset data', e);
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
  exportButton.style.right = window.innerHeight > 720 ? '-10px' : '-10px'; // Previousy -10px, -2px
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
  importButton.style.right = window.innerHeight > 720 ? '-10px' : '-10px'; // Previousy -10px, -2px
  importButton.style.bottom = '10px';
  if (!/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    importButton.style.marginRight = '0';
  }

  // Add click event listeners
  importButton.addEventListener('click', createFileInputAndImport);
  exportButton.addEventListener('click', exportLocalStorageToFile);

  // Add the buttons to the #plugin-button-presets element
  const pluginButtonPresets = document.querySelector('#plugin-button-presets');
  if (pluginButtonPresets !== null) {
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
}

// Call function to create and append import/export buttons
createImportExportButtons();

/*
    Themed Popups v1.1.2 by AAD
    https://github.com/AmateurAudioDude/FM-DX-Webserver-Plugin-Themed-Popups
*/

let styleElementButtonPresets = document.createElement('style');
let cssCodeThemedPopupsButtonPresets = `
/* Themed Popups CSS */
.popup-plugin {
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

.popup-plugin-content {
    text-align: center;
}

.popup-plugin button {
    margin-top: 10px;
}

.popup-plugin.open {
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
        popup.classList.add('popup-plugin');
        popup.innerHTML = `<div class="popup-plugin-content">${popupMessage.replace(/\n/g, '<br>')}<button id="popup-plugin-close">${popupButton}</button></div>`;
        document.body.appendChild(popup);

        let closeButton = popup.querySelector('#popup-plugin-close');
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
let popupOpened = false;
let popup;

let popupPromptOpened = false;
let idModal = document.getElementById('myModal');

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
    if (popupOpened && (event.key === 'Escape' || event.key === 'Enter')) {
        closePopup(event);
        blurBackground(false);
    }
});

// Event listener for clicks outside the popup to close it
document.addEventListener('click', function(event) {
    if (popupOpened && !popup.contains(event.target)) {
        closePopup(event);
        blurBackground(false);
    }
});

// Function for update notification in /setup
function checkUpdate(setupOnly, pluginVersion, pluginName, urlUpdateLink, urlFetchLink) {
    if (setupOnly && window.location.pathname !== '/setup') return;

    // Function to check for updates
    async function fetchFirstLine() {
        const urlCheckForUpdate = urlFetchLink;

        try {
            const response = await fetch(urlCheckForUpdate);
            if (!response.ok) {
                throw new Error(`[${pluginName}] update check HTTP error! status: ${response.status}`);
            }

            const text = await response.text();
            const lines = text.split('\n');

            let version;

            if (lines.length > 2) {
                const versionLine = lines.find(line => line.includes("const pluginVersion =") || line.includes("const plugin_version ="));
                if (versionLine) {
                    const match = versionLine.match(/const\s+plugin[_vV]ersion\s*=\s*['"]([^'"]+)['"]/);
                    if (match) {
                        version = match[1];
                    }
                }
            }

            if (!version) {
                const firstLine = lines[0].trim();
                version = /^\d/.test(firstLine) ? firstLine : "Unknown"; // Check if first character is a number
            }

            return version;
        } catch (error) {
            console.error(`[${pluginName}] error fetching file:`, error);
            return null;
        }
    }

    // Check for updates
    fetchFirstLine().then(newVersion => {
        if (newVersion) {
            if (newVersion !== pluginVersion) {
                let updateConsoleText = "There is a new version of this plugin available";
                // Any custom code here
                
                console.log(`[${pluginName}] ${updateConsoleText}`);
                setupNotify(pluginVersion, newVersion, pluginName, urlUpdateLink);
            }
        }
    });

    function setupNotify(pluginVersion, newVersion, pluginName, urlUpdateLink) {
        if (window.location.pathname === '/setup') {
          const pluginSettings = document.getElementById('plugin-settings');
          if (pluginSettings) {
            const currentText = pluginSettings.textContent.trim();
            const newText = `<a href="${urlUpdateLink}" target="_blank">[${pluginName}] Update available: ${pluginVersion} --> ${newVersion}</a><br>`;

            if (currentText === 'No plugin settings are available.') {
              pluginSettings.innerHTML = newText;
            } else {
              pluginSettings.innerHTML += ' ' + newText;
            }
          }

          const updateIcon = document.querySelector('.wrapper-outer #navigation .sidenav-content .fa-puzzle-piece') || document.querySelector('.wrapper-outer .sidenav-content') || document.querySelector('.sidenav-content');

          const redDot = document.createElement('span');
          redDot.style.display = 'block';
          redDot.style.width = '12px';
          redDot.style.height = '12px';
          redDot.style.borderRadius = '50%';
          redDot.style.backgroundColor = '#FE0830' || 'var(--color-main-bright)'; // Theme colour set here as placeholder only
          redDot.style.marginLeft = '82px';
          redDot.style.marginTop = '-12px';

          updateIcon.appendChild(redDot);
        }
    }
}

if (CHECK_FOR_UPDATES) checkUpdate(pluginSetupOnlyNotify, pluginVersion, pluginName, pluginHomepageUrl, pluginUpdateUrl);

})();
