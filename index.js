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

    try{
      chatBox.appendChild(await createQuery());
    }catch (error) {
      console.error('Error fetching bot reply:', error);
    }
    
    
    loading.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`;

    // Trigger the scroll manually after adding new content
    // setupContainer.scrollTop = setupContainer.scrollHeight;
    
    
    // movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`;
  }

  try {
    await fetchBotReply();
    
  } catch (error) {
      console.error('Error fetching bot reply:', error);
  } finally {
      const sendBtn = document.getElementById('send-btn');
      sendBtn.disabled = false; // Enable the button
      // setupContainer.scrollIntoView(true)
    }
  
  
  setupTextarea.value = '';
  loading.innerHTML = ``;


  // setupContainer.innerHTML = setupContainer.innerHTML;
  // setupInputContainer.innerHTML =`<p>dwdvdv</p>`;
  // setupTextarea.focus();

}
);

async function createQuery() {
  const queryChat = document.createElement('div');
  queryChat.classList.add('query-chat');
  queryChat.innerHTML = `<p>${setupTextarea.value}</p>`;
  queryChat.style.border = '3px solid rgb(205, 39, 10)';

  queryChat.style.borderRadius = '10px';
  queryChat.style.padding = '10px';
  queryChat.style.width = '75%';
  queryChat.style.marginTop = '10px';
  queryChat.style.marginBottom = '10px';
  return queryChat;
  
  // const query = document.getElementById('query');

  // query.innerHTML = ``;

  // setupInputContainer.innerHTML =`<p>dwdvdv</p>`;
  // setupTextarea.focus();
  
}

async function createReply(replyText) {
  const replyChat = document.createElement('div');
  replyChat.classList.add('reply-chat');
  replyChat.style.display = 'flex';
  replyChat.style.justifyContent = 'flex-end';
  replyChat.style.width = '100%';
  replyChat.innerHTML = `<div class="reply-wrap" id="reply-wrap">
  <p>${replyText}</p>
  </div>`;

  // const replyWrap = document.getElementById('reply-wrap');
  // replyWrap.style.border = '1px solid #000';
  // replyWrap.style.borderRadius = '10px';
  // replyWrap.style.padding = '10px';
  // replyWrap.style.width = '70%';
  // replyWrap.style.marginTop = '10px';


  return replyChat;
}



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
    
    
    chatBox.appendChild(await createReply(data.output.text));
    // chatBox.appendChild(await createReply(data.output.text));
    
    // reply.innerText = data.output.text;
    
    // replyWrap.style.border = '1px solid #000';
    // replyWrap.style.borderRadius = '10px';
    // replyWrap.style.padding = '10px';
    // replyWrap.style.width = '70%';
    // replyWrap.style.marginTop = '10px';

    // let setupContainer = document.getElementById('setupContainer');
    // setupContainer.scrollTop = setupContainer.scrollHeight;
    

    // console.log(data);
  } catch (error) {
    console.error('Error fetching bot reply:', error);
    // Handle the error as needed
  }
  
}




