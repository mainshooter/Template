var Ajax;
var Loader;
var KeyDetector;
var ElementCreator;
var Listner;
var Timer;
var MultiArrayVisualizer;
var VideoHandler;
var NumberHandler;
// The classes








(function() {
  ElementCreator = {

    createdElement: '',
    // The current created element

    /**
     * Creates a new HTML tag
     * @param  {[string]} htmlTag [The HTML tag you want to create]
     */
    createElement: function(htmlTag) {
      ElementCreator.createdElement = document.createElement(htmlTag);
    },

    /**
     * Sets the classnames of the new HTML tag
     * @param  {[string]} classNames [The new classnames we want to give to the element]
     */
    setClassNames: function(classNames) {
      let createdElement = ElementCreator.createdElement;
      createdElement.className = classNames;
      ElementCreator.createdElement = createdElement;
    },

    /**
     * Sets the ids for the new element
     * @param  {[string]} ids [The ID for the element]
     */
    setIDs: function(ids) {
      let createdElement = ElementCreator.createdElement;
      createdElement.id = ids;
      ElementCreator.createdElement = createdElement;
    },

    /**
     * Sets HTML in the new created element
     * @param  {[string]} html [The HTML we want to set in the new element]
     */
    setHTML: function(html) {
      let createdElement = ElementCreator.createdElement;
      createdElement.innerHTML = html;
      ElementCreator.createdElement = createdElement;
    },

    /**
     * Sets text inside of the new created element
     * @param  {[string]} text [The text we want to set in the element]
     */
    setText: function(text) {
      let createdElement = ElementCreator.createdElement;
      createdElement.createTextNode = text;
      ElementCreator.createdElement = createdElement;
    },

    /**
     * Places the created element on the DOM!
     * @param  {[string]} id [The ID of the element we want to place it on]
     */
    place: function(element) {
      let createdElement = ElementCreator.createdElement;
      if (createdElement != '') {
        select(element).appendChild(createdElement);
      }
      else {
        console.log('No element was created first! Use ElementCreator.createElement');
      }

    }

  }
})();

(function() {
  Timer = {

    time: 0,
    // Contain the current time in seconds

    timerCallback: '',
    // The callback function

    timeInterval: '',
    // Contain the interval

    timeOutMiliseconds: 1000,

    /**
     * Increase the current time on the timer by 1 sec
     * @return {[type]} [description]
     */
    count: function() {
      Timer.time++;
    },

    /**
     * Sets the callback function for the timer when it runs
     * @param  {[Function]} functionName [The name of the function]
     */
    setTimerCallback: function(functionName) {
      Timer.timerCallback = functionName;
    },

    /**
     * Sets the time for the timeout for the set interval
     * By default it is 1000 miliseconds (1 second)
     * @param  {[int]} timeInMiliseconds [The timeout time in miliseconds]
     */
    setTimeOut: function(timeInMiliseconds) {
      Timer.timeOutMiliseconds = timeInMiliseconds;
    },

    /**
     * Starts the timer
     * @return {[type]} [description]
     */
    start: function() {
      Timer.timerInterval = setInterval(function(){
        Timer.timerCallback(Timer.getCurrentTime());
        // By default we send the current time of the timer, to the callback function

        Timer.count();
        // Increase the counter
      }, Timer.timeOutMiliseconds);
    },

    /**
     * Ends the timer
     * @return {[type]} [description]
     */
    end: function() {
      clearInterval(Timer.timerInterval);
    },

    /**
     * Returns the current time from the timer
     * @return {[INT]} [The current time that is displaying on the timer]
     */
    getCurrentTime: function() {
      return(Timer.time);
    }
  }
})();

(function() {
  Loader = {
    /**
     * Starts the loader
     */
    enable: function() {
      document.getElementById('loader').className = 'loaderEnable';
    },
    /**
     * Stops the loader
     */
    disable: function() {
      document.getElementById('loader').className = '';
    }
  }
})();

(function() {
  /**
   * How to use the KeyDetector
   *
   *  First enable the keyDetector
   *
   *  Then set the function we need to send the output to with the KeyDetector.setKeyPressReturnFunction( 'functionName' )
   *  Were functionName is you need to put the function name in there we need to return to
   *
   * Thats all
   *
   */
  KeyDetector = {

    status: false,
    // All the keyCodes

    lastKeyPress: [],
    // The key we last have pressed

    keyPressReturnFunction: '',
    // Saves the function name we later want to use to send the translated keypress to


    /**
     * Enables the key detector
     */
    enable: function() {
      KeyDetector.status = true;
      document.addEventListener('keydown', function(){ KeyDetector.keyPressTranslator(event); });
      console.log('KeyDetector is enabled');
    },

    /**
     * Disabled the key detector
     */
    disable: function() {
      KeyDetector.status = false;
      document.removeEventListener('keydown', function() { KeyDetector.keyPressTranslator(); });
      console.log('KeyDetector is disabled');
    },

    /**
     * Gets the status if the key detector is enabled
     * @return {[boolean]} [If it is enabled or not]
     */
    getStatus: function() {
      return(KeyDetector.status);
    },

    /**
     * To set the function we need to send the keypress to
     * @param  {[function]} functionName [The name of the function]
     */
    setKeyPressReturnFunction: function(functionName) {
      KeyDetector.keyPressReturnFunction = function() { functionName(KeyDetector.lastKeyPress); };
    },

    /**
     * Detect a keypress and sends it to the given functionName that has been set by KeyDetector.setKeyPressReturnFunction();
     * @param  {[obj]} event [The event given by the event handler]
     */
    keyPressTranslator: function(event) {
      if (KeyDetector.getStatus() == true) {

        if (KeyDetector.keyPressReturnFunction != '') {
          let keyCode = event.keyCode;
          // Contains a array with the keycode and what the code means

            KeyDetector.lastKeyPress = [keyCode ,keyCodes[keyCode]];

          KeyDetector.keyPressReturnFunction();
        }

        else {
          console.log('No function is set with KeyDetector.setKeyPressReturnFunction(); !');
        }

      }

    }

  }
})();

(function() {
  Ajax = {
    /**
     * Sends a get request with a callback
     * @param  {[string]} url [Where we want to send the ajax request to]
     * @return {[obj]}     [The result from ajax request as a object]
     */
    get_withCallback: function(url) {
      let xhttp = new XMLHttpRequest();
      xhttp.open("GET", url, false);
      xhttp.send();

      return(xhttp);
    },
    /**
     * Sends a get request without a callback
     * @param  {[string]} url [The URL where we send the request to]
     * @return {[object]} xhhtp [The returned object]
     */
    get_withoutCallBack: function(url) {
      let xhttp = new XMLHttpRequest();
      xhttp.open("GET", url, false);
      xhttp.send();
    },
    /**
     * Sends a post ajax request with a callback
     * @param  {[string]} url            [The url where we want to send the post request to]
     * @param  {[string]} postParameters [With the post values we will fill in]
     * @return {[type]}                [description]
     */
    post_withCallback: function(url ,postParameters) {
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log("Done with ajax post with callBack");
        }
      };
      // contains te post values
      xhttp.open("POST", url, true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send(postParameters);

      return(xhttp);
    },
    /**
     * [description]
     * @param  {[string]} url [The url where we want to send the request to]
     * @param  {[string]} postParameters [With the postParameters in it]
     */
    post_withoutCallback: function(url, postParameters) {
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log("Done with ajax post without callBack");
        }
      };
      // contains te post values
      xhttp.open("POST", url, false);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send(postParameters);
    }
  }
})();

(function() {
  Listner = {
    /**
     * Adds a event listner to a element
     * @param  {[string]} element      [The identifyer of a element]
     * @param  {[string]} eventName    [The name of the event we want to add to the element]
     * @param  {[function]} functionName [The name of the function we want to link to the element]
     */
    add: function(element, eventName, functionName) {
      select(element).addEventListener(eventName, function(){ functionName(); });
    },

    /**
     * Removes a event listner from a element
     * @param  {[string]} element      [The identifyer of a element]
     * @param  {[string]} eventName    [The name of the event we want to remove of a element]
     * @param  {[function]} functionName [The name of a function we want to link to the element]
     */
    remove: function(element, eventName, functionName) {
      select(element).removeEventListener(eventName, function(){ functionName(); });
    }
  }
})();

(function() {
  /**
   * To generate a table from a 2 dimensional array
   */
  MultiArrayVisualizer = {
    multiArray: [],
    // Contains the current array

    /**
     * Sets the multi dimensional array
     * @param  {[arr]} IncomingArray [The 2 dimensional array for this obj]
     */
    setMultiArray: function(IncomingArray) {
      MultiArrayVisualizer.multiArray = IncomingArray;
    },

    /**
     * Generates the content for the table (td's)
     * @return {[string]} [The HTML code]
     */
    tableContent: function() {
      let content = '';
      let currentArray = MultiArrayVisualizer.multiArray;
      currentArray.forEach(function(rowArray, index, arr) {
        // To loop trough the first layer of the array
        content += '<tr>';
        rowArray.forEach(function(value, index, arr) {
          // To loop trough the second layer of the array
          content += '<td>' + value +  '</td>';
        });
        content += '</tr>';
      });
      return(content);
    },

    /**
     * Generates a table when the multiArray is set
     * @return {[string / boolean]} [On succes we return the table / When it fails we return false]
     */
    generateTable: function() {
      if (MultiArrayVisualizer.multiArray.length > 0) {
        // If the array a array is set
        let table = '<table>';
        table += MultiArrayVisualizer.tableContent();
        table += '</table>';
        return(table);
      }

      else {
        console.log("No array has been set!, use MultiArrayVisualizer.setMultiArray to set a array");
        return(false);
      }

    }
  }
})();

(function() {
  /**
   * Can controll a Video
   */
  VideoHandler = {
    videoHandlerElement: '',

    /**
     * You set the element for the obj to work with it later
     * @param  {[string]} element [The element identifyer]
     */
    setVideoElement: function(element) {
      VideoHandler.videoHandlerElement = select(element);
    },

    /**
     * Plays the video
     */
    play: function() {
      VideoHandler.videoHandlerElement.play();
    },

    /**
     * Pauses the video and set the time of the video to the start
     */
    stop: function() {
      VideoHandler.pause();
      VideoHandler.setCurrentTime(0);
    },

    /**
     * Pauses the video
     */
    pause: function() {
      VideoHandler.videoHandlerElement.pause();
    },

    /**
     * Controlls the volume of the video
     * @param  {[float]} volumeLvl [0.0 to 1.0 form silent to loud]
     */
    volume: function(volumeLvl) {
      VideoHandler.videoHandlerElement = volumeLvl;
    },

    /**
     * Controlls the speed of the video is playing
     * @param  {[float]} speedLvl [0.1 to 1.0 from slow to normal or faster!]
     */
    playbackRate: function(speedLvl) {
      VideoHandler.videoHandlerElement = speedLvl;
    },

    /**
     * Sets the current time of were the video is playing
     * @param  {[int]} timeInSeconds [The time in seconds were you want to get the video to]
     */
    setCurrentTime: function(timeInSeconds) {
      VideoHandler.videoHandlerElement = timeInSeconds;
    },

    /**
     * Returns the lenght of the full video
     * @return {[int]} [The time in seconds]
     */
    getFullLenght: function() {
      return(VideoHandler.videoHandlerElement.duration);
    },

    /**
     * Returns the current time of were the video is playing
     * @return {[int]} [The current time of the video in seconds]
     */
    getCurrentPlayTime: function() {
      return(VideoHandler.videoHandlerElement.currentTime);
    },

    /**
     * Returns the video status of the video element
     * If the video is playing or not
     * @return {[string]} [Return the play status as a string]
     */
    getVideoStatus: function() {
      if (VideoHandler.videoHandlerElement.paused === true) {
        return('paused');
      }

      else if (VideoHandler.videoHandlerElement.paused === false) {
        return('playing');
      }
    }
  }
})();

(function() {
  NumberHandler = {
    /**
     * Checks if a number is even
     * @param  {[int]} number [The number you want to check]
     * @return {[boolean]}        [If it is a even number, we return true]
     */
    CheckIfNumerIsEven: function(number) {
      let result = number / 2;
      if (Number.isInteger(result) === true) {
        // It is even
        return(true);
      }

      else {
        // It isn't even
        return(false);
      }
    },

    /**
     * Checks if a number is odd
     * @param  {[int]} number [The number we want to check]
     * @return {[boolean]}        [Returns true if a number is odd]
     */
    checkIfNumberIsOdd: function(number) {
      let result = number / 2;
      if (Number.isInteger(result) === true) {
        // It is even
        return(false);
      }

      else {
        // It odd
        return(true);
      }
    }
  }
})();


/**
 * Selects one element
 * @param  {[string]} element [The selector for the element]
 * @return {[DOM]}         [The selected element]
 */
function select(element) {
  return(document.querySelector(element));
}

/**
 * Selects all element that will it will find
 * @param  {[string]} elements [The selector for all the elements]
 * @return {[array]}          [All the elements that have been found]
 */
function selectAll(elements) {
  return(document.querySelectorAll(elements));
}

var keyCodes = {
  3 : "break",
  8 : "backspace / delete",
  9 : "tab",
  12 : 'clear',
  13 : "enter",
  16 : "shift",
  17 : "ctrl",
  18 : "alt",
  19 : "pause/break",
  20 : "caps lock",
  27 : "escape",
  28 : "conversion",
  29 : "non-conversion",
  32 : "spacebar",
  33 : "page up",
  34 : "page down",
  35 : "end",
  36 : "home ",
  37 : "left arrow ",
  38 : "up arrow ",
  39 : "right arrow",
  40 : "down arrow ",
  41 : "select",
  42 : "print",
  43 : "execute",
  44 : "Print Screen",
  45 : "insert ",
  46 : "delete",
  48 : "0",
  49 : "1",
  50 : "2",
  51 : "3",
  52 : "4",
  53 : "5",
  54 : "6",
  55 : "7",
  56 : "8",
  57 : "9",
  58 : ":",
  59 : "semicolon (firefox), equals",
  60 : "<",
  61 : "equals (firefox)",
  63 : "ß",
  64 : "@ (firefox)",
  65 : "a",
  66 : "b",
  67 : "c",
  68 : "d",
  69 : "e",
  70 : "f",
  71 : "g",
  72 : "h",
  73 : "i",
  74 : "j",
  75 : "k",
  76 : "l",
  77 : "m",
  78 : "n",
  79 : "o",
  80 : "p",
  81 : "q",
  82 : "r",
  83 : "s",
  84 : "t",
  85 : "u",
  86 : "v",
  87 : "w",
  88 : "x",
  89 : "y",
  90 : "z",
  91 : "Windows Key / Left ⌘ / Chromebook Search key",
  92 : "right window key ",
  93 : "Windows Menu / Right ⌘",
  96 : "numpad 0 ",
  97 : "numpad 1 ",
  98 : "numpad 2 ",
  99 : "numpad 3 ",
  100 : "numpad 4 ",
  101 : "numpad 5 ",
  102 : "numpad 6 ",
  103 : "numpad 7 ",
  104 : "numpad 8 ",
  105 : "numpad 9 ",
  106 : "multiply ",
  107 : "add",
  108 : "numpad period (firefox)",
  109 : "subtract ",
  110 : "decimal point",
  111 : "divide ",
  112 : "f1 ",
  113 : "f2 ",
  114 : "f3 ",
  115 : "f4 ",
  116 : "f5 ",
  117 : "f6 ",
  118 : "f7 ",
  119 : "f8 ",
  120 : "f9 ",
  121 : "f10",
  122 : "f11",
  123 : "f12",
  124 : "f13",
  125 : "f14",
  126 : "f15",
  127 : "f16",
  128 : "f17",
  129 : "f18",
  130 : "f19",
  131 : "f20",
  132 : "f21",
  133 : "f22",
  134 : "f23",
  135 : "f24",
  144 : "num lock ",
  145 : "scroll lock",
  160 : "^",
  161: '!',
  163 : "#",
  164: '$',
  165: 'ù',
  166 : "page backward",
  167 : "page forward",
  169 : "closing paren (AZERTY)",
  170: '*',
  171 : "~ + * key",
  173 : "minus (firefox), mute/unmute",
  174 : "decrease volume level",
  175 : "increase volume level",
  176 : "next",
  177 : "previous",
  178 : "stop",
  179 : "play/pause",
  180 : "e-mail",
  181 : "mute/unmute (firefox)",
  182 : "decrease volume level (firefox)",
  183 : "increase volume level (firefox)",
  186 : "semi-colon / ñ",
  187 : "equal sign ",
  188 : "comma",
  189 : "dash ",
  190 : "period ",
  191 : "forward slash / ç",
  192 : "grave accent / ñ / æ",
  193 : "?, / or °",
  194 : "numpad period (chrome)",
  219 : "open bracket ",
  220 : "back slash ",
  221 : "close bracket / å",
  222 : "single quote / ø",
  223 : "`",
  224 : "left or right ⌘ key (firefox)",
  225 : "altgr",
  226 : "< /git >",
  230 : "GNOME Compose Key",
  231 : "ç",
  233 : "XF86Forward",
  234 : "XF86Back",
  240 : "alphanumeric",
  242 : "hiragana/katakana",
  243 : "half-width/full-width",
  244 : "kanji",
  255 : "toggle touchpad"
};
