const setupTextarea = document.getElementById('setup-textarea');
const setupInputContainer = document.getElementById('setup-input-container');
const setupContainer = document.getElementById('setup-container');
const movieBossText = document.getElementById('movie-boss-text');
const chatBox = document.getElementById('chat-box');
// const reply= document.getElementById('reply'); 
// const replyWrap= document.getElementById('reply-wrap'); 
const loading = document.getElementById('loading');
// const query = document.getElementById('query');
// const queryWrap = document.getElementById('query-wrap');
const apiKey = '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';
const url = 'https://ikez94vmpe.execute-api.us-east-1.amazonaws.com/v1/chatbot';


document.getElementById('send-btn').addEventListener('click', async () => {
   console.log('clicked'); 

  if (setupTextarea.value) {
    
    // queryWrap.style.border = '1px solid #000';
    // queryWrap.style.borderRadius = '10px';
    // queryWrap.style.padding = '10px';
    // queryWrap.style.width = '75%';
    // queryWrap.style.marginTop = '10px';

    // query.innerHTML = `<p>${setupTextarea.value}</p>`;

    chatBox.appendChild(await createQuery());
    
    
    
    loading.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`;
    
    
    // movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`;
  }

  await fetchBotReply();
  
  setupTextarea.value = '';
  loading.innerHTML = ``;

  // setupContainer.innerHTML = setupContainer.innerHTML;
  // setupInputContainer.innerHTML =`<p>dwdvdv</p>`;
  // setupTextarea.focus();/

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

    // reply.innerText = data.output.text;
    
    // replyWrap.style.border = '1px solid #000';
    // replyWrap.style.borderRadius = '10px';
    // replyWrap.style.padding = '10px';
    // replyWrap.style.width = '70%';
    // replyWrap.style.marginTop = '10px';

    
    

    // console.log(data);
  } catch (error) {
    console.error('Error fetching bot reply:', error);
    // Handle the error as needed
  }
}

// {id: "cmpl-78rekXLd1GewCaHDNV4Dm5GlDUmui", object: "text_completion", created: 1682347234, model: "text-davinci-003", choices: [{text: " Excitedly enthusiastic!", index: 0, logprobs: null, finish_reason: "stop"}], usage: {prompt_tokens: 8, completion_tokens: 7, total_tokens: 15}}


