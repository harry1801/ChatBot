document.addEventListener("DOMContentLoaded", function () {
  const chatMessages = document.getElementById("chat-messages");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  // Function to send message
  function sendMessage() {
    const message = userInput.value.trim();
    if (message !== "") {
      appendMessage("You: " + message);
      userInput.value = "";
      fetch("/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "message=" + encodeURIComponent(message),
      })
        .then((response) => response.json())
        .then((data) => {
          appendMessage("Bot: " + data.message);
          scrollToBottom(); // Scroll to bottom after receiving bot's response
        });
    }
  }

  // Event listener for send button
  sendBtn.addEventListener("click", function () {
    sendMessage();
    scrollToBottom(); // Scroll to bottom after sending message
  });

  // Event listener for Enter key
  userInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission behavior
      sendMessage();
      scrollToBottom(); // Scroll to bottom after sending message
    }
  });

  // Function to append message to chat window
  function appendMessage(message) {
    const msgDiv = document.createElement("div");
    msgDiv.textContent = message;
    chatMessages.appendChild(msgDiv);
  }

  // Function to scroll to bottom of chat window
  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});
