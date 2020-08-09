window.onload = () => {
    
    let element = document.getElementById('child');

    // reference - https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition

    var grammar = '#JSGF V1.0; grammar movements; public <key> = up | down | right | left | aap | ab | close | reload;'
    var recognition = new webkitSpeechRecognition();
    var speechRecognitionList = new webkitSpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onend = function() {
        recognition.start();
    };

    let style = window.getComputedStyle(element);

    // document.getElementById('start').onclick = function() {
    //     console.log('Start Button clicked!!!');
    //     recognition.start();
    //     console.log('Ready to receive a color command.');
    // };

    // document.getElementById('stop').onclick = function() {
    //     console.log('Stop Button clicked!!!');
    //     recognition.abort();
    //     console.log('Stopped receiving commands command.');
    // };

    recognition.start();


    recognition.onresult = function(event) {
        console.log('result --> ',recognition.result)
        var key = event.results[0][0].transcript.split(' ')[0].toLowerCase();
        var command = document.getElementById('command');

        console.log('Result received: ' + key);

        if (key == 'up' || key == 'aap' || key == 'ab') {
            // up arrow
            console.log('up');
            command.value = 'up';
            bottom = style.getPropertyValue('bottom');
            if (parseInt(bottom.split('px')[0]) <= 275) element.style.bottom = parseInt(bottom.split('px')[0]) + 25 + 'px';
        }
        else if (key == 'down') {
            // down arrow
            console.log('down');
            command.value = 'down';
            bottom = style.getPropertyValue('bottom');
            if (parseInt(bottom.split('px')[0]) >= 25)  element.style.bottom = parseInt(bottom.split('px')[0]) - 25 + 'px';
        }
        else if (key == 'left') {
           // left arrow
           console.log('left');
           command.value = 'left';
           left = style.getPropertyValue('left');
           if (parseInt(left.split('px')[0]) >= 25) element.style.left = parseInt(left.split('px')[0]) - 25 + 'px';
        }
        else if (key == 'right') {
           // right arrow
           console.log('right');
           command.value = 'right';
           left = style.getPropertyValue('left');
           if (parseInt(left.split('px')[0]) <= 275) element.style.left = parseInt(left.split('px')[0]) + 25 + 'px';
        }
        else if (key == 'close') {
            console.log('closing...');
            command.value = 'close';
            window.close();
         }
        else if (key == 'reload') {
        console.log('reloading..');
        command.value = 'reload';
        location.reload();
        }
    };
    
}