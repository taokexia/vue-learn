// Some usefull variables
var maxHealth = 10
var maxFood = 10
var handSize = 5
var cardUid = 0
var currentPlayingCard = null

// 应用状态集合
var state = {
  // 世界
  worldRatio: getWorldRatio(),
  // 用户界面
  activeOverlay: null,
  // 游戏
  turn: 1,
  players: [
    {
      name: 'Anne of Cleves',  
    },
    {
      name: 'William the Bald',
    }  
  ],
  currentPlayerIndex: Math.round(Math.random()),
  testHand: []	
}
