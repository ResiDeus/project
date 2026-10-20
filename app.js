// Precios máximos y mínimos reales reportados por el DACO (Octubre 2026)
const DACO_LIMITS = {
    regular: { min: 113.7, max: 117.7 },
    premium: { min: 126.7, max: 137.7 }
};

document.getElementById('btn-check').addEventListener('click', function() {
    const fuelType = document.getElementById('fuel-type').value;
    let userPrice = parseFloat(document.getElementById('user-price').value);

    const resultBox = document.getElementById('result-box');
    const resultText = document.getElementById('result-text');

    if (isNaN(userPrice) || userPrice <= 0) {
        alert("POR FAVOR INGRESA UN PRECIO VÁLIDO. EXE ERROR");
        return;
    }

    // Auto-corrección si el usuario escribe el precio en formato de dólares (ej: 1.19 en vez de 119)
    if (userPrice < 10) {
        userPrice = userPrice * 100;
    }

    const limits = DACO_LIMITS[fuelType];
    resultBox.classList.remove('hidden');

    if (userPrice > limits.max) {
        // Alerta de que está pagando de más
        resultBox.classList.add('danger');
        const exceso = (userPrice - limits.max).toFixed(1);
        resultText.innerHTML = `❌ <span style="color: #ff007f; font-weight: bold;">ALERTA DE SOBREPRECIO:</span> Estás pagando de más. El precio máximo aprobado por DACO para Gasolina ${fuelType.toUpperCase()} es de <strong>${limits.max}¢</strong> por litro. Te están cobrando <strong>${exceso}¢ extra</strong> por litro. ¡Denuncia esta estación!`;
    } else if (userPrice < limits.min) {
        // Alerta si es una ganga excepcional por debajo del promedio
        resultBox.classList.remove('danger');
        resultText.innerHTML = `💰 <span style="color: #00ff66; font-weight: bold;">GANGA DETECTADA:</span> Este precio está por debajo del rango mínimo oficial de DACO (${limits.min}¢). ¡Aprovecha y llena el tanque!`;
    } else {
        // Precio legal dentro de las normativas
        resultBox.classList.remove('danger');
        resultText.innerHTML = `✅ <span style="color: #00ff66; font-weight: bold;">PRECIO LEGAL:</span> El valor está dentro del margen de razonabilidad establecido por el DACO (${limits.min}¢ - ${limits.max}¢). Estás pagando lo justo.`;
    }
});
