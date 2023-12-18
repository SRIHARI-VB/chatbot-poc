const setupTextarea = document.getElementById('setup-textarea');
const setupInputContainer = document.getElementById('setup-input-container');
const setupContainer = document.getElementById('setup-container');
const setupWrapper = document.getElementById('setup-wrapper');
const movieBossText = document.getElementById('movie-boss-text');
const chatBox = document.getElementById('chat-box');
const loading = document.getElementById('loading');

const apiKey = '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';
const url = 'https://ikez94vmpe.execute-api.us-east-1.amazonaws.com/v1/chatbot';

// Create a MutationObserver instance
const observer = new MutationObserver(() => {
  setupWrapper.scrollTop = setupWrapper.scrollHeight;
  console.log('mutation occured');
});

// Define the configuration for the observer
const observerConfig = {
  childList: true,  // Observe changes to the child nodes
};

// Start observing the chatBox
observer.observe(chatBox, observerConfig);

document.getElementById('send-btn').addEventListener('click', async () => {
   console.log('clicked'); 

  if (setupTextarea.value) {
    const sendBtn = document.getElementById('send-btn');
    sendBtn.disabled = true; // Disable the button

    // When the query is sent, add the query to the chatBox
    try{
      chatBox.appendChild(await createQuery());
    }catch (error) {
      console.error('Error fetching bot reply:', error);
    }
    
    // Loading animation
    loading.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`;
  }

  // It fetches the bot reply from the API
  try {
    await fetchBotReply();
  } catch (error) {
      console.error('Error fetching bot reply:', error);
  } finally {
      const sendBtn = document.getElementById('send-btn');
      sendBtn.disabled = false; // Enable the button
    }
  
  // Clear the textarea after fetching the bot reply
  setupTextarea.value = '';
  // Remove the loading animation
  loading.innerHTML = ''

}
);

// Function to creates the query chat div
async function createQuery() {
  const queryChat = document.createElement('div');
  queryChat.classList.add('query-chat');
  queryChat.innerHTML = `<p>${setupTextarea.value}</p>`;
  queryChat.style.border = '3px solid rgb(205, 39, 10)';
  queryChat.style.boxShadow = '0px 1px 10px 3px rgb(238, 168, 168)';
  queryChat.style.borderRadius = '10px';
  queryChat.style.padding = '10px';
  queryChat.style.width = '75%';
  queryChat.style.marginTop = '10px';
  queryChat.style.marginBottom = '10px';
  return queryChat;
}

// Function to creates the reply chat div
async function createReply(replyText) {
  const replyChat = document.createElement('div');
  replyChat.classList.add('reply-chat');
  replyChat.style.display = 'flex';
  replyChat.style.justifyContent = 'flex-end';
  replyChat.style.width = '100%';
  replyChat.innerHTML = `<div class="reply-wrap" id="reply-wrap">
                            <p>${replyText}</p>
                          </div>`;
  return replyChat;
}

// Function to fetches the bot reply from the API
async function fetchBotReply() {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        'text': setupTextarea.value,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
  
    // After getting the reply add it to the chatBox
    chatBox.appendChild(await createReply(data.output.text));
  } catch (error) {
    console.error('Error fetching bot reply:', error);
  }
  
}




