window.onload = () => {
    
    let element = document.getElementById('child');

    // reference - https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition

    var grammar = '#JSGF V1.0; grammar movements; public <key> = up | down | right | left | aap | ab | close | restart;'
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
        console.log('result --> ',recognition.result)
        var key = event.results[0][0].transcript.split(' ')[0].toLowerCase();
        var command = document.getElementById('command');

        console.log('Result received: ' + key);

        if (key == 'up' || key == 'aap' || key == 'ab') {
            // up arrow
            console.log('up');
            command.value = 'up';
            msg.text = 'going up';
            window.speechSynthesis.speak(msg);
            bottom = style.getPropertyValue('bottom');
            if (parseInt(bottom.split('px')[0]) <= 275) element.style.bottom = parseInt(bottom.split('px')[0]) + 25 + 'px';
        }
        else if (key == 'down') {
            // down arrow
            console.log('down');
            command.value = 'down';
            msg.text = 'going down';
            window.speechSynthesis.speak(msg);
            bottom = style.getPropertyValue('bottom');
            if (parseInt(bottom.split('px')[0]) >= 25)  element.style.bottom = parseInt(bottom.split('px')[0]) - 25 + 'px';
        }
        else if (key == 'left') {
           // left arrow
           console.log('left');
           command.value = 'left';
           msg.text = 'going left';
           window.speechSynthesis.speak(msg);
           left = style.getPropertyValue('left');
           if (parseInt(left.split('px')[0]) >= 25) element.style.left = parseInt(left.split('px')[0]) - 25 + 'px';
        }
        else if (key == 'right') {
           // right arrow
           console.log('right');
           command.value = 'right';
           msg.text = 'going right';
           window.speechSynthesis.speak(msg);
           left = style.getPropertyValue('left');
           if (parseInt(left.split('px')[0]) <= 275) element.style.left = parseInt(left.split('px')[0]) + 25 + 'px';
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
        else if (key == 'restart') {
        console.log('restarting..');
        command.value = 'restart';
        msg.text = 'restarting';
        window.speechSynthesis.speak(msg);
        element.style.bottom = 0 + 'px';
        element.style.left = 0 + 'px';
        }
    };
    
}