document.getElementById('valuation-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const getFloatValue = (id) => parseFloat(document.getElementById(id).value) || 0;

    let reproductionValue = 0;

    reproductionValue += getFloatValue('cash');
    const accountsReceivable = getFloatValue('accounts-receivable');
    const creditLossRate = getFloatValue('credit-loss-rate') / 100;
    reproductionValue += accountsReceivable * (1 - creditLossRate);
    reproductionValue += getFloatValue('notes-receivable');
    reproductionValue += getFloatValue('inventory');
    reproductionValue += getFloatValue('trading-financial-assets');
    reproductionValue += getFloatValue('other-current-assets');
    reproductionValue += getFloatValue('non-current-assets-due-within-one-year');
    reproductionValue += getFloatValue('plant-depreciation-coefficient');
    reproductionValue += getFloatValue('machinery-depreciation-coefficient');
    reproductionValue += getFloatValue('construction-in-progress');
    const landBookValue = getFloatValue('land-book-value');
    const landValueCoefficient = getFloatValue('land-value-coefficient');
    reproductionValue += landBookValue * landValueCoefficient;
    reproductionValue += getFloatValue('goodwill');

    const companyType = document.getElementById('company-type').value;
    if (companyType === 'cyclical-resource') {
        reproductionValue += getFloatValue('patent-technology-value-cyclical');
        reproductionValue += getFloatValue('mineral-rights-value');
    } else if (companyType === 'consumer') {
        reproductionValue += getFloatValue('patent-technology-value-consumer');
        reproductionValue += getFloatValue('product-portfolio-value');
        reproductionValue += getFloatValue('trained-staff-value');
        reproductionValue += getFloatValue('customer-relationship-value');
    }

    reproductionValue -= getFloatValue('debt');

    const reasonablePrice = reproductionValue * 0.7;

    document.getElementById('reproduction-value').textContent = reproductionValue.toFixed(2);
    document.getElementById('reasonable-price').textContent = reasonablePrice.toFixed(2);
});

document.getElementById('company-type').addEventListener('change', function() {
    const companyType = this.value;
    const cyclicalFields = document.getElementById('cyclical-resource-fields');
    const consumerFields = document.getElementById('consumer-fields');

    if (companyType === 'cyclical-resource') {
        cyclicalFields.style.display = 'block';
        consumerFields.style.display = 'none';
    } else if (companyType === 'consumer') {
        cyclicalFields.style.display = 'none';
        consumerFields.style.display = 'block';
    } else { // real-estate
        cyclicalFields.style.display = 'none';
        consumerFields.style.display = 'none';
    }
});