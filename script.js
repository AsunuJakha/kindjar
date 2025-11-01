// Load messages from localStorage or seed data
let messages = JSON.parse(localStorage.getItem("kindMessages")) || [
  { id: 0, msg: "All the best!" },
  { id: 1, msg: "Keep smiling 😊" },
  { id: 2, msg: "You’re doing great!" }
];

const form = document.getElementById("messageForm");
const messageBox = document.getElementById("message");
const scrollAnim = document.querySelector(".scroll-animation");
const jarScrolls = document.querySelector(".jar-scrolls");
const pickBtn = document.getElementById("pickBtn");
const randomMessage = document.getElementById("randomMessage");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // fade text
  messageBox.classList.add("fade-out");

  // animate scroll
  setTimeout(() => {
    scrollAnim.classList.add("animate-scroll");
  }, 500);

  // update localStorage with the message
  const message = messageBox.value.trim();
  if (!message) return; // ignore empty messages

  console.log("Message to save:", message);

  // Get existing data from localStorage or initialize if empty
  let data = JSON.parse(localStorage.getItem("kindMessages")) || [];

  // Create new message object
  const newMessage = {
    id: data.length,
    msg: message
  };

  // Add new message
  data.push(newMessage);

  // Save updated data to localStorage
  localStorage.setItem("kindMessages", JSON.stringify(data));
  console.log("Message saved to localStorage!");

  // when animation finishes, create a copy inside the jar
  scrollAnim.addEventListener("animationend", function handler() {
    scrollAnim.removeEventListener("animationend", handler);

    // create a new scroll element inside the jar
    const newScroll = document.createElement("img");
    newScroll.src = "./resources/scroll.png"; // your scroll image
    newScroll.style.position = "absolute";
    newScroll.style.left = "50%"; // middle of jar
    newScroll.style.top = "70%"; // inside the jar
    newScroll.style.transform = "translate(-50%, -50%) scale(0.1)"; // smaller inside jar
    jarScrolls.appendChild(newScroll);

    // reset flying scroll
    scrollAnim.classList.remove("animate-scroll");
    messageBox.value = "";
    messageBox.classList.remove("fade-out");
  });
});

// Pick random message
pickBtn.addEventListener("click", () => {
  const storedMessages = JSON.parse(localStorage.getItem("kindMessages")) || [];
  if (storedMessages.length === 0) return alert("No messages yet!");

  const random = storedMessages[Math.floor(Math.random() * storedMessages.length)];
  randomMessage.textContent = `"${random.msg}"`;
});
