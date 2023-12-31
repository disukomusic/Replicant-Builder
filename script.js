// script.js
const baseTypeSelect = document.querySelector('#base-type');
const handleTypeSelect = document.querySelector('#handle-type');
const bladeTypeSelect = document.querySelector('#blade-type');
const bladeOptionsSelect = document.querySelector('#blade-options-type'); 
const spacerSelect = document.querySelector('#spacer-type'); 
const linersSelect = document.querySelector('#liners-type');
const scalesSelect = document.querySelector('#scale-type');
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
	buyLink: 'https://www.bladerunnerssystems.com/products/brs-replicant-alt',
    imageLink: 'https://www.bladerunnerssystems.com/cdn/shop/products/Replicant_ISO_new_600x.jpg?v=1584726613'
  },
  { 
    name: 'B+ Clone Rep', 
    price: 65, 
    weight: 0,
	buyLink: 'https://kolisong.com/products/baliplus-brs-replicant-rep-balisong-clone',
    imageLink: 'https://kolisong.com/cdn/shop/products/WechatIMG807.jpg?v=1684488817&width=713'
  }
];

const handleOptions = [
  { 
    name: 'Custom Channel', 
    price: 0, 
    weight: 0
  },
  {
    name: 'Custom Sandwich',
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
	  buyLink: 'https://www.etsy.com/listing/1316018079/aluminum-full-length-replicant-spacers', imageLink: 'https://mckbalisong.com/cdn/shop/products/20220811_220606.jpg?v=1675039178&width=713'},
      {name: 'Baliplus Spacers', price: 10, weight: 0.21, buyLink: 'https://kolisong.com/products/baliplus-brs-replicant-rep-balisong-clone', imageLink: 'https://scontent.xx.fbcdn.net/v/t1.15752-9/371168585_6507827282600331_7648112871723066273_n.jpg?stp=dst-jpg_p403x403&_nc_cat=110&ccb=1-7&_nc_sid=aee45a&_nc_ohc=9P-nYUcwGhMAX8BR9J6&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQxo3zBg1rJmX5bQcFEGgTgRH1YXv9cNRAvW6sp40rYqw&oe=6512146B'}

    ],
    liners: [
      { name: 'None', price: 0, weight: 0},
	  
      { name: 'FF Ghost', price: 75, weight: 2.05, buyLink: 'https://www.etsy.com/listing/1054502414/ff-ghost-liners', imageLink: 'https://i.etsystatic.com/24986546/r/il/72dbbb/3267528392/il_794xN.3267528392_6ozm.jpg' },
      { name: 'Baliplus Liners', price:0, weight:2.05, buyLink: 'https://kolisong.com/products/baliplus-brs-replicant-rep-balisong-clone'}
	],
    scales: [
      { name: 'None', price: 0, weight: 0},
	  
      { name: 'Spasmfingers White Slot G10', price: 69, weight: 1, buyLink: 'https://www.etsy.com/listing/1547669071/white-slot-g10-replicant-scales' , imageLink: 'https://i.etsystatic.com/37542554/r/il/ad8321/5202150506/il_794xN.5202150506_rz2f.jpg'},
      { name: 'Gold Dust', price: 75, weight:1.16, buyLink: 'https://www.instagram.com/p/CZvMCIpMjf0/?img_index=1', imageLink: 'https://scontent.xx.fbcdn.net/v/t1.15752-9/368567114_249079947504787_2136087684126649854_n.jpg?stp=dst-jpg_p403x403&_nc_cat=106&ccb=1-7&_nc_sid=aee45a&_nc_ohc=Sq5SK31EdOkAX9aZ3vG&_nc_oc=AQk5HKLAFOFxlpjelPewMcWB8bTKMsZQJU79FlOOm8j4ENdPKWCFFSLuXVupMT8Ka1JvckNDeRhaGT-VRiysW7cw&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRL5tBkDoRddR8V9MBLxLCRG7KQGp2QOWZqwnxff4tatw&oe=65120AB6'},
    ]
  },
  { 
    name: 'Stock Sandwich', 
    price: 0, 
    weight: 3.5
  },
];

const bladeOptions = [
  { 
    
    name: 'Trainer', 
    options: [
	  { name: 'None', price: 0, weight: 0},
	  { name: 'Stock Trainer', price:0, weight:1.4, imageLink: 'https://www.bladerunnerssystems.com/cdn/shop/files/trainerrep_600x.jpg?v=1684518610'},
      { name: 'Hourglass Tanto', price: 120, weight: 1.45, buyLink: 'https://hourglassblades.com/ols/products/replicant-tanto-trainer-blade' },
      { name: 'Hourglass Alt', price: 120, weight: 1.45, buyLink: 'https://hourglassblades.com/ols/products/hourglass-replicant-alt-trainer-blade' },
      { name: 'McK Diamond v2', price: 100, weight: 1.27, buyLink: 'https://mckbalisong.com', imageLink: 'https://scontent.xx.fbcdn.net/v/t1.15752-9/370322431_1656519334861065_2900269566087985808_n.jpg?stp=dst-jpg_p403x403&_nc_cat=109&ccb=1-7&_nc_sid=aee45a&_nc_ohc=1gVOQ11r4IMAX-6lr-E&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRiGUk2o7w71dJ1HF56EaOgtPbNhdFwsqDymog9e_7M3A&oe=6511EED0'},
      { name: 'Baliplus Trainer', price: 9, weight: 1.23, buyLink: 'https://www.aliexpress.us/item/3256803508936610.html?gatewayAdapt=glo2usa4itemAdapt', imageLink:'partpics/b+trainer.png'}  
    ]
  },
  { 
    name: 'Live Blade', 
    options: [
	  { name: 'None', price: 0, weight: 0},
      { name: 'Stock Alt', price: 0, weight: 1.5, buyLink: 'https://example.com/buy-live-blade-1', imageLink: 'https://www.bladerunnerssystems.com/cdn/shop/products/altrep_2048x.jpg'},
      { name: 'Stock Tanto', price: 0, weight: 1.5, buyLink: 'https://example.com/buy-live-blade-2' },
	  { name: 'Clone Tanto', price: 9, weight: 1.59, buyLink: 'https://www.aliexpress.us/item/3256803508936610.html?gatewayAdapt=glo2usa4itemAdapt' },
	  { name: 'Clone Alt', price: 9, weight: 1.59, buyLink: 'https://www.aliexpress.us/item/3256803508936610.html?gatewayAdapt=glo2usa4itemAdapt' },
	  { name: 'MCChickenGod Damascus', price: 425, weight: 1.5, buyLink: 'https://mchickengod.myshopify.com/products/damascus-reblades?variant=41008269230163', imageLink: 'https://mchickengod.myshopify.com/cdn/shop/files/image_53f15a80-8a2c-4edb-b949-a2af340299ca.heic?v=1692406427&width=823'}
    ]
  }
];

// Populate options
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
  const handleWeight = selectedSpacer.weight + selectedLiner.weight + selectedScale.weight || 0;
  const bladeWeight = selectedBladeOption ? selectedBladeOption.weight || 0 : 0;
  const totalWeightSum = handleWeight + bladeWeight;

  let estimatedBalance = '';

  if (totalWeightSum !== 0 && !isNaN(totalWeightSum)) {
    const weightDifference = Math.abs(handleWeight - bladeWeight);

    if (weightDifference < 0.075) {
      estimatedBalance = 'Neutral';
    } else if (handleWeight > bladeWeight) {
      estimatedBalance = 'Handle Bias';
    } else if (bladeWeight > handleWeight) {
      estimatedBalance = 'Blade Bias';
    }
  }

console.log('handleWeight:', handleWeight);
console.log('bladeWeight:', bladeWeight);

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

  //Update images
  updateImage(selectedBase, document.getElementById('base-image'));
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

