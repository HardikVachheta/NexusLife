import React, { useState } from 'react';

function GoldCalculator() {
    const [weight, setWeight] = useState('');
    const [purity, setPurity] = useState(24);
    const [ratePerGram, setRatePerGram] = useState('');
    const [laborPercentage, setLaborPercentage] = useState('');
    const [gstPercentage, setGstPercentage] = useState('');
    const [baseGoldValue, setBaseGoldValue] = useState(null);
    const [laborAmount, setLaborAmount] = useState(null);
    const [priceWithLabor, setPriceWithLabor] = useState(null);
    const [gstAmount, setGstAmount] = useState(null);
    const [priceWithGst, setPriceWithGst] = useState(null);
    const [totalValue, setTotalValue] = useState(null);

    const formatIndianCurrency = (value) => {
        if (value === null || isNaN(value)) return '';
        return new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };

    const handleCalculate = () => {
        const parsedWeight = parseFloat(weight);
        const parsedRatePerGram = parseFloat(ratePerGram);
        const parsedLaborPercentage = parseFloat(laborPercentage);
        const parsedGstPercentage = parseFloat(gstPercentage);

        if (isNaN(parsedWeight) || isNaN(parsedRatePerGram) || parsedWeight <= 0 || parsedRatePerGram <= 0) {
            setBaseGoldValue(null);
            setLaborAmount(null);
            setPriceWithLabor(null);
            setGstAmount(null);
            setPriceWithGst(null);
            setTotalValue(null);
            return;
        }

        const purityFactor = purity / 24;
        const baseVal = parsedWeight * parsedRatePerGram * purityFactor;
        setBaseGoldValue(baseVal);

        let valWithLabor = baseVal;
        if (!isNaN(parsedLaborPercentage) && parsedLaborPercentage > 0) {
            const currentLaborAmount = baseVal * (parsedLaborPercentage / 100);
            valWithLabor = baseVal + currentLaborAmount;
            setLaborAmount(currentLaborAmount);
            setPriceWithLabor(valWithLabor);
        } else {
            setLaborAmount(null);
            setPriceWithLabor(null);
        }

        let valWithGst = valWithLabor;
        if (!isNaN(parsedGstPercentage) && parsedGstPercentage > 0) {
            const currentGstAmount = valWithGst * (parsedGstPercentage / 100);
            valWithGst += currentGstAmount;
            setGstAmount(currentGstAmount);
            setPriceWithGst(valWithGst);
        } else {
            setGstAmount(null);
            setPriceWithGst(null);
        }

        setTotalValue(valWithGst);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-6">
            <div className="bg-gray-800 bg-opacity-70 backdrop-blur-lg rounded-2xl p-8 w-full max-w-3xl shadow-2xl border border-gray-700">
                <h2 className="text-3xl sm:text-3xl md:text-5xl font-extrabold text-yellow-500 text-center mb-8">
                    💰 Gold Calculator
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Input label="Gold Weight (grams)" id="goldWeight" value={weight} setValue={setWeight} placeholder="e.g., 10.5" />
                    <Select label="Gold Purity (Karat)" id="goldPurity" value={purity} setValue={setPurity} />
                    <Input label="Gold Rate (₹ per gram - 24K)" id="goldRate" value={ratePerGram} setValue={setRatePerGram} placeholder="e.g., 6500" />
                    <Input label="Labor Charge (%)" id="laborPercentage" value={laborPercentage} setValue={setLaborPercentage} placeholder="e.g., 5" />
                    <Input label="GST (%)" id="gstPercentage" value={gstPercentage} setValue={setGstPercentage} placeholder="e.g., 3" />
                </div>

                <button
                    onClick={handleCalculate}
                    style={{backgroundColor:'black'}}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition hover:scale-105"
                >
                    Calculate Gold Value
                </button>

                {baseGoldValue !== null && (
                    <div className="mt-10 space-y-6">
                        <Breakdown label="Base Gold Value" value={baseGoldValue} />
                        {laborAmount !== null && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Breakdown label="Labor Amount" value={laborAmount} />
                                <Breakdown label="Price with Labor" value={priceWithLabor} />
                            </div>
                        )}
                        {gstAmount !== null && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Breakdown label="GST Amount" value={gstAmount} />
                                <Breakdown label="Price with GST" value={priceWithGst} />
                            </div>
                        )}
                        <div className="bg-yellow-600 bg-opacity-90 border border-yellow-500 p-6 rounded-xl text-center shadow-xl">
                            <h2 className="text-xl font-bold text-white mb-1">Final Total Value</h2>
                            <p className="text-4xl font-extrabold text-white">₹ {formatIndianCurrency(totalValue)}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Input component
const Input = ({ label, id, value, setValue, placeholder }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-semibold text-gray-200 mb-2">{label}</label>
        <input
            type="number"
            id={id}
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={placeholder}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
    </div>
);

// Select component for purity
const Select = ({ label, id, value, setValue }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-semibold text-gray-200 mb-2">{label}</label>
        <select
            id={id}
            value={value}
            onChange={e => setValue(Number(e.target.value))}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
            <option value={24}>24K (99.9%)</option>
            <option value={22}>22K (91.6%)</option>
            <option value={18}>18K (75%)</option>
            <option value={14}>14K (58.3%)</option>
            <option value={10}>10K (41.7%)</option>
        </select>
    </div>
);

// Breakdown display component
const Breakdown = ({ label, value }) => (
    <div className="bg-gray-700 border border-gray-600 p-4 rounded-xl text-center">
        <h3 className="text-base font-semibold text-gray-300 mb-1">{label}</h3>
        <p className="text-2xl font-extrabold text-yellow-400">₹ {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(value)}</p>
    </div>
);

export default GoldCalculator;
