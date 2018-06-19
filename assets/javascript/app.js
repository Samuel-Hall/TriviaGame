// Fill in the actual questions
// Finish styling the page
// Write the README
// Push to pages
// Add to portfolio page
// Submit links to BCS


$(document).ready(function() {
    // Create variables to hold number of right, wrong, and unanswered questions.
    var questionsCorrect = 0;
    var questionsIncorrect = 0;
    var questionsAnswered = 0;
    // Note, moved questionsNotAnswered below the questions array to correct undefined error

    // Create an array. Each element in the array is an object containing a question and several possible answers. Only one of the answers is the correct answer. 
    
    var questionOne = {
        question: "this is a test",
        img: "",
        correctAnswer: "This is correct",
        incorrectAnswerOne: "This is incorrect one",
        incorrectAnswerTwo: "This is incorrect two",
        incorrectAnswerThree: "This is incorrect three"
    }
    var questionTwo = {
        question: "this is also a test",
        img: "",
        correctAnswer: "This is also correct",
        incorrectAnswerOne: "This is also incorrect one",
        incorrectAnswerTwo: "This is also incorrect two",
        incorrectAnswerThree: "This is also incorrect three"
    }
    var questionThree = {
        question: "this is 3 a test",
        img: "",
        correctAnswer: "This is 3 correct",
        incorrectAnswerOne: "This is 3 incorrect one",
        incorrectAnswerTwo: "This is 3 incorrect two",
        incorrectAnswerThree: "This is 3 incorrect three"
    }
    var questionFour = {
        question: "this is 4 a test",
        img: "",
        correctAnswer: "This is 4 correct",
        incorrectAnswerOne: "This is 4 incorrect one",
        incorrectAnswerTwo: "This is 4 incorrect two",
        incorrectAnswerThree: "This is 4 incorrect three"
    }
    var questionFive = {
        question: "this is 5 a test",
        img: "",
        correctAnswer: "This is 5 correct",
        incorrectAnswerOne: "This is 5 incorrect one",
        incorrectAnswerTwo: "This is 5 incorrect two",
        incorrectAnswerThree: "This is 5 incorrect three"
    }
    
    var questions = [questionOne, questionTwo, questionThree, questionFour, questionFive];
    var questionIndex = 0;
    var currentQuestion = questions[questionIndex];    
    var questionsNotAnswered = questions.length;
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
    
    $(document).on("click", ".start", startGame);   
    
    // Game logic
    var questionIndex = 0;
    var currentQuestion = questions[questionIndex]
    
    function startGame() {
        // Note, to fix scoping issue and allow the timeout function to be a part of the game function to allow endGame at time==0, moving all timer related functions inside the startGame function
        var intervalId;
        // prevents the clock from being sped up unnecessarily
        var clockRunning = false;
        
        // Create a 2:00 timer
       
        var time = 120;
    
        function reset() {
            time = 120;
            questionsNotAnswered = questions.length;
            $("#timer").text("2:00");
            $("#skate").text("");
            $("#hiddenTape").html("");
            $("#collectSkate").text("Collect the letters of SKATE");
            $("#findTape").text("Find the hidden tape");
            $("#notAnswered").text(questionsNotAnswered);
            skateIndex = 0;
            skateLettersEarned = [];
            questionsCorrect = 0;
            questionsIncorrect = 0;
            questionsAnswered = 0;
            questionIndex = 0;
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
                endGame();
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

        reset();
        $("#notAnswered").text(questionsNotAnswered);
        // put questions in a random order
        shuffleArray(questions);
        startTimer();
        showQuestion();        

        function showQuestion() {

            // reassign the current question
            currentQuestion = questions[questionIndex];

            // take answers and randomize the order
            // Object.values???
            var randomAnswers = Object.keys(currentQuestion);
            randomAnswers.splice(0, 2);
            shuffleArray(randomAnswers);

            // restart click event listener
            $(document).off("click");

            // Create a form to hold the questions and answers
            $("#quizArea").html("<form id='form'></form>");
            // Append question to form
            $("#form").append("<h2>" + currentQuestion.question + "</h2>");

            // I'm thinking I can sort the questions into random order and then run this as a for loop
            // currentQuestion is questions[i];
            // var array = Object.keys(currentQuesion); console log question + answers
            // array.splice(0, 1);
            // //Now array = [just the answers];
            // shuffleArray(array);
            // for loop to print the quesion buttons

            // Attempting the for loop
            for (var k = 0; k < randomAnswers.length; k++) {
                $("#form").append("<input type='button' class='btn btn-secondary btn-block answer' value='" + currentQuestion[randomAnswers[k]] + "'></input><br>");
            }

            // $("#form").append("<input type='button' class='btn btn-secondary btn-block answer' value='" + currentQuestion.correctAnswer + "'></input><br>");
            // $("#form").append("<input type='button' class='btn btn-secondary btn-block answer' value='" + currentQuestion.incorrectAnswerOne + "'></input><br>");
            // $("#form").append("<input type='button' class='btn btn-secondary btn-block answer' value='" + currentQuestion.incorrectAnswerTwo + "'></input><br>");
            // $("#form").append("<input type='button' class='btn btn-secondary btn-block answer' value='" + currentQuestion.incorrectAnswerThree + "'></input><br>");

            // Determine if the answer chosen is correct
            function checkAnswer() {
                userSelect = this.value;
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
                questionsAnswered++;
                questionsNotAnswered = questions.length - questionsAnswered;
                $("#notAnswered").text(questionsNotAnswered);
                if (questionIndex !== (questions.length -1)){
                    questionIndex++;
                    setTimeout(function() {
                        showQuestion();
                    }, 3500);
                }
                else {
                    setTimeout(function() {
                    finishQuestions();
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
                questionsAnswered++;
                questionsNotAnswered = questions.length - questionsAnswered;
                $("#notAnswered").text(questionsNotAnswered);
                if (questionIndex !== (questions.length -1)){
                    questionIndex++;
                    setTimeout(function() {
                        showQuestion();
                    }, 3500);
                }
                else {
                    setTimeout(function() {
                    finishQuestions();
                    }, 3500);
                }
                // Find the hidden tape by answering all questions correctly
                if (questionsCorrect == questions.length) {
                    $("#findTape").text("You found the hidden tape!");
                    $("#hiddenTape").append("<img  src='assets/images/hiddenTape.jpg' alt='Hidden tape' style='width:80px;height:80px;' />");
                };
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
                $("#collectSkate").text("You got SKATE!");
            };
        };

        // End of game criteria: Time is up, or all questions are answered
        function finishQuestions() {
            if (questionsAnswered == questions.length) {
                endGame();
            }
        };
        
        function endGame() {
            stopTimer();
            $("#notAnswered").text(questionsNotAnswered);
            $("#quizArea").html("<h3>Right answers: " + questionsCorrect + "</h3><h3>Wrong answers: " + questionsIncorrect + "</h3>");
            $("#quizArea").append("<button type='button' class='btn btn-lg btn-secondary start' id='start'>Play again</button>");
            $(document).off("click");
            $(document).on("click", ".start", startGame);
        };
    };       
});