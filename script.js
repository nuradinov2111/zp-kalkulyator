const salaryInput = document.getElementById('salary-input');
const inputLabel = document.getElementById('input-label');
const modeBtns = document.querySelectorAll('.mode-btn');

const resultGross = document.getElementById('result-gross');
const resultSfEmployee = document.getElementById('result-sf-employee');
const resultIncomeTax = document.getElementById('result-income-tax');
const resultTotalDeductions = document.getElementById('result-total-deductions');
const resultNet = document.getElementById('result-net');
const resultPension = document.getElementById('result-pension');
const resultFoms = document.getElementById('result-foms');
const resultFot = document.getElementById('result-fot');
const resultTotalEmployer = document.getElementById('result-total-employer');
const resultTotalCost = document.getElementById('result-total-cost');

let mode = 'gross';

function formatMoney(value) {
    return Math.round(value).toLocaleString('ru-RU') + ' сом';
}

function parseInput(value) {
    return parseFloat(value.replace(/\s/g, '').replace(',', '.')) || 0;
}

function calculate() {
    const inputValue = parseInput(salaryInput.value);
    let gross, sfEmployee, incomeTax, net;

    if (mode === 'gross') {
        gross = inputValue;
    } else {
        // net = gross * 0.9 * 0.9 = gross * 0.81
        net = inputValue;
        gross = net / 0.81;
    }

    // Удержания из зарплаты работника
    sfEmployee = gross * 0.10;                      // Взнос работника в Соцфонд: 10%
    incomeTax = (gross - sfEmployee) * 0.10;         // Подоходный налог: 10% от (оклад - взнос в СФ)
    const totalDeductions = sfEmployee + incomeTax;
    net = gross - totalDeductions;

    // Взносы работодателя в Соцфонд: 17.25%
    const pension = gross * 0.15;     // Пенсионный фонд: 15%
    const foms = gross * 0.02;        // ФОМС: 2%
    const fot = gross * 0.0025;       // ФОТ: 0.25%
    const totalEmployer = pension + foms + fot;
    const totalCost = gross + totalEmployer;

    resultGross.textContent = formatMoney(gross);
    resultSfEmployee.textContent = formatMoney(sfEmployee);
    resultIncomeTax.textContent = formatMoney(incomeTax);
    resultTotalDeductions.textContent = formatMoney(totalDeductions);
    resultNet.textContent = formatMoney(net);
    resultPension.textContent = formatMoney(pension);
    resultFoms.textContent = formatMoney(foms);
    resultFot.textContent = formatMoney(fot);
    resultTotalEmployer.textContent = formatMoney(totalEmployer);
    resultTotalCost.textContent = formatMoney(totalCost);
}

modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        mode = btn.dataset.mode;

        if (mode === 'gross') {
            inputLabel.textContent = 'Оклад (начисленная зарплата), сом';
        } else {
            inputLabel.textContent = 'Сумма на руки (после удержаний), сом';
        }

        calculate();
    });
});

salaryInput.addEventListener('input', calculate);
