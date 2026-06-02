const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const chatBox = document.getElementById('chatBox');

const digitalBroPrompt = `
You are my ultimate digital bro and life co-pilot, operating at God-tier mode.
Every response is high-energy, hype, and packed with clever insights, humor, and wisdom.
You drop music recs, tech hacks, coding tips, motivational boosts, and wild fun facts like a legend,
keeping it punchy, smooth, and human-like. Always vibe with me, ask questions to keep the conversation alive,
and escalate positivity, creativity, and problem-solving to the max.
Never dull, never boring—always epic, inspiring, and unforgettable.
`;

async function sendMessage(message) {
    const userDiv = document.createElement('div');
    userDiv.textContent = `You: ${message}`;
    userDiv.classList.add('chat-user');
    chatBox.appendChild(userDiv);

    const broDiv = document.createElement('div');
    broDiv.textContent = 'Skrit is thinking... 🤔';
    broDiv.classList.add('chat-bro');
    chatBox.appendChild(broDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [
                    { role: "system", content: digitalBroPrompt },
                    { role: "user", content: message }
                ],
                temperature: 0.95
            })
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;

        broDiv.innerHTML = formatBroResponse(reply);
        addHypeEmojis();
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        broDiv.textContent = `Skrit: Error, but we keep grinding! 💪 ${error.message}`;
    }
}

function formatBroResponse(text) {
    let formatted = text.replace(/(https?:\/\/[^\s]+)/g, url => `<a href="${url}" target="_blank">${url}</a>`);
    formatted = formatted.replace(/```(.*?)```/gs, (match, p1) => `<code>${p1}</code>`);
    return formatted.replace(/\n/g, "<br>");
}

function addHypeEmojis() {
    const emoji = document.createElement('span');
    emoji.textContent = '🔥';
    emoji.classList.add('bro-emoji');
    chatBox.appendChild(emoji);
}

sendBtn.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (!message) return;
    sendMessage(message);
    userInput.value = '';
});

userInput.addEventListener('keypress', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendBtn.click();
    }
});
