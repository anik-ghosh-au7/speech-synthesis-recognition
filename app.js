window.onload = () => {
    
    let element = document.getElementById('child');

    // reference - https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
    // reference - https://www.studytonight.com/post/javascript-text-to-speech-using-speechsynthesis-interface


    var grammar = '#JSGF V1.0; grammar movements; public <key> = up | down | right | left | aap | ab | close | restart | guide | best | wait | start | reload;'
    var recognition = new webkitSpeechRecognition();
    var speechRecognitionList = new webkitSpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    var msg = new SpeechSynthesisUtterance();
    msg.voiceURI = 'native';
    msg.volume = 2;
    msg.rate = 1.2;
    msg.pitch = 1.5;
    msg.lang = 'en';
    recognition.onend = function() {
        recognition.start();
    };

    let style = window.getComputedStyle(element);

    document.getElementById('start').onclick = function() {
        console.log('Start Button clicked!!!');
        recognition.start();
        console.log('Ready to receive a color command.');
    };

    // document.getElementById('stop').onclick = function() {
    //     console.log('Stop Button clicked!!!');
    //     recognition.abort();
    //     console.log('Stopped receiving commands command.');
    // };

    // recognition.start();
    recognition.onresult = function(event) {
        console.log('result --> ',event.results[0][0].transcript);
        var key = event.results[0][0].transcript.split(' ')[0].toLowerCase();
        var command = document.getElementById('command');

        console.log('Result received: ' + key);

        if (key == 'up' || key == 'aap' || key == 'ab') {
            console.log('up');
            command.value = 'up';
            bottom = style.getPropertyValue('bottom');
            if (parseInt(bottom.split('px')[0]) <= 275) {
                msg.text = 'going up';
                window.speechSynthesis.speak(msg);
                element.style.bottom = parseInt(bottom.split('px')[0]) + 25 + 'px';
            } else {
                msg.text = `can't go up`;
                window.speechSynthesis.speak(msg);
            };
        }
        else if (key == 'down') {
            console.log('down');
            command.value = 'down';
            bottom = style.getPropertyValue('bottom');
            if (parseInt(bottom.split('px')[0]) >= 25)  {
                msg.text = 'going down';
                window.speechSynthesis.speak(msg);
                element.style.bottom = parseInt(bottom.split('px')[0]) - 25 + 'px';
            } else {
                msg.text = `can't go down`;
                window.speechSynthesis.speak(msg);
            };
        }
        else if (key == 'left' || key == 'best') {
           console.log('left');
           command.value = 'left';
           left = style.getPropertyValue('left');
           if (parseInt(left.split('px')[0]) >= 25) {
               msg.text = 'going left';
               window.speechSynthesis.speak(msg);
               element.style.left = parseInt(left.split('px')[0]) - 25 + 'px';
            } else {
                msg.text = `can't go left`;
                window.speechSynthesis.speak(msg);
            };
        }
        else if (key == 'right' || key == 'guide' || key == 'wait') {
           console.log('right');
           command.value = 'right';
           left = style.getPropertyValue('left');
           if (parseInt(left.split('px')[0]) <= 275) {
               msg.text = 'going right';
               window.speechSynthesis.speak(msg);
               element.style.left = parseInt(left.split('px')[0]) + 25 + 'px';
            } else {
                msg.text = `can't go right`;
                window.speechSynthesis.speak(msg);
            };
        }
        else if (key == 'close') {
            console.log('closing...');
            command.value = 'close';
            msg.text = 'closing';
            window.speechSynthesis.speak(msg);
            setTimeout(() => {
                window.close();
            }, 1000);
         }
        else if (key == 'restart' || key == 'start' || key == 'reload') {
            console.log('restarting..');
            command.value = 'restart';
            msg.text = 'restarting';
            window.speechSynthesis.speak(msg);
            element.style.bottom = 0 + 'px';
            element.style.left = 0 + 'px';
        }
    };
    
}