/* IMPORTANT ORGANIZATIONAL NOTES:
    ftb: Fill in the blank
    mc: Muliple Choice
    match: Matching
    cb: Checkbox
*/
var count=0; //

var hasWarned = false; //used to warn you if you are going to delete your data when you change the question, resets each time you make a question

//changes the ul into a tag input field
$("#myTags").tagit({
        placeholderText: "Add a Tag",
        caseSensitive: false
    });

//alerts you if you are about to delete your question data
$("#question-type-button").click(function(){
    var shouldWarn = false; //so this doesnt warn you multiple times
    if(!hasWarned){
        switch($(this).text()){

            //if there isn't nothing in the answer textbox
            case "Free Response":
                if($("#fr-answer-textbox").val()!=""){
                    shouldWarn=true;}
                break;

            //if theres isn't nothing in mc rad group
            case "Multiple Choice":
                if($("#mc-rad-group").html()!=""){
                    shouldWarn=true;}
                break;

            //if theres isn't nothing in the original textarea for the ftb question
            case "Fill in the Blank":
                if($("#ftb-textarea").val()!=""){
                    shouldWarn=true;}
                break;
                //broken
            //if there isn't nothing in the question div or if the number of input elements in the distract div is not equal to zero 
            case "Matching":
                if($("#match-question-div").html()!=""||$("#match-distract-div").has("input").size()!=0){
                    shouldWarn=true;}
                break;
                //broken
                        //if there isn't nothing in the question div or if the number of input elements in the distract div is not equal to zero 
            case "Checkbox":
                if($("#cb-check-group").html()!=""){
                    shouldWarn=true;}
                break;
            }
        }
        
    if(shouldWarn){
        hasWarned=true;
        $('#change-question-type-modal').foundation('reveal','open');
    }
});


//Changing Question Type
//checks when the dropdown is clicked by looking for li elements which are descendents of the content class
$(".question-type-option").click(function(){
    var questionType = $(this).text(); //gets the text from the li that was clicked
    var dropdownButton =  $("#question-type-button");
    if(dropdownButton.text()!=questionType){ //changes the dropdown buttons text to the li's text
        dropdownButton.text(questionType);
        var questionDiv = $("#question-div");
        questionDiv.html("");
        //This switch determines the question type based on the dropdown that was clicked
        switch(questionType){ 
            case "Free Response":
                questionDiv.append($("<h6>", {
                    "text":"Answer"}),
                $("<textarea>", {"id": "fr-answer-textbox"}),
                $("<br>"));
                break;
            
            case "Multiple Choice":
                questionDiv.append(
                    $("<p>", {"text": "Choices"}),
                    $("<div>", {"id":"mc-rad-group"}), //The mc choices will be added here
                    $("<input>", { //The method pulls from this box to add mc choices
                        "type": "text",
                        "id": "mc-add-question-input",
                        "placeholder": "New Choice"
                    }),
                    $("<div>", {"class": "text-center"}).append(
                        $("<a>", {                                    
                            "class": "button success semiround small",
                            "id":"mc-button",
                            "text": "Add Choice"
                        })
                    )
                )
                break;

            case "Fill in the Blank":
                questionDiv.append(
                    //this div is originally shown to allow the user to input the content
                    $("<div>",{"id": "ftb-div-1"}).append(
                        $("<h6>", {"text": "Content:"}),
                        $("<textarea>", {"id":"ftb-textarea"}),
                        $("<div>", {"class": "text-center"}).append(
                            $("<a>", {
                                "id":"ftb-submit-content-button",
                                "class": "button semiround",
                                "text": "Submit Text Content"
                        }))),
                    //this div will be shown after the user has submitted the content
                    $("<div>",{"id": "ftb-div-2"}).append(
                        $("<div>", {"class": "row"}).append(
                            $("<div>", {"class":"small-8 medium-6 large-8 columns"}).append(
                                $("<div>", {"id":"ftb-text", "class":"panel callout semiround"})), //this is where the text from the inputted content will be
                                $("<a>", {
                                    "id":"ftb-clear-button",
                                    "class":"button semiround alert small",
                                    "text":"Clear"
                                })),
                        $("<div>", {"id": "ftb-content-div"}) //The questions will be attached to this div
                        ).hide());
                break;

            case "Matching":
                questionDiv.append(
                    $("<div>", {"class":"row"}).append(
                        $("<div>", {"class":"small-6 medium-6 large-6 columns"}).append(
                            $("<h4>", {"text": "Questions"})),
                        $("<div>", {"class":"small-6 medium-6 large-6 columns"}).append(
                            $("<h4>", {"text": "Options"}))
                        ),
                    $("<div>", {"class": "row"}).append(
                        $("<div>", {"id": "match-question-div"})), //matching questions will be appended here
                    $("<div>", {"class": "row"}).append(
                        //distractors will be appended here
                        $("<div>", {"id":"match-distract-div", "class": "small-6 medium-6 large-6 columns right"}).append(
                            $("<h6>", {"text" : "Distractors"}) 
                            )), 
                    $("<div>", {"class": "row"}).append(
                        $("<div>", {"class": "small-6 medium-6 large-6 columns"}).append(
                            $("<a>", {
                                "id":"match-question-button",
                                "class": "button semiround",
                                "text": "Add a Question"
                            })),
                        $("<div>", {"class": "small-6 medium-6 large-6 columns"}).append(
                            $("<a>", {
                                "id":"match-distract-button", 
                                "class": "button semiround",
                                "text": "Add a Distractor"
                            }))));
                break;

            case "Checkbox":
                questionDiv.append(
                    $("<p>", {"text": "Choices"}),
                    $("<div>", {"id":"cb-check-group"}), //The checkbox choices will be added here
                    $("<input>", { //The method pulls from this box to add checkbox choices
                        "type": "text",
                        "id": "cb-add-question-input",
                        "placeholder": "New Choice"
                    }),
                    $("<div>", {"class": "text-center"}).append(
                        $("<a>", {                                    
                            "id":"cb-button",
                            "class": "button success semiround small",
                            "text": "Add Choice"
                        })
                    )
                )
                break;
        }
    }
});

//Mutiple Choice Questions
$(document).on("click","#mc-button", function(){
    count++;
    var radGroup = $("#mc-rad-group");
    var addQuestionInput = $("#mc-add-question-input");
    radGroup.append(
        $("<div>").append(
            $("<input>",{
                "id":"mc-rad-" + count,
                "type": "radio",
                "name": "mc-rad-group",
                "checked" : radGroup.html()=="" //if the rad group doesnt have any html(it's empty) the radio is check, so first radio is checked
            }),
            //This label is the actual thing which contains the mc choice text
            $("<label>", {
                "for":"mc-rad-" + count,
                "text": addQuestionInput.val()
                }), 
            $("<a>", {
                "class":"mc-delete-button button tiny alert semiround",
                "text":"Delete"}),
            $("<br>")
    ));
    addQuestionInput.val(""); //reset the input field when we add an mc option
});

$(document).on("click", ".mc-delete-button", function(){
    //gets surrounding div and deletes it
    $(this).parent().remove();
});

//Matching Questions
$(document).on("click", "#match-question-button", function(){
    var matchQuestionDiv = $("#match-question-div");
    matchQuestionDiv.append(
        $("<div>", {"class": "row collapse"}).append(
            $("<div>", {"class": "small-6 medium-6 large-6 columns"}).append(
                $("<input>", {
                    "type": "text"
                    //add in way to identify question and answer
                    //"class": "match-"
                })),
             $("<div>", {"class": "small-6 medium-6 large-6 columns"}).append(
                $("<input>", {
                    "type": "text",
                    "class": "postfix"
                    //add in way to identify question and answer
                    //"class": "match-"
                }))
        ))
});

$(document).on("click", "#match-distract-button", function(){
    var matchDistractDiv = $("#match-distract-div");
    matchDistractDiv.append(
        $("<input>", {
            "type": "text"
        }))
});

//Fill in the Blank Questions
$(document).on("click", "#ftb-submit-content-button", function(){
    var div1 = $("#ftb-div-1");
    var div2 = $("#ftb-div-2");
    div1.hide();
    //Copies content from ftb-textarea into ftb-text
    $("#ftb-text").text($("#ftb-textarea").val());
    $("#ftb-text").each(function() {
        /* Essentially this takes the text from ftb-text and then converts each word into a span
        yay regex... so basically any combination of letters or numbers or aprostrophes 
        will be accepted the $1 means that it wants the first thing 
        which is saved. (Things are saved by putting them in parentheses). */
        $(this).html($(this).text().replace(/([A-Za-z0-9\'’]+)/g, "<span>$1</span>"));
    });
    div2.show();
});
//Why doesnt this work?: $("accordion").on("click", "span", function(){
//So when we click on one of those magic regex created spans this method is called
$(document).on("click", "#ftb-text span", function(){
    count++;
    var contentDiv = $("#ftb-content-div"); 
    /*We check if the span has the class "info" if so we do nothing, if it doesnt then
    we add some classes to make it prettier */
    if(!$(this).hasClass('info')){
        $(this).attr("id", "ftb-span-"+count)
        $(this).addClass('info label semiround');
        contentDiv.append(
            $("<div>", {
                "class":"row",
                "id":"ftb-main-div-" + count
            }).append(
                $("<h4>", {"text": $(this).text()}),
                $("<h6>", {"text":"Distractors"}),
                //this code is to append a new question  the count is used to keep track of the different words
                $("<div>", {
                    "class": "small-12 medium-12 large-12 columns"
                }).append(
                    $("<div>", {"class": "row"}).append(
                        $("<div>", {"id": "ftb-question-div-" + count, "class":"small-12 medium-12 large-12 columns"})),
                    $("<a>", {
                        "id": "ftb-distractor-button-" + count,
                        "class":"button semiround" , 
                        "text":"Add a Distractor"
                    }),
                    $("<a>", {
                        "id": "ftb-delete-button-" + count,
                        "class":"button semiround alert", 
                        "text":"Delete"
                    }))));
    }
});

//this code appends a new distractor to a specific word when the button is clicked
$(document).on("click", "[id^='ftb-distractor-button-']", function(){ 
    var id = this.id;
    var questionCount = id.substring(id.lastIndexOf('-')+1); 
    var questionDiv = $("#ftb-question-div-" + questionCount);
    questionDiv.append($("<input>", {
        "type":"text"
    }));
});

//this code appends a new distractor to a specific word when the button is clicked
$(document).on("click", "[id^='ftb-delete-button-']", function(){ 
    var id = this.id;
    var questionCount = id.substring(id.lastIndexOf('-')+1); 
    $("#ftb-main-div-"+ questionCount).remove()
    $("#ftb-span-" + questionCount).removeClass();

});

//this basically resets the ftb question
$(document).on("click", "#ftb-clear-button", function(){
    var div1 = $("#ftb-div-1");
    var div2 = $("#ftb-div-2");
    var contentDiv = $("#ftb-content-div");
    contentDiv.html(""); //We're removing any questions that we made
    div2.hide(); // Here we swap the 2 div's
    div1.show();
});

//Checkbox Questions
$(document).on("click", "#cb-button", function(){
    count++;
    var checkboxGroup = $("#cb-check-group");
    var addQuestionInput = $("#cb-add-question-input");
    checkboxGroup.append(
        $("<div>").append(
            $("<input>",{
                "id":"cb-checkbox-" + count,
                "type": "checkbox",
                "checked" : checkboxGroup.html()=="" //if the checkbox group doesnt have any html(it's empty) the checkbox is checked, so first checkbox is checked
            }),
            //This label is the actual thing which contains check choice text
            $("<label>", {
                "for":"cb-checkbox-" + count,
                "text": addQuestionInput.val()
                }), 
            $("<a>", {
                "class":"cb-delete-button button tiny alert semiround",
                "text":"Delete"}),
            $("<br>")
    ));
    addQuestionInput.val(""); //reset the input field when we add an cb option
});

$(document).on("click", ".cb-delete-button", function(){
    //gets surrounding div and deletes it
    $(this).parent().remove();
});