// Beginning of JavaScript file

/* Begin Section 1: Initialization */
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let particleCount = 100;

    const minSpeedInput = document.getElementById('minSpeed');
    const maxSpeedInput = document.getElementById('maxSpeed');
    const minSizeInput = document.getElementById('minSize');
    const maxSizeInput = document.getElementById('maxSize');
    const minTransparencyInput = document.getElementById('minTransparency');
    const maxTransparencyInput = document.getElementById('maxTransparency');
    const falloffInput = document.getElementById('falloff');
    const particleCountInput = document.getElementById('particleCount');
    const colorInputs = [
        document.getElementById('color1'),
        document.getElementById('color2'),
        document.getElementById('color3')
    ];
/* End Section 1 */

/* Begin Section 2: Canvas Handling */
    const resizeCanvas = () => {
        canvas.width = window.innerWidth - document.querySelector('.sidebar').offsetWidth;
        canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
/* End Section 2 */

/* Begin Section 3: Value Handling */
    const values = {
        minSpeed: parseFloat(minSpeedInput.value),
        maxSpeed: parseFloat(maxSpeedInput.value),
        minSize: parseFloat(minSizeInput.value),
        maxSize: parseFloat(maxSizeInput.value),
        minTransparency: parseFloat(minTransparencyInput.value),
        maxTransparency: parseFloat(maxTransparencyInput.value),
        falloff: parseFloat(falloffInput.value),
        colors: colorInputs.map(input => input.value)
    };

    const updateValues = () => {
        values.minSpeed = parseFloat(minSpeedInput.value);
        values.maxSpeed = parseFloat(maxSpeedInput.value);
        values.minSize = parseFloat(minSizeInput.value);
        values.maxSize = parseFloat(maxSizeInput.value);
        values.minTransparency = parseFloat(minTransparencyInput.value);
        values.maxTransparency = parseFloat(maxTransparencyInput.value);
        values.falloff = parseFloat(falloffInput.value);
        values.colors = colorInputs.map(input => input.value);
        particleCount = parseInt(particleCountInput.value);

        document.getElementById('minSpeedValue').textContent = minSpeedInput.value;
        document.getElementById('maxSpeedValue').textContent = maxSpeedInput.value;
        document.getElementById('minSizeValue').textContent = minSizeInput.value;
        document.getElementById('maxSizeValue').textContent = maxSizeInput.value;
        document.getElementById('minTransparencyValue').textContent = minTransparencyInput.value;
        document.getElementById('maxTransparencyValue').textContent = maxTransparencyInput.value;
        document.getElementById('falloffValue').textContent = falloffInput.value;
        document.getElementById('particleCountValue').textContent = particleCountInput.value;
        
        updateHeaderGradient();
    };
    
    const updateHeaderGradient = () => {
        const header = document.querySelector('header');
        header.style.backgroundImage = `linear-gradient(to right, ${values.colors.join(', ')})`;
    };
/* End Section 3 */

/* Begin Section 4: Particle Creation */
    const createParticle = () => {
        const speed = values.minSpeed + Math.random() * (values.maxSpeed - values.minSpeed);
        const angle = Math.random() * Math.PI * 2;
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random() * 100,
            color: values.colors[Math.floor(Math.random() * values.colors.length)],
            size: values.minSize + Math.random() * (values.maxSize - values.minSize),
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            vz: (Math.random() - 0.5) * speed,
            transparency: values.minTransparency + Math.random() * (values.maxTransparency - values.minTransparency)
        };
    };

    const createParticles = () => {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    };
/* End Section 4 */

/* Begin Section 5: Animation */
    const animate = () => {
        ctx.fillStyle = '#3a3a3a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.z += p.vz;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            if (p.z < 0 || p.z > 100) p.vz *= -1;

            const scale = 1 + p.z / 100;
            const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * scale);
            const baseColor = p.color + Math.floor(p.transparency * 255).toString(16).padStart(2, '0');
            gradient.addColorStop(0, baseColor);
            gradient.addColorStop(values.falloff, baseColor.slice(0, 7) + '80');
            gradient.addColorStop(1, baseColor.slice(0, 7) + '00');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * scale, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        });

        requestAnimationFrame(animate);
    };
/* End Section 5 */

/* Begin Section 6: Event Listeners */
    minSpeedInput.addEventListener('input', () => {
        updateValues();
        createParticles();
    });
    maxSpeedInput.addEventListener('input', () => {
        updateValues();
        createParticles();
    });
    minSizeInput.addEventListener('input', () => {
        updateValues();
        createParticles();
    });
    maxSizeInput.addEventListener('input', () => {
        updateValues();
        createParticles();
    });
    minTransparencyInput.addEventListener('input', () => {
        updateValues();
        createParticles();
    });
    maxTransparencyInput.addEventListener('input', () => {
        updateValues();
        createParticles();
    });
    falloffInput.addEventListener('input', () => {
        updateValues();
        createParticles();
    });
    particleCountInput.addEventListener('input', () => {
        updateValues();
        createParticles();
    });
    colorInputs.forEach(input => input.addEventListener('input', () => {
        updateValues();
        createParticles();
    }));
/* End Section 6 */

/* Begin Section 7: Save, Reset, Load Functions */
const saveParameters = () => {
    const userPreferences = {
        minSpeed: values.minSpeed,
        maxSpeed: values.maxSpeed,
        minSize: values.minSize,
        maxSize: values.maxSize,
        minTransparency: values.minTransparency,
        maxTransparency: values.maxTransparency,
        falloff: values.falloff,
        colors: values.colors,
        particleCount: particleCount
    };
    fetch('user_preferences.json', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userPreferences)
    });
};

const resetParameters = async () => {
    const response = await fetch('defaults.json');
    const defaultValues = await response.json();
    setValues(defaultValues);
    updateInputs();
    createParticles();
};

const loadParameters = async () => {
    const response = await fetch('user_preferences.json');
    const userValues = await response.json();
    setValues(userValues);
    updateInputs();
    createParticles();
};

const setValues = (newValues) => {
    values.minSpeed = newValues.minSpeed;
    values.maxSpeed = newValues.maxSpeed;
    values.minSize = newValues.minSize;
    values.maxSize = newValues.maxSize;
    values.minTransparency = newValues.minTransparency;
    values.maxTransparency = newValues.maxTransparency;
    values.falloff = newValues.falloff;
    values.colors = newValues.colors;
    particleCount = newValues.particleCount;
};

const updateInputs = () => {
    minSpeedInput.value = values.minSpeed;
    maxSpeedInput.value = values.maxSpeed;
    minSizeInput.value = values.minSize;
    maxSizeInput.value = values.maxSize;
    minTransparencyInput.value = values.minTransparency;
    maxTransparencyInput.value = values.maxTransparency;
    falloffInput.value = values.falloff;
    particleCountInput.value = particleCount;
    colorInputs.forEach((input, index) => {
        input.value = values.colors[index];
    });
    updateValues();
};

document.getElementById('saveParameters').addEventListener('click', saveParameters);
document.getElementById('resetParameters').addEventListener('click', resetParameters);
document.getElementById('loadParameters').addEventListener('click', loadParameters);
/* End Section 7 */

/* Begin Section 8: Initialization */
    updateValues();
    createParticles();
    animate();
/* End Section 8 */

// Begin Section 9: Tooltip Logic
const tooltip = document.getElementById('tooltip');

const buttons = ['saveParameters', 'resetParameters', 'loadParameters'];
buttons.forEach(buttonId => {
    const button = document.getElementById(buttonId);

    button.addEventListener('mouseover', async (event) => {
        try {
            const response = await fetch('/user_preferences.json');
            const userValues = await response.json();

            const tooltipContent = `
                <table>
                    <tr>
                        <th>Parameter</th>
                        <th>Old Value</th>
                        <th>New Value</th>
                    </tr>
                    ${generateTooltipRow('Min Speed', userValues.minSpeed, values.minSpeed)}
                    ${generateTooltipRow('Max Speed', userValues.maxSpeed, values.maxSpeed)}
                    ${generateTooltipRow('Min Size', userValues.minSize, values.minSize)}
                    ${generateTooltipRow('Max Size', userValues.maxSize, values.maxSize)}
                    ${generateTooltipRow('Min Transparency', userValues.minTransparency, values.minTransparency)}
                    ${generateTooltipRow('Max Transparency', userValues.maxTransparency, values.maxTransparency)}
                    ${generateTooltipRow('Falloff', userValues.falloff, values.falloff)}
                    ${generateTooltipRow('Colors', userValues.colors.join(', '), values.colors.join(', '))}
                    ${generateTooltipRow('Particle Count', userValues.particleCount, particleCount)}
                </table>
            `;

            tooltip.innerHTML = tooltipContent;
            tooltip.style.display = 'block';
            positionTooltip(event);
        } catch (error) {
            console.error('Failed to fetch user preferences:', error);
        }
    });

    button.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
    });

    button.addEventListener('mousemove', (event) => {
        positionTooltip(event);
    });
});

function generateTooltipRow(parameter, oldValue, newValue) {
    const isChanged = oldValue !== newValue;
    const newValueStyle = isChanged ? 'color: red;' : 'color: black;';
    return `
        <tr>
            <td>${parameter}</td>
            <td>${oldValue}</td>
            <td style="${newValueStyle}">${newValue}</td>
        </tr>
    `;
}

function positionTooltip(event) {
    const tooltipRect = tooltip.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    let tooltipX = event.pageX + 10;
    let tooltipY = event.pageY + 10;

    if (tooltipX + tooltipRect.width > screenWidth) {
        tooltipX = screenWidth - tooltipRect.width - 10;
    }

    if (tooltipY + tooltipRect.height > screenHeight) {
        tooltipY = screenHeight - tooltipRect.height - 10;
    }

    tooltip.style.left = `${tooltipX}px`;
    tooltip.style.top = `${tooltipY}px`;
}
// End Section 9





});
// End of JavaScript file
