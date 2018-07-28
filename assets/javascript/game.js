$(document).ready(function () {
    // in-game variables; attackReady and enemySelectReady help with the control flow of the game
    var currentAP = 0;
    var myCharacter;
    var currentDefender;
    var enemySelectReady = false;
    var attackReady = false;

    /* characters are stored as objects and have stats that are balanced in way where choosing one character requires
    that the players chooses different enemies in order, not just from least HP to greatest HP */

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

    // divVar is a helper-object that holds the div's query as keys and associated it with the corresponding objects declared above as values
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

    function game() {
        $(".characterBox").on("click", function () {
            // the rest of the game outside of the character select is shown once an initial character is selected
            $("#gameplay").show();
            // the selectedCharacter class differentiates that div from the other character cards
            $(this).addClass("selectedCharacter")
            /* this for loop allows for the assignment of the selected character object to myCharacter so that the game can identify the player's stats
            iterating through the object divVar saves the redundancy of writing four different if/else if statements */
            for (var property in divVar) {
                if ($(".selectedCharacter").is(property)) {
                    myCharacter = divVar[property];
                }
            }
            $("#yourCharacterImages").append($(".selectedCharacter"))
            // turns off further character selection after one has been chosen
            $(".characterBox").off("click");
            // this query selects all character cards other than the one with the selectedCharacter class and adds the enemies class
            $(".characterBox:not(.selectedCharacter)").addClass("enemies");
            $("#avaliableEnemiesImages").append($(".enemies"));
            // the character select is hidden once a character is chosen
            $("#characterSelect").hide();
            // the following Boolean variables (enemySelectReady & attackReady) prevent the user from creating buggy inputs
            enemySelectReady = true;
            if (enemySelectReady) {
                $(".enemies").on("click", function () {
                    if (enemySelectReady) {
                        enemySelectReady = false;
                        attackReady = true;
                        // the following five jQuery statements work to reset the enemySelect game state after an enemy has been beaten
                        $(".currentDefender").remove();
                        $(".currentDefender").removeClass("currentDefender");
                        $("#yourAttack").empty();
                        $("#enemysAttack").empty();
                        $("#winLossLog").empty();
                        // the following two jQuery statements and for loop work to apply the newly selected enemy as the current Defender
                        $(this).addClass("currentDefender");
                        for (var property in divVar) {
                            /* very similar to the for loop above, this loop saves prevents the need for redundant if/if else statements
                            in assigning the variable currentDefender to the chosen enemy object */
                            if ($(".currentDefender").is(property)) {
                                currentDefender = divVar[property];
                            }
                        }
                        $("#defenderImages").append($(".currentDefender"));
                        $("#attack").on("click", function () {
                            if (attackReady) {
                                // stat changes to the player and enemy when the attack button is clicked
                                currentAP += myCharacter.baseAP;
                                currentDefender.HP -= currentAP;
                                myCharacter.HP -= currentDefender.counterAP;
                                // logging the HP of the currentDefender on to their character card; if their HP reduces below 0, their HP is simply logged as 0
                                if (currentDefender.HP <= 0) {
                                    $(".currentDefender > .HP").text("0");
                                } else {
                                    $(".currentDefender > .HP").text(currentDefender.HP);
                                };
                                // same log as above, except for the player's characted card
                                if (myCharacter.HP <= 0) {
                                    $(".selectedCharacter > .HP").text("0");
                                } else {
                                    $(".selectedCharacter > .HP").text(myCharacter.HP);
                                };
                                // the following two lines log the fighting actions that take place
                                $("#yourAttack").text("You attacked " + currentDefender.name + " for " + currentAP + " damage.");
                                $("#enemysAttack").text(currentDefender.name + " attacked you back for " + currentDefender.counterAP + " damage.");
                                // the following if statement checks whether if the player's HP has reached 0 and consequenly loses the game
                                if (myCharacter.HP <= 0) {
                                    $("#winLossLog").text("You've been beaten by " + currentDefender.name + ".");
                                    $("#attack").off("click");
                                    $("#tryAgain").show();
                                    // the following else if statement checks whether if the currentDefender's HP has reached 0 and is ready to be replaced by the next enemy
                                } else if (currentDefender.HP <= 0) {
                                    // the property in the divVar object is deleted so that a game winning condition can be met
                                    delete divVar[currentDefender.div];
                                    $("#winLossLog").text("You've beaten " + currentDefender.name + ". Select your next opponent");
                                    $("#attack").off("click");
                                    // assigning enemySelectReady to true allows for the next enemy to be selected
                                    enemySelectReady = true;
                                }
                                /* the following if condition converts the keys in divVar to an an array and checks its length. Since the player's character
                                object is incldued in this array, the game winning condition will be met once there is only one key left in the array */
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
})