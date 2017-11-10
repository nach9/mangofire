"use strict"

// release 0

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
  grow() {
    this._age += 1
    let randomGrow = Math.floor(Math.random() * 5)
    if (this._age < 10) { // stop grow
      this._height += 1.2
    }

    let randomDeath = 10 + Math.floor(Math.random() * 10)
    if (this._age >= randomDeath) { // end of life
      this._healthyStatus = false
    }
  }

  // Produce some mangoes
  produceMangoes() {
    for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
      let mango = new Mango
      mango.quality = Math.floor(Math.random() * 2)
      this._fruits.push(mango)
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


// * driver code untuk release 0
let mangoTree = new MangoTree()
do {
  mangoTree.grow();
  mangoTree.produceMangoes();
  mangoTree.harvest();
  console.log(`[Year ${mangoTree._age} Report] Height = ${mangoTree._height} | Fruits harvested = ${mangoTree._harvested}`)
  // console.log(`[Year ${tree._age} Report] Height = ${tree._height} | Fruits harvested = ${tree._harvested}`)
} while (mangoTree._healthyStatus != false)


// Release 1
class AppleTree {}
class Apple {}

// Release 2
class FruitTree {}
class Fruit {}

// Release 3
class TreeGrove {}
