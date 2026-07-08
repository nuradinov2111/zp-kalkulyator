const salaryInput = document.getElementById('salary-input');
const inputLabel = document.getElementById('input-label');
const modeBtns = document.querySelectorAll('.mode-btn');
const taxBtns = document.querySelectorAll('.tax-btn');

const resultGross = document.getElementById('result-gross');
const resultNdfl = document.getElementById('result-ndfl');
const resultNet = document.getElementById('result-net');
const resultOps = document.getElementById('result-ops');
const resultOms = document.getElementById('result-oms');
const resultOss = document.getElementById('result-oss');
const resultTotalContributions = document.getElementById('result-total-contributions');
const resultTotalCost = document.getElementById('result-total-cost');

let mode = 'gross';
let taxRate = 13;

function formatMoney(value) {
    return Math.round(value).toLocaleString('ru-RU') + ' \u20BD';
}

function parseInput(value) {
    return parseFloat(value.replace(/\s/g, '').replace(',', '.')) || 0;
}

function calculate() {
    const inputValue = parseInput(salaryInput.value);
    let gross, ndfl, net;

    if (mode === 'gross') {
        gross = inputValue;
        ndfl = gross * taxRate / 100;
        net = gross - ndfl;
    } else {
        net = inputValue;
        gross = net / (1 - taxRate / 100);
        ndfl = gross - net;
    }

    const ops = gross * 0.22;
    const oms = gross * 0.051;
    const oss = gross * 0.029;
    const totalContributions = ops + oms + oss;
    const totalCost = gross + totalContributions;

    resultGross.textContent = formatMoney(gross);
    resultNdfl.textContent = formatMoney(ndfl);
    resultNet.textContent = formatMoney(net);
    resultOps.textContent = formatMoney(ops);
    resultOms.textContent = formatMoney(oms);
    resultOss.textContent = formatMoney(oss);
    resultTotalContributions.textContent = formatMoney(totalContributions);
    resultTotalCost.textContent = formatMoney(totalCost);
}

modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        mode = btn.dataset.mode;

        if (mode === 'gross') {
            inputLabel.innerHTML = 'Оклад (до вычета НДФЛ), \u20BD';
        } else {
            inputLabel.innerHTML = 'Сумма на руки (после НДФЛ), \u20BD';
        }

        calculate();
    });
});

taxBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        taxBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        taxRate = parseInt(btn.dataset.rate);
        calculate();
    });
});

salaryInput.addEventListener('input', calculate);
