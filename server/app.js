const CronJob = require('cron').CronJob;
const firebase = require('firebase')

var config = {
    apiKey: "AIzaSyCBHB6FVDiMBw52mM58Zfn1HHGrpPbiVaY",
    authDomain: "mangotree-8c579.firebaseapp.com",
    databaseURL: "https://mangotree-8c579.firebaseio.com",
    projectId: "mangotree-8c579",
    storageBucket: "",
    messagingSenderId: "91904012910"
  };
firebase.initializeApp(config);

var db = firebase.database();

class MangoTree {
  // Initialize a new MangoTree
  constructor() {
    this._age = 0
    this._height = 0
    this._fruits = []
    this._healthyStatus = true
    this._harvested = ''
  }

  getAge() {
    return this._age
  }

  getHeight() {
    return this._height
  }

  getFruits() {
    return this._fruits
  }

  getHealtyStatus() {
    return this._healthyStatus
  }


  // Get current states here

  // Grow the tree
  reset() {
    this._age = 0
    this._height = 0
    this._fruits = []
    this._healthyStatus = true
    this._harvested = ''
  }


  grow() {
    this._age += 1
    let randomGrow = Math.floor(Math.random() * 5)
    if (this._age < 10) { // stop grow
      this._height += 1.5
    }

    let randomDeath = 10 + Math.floor(Math.random() * 10)
    if (this._age >= randomDeath) { // end of life
      this._healthyStatus = false
    }
  }

  // Produce some mangoes
  produceMangoes() {
    if(this._healthyStatus){
      for (let i = 0; i < Math.floor(Math.random() * 100); i++) {
        let mango = new Mango
        mango.quality = Math.floor(Math.random() * 2)
        this._fruits.push(mango)
      }
    }
  }

  // Get some fruits
  harvest() {
    let goodFruits = 0
    let badFruits = 0
    for (let i = 0; i < this._fruits.length; i++) {
      if (this._fruits[i]['quality'] == 0) {
        goodFruits++
      } else {
        badFruits++
      }
    }
    this._fruits = []
    this._harvested = (goodFruits + badFruits) + ' (' + goodFruits + ' good, ' + badFruits + ' bad)'
  }

}

class Mango {
  // Produce a mango
  constructor() {
    this.quality = 0 // 0 good and  1 bad
  }
}

let mangoTree = new MangoTree()

let Cron = new CronJob('*/5 * * * * *', function() {
  mangoTree.grow();
  mangoTree.produceMangoes();
  mangoTree.harvest();
  db.ref('/').set(mangoTree)
  let imgmango = ''
  if (mangoTree._age >= 10) {
    imgmango = '../assets/age3.jpeg'
  } else if (mangoTree._age >= 5) {
    imgmango = '../assets/age2.jpeg'
  } else {
    imgmango = '../assets/age1.jpeg'
  }
  db.ref('/imgpic').set(imgmango)

  console.log(`[Year ${mangoTree._age} Report] Height = ${mangoTree._height} | Fruits harvested = ${mangoTree._harvested} health=${mangoTree._healthyStatus}`)
}, null, false, 'Asia/Jakarta');

Cron.start()
