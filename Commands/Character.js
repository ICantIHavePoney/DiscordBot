class Character {
    
      constructor(player, firstName, lastName){
        this.Player = player;
        this.firstName  = firstName;
        this.lastName = lastName;
        this.money = 0;
        this.erisToken = 0;
        this.hangar = [];
        this.pilotSkills = {
          "Petits Vaisseaux" : 0,
          "Grand Vaisseaux" : 0
        },
        this.generalSkills = {
          "Exploration": 0,
          "Architecture": 0,
          "Militaire": 0,
          "Minage": 0
        },
        this.shipyardSkills = {
          "Construction": 0,
          "Electricité": 0,
          "Maintenance": 0,
          "Armement": 0
        },
        this.otherSkills = {
          "Culture": 0,
          "Holothèque lues": ""
        }
    }    
}


module.exports = Character;