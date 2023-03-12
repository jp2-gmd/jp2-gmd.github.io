(function() {

  "use strict";

  const helloResponses = [
    "No siema.", "Hejka 🙂", "Cześć.", "Witam 👋", "Dzień dobry przybyszu. 😊"
  ];
  const helloQuestions = [
       "cześć", "czesc", "hej", "siema", "dzień dobry", "dzien dobry", "hi", "hello", "elo", "witam", "witaj"
  ];

  const answerResponses = [
    "Tego nie wiem, ale za to wiem że Jacek Sasin przepierdolił 70.000.000 PLN na wybory które się nie odbyły.",
    "Może i znam odpowiedź na to pytanie ale bardziej istotne jest to że Karol Wojtyła aka papieżak był przyjacielem i obrońcą pedofilów.",
    "Wiem tyle, że Jan Papież III gwałcił małe dzieci (albo przynajmniej pomagał tym co tak robili 🤮)",
    "Jeden rabin powie tak a drugi powie nie - za to wiem że Jan Paweł II pomagał kryć pedofilów 🤮 i chuj mu za to w dupe."
  ];
  const answerQuestions = [
    "czy", "dlaczego", "jak", "ile", "po co", "czemu", "?", "co"
  ];

  const fuckOffResponses = [
    "Nie zesaj sie. 🖕"
  ];
  const fuckOffQuestions = [
    "spierdalaj", "chuju", "kurwo", "jeb sie", "wypierdalaj", "gnoju"
  ];

  const responses = [
    "Dobra, spierdalaj, nie mam już na to siły.",
    "DONALD TUSK",
    "JP2GMD"
  ];

  const submit = document.querySelector(".chat-submit");
  const chatBox = document.querySelector(".chat-box");
  const chatInput = document.querySelector(".chat-input");

  // const aiThinking = false;

  function chatTemplate(aiOrPerson) {
    return (
      `
        <div class="ai-person-container">
          <div class="${aiOrPerson.class}">
            <p>${aiOrPerson.text}</p>
          </div>
          <span class="${aiOrPerson.class}-date">${aiOrPerson.date}</span>
        </div>
      `
    );
  }

  submit.addEventListener("click", function(e) {
    appendChatBox(true);
  });

  document.addEventListener("keypress", function(e) {
    if (e.keyCode == "13") {
      appendChatBox(true);
    }
  })

  function appendChatBox(fromPerson) {
    const date = new Date()
    if (!fromPerson){
      date.setSeconds(date.getSeconds() + 1)
    }
    if (fromPerson && !chatInput.value.trim()) {
      return;
    }
    const timestamp = date.toLocaleTimeString()
    const newChatDiv = chatTemplate({
      class: fromPerson ? "person" : "ai",
      text: fromPerson ? chatInput.value.trim() : aiResponse(),
      date: timestamp
    });
    if (!fromPerson) {
      // make it so it only responds once to multiple fast sentences
      setTimeout(function() {
        chatBox.innerHTML += newChatDiv;
        chatBox.scrollTop = chatBox.scrollHeight;
      }, 500)
    } else {
      chatBox.innerHTML += newChatDiv;
      chatBox.scrollTop = chatBox.scrollHeight;
    }
    if (fromPerson) {
      chatInput.value = "";
      appendChatBox(false);
    }
  }

  function aiResponse() {
    var latestQuestion = Array.from(document.querySelectorAll('.person')).pop().innerText

    if (helloQuestions.some(v => latestQuestion.includes(v))) {
        const responseIndex = getRandomInt(0, helloResponses.length - 1);
        const response = helloResponses[responseIndex];
        return response;
    } else if (answerQuestions.some(v => latestQuestion.includes(v))) {
        const responseIndex = getRandomInt(0, answerResponses.length - 1);
        const response = answerResponses[responseIndex];
        return response;
    } else if (fuckOffQuestions.some(v => latestQuestion.includes(v))) {
        const responseIndex = getRandomInt(0, fuckOffResponses.length - 1);
        const response = fuckOffResponses[responseIndex];
        return response;
    } else {
        const responseIndex = getRandomInt(0, responses.length - 1);
        const response = responses[responseIndex];
        return response;
    }
  }

  function containsAny(array, text) {
    array.forEach(element => {
        if (element.includes(text.toLowerCase())) {
            return true;
        }
    });
    return false;
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}())
