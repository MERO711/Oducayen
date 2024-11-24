// Get all sections and set up a listener for scroll events
const sections = document.querySelectorAll("section");

const options = {
    threshold: 0.1 // When 10% of the section is visible
};

// Function to scatter letters

function scatterLetters(element) {
    const text = element.textContent;
    const scatteredHTML = text.split(' ').map((word) => {
        // Split each word into letters and scatter them
        return word.split('').map((letter, index) => {
            return `<span style="transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px); transition-delay: ${index * 0.05}s;">${letter}</span>`;
        }).join('') + '&nbsp;'; // Use &nbsp; for space between words
    }).join(''); // Join all words
    element.innerHTML = scatteredHTML;
}

// Function for typing animation
function typeText(element, text) {
    const fullText = text; // Full text to type out
    let index = 0; // Current index
    element.innerHTML = ''; // Clear existing content

    // Function to type out the text
    const typingInterval = setInterval(() => {
        if (index < fullText.length) {
            element.innerHTML += fullText[index]; // Add next character
            index++;
        } else {
            clearInterval(typingInterval); // Clear interval when done
        }
    }, 40); // Adjust typing speed here (100 ms)
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // If the section is intersecting
        if (entry.isIntersecting) {
            entry.target.classList.add("active"); // Add active class for effects
            const textElements = entry.target.querySelectorAll('.animate-text');
            textElements.forEach(text => {
                text.classList.add('active'); // Activate text animations
            });

            const scatterTextElements = entry.target.querySelectorAll('.scatter-text');
            scatterTextElements.forEach(textElement => {
                scatterLetters(textElement); // Scatter letters
                setTimeout(() => {
                    textElement.style.opacity = '1'; // Fade in after scattering
                    const spans = textElement.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.transform = 'translate(0, 0)'; // Bring letters together
                    });
                }, 100); // Delay to allow for scattering
            });

            // Type out the paragraph text
            const typingTextElements = entry.target.querySelectorAll('.typing-text');
            typingTextElements.forEach(typingText => {
                typingText.style.visibility = 'visible'; // Make it visible
                typeText(typingText, typingText.textContent); // Start typing animation
            });
        } else {
            entry.target.classList.remove("active"); // Remove active class
            const textElements = entry.target.querySelectorAll('.animate-text');
            textElements.forEach(text => {
                text.classList.remove('active'); // Deactivate text animations
            });
        }
    });
  
    document.addEventListener('DOMContentLoaded', () => {
    const progressBars = [
        { id: 'running', value: 90 },
        { id: 'writing', value: 80 },
        { id: 'martial-arts', value: 45 },
        { id: 'social', value: 80 },
        { id: 'strategy', value: 70 }
    ];

    progressBars.forEach(progress => {
        const progressBar = document.querySelector(`#${progress.id} .progress-fill`);
        const percentageText = document.querySelector(`#${progress.id} .percentage`);
        
        progressBar.style.width = `${progress.value}%`;
        percentageText.textContent = `${progress.value}%`;
    });
});


}, options);

  
// Observe each section
sections.forEach(section => {
    observer.observe(section);
});
