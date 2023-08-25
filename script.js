// script.js
const baseTypeSelect = document.querySelector('#base-type');
const handleTypeSelect = document.querySelector('#handle-type');
const bladeTypeSelect = document.querySelector('#blade-type');
const bladeOptionsSelect = document.querySelector('#blade-options-type'); 
const spacerSelect = document.querySelector('#spacer-type'); // Updated ID
const linersSelect = document.querySelector('#liners-type'); // Updated ID
const scalesSelect = document.querySelector('#scale-type');   // Updated ID
const totalPriceSpan = document.querySelector('#total-price');
const totalWeightSpan = document.querySelector('#total-weight');
const balanceSpan = document.querySelector('#balance');

const baseOptions = [
  { 
    name: 'None', 
    price: 0, 
    weight: 0
  },
  { 
    name: 'Stock Rep', 
    price: 379, 
    weight: 0,
	buyLink: 'https://www.bladerunnerssystems.com/products/brs-replicant-alt'
  },
  { 
    name: 'B+ Clone Rep', 
    price: 65, 
    weight: 0,
	buyLink: 'https://kolisong.com/products/baliplus-brs-replicant-rep-balisong-clone'
  }
];

const handleOptions = [
  { 
    name: 'Channel', 
    price: 0, 
    weight: 0
  },
  {
    name: 'Sandwich Handles',
    price: 0,
    weight: 0,
    spacers: [
	  { name: 'None', price: 0, weight: 0},
	  
      { name: 'Zippy Spacers', price: 34, weight: 0.44, 
		buyLink: 'https://zippybalisong.com/products/brs-replicant-spacers-shatter-proof-polyurethane-adjustable-weight', 
		imageLink: 'partpics/zippyspacer.png'},
		
      { name: 'FF Full Length Aluminum', price: 25, weight: 0.5, 
		buyLink: 'https://www.etsy.com/listing/1316018079/aluminum-full-length-replicant-spacers' },
		
      { name: 'MCK Glowcarbon Channel', price: 95, weight: 0.5, 
	  buyLink: 'https://www.etsy.com/listing/1316018079/aluminum-full-length-replicant-spacers', imageLink: 'https://mckbalisong.com/cdn/shop/products/20220811_220606.jpg?v=1675039178&width=713'}

    ],
    liners: [
      { name: 'None', price: 0, weight: 0},
	  
      { name: 'FF Ghost Liners', price: 75, weight: 0.5,
		buyLink: 'https://www.etsy.com/listing/1054502414/ff-ghost-liners', imageLink: 'https://i.etsystatic.com/24986546/r/il/72dbbb/3267528392/il_794xN.3267528392_6ozm.jpg' },
			  
	],
    scales: [
      { name: 'None', price: 0, weight: 0},
	  
      { name: 'Spasmfingers White Slot G10', price: 69, weight: 0.5, 
		buyLink: 'https://www.etsy.com/listing/1547669071/white-slot-g10-replicant-scales' , 
		imageLink: 'https://i.etsystatic.com/37542554/r/il/ad8321/5202150506/il_794xN.5202150506_rz2f.jpg'},
    ]
  }
  // ... other options
];

const bladeOptions = [
  { 
    name: 'Trainer', 
    options: [
	  { name: 'None', price: 0, weight: 0},
      { name: 'Hourglass Tanto', price: 120, weight: 1.45, buyLink: 'https://hourglassblades.com/ols/products/replicant-tanto-trainer-blade' },
      { name: 'Hourglass Alt', price: 120, weight: 1.45, buyLink: 'https://hourglassblades.com/ols/products/hourglass-replicant-alt-trainer-blade' }	  
    ]
  },
  { 
    name: 'Live Blade', 
    options: [
	  { name: 'None', price: 0, weight: 0},
      { name: 'Stock Alt', price: 120, weight: 1.5, buyLink: 'https://example.com/buy-live-blade-1', imageLink: 'https://www.bladerunnerssystems.com/cdn/shop/products/altrep_2048x.jpg'},
      { name: 'Stock Tanto', price: 130, weight: 1.5, buyLink: 'https://example.com/buy-live-blade-2' },
	  { name: 'Clone Tanto', price: 9, weight: 1.5, buyLink: 'https://www.aliexpress.us/item/3256803508936610.html?gatewayAdapt=glo2usa4itemAdapt' },
	  { name: 'Clone Alt', price: 9, weight: 1.5, buyLink: 'https://www.aliexpress.us/item/3256803508936610.html?gatewayAdapt=glo2usa4itemAdapt' },
	  { name: 'MCChickenGod Damascus', price: 425, weight: 1.5, buyLink: 'https://mchickengod.myshopify.com/products/damascus-reblades?variant=41008269230163', imageLink: 'https://mchickengod.myshopify.com/cdn/shop/files/image_53f15a80-8a2c-4edb-b949-a2af340299ca.heic?v=1692406427&width=823'}
    ]
  }
];

// Populate select options
const populateSelect = (selectElement, options) => {
  selectElement.innerHTML = options.map((option, index) => {
    const priceString = option.price !== undefined && option.price !== 0 ? `$${option.price}` : '';
    const weightString = option.weight !== undefined && option.weight !== 0 ? `${option.weight} oz` : '';
    return `<option value="${index}"> ${option.name} | ${priceString} | ${weightString}</option>`;
  }).join('');
};

populateSelect(baseTypeSelect, baseOptions);

baseTypeSelect.addEventListener('change', calculateSummary);
handleTypeSelect.addEventListener('change', handleTypeChanged);
bladeTypeSelect.addEventListener('change', bladeTypeChanged);
bladeOptionsSelect.addEventListener('change', calculateSummary);
spacerSelect.addEventListener('change', calculateSummary);
linersSelect.addEventListener('change', calculateSummary);
scalesSelect.addEventListener('change', calculateSummary);


function updateImage(part, imageElement) {
  if (part && part.imageLink) {
    imageElement.src = part.imageLink;
    imageElement.style.display = 'block';
  } else {
    imageElement.src = '';
    imageElement.style.display = 'none';
  }
}

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
  updateImage(selectedHandle, document.getElementById('handle-image'));
  calculateSummary();
}

function bladeTypeChanged() {
  const selectedBladeType = bladeOptions[bladeTypeSelect.selectedIndex];
  populateSelect(bladeOptionsSelect, selectedBladeType.options);
  bladeOptionsSelect.style.display = 'block';
  updateImage(selectedBladeType, document.getElementById('blade-image')); // Update blade image
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
  const selectedBase = baseOptions[baseTypeSelect.selectedIndex];
  let selectedSpacer = null;
  let selectedLiner = null;
  let selectedScale = null;


  if (selectedHandle.spacers) {
    selectedSpacer = selectedHandle.spacers[spacerSelect.selectedIndex];
    selectedLiner = selectedHandle.liners[linersSelect.selectedIndex];
    selectedScale = selectedHandle.scales[scalesSelect.selectedIndex];
  }

  let totalPrice = selectedBase.price + selectedHandle.price + (selectedBladeOption ? selectedBladeOption.price : 0);
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
    buyLinks.push(`<a href="${selectedSpacer.buyLink}" target="_blank">Buy ${selectedSpacer.name} Spacers</a>`);
  }

  if (selectedLiner && selectedLiner.buyLink) {
    buyLinks.push(`<a href="${selectedLiner.buyLink}" target="_blank">Buy ${selectedLiner.name} Liners</a>`);
  }

  if (selectedScale && selectedScale.buyLink) {
    buyLinks.push(`<a href="${selectedScale.buyLink}" target="_blank">Buy ${selectedScale.name} Scales</a>`);
  }

  if (selectedBladeOption && selectedBladeOption.buyLink) {
    buyLinks.push(`<a href="${selectedBladeOption.buyLink}" target="_blank">Buy ${selectedBladeOption.name} Blade</a>`);
    updateImage(selectedBladeOption, document.getElementById('blade-image'));
  }

  if (selectedBase && selectedBase.buyLink) {
    buyLinks.push(`<a href="${selectedBase.buyLink}" target="_blank">Buy ${selectedBase.name} Replicant</a>`);
    updateImage(selectedBase, document.getElementById('base-image'));
  }

  // Display buy links in the summary
  document.querySelector('#buy-links').innerHTML = buyLinks.join('<br>');

  updateImage(selectedHandle, document.getElementById('handle-image'));
  updateImage(selectedSpacer, document.getElementById('spacer-image'));
  updateImage(selectedLiner, document.getElementById('liners-image'));
  updateImage(selectedScale, document.getElementById('scale-image'));
}




// Populate the handle type and blade type dropdowns
populateSelect(handleTypeSelect, handleOptions);
populateSelect(bladeTypeSelect, bladeOptions);

// Initial calculation
calculateSummary();
