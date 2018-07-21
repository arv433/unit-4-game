var currentAP = 0;
var myCharacter;
var enemySelectReady = false;
var attackReady = false;
var currentDefender;


var obiWan = {
    name: "Obi-Wan Kenobi",
    baseAP: 11,
    counterAP: 7,
    HP: 175,
    div: "#obiWan"
};

var yoda = {
    name: "Master Yoda",
    baseAP: 15,
    counterAP: 16,
    HP: 120,
    div: "#yoda"
};

var DMaul = {
    name: "Darth Maul",
    baseAP: 6,
    counterAP: 21,
    HP: 180,
    div: "#DMaul"
};

var DVader = {
    name: "Darth Vader",
    baseAP: 7,
    counterAP: 16,
    HP: 200,
    div: "#DVader"
};

var divVar = { "#obiWan": obiWan, "#yoda": yoda, "#DMaul": DMaul, "#DVader": DVader };

$("#obiWan > .characterName").append(obiWan.name);
$("#obiWan > .HP").append(obiWan.HP);

$("#yoda > .characterName").append(yoda.name);
$("#yoda > .HP").append(yoda.HP);

$("#DMaul > .characterName").append(DMaul.name);
$("#DMaul > .HP").append(DMaul.HP);

$("#DVader > .characterName").append(DVader.name);
$("#DVader > .HP").append(DVader.HP);

$("#gameplay").hide();

function win() {

}

function lose() {

}

function game() {
    $(".characterBox").on("click", function () {
        $("#gameplay").show();
        $(this).addClass("selectedCharacter")
        for (var property in divVar) {
            if ($(".selectedCharacter").is(property)) {
                myCharacter = divVar[property];
            }
        }
        $("#yourCharacterImages").append($(".selectedCharacter"))
        $(".characterBox").off("click");
        $(".characterBox:not(.selectedCharacter)").addClass("enemies");
        $("#avaliableEnemiesImages").append($(".enemies"));
        $("#characterSelect").hide();
        enemySelectReady = true;
        if (enemySelectReady) {

            $(".enemies").on("click", function () {
                if (enemySelectReady) {
                    enemySelectReady = false;
                    attackReady = true;
                    // resets
                    $(".currentDefender").remove();
                    $(".currentDefender").removeClass("currentDefender");
                    $("#yourAttack").empty();
                    $("#enemysAttack").empty();
                    $("#winLossLog").empty();
                    // applications
                    $(this).addClass("currentDefender");
                    for (var property in divVar) {
                        if ($(".currentDefender").is(property)) {
                            currentDefender = divVar[property];
                        }
                    }
                    $("#defenderImages").append($(".currentDefender"));
                    $("#attack").on("click", function () {
                        if (attackReady) {
                            currentAP += myCharacter.baseAP;
                            currentDefender.HP -= currentAP;
                            myCharacter.HP -= currentDefender.counterAP;
                            if (currentDefender.HP <= 0) {
                                $(".currentDefender > .HP").text("0");
                            } else {
                                $(".currentDefender > .HP").text(currentDefender.HP);
                            };
                            if (myCharacter.HP <= 0) {
                                $(".selectedCharacter > .HP").text("0");
                            } else {
                                $(".selectedCharacter > .HP").text(myCharacter.HP);
                            };
                            $("#yourAttack").text("You attacked " + currentDefender.name + " for " + currentAP + " damage.");
                            $("#enemysAttack").text(currentDefender.name + " attacked you back for " + currentDefender.counterAP + " damage.");
                            if (myCharacter.HP <= 0) {
                                $("#winLossLog").text("You've been beaten by " + currentDefender.name + ".");
                                $("#attack").off("click");
                                $("#tryAgain").show();

                            } else if (currentDefender.HP <= 0) {
                                delete divVar[currentDefender.div];
                                $("#winLossLog").text("You've beaten " + currentDefender.name + ". Select your next opponent");
                                $("#attack").off("click");
                                enemySelectReady = true;
                            }
                            if ((Object.keys(divVar).length) == 1) {
                                $("#winLossLog").text("You've beaten " + currentDefender.name + ". You've won!");
                                $("#tryAgain").show();
                            }
                        }
                    });

                }
            });
        }

    });
    $("#tryAgain").on("click", function () {
        location.reload();
    });
};

game();