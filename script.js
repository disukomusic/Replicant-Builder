// script.js
const handleTypeSelect = document.querySelector('#handle-type');
const bladeTypeSelect = document.querySelector('#blade-type');
const bladeOptionsSelect = document.querySelector('#blade-options-type'); 
const spacerSelect = document.querySelector('#spacer-type'); // Updated ID
const linersSelect = document.querySelector('#liners-type'); // Updated ID
const scalesSelect = document.querySelector('#scale-type');   // Updated ID
const totalPriceSpan = document.querySelector('#total-price');
const totalWeightSpan = document.querySelector('#total-weight');
const balanceSpan = document.querySelector('#balance');


const handleOptions = [
  { 
    name: 'Channel Handles', 
    price: 0, 
    weight: 0
  },
  {
    name: 'Sandwich Handles',
    price: 0,
    weight: 0,
    spacers: [
      { name: 'Zippy Spacers', price: 34, weight: 0.44, buyLink: 'https://zippybalisong.com/products/brs-replicant-spacers-shatter-proof-polyurethane-adjustable-weight' },
      { name: 'FF Full Length Aluminum', price: 25, weight: 0.5, buyLink: 'https://www.etsy.com/listing/1316018079/aluminum-full-length-replicant-spacers' },
      { name: 'MCK Glowcarbon Channel', price: 95, weight: 0.5, buyLink: 'https://www.etsy.com/listing/1316018079/aluminum-full-length-replicant-spacers' }

    ],
    liners: [
      { name: 'FF Ghost Liners', price: 75, weight: 10, buyLink: 'https://www.etsy.com/listing/1054502414/ff-ghost-liners?show_sold_out_detail=1&ref=nla_listing_details' },
      { name: 'PLACEHOLDER', price: 0, weight: 0, buyLink: 'https://example.com/buy-heavy-liner' }
      // ... other liner options
    ],
    scales: [
      { name: 'Spasmfingers White Slot G10', price: 69, weight: 0.5, buyLink: 'https://www.etsy.com/listing/1547669071/white-slot-g10-replicant-scales?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=rep+scales&ref=sr_gallery-1-3&cns=1&organic_search_click=1' },
      { name: 'PLACEHOLDER', price: 0, weight: 0, buyLink: '' }
      // ... other scale options
    ]
  }
  // ... other options
];

const bladeOptions = [
  { 
    name: 'Trainer', 
    options: [
      { name: 'Hourglass Tanto', price: 120, weight: 1.45, buyLink: 'https://hourglassblades.com/ols/products/replicant-tanto-trainer-blade' },
      { name: 'Hourglass Alt', price: 120, weight: 1.45, buyLink: 'https://hourglassblades.com/ols/products/hourglass-replicant-alt-trainer-blade' }	  
      // ... other trainer blade options
    ]
  },
  { 
    name: 'Live Blade', 
    options: [
      { name: 'Stock Alt', price: 120, weight: 1.5, buyLink: 'https://example.com/buy-live-blade-1' },
      { name: 'Stock Tanto', price: 130, weight: 1.5, buyLink: 'https://example.com/buy-live-blade-2' }
      // ... other live blade options
    ]
  }
  // ... other options
];

// Populate select options
const populateSelect = (selectElement, options) => {
  selectElement.innerHTML = options.map((option, index) => {
    const priceString = option.price !== undefined && option.price !== 0 ? `$${option.price}` : '';
    const weightString = option.weight !== undefined && option.weight !== 0 ? `${option.weight} oz` : '';
    return `<option value="${index}">${option.name} ${priceString} ${weightString}</option>`;
  }).join('');
};

handleTypeSelect.addEventListener('change', handleTypeChanged);
bladeTypeSelect.addEventListener('change', bladeTypeChanged);
bladeOptionsSelect.addEventListener('change', calculateSummary);
spacerSelect.addEventListener('change', calculateSummary);
linersSelect.addEventListener('change', calculateSummary);
scalesSelect.addEventListener('change', calculateSummary);

function handleTypeChanged() {
  const selectedHandle = handleOptions[handleTypeSelect.selectedIndex];
  if (selectedHandle.spacers) {
    populateSelect(spacerSelect, selectedHandle.spacers);
    populateSelect(linersSelect, selectedHandle.liners); // Populate liners select
    populateSelect(scalesSelect, selectedHandle.scales); // Populate scales select
  } else {
    spacerSelect.innerHTML = '';
    linersSelect.innerHTML = ''; // Clear liners select
    scalesSelect.innerHTML = ''; // Clear scales select
  }
  calculateSummary();
}

function bladeTypeChanged() {
  const selectedBladeType = bladeOptions[bladeTypeSelect.selectedIndex];
  populateSelect(bladeOptionsSelect, selectedBladeType.options);
  bladeOptionsSelect.style.display = 'block';
  calculateSummary();
}

function updateBuyLinksSummary(selectedHandle, selectedBlade, selectedSpacer, selectedLiner, selectedScale) {
  const buyLinksContainer = document.getElementById('buy-links');
  buyLinksContainer.innerHTML = ''; // Clear existing content

  // Generate and append buy links for selected parts
  const selectedParts = [selectedHandle, selectedBlade, selectedSpacer, selectedLiner, selectedScale];
  selectedParts.forEach(part => {
    if (part && part.buyLink) {
      const buyLink = document.createElement('p');
      const partType = part.name.toUpperCase();
      const linkText = `BUY ${partType} ${part.name.toUpperCase()}`;
      buyLink.innerHTML = `<a class="buy-link" href="${part.buyLink}" target="_blank">${linkText}</a>`;
      buyLinksContainer.appendChild(buyLink);
    }
  });
}


function calculateSummary() {
  const selectedHandle = handleOptions[handleTypeSelect.selectedIndex];
  const selectedBladeType = bladeOptions[bladeTypeSelect.selectedIndex];
  const selectedBladeOption = selectedBladeType.options[bladeOptionsSelect.selectedIndex];
  let selectedSpacer = null;
  let selectedLiner = null;
  let selectedScale = null;

  if (selectedHandle.spacers) {
    selectedSpacer = selectedHandle.spacers[spacerSelect.selectedIndex];
    selectedLiner = selectedHandle.liners[linersSelect.selectedIndex];
    selectedScale = selectedHandle.scales[scalesSelect.selectedIndex];
  }

  let totalPrice = selectedHandle.price + (selectedBladeOption ? selectedBladeOption.price : 0);
  let totalWeight = selectedHandle.weight + (selectedBladeOption ? selectedBladeOption.weight : 0);

  if (selectedSpacer) {
    totalPrice += selectedSpacer.price || 0;
    totalWeight += selectedSpacer.weight || 0;
  }

  if (selectedLiner) {
    totalPrice += selectedLiner.price || 0;
    totalWeight += selectedLiner.weight || 0;
  }

  if (selectedScale) {
    totalPrice += selectedScale.price || 0;
    totalWeight += selectedScale.weight || 0;
  }

  totalPriceSpan.textContent = `$${totalPrice}`;
  totalWeightSpan.textContent = totalWeight !== 0 ? `${totalWeight}oz` : '0oz';

  // Calculate the estimated balance
  const handleWeight = selectedHandle.weight || 0;
  const bladeWeight = selectedBladeOption ? selectedBladeOption.weight || 0 : 0;
  const totalWeightSum = handleWeight + bladeWeight;

  let estimatedBalance = '';

  if (totalWeightSum !== 0 && !isNaN(totalWeightSum)) {
    if (handleWeight > bladeWeight) {
      estimatedBalance = 'Handle Bias';
    } else if (bladeWeight > handleWeight) {
      estimatedBalance = 'Blade Bias';
    } else {
      estimatedBalance = 'Neutral';
    }
  }
  
	balanceSpan.textContent = estimatedBalance;

  // Populate buy links in the summary
  const buyLinks = [];

  if (selectedSpacer && selectedSpacer.buyLink) {
    buyLinks.push(`<a href="${selectedSpacer.buyLink}" target="_blank">BUY ${selectedSpacer.name} SPACERS</a>`);
  }

  if (selectedLiner && selectedLiner.buyLink) {
    buyLinks.push(`<a href="${selectedLiner.buyLink}" target="_blank">BUY ${selectedLiner.name} LINERS</a>`);
  }

  if (selectedScale && selectedScale.buyLink) {
    buyLinks.push(`<a href="${selectedScale.buyLink}" target="_blank">BUY ${selectedScale.name} SCALES</a>`);
  }

  if (selectedBladeOption && selectedBladeOption.buyLink) {
    buyLinks.push(`<a href="${selectedBladeOption.buyLink}" target="_blank">BUY ${selectedBladeOption.name} BLADE</a>`);
  }

  // Display buy links in the summary
  document.querySelector('#buy-links').innerHTML = buyLinks.join('<br>');
}


// Populate the handle type and blade type dropdowns
populateSelect(handleTypeSelect, handleOptions);
populateSelect(bladeTypeSelect, bladeOptions);

// Initial calculation
calculateSummary();
