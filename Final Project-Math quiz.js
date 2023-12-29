function showCalculator() {
    document.getElementById('calculator-container').style.display = 'block';
  }

  function hideCalculator() {
    document.getElementById('calculator-container').style.display = 'none';
  }

  function calculate() {
    var input = document.getElementById('calculator-input').value;
    var result = evaluateExpression(input);

    // Display the result
    document.getElementById('result').textContent = 'Result: ' + result;
  }

  function evaluateExpression(expression) { 
    return new Function('return ' + expression)();
  }

  const quizData = [
    {
        question:"What is the value of 3+5?",
        a:"6",
        b:"8",
        c:"10",
        d:"12",
        correct:"b"
    },
    {
        question:"Solve for x in the equation 2x-7=11",
        a:"x=11",
        b:"x=9",
        c:"x=6",
        d:"x=14",
        correct:"c"
    },
    {
        question:"Evaluate the expression 4*(6+2)",
        a:"32",
        b:"24",
        c:"45",
        d:"18",
        correct:"a"
    },
    {
        question:"What is the result of 7x9?",
        a: "56",
        b: "89",
        c: "72",
        d: "63",
        correct:"d"
    }, 
    {
        question:"Solve for y in the equation 2y+5=17",
        a:"7",
        b:"8",
        c:"10",
        d:"6",
        correct:"a"
    },
    {
        question:"The temperature in the morning is 18°C. If it increases twice in the afternoon, what will be the temperature?",
        a:"42°C",
        b:"36°C",
        c:"6°C",
        d:"14°C",
        correct:"b"
    },
    {
        question:"Evaluate the expression 48:6*(6+4-5)",
        a:"91",
        b:"32",
        c:"40",
        d:"18",
        correct:"c"
    },
    {
        question:"If a pizza is divided into 20 equal slices and you eat a quarter of it, what fraction of the pizza have you eaten?",
        a: "3/20",
        b: "10/20",
        c: "19/20",
        d: "5/20",
        correct:"d"
    }
];
const quiz = document.getElementById("quiz")
const answerEls = document.querySelectorAll(".answer")
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text")
const b_text = document.getElementById("b_text")
const c_text = document.getElementById("c_text")
const d_text = document.getElementById("d_text")
const submitBtn = document.getElementById("submit");

let currentQuiz = 0
let score = 0

loadQuiz()

function  loadQuiz(){
    deselectAnswers()
    const currentQuizData = quizData[currentQuiz]
    questionEl.innerText = currentQuizData.question 
    a_text.innerText = currentQuizData.a 
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c 
    d_text.innerText = currentQuizData.d 
}
function deselectAnswers(){
  answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected(){
  let answer
  answerEls.forEach(answerEl => {
    if(answerEl.checked) {
      answer = answerEl.id;
      
    }
  })
  return answer;
}

submitBtn.addEventListener("click" , ()=> {
  const answer = getSelected()

  if (answer) {

    if (answer === quizData[currentQuiz].correct){
      alertType = 'correct';
      score++
    } else {
      alertType = 'incorrect';
    }
    currentQuiz++

    let answerElem = document.getElementById(answer)
    let parent = answerElem.closest('li')
    parent.classList.add(alertType);

    setTimeout( () => {
      parent.classList.remove(alertType);
      if (currentQuiz < quizData.length){
        loadQuiz()
      }else{
          quiz.innerHTML = `<h2> You answered ${score}/${quizData.length} questions correctly</h2>
          <button onclick="location.reload()">Reload</button>
          `
      }
    }, 1000 )

  }
})
