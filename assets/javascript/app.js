$(document).ready(function() {
    // Create variables to hold number of right, wrong, and unanswered questions.
    var questionsCorrect = 0;
    var questionsIncorrect = 0;
    var questionsNotAnswered = 0;
    var wins = 0;
    var losses = 0;
    // Create an array. Each element in the array is an object containing a question and several possible answers. Only one of the answers is the correct answer. 
    
    var questionOne = {
        question: "this is a test",
        correctAnswer: "This is correct",
        incorrectAnswerOne: "This is incorrect one",
        incorrectAnswerTwo: "This is incorrect two",
        incorrectAnswerThree: "This is incorrect three"
    }
    var questionTwo = {
        question: "this is also a test",
        correctAnswer: "This is also correct",
        incorrectAnswerOne: "This is also incorrect one",
        incorrectAnswerTwo: "This is also incorrect two",
        incorrectAnswerThree: "This is also incorrect three"
    }
    var questionThree = {
        question: "this is 3 a test",
        correctAnswer: "This is 3 correct",
        incorrectAnswerOne: "This is 3 incorrect one",
        incorrectAnswerTwo: "This is 3 incorrect two",
        incorrectAnswerThree: "This is 3 incorrect three"
    }
    var questionFour = {
        question: "this is 4 a test",
        correctAnswer: "This is 4 correct",
        incorrectAnswerOne: "This is 4 incorrect one",
        incorrectAnswerTwo: "This is 4 incorrect two",
        incorrectAnswerThree: "This is 4 incorrect three"
    }
    var questionFive = {
        question: "this is 5 a test",
        correctAnswer: "This is 5 correct",
        incorrectAnswerOne: "This is 5 incorrect one",
        incorrectAnswerTwo: "This is 5 incorrect two",
        incorrectAnswerThree: "This is 5 incorrect three"
    }
    
    var questions = [questionOne, questionTwo, questionThree, questionFour, questionFive]
    // Create variable to hold SKATE before and after the letters have been collected. 
    var skate = ["S", "K", "A", "T", "E"];
    var skateLettersEarned = [];
    var skateIndex = 0;

    // Create an array containing the strings for all of the answer propery names. Will loop through this array later on.
    // var answers = ["correctAnswer", "incorrectAnswerOne", "incorrectAnswerTwo", "incorrectAnswerThree"];
    var answers = Object.keys(questions[0]);
    /**
     * Randomize array element order in-place.
     * Using Durstenfeld shuffle algorithm.
     */
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    } 
    
    $("#start").on("click", startGame);

    var intervalId;
    // prevents the clock from being sped up unnecessarily
    var clockRunning = false;
    
    // Create a 2:00 timer
   
    var time = 120;

    function reset() {
        time = 120;
        $("#timer").text("2:00");
    }

    function startTimer() {
        intervalId = setInterval(count, 1000);
        clockRunning = true;
    }

    function stopTimer() {
        clearInterval(intervalId);
        clockRunning = false;
    }

    function count() {
        time--;
        if (time == 0) {
            stopTimer();
            reset();
        }
        var converted = timeConverter(time);
        $("#timer").text(converted);

    }

    function timeConverter(t) {

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        
        return minutes + ":" + seconds;
    }

    // Game logic
    var questionIndex = 0;
    var currentQuestion = questions[questionIndex]

    function startGame() {
        // put questions in a random order
        shuffleArray(questions);
        

        startTimer();
        showQuestion();
        

        function showQuestion() {
            // reassign the current question
            currentQuestion = questions[questionIndex]
            // restart click event listener
            $(document).off("click");

            // // Pick a random question
            // var currentQuestion = questions[Math.floor(0 + Math.random() * questions.length)];
            // Create a form
            $("#quizArea").html("<form id='form'></form>");
            // Append question to form
            $("#form").append("<h2>" + currentQuestion.question + "</h2>");
            $("#form").append("<input type='button' class='btn btn-secondary btn-block answer' value='" + currentQuestion.correctAnswer + "'></input><br>");
            $("#form").append("<input type='button' class='btn btn-secondary btn-block answer' value='" + currentQuestion.incorrectAnswerOne + "'></input><br>");
            $("#form").append("<input type='button' class='btn btn-secondary btn-block answer' value='" + currentQuestion.incorrectAnswerTwo + "'></input><br>");
            $("#form").append("<input type='button' class='btn btn-secondary btn-block answer' value='" + currentQuestion.incorrectAnswerThree + "'></input><br>");

            // Determine if the answer chosen is correct
            function checkAnswer() {
                userSelect = this.value;
                console.log(userSelect);
                if (userSelect !== currentQuestion.correctAnswer) {
                    incorrectAnswer();
                }
                else {
                    correctAnswer();
                };
            };

            // For an incorrect answer, increase number of incorrect answers, respond on the screen with correct answer, increase the question index, then show next question.
            function incorrectAnswer() {
                questionsIncorrect++;
                $("#form").html("<h2>Wrong! The correct answer is:</h2>");
                $("#form").append("<input type='button' class='btn btn-secondary btn-block' value='" + currentQuestion.correctAnswer + "'></input><br>");
                if (questionIndex !== (questions.length -1)){
                    questionIndex++;
                    console.log(questionIndex);
                    setTimeout(function() {
                        showQuestion();
                    }, 3500);
                }
            }
            
            // For correct answer, increase number of correct answers, respond on the screen with correct answer, increase the question index, then show next question.
            function correctAnswer() {
                questionsCorrect++;
                $("#form").html("<h2>You got it! The correct answer is:</h2>");
                $("#form").append("<input type='button' class='btn btn-secondary btn-block' value='" + currentQuestion.correctAnswer + "'></input><br>");
                // Add a letter from the skate array to the array containing earned letters that will be displayed on the page. 
                skateLettersEarned.push(skate[skateIndex]);
                skateIndex++;
                displaySkate();
                if (questionIndex !== (questions.length -1)){
                    questionIndex++;
                    console.log(questionIndex);
                    setTimeout(function() {
                        showQuestion();
                    }, 3500);
                }
            }

            // Starting event listener
            $(document).on("click", ".answer", checkAnswer);
            
        };
        
        function displaySkate() {
            skateLettersEarned = skateLettersEarned.join("");
            if (skateLettersEarned !== "SKATE"){
                $("#skate").text(skateLettersEarned);
                skateLettersEarned = skateLettersEarned.split('');
            }
            else {
                $("#skate").text(skateLettersEarned);
            };
        };        
    };       
});