//You should be able to click a button to start the quiz
// A question should be rendered to the DOM
// You should be able to click a button next to the answer to select your answer
// You should be able to submit your answer with a button and taken to the next question
// You should be able to track how many questions you have answered correctly at the top of the page
// You should be able to track what question you're currently on at the top of the page
// You should be able to see your results after completing the quiz



// This function will begin the quiz
function handleQuizStart() {
    $('#start-button').on('click', function(event) {
        renderQuestion();
    }
    );

    console.log('`handleQuizStart` ran');
}

// Update/display the question number and score obtained at the top of the screen
function updateQuestionNumberAndScore() {
    const html = $(`
        <div class="ques-score" id="js-answered">Question: ${STORE.currentQuestion +1}/${STORE.questions.length}</div>
        <div class="ques-score" id="js-score">Score: ${STORE.score}/${STORE.questions.length}</div>
      `);
    $(".question-and-score").html(html);

    console.log('`updateQuestionNumberAndScore` ran');
}

// This function displays the new answer options for the new Question
function updateAnswerOptions() {
    let question = STORE.questions[STORE.currentQuestion];
    for (let i=0; i < question.options.length; i++) {
        $('.js-options').append(`
            <input type= "radio" name="options" id="option${i+1}" value= "${question.options[i]}" tabindex ="${i+1}"> 
            <label for="option${i+1}"> ${question.options[i]} </label><br/>
            <span id="js-r${i+1}"></span>
        `);
    }

    console.log('`updateAnswerOptions` ran');
}

// This function displays the question in the DOM
function renderQuestion() {
    $("#puppies-bench").remove();
    let question = STORE.questions[STORE.currentQuestion];
    updateQuestionNumberAndScore();
    const questionHtml = $(`
    <div>
        <form id="js-questions" class="question-form">
            <fieldset>
                <div class="js-row question">
                    <div class="js-col-12">
                        <legend> ${question.question}</legend>
                    </div>
                </div>
                
                <div class="js-row options">
                    <div class="js-col-12">
                        <div class="js-options"></div>
                    </div>
                </div>
                
                <div class="js-row">
                    <div class="js-col-12">
                        <button type= "submit" id="answer" tabindex="5">Submit</button>
                        <button type= "button" id="next-question" tabindex="6">Next >></button>
                    </div>
                </div>
            </fieldset>
            </form>
        </div>`);
    $("main").html(questionHtml);
    updateAnswerOptions();
    $("#next-question").hide();

    console.log('`renderQuestion` ran');
}

// This function will display the results page to the DOM
function displayResultsPage() {
    let resultHtml = $(`
    <div class="results">
        <form id="js-restart-quiz">
            <fieldset>
                <div class="js-row">
                    <div class="js-col-12">
                        <legend id="score-results">Your score is: ${STORE.score}/${STORE.questions.length}</legend>
                        <p><img alt="Australian Shepherd looking at you through a fence" id="aussie-fence" src="https://Kevindavis5454.github.io/australian-shepherd-quiz/assets/Aussiefence.gif"></p>
                    </div>
                </div>
                
                <div class="js-row">
                    <div class="js-col-12">
                        <button type="button" id="restart">Restart Quiz</button>
                    </div>
                </div>
            </fieldset>
        </form>
        </div>`);
    STORE.currentQuestion = 0;
    STORE.score = 0;
    $("main").html(resultHtml);

    console.log('`displayResultsPage` ran');
}

// This function will check whether it has reached the end of the questions list
function isThisLastQuestion() {
    $('body').on('click', '#next-question', (event) => {
        STORE.currentQuestion === STORE.questions.length ? displayResultsPage() : renderQuestion();
    });

    console.log('`isThisLastQuestion` ran')
}

// This function will check whether the chosen option is right or wrong
function isTheAnswerCorrect() {
    $('body').on("submit", '#js-questions', function(event) {
        event.preventDefault();
        let currentQues = STORE.questions[STORE.currentQuestion];
        let selectedOption = $("input[name=options]:checked").val();
        if (!selectedOption) {
            alert("Choose an option");
            return;
        }
        let id_num = currentQues.options.findIndex(i => i === selectedOption);
        let id = "#js-r" + ++id_num;
        $('span').removeClass("right-answer wrong-answer");
        if(selectedOption === currentQues.answer) {
            STORE.score++;
            $(`${id}`).append(`You got it right!<br/> <img alt="Australian Shepherd giving you a high five" id="high-five" src="https://Kevindavis5454.github.io/australian-shepherd-quiz/assets/AussieHighFive.gif">`);
            $(`${id}`).addClass("right-answer");
        }
        else {
            $(`${id}`).append(`You got it wrong <br/> The answer is "${currentQues.answer}"<br/> <img alt="Australian Shepherd swiping your hand away" id="aussie-no" src="https://Kevindavis5454.github.io/australian-shepherd-quiz/assets/aussieno.gif">`);
            $(`${id}`).addClass("wrong-answer");
        }

        STORE.currentQuestion++;
        $("#js-score").text(`Score: ${STORE.score}/${STORE.questions.length}`);
        $('#answer').hide();
        $("input[type=radio]").attr('disabled', true);
        $('#next-question').show();
    });

    console.log('`isTheAnswerCorrect` ran');
}

function restartQuiz() {
    $('body').on('click', '#restart', (event) => {
        renderQuestion();
    });

    console.log('`restartQuiz` ran');
}


// This function will be the callback when the page loads. Its responsible for rendering the quiz questions
// handling the question selecting, and question transition, as well as rendering the results page.
function handleQuizApp() {

    handleQuizStart(); //
    isThisLastQuestion(); //
    isTheAnswerCorrect();//
    restartQuiz();//

}

$(handleQuizApp);
