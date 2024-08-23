/*
    Button Presets v1.0.0 by AAD
    https://github.com/AmateurAudioDude
*/

// Create a style element
var styleButtonPresets = document.createElement('style');
styleButtonPresets.innerHTML = `
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
    padding: 6px 26px 6px 26px;
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
    display: none; /* Hide tooltip if data-tooltip is empty */
  }
`;

// Append the style to the head of the document
document.head.appendChild(styleButtonPresets);

var tooltipFirstLoad = false;

// Create a container for the buttons
var buttonContainer = document.createElement("div");
buttonContainer.id = "plugin-button-presets";
buttonContainer.classList.add('button-presets', 'flex-container', 'flex-center', 'show-phone');
buttonContainer.style.display = "flex"; // Arrange buttons side by side
buttonContainer.style.flexWrap = "wrap"; // Wrap buttons if they overflow
buttonContainer.style.gap = "4px"; // Space between buttons
buttonContainer.style.marginLeft = "6px";
buttonContainer.style.marginRight = "6px";

// Get stored button values and data-ps values from localStorage or initialise them
const STORAGE_KEY = 'buttonPresets';
const DISPLAY_KEY = 'buttonPresetsHidden';
let storedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || { values: Array(10).fill(87.5), ps: Array(10).fill('') };
let buttonValues = storedData.values;
let psValues = storedData.ps;

// Create and add buttons
for (let i = 0; i < 10; i++) {
    (function(index) {
        // Create button
        var button = document.createElement("button");
        button.id = `setFrequencyButton${index}`;
        
        // Add tooltip class
        button.classList.add('tooltip-presets', 'tooltip-presets-once');
        button.setAttribute('data-tooltip', psValues[index]);

        // Set width and height for button sizes
        button.style.minWidth = "60px";
        button.style.width = "8%";
        button.style.height = "48px";

        // Set the button text and tooltip on page load
        updateButton(button, buttonValues[index], index);

        // Add event listeners for different click types
        button.addEventListener('click', function() {
            var commandInput = document.getElementById('commandinput');
            const presetInput = buttonValues[index];
            
            if (socket.readyState === WebSocket.OPEN) {
                socket.send("T" + (presetInput * 1000));
            }
        });

        button.addEventListener('contextmenu', function(e) {
            e.preventDefault(); // Prevent the default right-click menu
            var dataFrequencyElement = document.getElementById('data-frequency');
            var dataPsElement = document.getElementById('data-ps');
            var dataFrequency = dataFrequencyElement ? dataFrequencyElement.textContent : '87.5'; // Get the value from #data-frequency
            var dataPs = dataPsElement ? dataPsElement.textContent : ''; // Get the value from #data-ps

            buttonValues[index] = parseFloat(dataFrequency) || 87.5;
            psValues[index] = dataPs;
            updateButton(button, buttonValues[index], index);
        });

        button.addEventListener('mousedown', function(e) {
                if (e.button === 1 || e.ctrlKey || (e.shiftKey && e.button === 0)) { // Middle-click, Control + Click, or Shift + Left-click
                    if (e.button === 1 || (e.shiftKey && e.button === 0)) {
                        buttonValues[index] = 87.5;
                        psValues[index] = ''; // Reset associated ps value
                } else if (e.ctrlKey) {
                    var dataFrequencyElement = document.getElementById('data-frequency');
                    var dataPsElement = document.getElementById('data-ps');
                    var dataFrequency = dataFrequencyElement ? dataFrequencyElement.textContent : '87.5'; // Get the value from #data-frequency
                    var dataPs = dataPsElement ? dataPsElement.textContent : ''; // Get the value from #data-ps

                    buttonValues[index] = parseFloat(dataFrequency) || 87.5;
                    psValues[index] = dataPs;
                }
                updateButton(button, buttonValues[index], index);
            }
        });

        // Function to update the button's text and save value
        function updateButton(button, value, index) {
            const psValue = psValues[index];
            const displayText = psValue ? `${formatValue(value).trim()}<span id="button-preset-ps" style="display: block; margin-top: -2px; white-space: nowrap; overflow: hidden; font-weight: 600;">${psValue.trim()}</span>` : formatValue(value).trim();
            button.innerHTML = displayText; // Update button text with frequency and psValue
            button.setAttribute('data-tooltip', psValue.trim()); // Update data-tooltip attribute for tooltip
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ values: buttonValues, ps: psValues })); // Save updated values to localStorage
        }

        // Function to format the value with conditional decimal places
        function formatValue(value) {
            const fixedValue = value.toFixed(2); // Format with two decimal places
            return fixedValue.endsWith('0') ? fixedValue.slice(0, -1) : fixedValue; // Remove trailing zero if present
        }

        // Append button to the container
        buttonContainer.appendChild(button);
    })(i); // Pass the current loop index to the IIFE
}

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
    } else {
        var element = document.getElementById('plugin-button-presets');
        element.style.setProperty('display', 'flex');
    }
}

// Call the toggle function on page load
toggleButtonContainer();

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
