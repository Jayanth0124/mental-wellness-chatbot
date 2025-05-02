document.addEventListener('DOMContentLoaded', () => {
  const chatWindow = document.getElementById('chat-window');
  const messagesContainer = document.getElementById('messages');
  const chatForm = document.getElementById('chat-form');
  const userInput = document.getElementById('user-input');
  const typingIndicator = document.getElementById('typing-indicator');
  const clearChatBtn = document.getElementById('clear-chat');
  const themeToggle = document.getElementById('theme-toggle');
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const closeSidebar = document.getElementById('close-sidebar');
  const voiceInputBtn = document.getElementById('voice-input');
  const affirmationElement = document.getElementById('affirmation');
  const clockTimeElement = document.getElementById('clock-time');
  const clockDateElement = document.getElementById('clock-date');

  let messages = [];
  let isTyping = false;
  let recognition = null;

  const systemPrompt = "You are a supportive, friendly, and non-judgmental mental health companion. Offer kind, reflective, and soothing replies. Format your responses clearly: use numbered lists for steps or tips (e.g., '1. ', '2. '), bullet points for lists (e.g., '- '), and bold text for emphasis (e.g., '**text**'). Always maintain a conversational and empathetic tone.";

  const welcomeMessages = [
    "🌿 Hey there, friend! I’m your personal guide to mental peace. Let’s talk.",
    "💬 Hi! I’m here to listen, support, and be your calm in the chaos.",
    "🧠 Welcome! Your mental wellness matters — I’ve got your back.",
    "☀️ Hello! Let’s untangle those thoughts together. I’m here for you.",
    "🌸 Hey, beautiful soul! Ready to feel lighter today?",
    "✨ Hi, I’m your safe space. Vent, smile, cry — I’m listening.",
    "🌙 Hello, I'm your quiet companion. Let's navigate your mind gently.",
    "💗 Hi! Whether you're sad, happy, or lost, I’m here for every mood.",
    "🎧 Hey, it's me — your calm buddy. Let’s have a heart-to-heart.",
    "🍃 Hey there! Ready to unwind your mind? I’m here anytime."
  ];

  // Affirmations
  const affirmations = [
    "You are not alone.",
    "Every setback is a setup for a stronger comeback",
    "Believe in yourself; you’re capable of more than you know",
    "Your efforts today are the foundation for tomorrow’s success.",
    "Your journey is unfolding exactly as it should.",
    "Success is not for the chosen few, it’s for the ones who choose to keep going."
  ];

  let currentAffirmationIndex = 0;

  function rotateAffirmations() {
    affirmationElement.querySelector('p').textContent = affirmations[currentAffirmationIndex];
    currentAffirmationIndex = (currentAffirmationIndex + 1) % affirmations.length;
  }

  rotateAffirmations();
  setInterval(rotateAffirmations, 5000);

  // Mini Clock
  function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    if (clockTimeElement) {
      clockTimeElement.textContent = time;
    }
    if (clockDateElement) {
      clockDateElement.textContent = date;
    }
  }

  updateClock();
  setInterval(updateClock, 1000);

  function addMessage(content, sender) {
    const messageEl = document.createElement('div');
    messageEl.classList.add('message', sender);
    messageEl.innerHTML = content; // Use innerHTML to render formatted content
    messagesContainer.appendChild(messageEl);
    return messageEl;
  }

  // Function to format the bot's response (detect lists and bold text)
  function formatResponse(text) {
    let formattedText = text;

    // Handle bold text (e.g., **text** -> <strong>text</strong>)
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Split the text into lines for processing
    const lines = formattedText.split('\n');
    let result = [];
    let inNumberedList = false;
    let listItems = [];

    lines.forEach((line, index) => {
      // Detect numbered lists (e.g., "1. Item")
      const numberedListMatch = line.match(/^(\d+\.\s.*)$/);
      if (numberedListMatch) {
        inNumberedList = true;
        const content = line.replace(/^\d+\.\s/, '');
        listItems.push(content);
      } else {
        // Close any open numbered list
        if (inNumberedList && listItems.length > 0) {
          result.push('<ol>' + listItems.map(item => `<li>${item}</li>`).join('') + '</ol>');
          listItems = [];
          inNumberedList = false;
        }
        // Add the plain text line
        if (line.trim()) {
          result.push(line);
        }
      }

      // Handle the last line
      if (index === lines.length - 1 && inNumberedList && listItems.length > 0) {
        result.push('<ol>' + listItems.map(item => `<li>${item}</li>`).join('') + '</ol>');
      }
    });

    // Join the result with line breaks
    formattedText = result.join('<br>');

    return formattedText;
  }

  async function typeText(element, text, speed = 1) {
    // Format the text for lists and bold text
    const formattedText = formatResponse(text);

    // Parse the formatted text into a DOM structure
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${formattedText}</div>`, 'text/html');
    const children = Array.from(doc.body.firstChild.childNodes);

    element.innerHTML = ''; // Clear the element

    for (const node of children) {
      if (node.nodeType === Node.TEXT_NODE) {
        // Handle plain text by typing it out
        const textContent = node.textContent.trim();
        if (textContent) {
          const span = document.createElement('span');
          element.appendChild(span);
          for (let i = 0; i < textContent.length; i++) {
            span.textContent += textContent.charAt(i);
            await new Promise(resolve => setTimeout(resolve, speed));
          }
          element.appendChild(document.createElement('br')); // Add spacing after plain text
          element.appendChild(document.createElement('br'));
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Handle HTML elements (lists, bold text) by appending them directly
        const clonedNode = node.cloneNode(true);
        element.appendChild(clonedNode);
        // Ensure the list items are visible by forcing a reflow
        clonedNode.offsetHeight;
      }
    }

    hideTypingIndicator();
    scrollToBottom();
  }

  function scrollToBottom() {
    messagesContainer.scrollTo({
      top: messagesContainer.scrollHeight,
      behavior: 'smooth'
    });
  }

  function showTypingIndicator() {
    typingIndicator.classList.remove('hidden');
  }

  function hideTypingIndicator() {
    typingIndicator.classList.add('hidden');
  }

  function startChat() {
    chatWindow.classList.remove('hidden');

    messages = [
      { role: 'system', content: systemPrompt },
      { role: 'assistant', content: "Hey, it's me — your calm buddy. Let’s have a heart-to-heart." }
    ];

    const botMessageEl = addMessage('', 'bot');
    showTypingIndicator();
    typeText(botMessageEl, messages[1].content);
  }

  // Start chat on page load
  startChat();

  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (isTyping) return;

    const userText = userInput.value.trim();
    if (!userText) return;

    addMessage(userText, 'user');
    messages.push({ role: 'user', content: userText });
    userInput.value = '';
    scrollToBottom();

    showTypingIndicator();
    isTyping = true;

    try {
      const response = await fetchOpenAI(messages);
      const botReply = response.trim();

      messages.push({ role: 'assistant', content: botReply });

      const botMessageEl = addMessage('', 'bot');
      await typeText(botMessageEl, botReply);
    } catch (error) {
      console.error('Error fetching OpenAI response:', error);
      addMessage('Sorry, something went wrong. Please try again later.', 'bot');
    } finally {
      hideTypingIndicator();
      isTyping = false;
      scrollToBottom();
    }
  });

  async function fetchOpenAI(messages) {
    const API_KEY = '23b55ef74ffe4cef8c922dccecacc930';
    const BASE_URL = 'https://api.aimlapi.com/v1/chat/completions';

    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: messages,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  // Hamburger Menu Toggle
  hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });

  // Close Sidebar Button
  closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('active');
  });

  // Clear Chat with Random Welcome Message
  clearChatBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear this session?')) {
      messagesContainer.innerHTML = '';
      const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
      messages = [
        { role: 'system', content: systemPrompt },
        { role: 'assistant', content: randomWelcome }
      ];
      const botMessageEl = addMessage('', 'bot');
      typeText(botMessageEl, messages[1].content);
    }
  });

  // Dark Mode Auto-Sync and Toggle
  const setTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    document.body.className = theme;
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
  };

  setTheme();

  themeToggle.addEventListener('click', () => {
    const newTheme = document.body.className === 'light' ? 'dark' : 'light';
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setTheme);

  // Voice Input
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      userInput.value = transcript;
      voiceInputBtn.classList.remove('active');
      chatForm.dispatchEvent(new Event('submit'));
    };

    recognition.onend = () => {
      voiceInputBtn.classList.remove('active');
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      voiceInputBtn.classList.remove('active');
      addMessage('Sorry, I couldn’t hear you. Please try again or type your message.', 'bot');
    };

    voiceInputBtn.addEventListener('click', () => {
      if (voiceInputBtn.classList.contains('active')) {
        recognition.stop();
      } else {
        recognition.start();
        voiceInputBtn.classList.add('active');
      }
    });
  } else {
    voiceInputBtn.style.display = 'none';
    console.warn('Speech Recognition API not supported in this browser.');
  }

  // Dynamically adjust container padding based on navbar height
  const navbar = document.querySelector('.navbar');
  const container = document.querySelector('.container');
  const navbarHeight = navbar.offsetHeight;
  container.style.paddingTop = `${navbarHeight + 20}px`; // Add 20px buffer
});