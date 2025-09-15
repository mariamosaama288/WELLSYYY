const apiKey = AIzaSyB34huHXKwAy8CfBuukJinymH77i636lHo; // 🔑 Replace with Gemini API key

const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const micBtn = document.getElementById("micBtn");
const chatbox = document.getElementById("chatbox");
const speakBtn = document.getElementById("speakBtn");
const stopSpeakBtn = document.getElementById("stopSpeakBtn");
const toggleDark = document.getElementById("toggleDark");

let lastGeminiReply = "";
let currentUtterance = null;
let recognition = null;

// 🎤 Setup microphone
if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    input.value = transcript;
    sendMessage();
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    alert("🎤 Error: " + event.error);
  };
} else {
  micBtn.disabled = true;
  micBtn.title = "Speech recognition not supported in this browser";
}

// Events
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

micBtn.addEventListener("click", () => {
  if (recognition) recognition.start();
});

speakBtn.addEventListener("click", () => {
  if (!lastGeminiReply) {
    alert("⚠️ No reply to read yet!");
    return;
  }
  if (speechSynthesis.speaking) speechSynthesis.cancel();
  currentUtterance = new SpeechSynthesisUtterance(lastGeminiReply);
  speechSynthesis.speak(currentUtterance);
});

stopSpeakBtn.addEventListener("click", () => {
  if (speechSynthesis.speaking || speechSynthesis.pending) {
    speechSynthesis.cancel();
  }
});

toggleDark.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Send message
async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  addMessage("user", message);
  input.value = "";
  sendBtn.disabled = true;

  const loadingDiv = addMessage("gemini", "⏳ Gemini is typing...");

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
        }),
      }
    );

    const data = await response.json();
    chatbox.removeChild(loadingDiv);

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!reply) {
      addMessage("gemini", "⚠️ No reply from Gemini.");
    } else {
      addMessage("gemini", reply);
      lastGeminiReply = reply;
    }
  } catch (err) {
    chatbox.removeChild(loadingDiv);
    addMessage("gemini", "❌ Error: " + err.message);
  } finally {
    sendBtn.disabled = false;
    input.focus();
  }
}

// Add message bubble
function addMessage(sender, text) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.textContent = text;
  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
  return div;
}
