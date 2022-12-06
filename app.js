const gender = $("#gender");
const weight = $("#weight");
const height = $("#height");
const age = $("#age");
const activityLevel = $("#activity-level");
const goal = $("#goal");

$("#resultsContent").hide();
$("#loading").hide();

$("#button").click(function(){
  $("#resultsOverweight,#resultsObese,#resultsUnderWeight").addClass("d-none");
  $("#resultsNormalWeight").removeClass("d-none");
  $("#resultsBmi").removeClass("text-danger"); 
  let completed = 0;
  if(gender.val() == 0){
    gender.addClass("is-invalid");
  } else {
    gender.removeClass("is-invalid");
    completed+=1;
  }
  if(weight.val() <= 0 || weight.val()==''){
    weight.addClass("is-invalid");
  } else {
    weight.removeClass("is-invalid");
    completed+=1;
  }

  if(height.val() <= 100 || height.val()==''){
    height.addClass("is-invalid");
  } else {
    height.removeClass("is-invalid");
    completed+=1;
  }

  if(age.val() <= 18 || height.val()==''){
    age.addClass("is-invalid");
  } else {
    age.removeClass("is-invalid");
    completed+=1;
  }

  if(activityLevel.val() == 0){
    activityLevel.addClass("is-invalid");
  } else {
    activityLevel.removeClass("is-invalid");
    completed+=1;
  }

  if(goal.val() == 0){
    goal.addClass("is-invalid");
  } else {
    goal.removeClass("is-invalid");
    completed+=1;
  }

  if(completed==6){
    resultsLoading();
  }
});

function resultsLoading(){
  $("html, body").animate({ scrollTop: $("#resultsTab").offset().top}, 100);
  $("#noFill").addClass("d-none");
  $("#loading").show();
  $("#resultsContent").hide();

  setTimeout(function() {
    $("#loading").hide();
    $("#resultsContent").show();
    results();
  }, 1500);
}

function results(){
  /* variables for calculations */
  let genderValue;
  if(gender.val()==1){
    genderValue="male"
  } else genderValue="female";

  let activityLevelValue;
  if(activityLevel.val()==1){
    activityLevelValue=1.2;
  } else if(activityLevel.val()==2){
    activityLevelValue=1.55;
  } else activityLevelValue=1.725;

  let goalValue;
  if(goal.val()==1){
    goalValue="lose weight";
  } else if(goal.val()==2){
    goalValue="maintain weight";
  } else goalValue="gain weight";

  $("#idealWeightValue").text(`${Math.round((18.5*(height.val()*height.val()))/10000)} - ${Math.round((24.9*(height.val()*height.val()))/10000)-1}`);


  let bmi = Math.round(weight.val()/((height.val()/100)*(height.val()/100)))
  
  let rmbDaily;
  if(genderValue==="male"){
    rmbDaily= Math.trunc(((10 * weight.val()) + (6.25 * height.val()) - (5 * age.val()) + 5)*activityLevelValue);
  } else rmbDaily= Math.trunc(((10 * weight.val()) + (6.25 * height.val()) - (5 * age.val()) - 161)*activityLevelValue);

  /* modifying results */

  $("#resultsGoal").text(goalValue);

  if(goalValue==="lose weight"){
    $("#resultsGoalKcal").text(`${rmbDaily-400} - ${rmbDaily-200}`);
    $("resultsGoal").text(goalValue);
  }else if(goalValue==="gain weight"){
    $("#resultsGoalKcal").text(`${rmbDaily+200} - ${rmbDaily+400}`);
    $("resultsGoal").text(goalValue);
  }else $("#resultsGoalKcal").text(rmbDaily);

  if(bmi>=18.5 && bmi<=24.9){
    $("#resultsBmi").addClass("text-success")
  } else $("#resultsBmi").addClass("text-danger"); 
  $("#resultsBmi").text(bmi);

  if(bmi>=25 && bmi<=29.9){
    $("#resultsNormalWeight").addClass("d-none");
    $("#resultsOverweight").removeClass("d-none");
    $("#overweightKcal").text(rmbDaily-400);
  }

  if(bmi>29.9){
    $("#resultsNormalWeight").addClass("d-none");
    $("#resultsObese").removeClass("d-none");
    $("#obeseKcal").text(rmbDaily-400);
  }

  if(bmi<18.5){
    $("#resultsNormalWeight").addClass("d-none");
    $("#resultsUnderWeight").removeClass("d-none");
    $("#underweightKcal").text(rmbDaily+400);
  }

}