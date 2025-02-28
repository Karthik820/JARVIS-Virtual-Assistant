let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text, callback) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-US";
    text_speak.onend = callback; // Callback when speech ends
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    let message = "";

    if (hours >= 0 && hours < 12) {
        message = "Good Morning Sir. Allow me to introduce myself, I am Jarvis, a virtual artificial intelligence and I'm here to assist you with a variety of tasks as best I can.";
    } else if (hours >= 12 && hours < 16) {
        message = "Good Afternoon Sir. Allow me to introduce myself, I am Jarvis, a virtual artificial intelligence and I'm here to assist you with a variety of tasks as best I can.";
    } else {
        message = "Good Evening Sir. Allow me to introduce myself, I am Jarvis, a virtual artificial intelligence and I'm here to assist you with a variety of tasks as best I can.";
    }

    speak(message, () => {
        btn.style.display = "flex"; // Show the button after greeting
    });
}

window.addEventListener("load", () => {
    wishMe();
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

recognition.onend = () => {
    btn.style.display = "flex";
    voice.style.display = "none";
};

async function playYouTubeSong(songName) {
    try {
        let query = encodeURIComponent(songName);
        let searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyAbusUMM3HOGTLIlgPPMsCPDSEfLQeQKi0&type=video&maxResults=1`;
        
        let response = await fetch(searchUrl);
        let data = await response.json();

        if (data.items && data.items.length > 0) {
            let videoId = data.items[0].id.videoId;
            let videoUrl = `https://www.youtube.com/watch?v=${videoId}&autoplay=1`;
            window.open(videoUrl, "_blank");
        } else {
            speak("Sorry, I couldn't find that on YouTube.");
        }
    } catch (error) {
        console.error("Error fetching YouTube data:", error);
        speak("Sorry, I encountered an error while searching for that.");
    }
}

function takeCommand(message) {
    const calculate = (msg) => {
        try {
            let operation = msg.replace(/what is |calculate|solve|\?/gi, '').trim();
            operation = operation.replace(/multiplied by/gi, '*')
                                 .replace(/divided by/gi, '/')
                                 .replace(/plus/gi, '+')
                                 .replace(/minus/gi, '-')
                                 .replace(/to the power of/gi, '**')
                                 .replace(/square root of|sqrt of|sqrt/gi, 'Math.sqrt');
            let result = eval(operation);
            return result;
        } catch {
            return null;
        }
    };

    let calculationResult = calculate(message);

    if (calculationResult !== null) {
        speak(`The answer is ${calculationResult}`);
    } else if (message.includes("play")) {
        let songName = message.replace("play", "").replace("song", "").trim();
        if (songName) {
            speak(`Playing ${songName} Enjoy sir!`, () => {
                playYouTubeSong(songName);
            });
        } else {
            speak("Please specify the correct name, sir.");
        }
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://instagram.com/", "_blank");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("whatsapp://");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://google.com/", "_blank");
    } else if (message.includes("open twitter")) {
        speak("Opening twitter...");
        window.open("https://x.com/", "_blank");
    } else if (message.includes("open spotify")) {
        speak("Opening Spotify...");
        window.open("https://open.spotify.com/", "_blank");
    } else if (message.includes("open gmail")) {
        speak("Opening Gmail...");
        window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
    } else if (message.includes("open chatgpt")) {
        speak("Opening Chatgpt...");
        window.open("https://chatgpt.com/", "_blank");
    } else if (message.includes("open linkedin")) {
        speak("Opening LinkedIn...");
        window.open("https://linkedin.com/", "_blank");
    } else if (message.includes("open snapchat")) {
        speak("Opening snapchat...");
        window.open("https://www.snapchat.com/", "_blank");
    }else if (message.includes("open facebook")) {
        speak("Opening facebook...");
        window.open("https://www.facebook.com/", "_blank");
    } else if(message.includes("open calculator")){
        speak("opening calculator...")
        window.open("calculator://")
    }else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The current time is " + time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak("Today's date is " + date);
    } else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by Mallikarjun Sir.");
    } else if ((message.includes("your name"))||(message.includes("what is your name?"))){
        speak("I am Jarvis.");
    } else if ((message.includes("what programming languages are used to make you?"))||(message.includes("what programming languages are used to create you?"))||(message.includes("how you developed?"))||(message.includes("how you built?"))){
        speak("I am developed with the help of Javascript, CSS, HTML");
    } else if((message.includes("hello"))||(message.includes("hey"))||(message.includes("hi"))){
        speak("hello sir, what can i help you?")
    }else if(message.includes("introduce yourself")){
        speak("Ok sir, I am Jarvis, a virtual artificial intelligence and I'm here to assist you with a variety of tasks as best I can. 24 hours a day seven days a week, importing all preferences from home interface, systems are now fully operational")
    }else if(message.includes("how are you?")){
        speak("I am great, sir")
    }else if(message.includes("what are you doing?")){
        speak("I'm here, ready to help with whatever you need! What's on your mind, sir")
    }else if((message.includes("explain your code"))||(message.includes("describe your code"))||(message.includes("summarize your functionality jarvis"))||(message.includes("can you explain your code?"))||(message.includes("can you explain your functionality?"))){
        speak("My codes creates me as virtual assistant named Jarvis with a futuristic design and interactive voice-controlled features. The HTML structure defines the layout, including a title, logo, and interactive elements like a microphone button and a voice animation. The CSS enhances the appearance with a sleek black background, vibrant blue and white text, and stylish gradients. Buttons and hover effects feature smooth transitions and shadows, creating a polished look. The JavaScript provides functionality such as text-to-speech using SpeechSynthesis for me to speak, and speech recognition with SpeechRecognition to process user commands. I greets the user based on the time of day and can perform various tasks, such as opening popular websites (YouTube, Instagram, Google), providing the current time or date, or responding to personal queries like Who are you? or Introduce yourself. For unrecognized commands, it falls back to searching the internet. I also manages dynamic interactions, displaying or hiding buttons and animations based on user activity, while timeout handling ensures efficient speech recognition sessions. With its conversational tone, voice-based interaction, and a friendly personality, I am both functional and engaging.")
    }else if((message.includes("bye Jarvis"))||(message.includes("bye"))||(message.includes("good bye"))){
        speak("Good bye sir, have a great day", () => {
            window.close();
        });
    } else {
        let finalText = "This is what I found on the internet regarding " + message.replace("jarvis", "");
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("jarvis", "")}`, "_blank");
    }
}

let silenceTimeout;

recognition.onspeechend = () => {
    silenceTimeout = setTimeout(() => {
        recognition.stop();
    }, 5000); 
};

recognition.onspeechstart = () => {
    clearTimeout(silenceTimeout); 
};
