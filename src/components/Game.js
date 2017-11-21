import React from 'react';
import '../game.css'
import GameMode from './GameMode'
import Block from './Block'
import Newgame from './Newgame'
import Odds from './Odds'
import Settings from './Settings'
import Levels from './Levels'
import Info from './Info'
import NextLevel from './NextLevel'

class Game extends React.Component {
    static numberOfBlocks = 4;
    static numberOfBombs = 1;
    static levelTexts = ['Lets start with a simple coin flip, 50:50.',
                         '1:3 easy.',
                         '1:4 still pretty easy.',
                         'Now something a bit more interesting.',
                         'This is not hard, you can do it!',
                         'A few tries and you will get this one.',
                         'Lets change it up a bit, only one losing block. Can you dodge it long enough?',
                         'This might take a while, but you can do it!',
                         'Two bad blocks lurking in here, can you NOT find them?',
                         'A first hard one, but give it some time and you will be victorious!',
                         'Only three harmless ones in this minefield, can you find them all?',
                         'If you manage to get this one right on the first try, you are super lucky...',
                         "I'm impressed that you have gotten this far, it's only gonna get harder though...",
                         "If you manage to get this one right you truly are a champion.",
                         "I'm just gonna say it, your odds of making through this one are veeeeeery slim.",
                         "Wow... You truly are remarkable, but if you're not exceptionally lucky your journey will end here...",
                         "What is this?? You just might be the luckiest person alive! This level is your reward (haha).",
                         "I was pretty sure that no one is ever going to pass that last level," +
                          " but if you did I'm sure you want an even bigger challenge, so here you go :)",
                         ".... I have no words... Maybe now would be the time to stop playing and go buy yourself a lottery ticket. " + 
                          "Just kidding, reach for the stars!",
                         "Youuuuuu shall not PASSSSSSSSSSS!",
                          "No one is ever going to get to this level, but I made it anyway because why not. This is it. The last level." +
                           " If you pass this one, you win (if you didn't use some kind of a bot you dirty cheater)."
                        ];
    constructor(props) {
        super(props);
        this.state = {
            gameMode: 'practice',
            level: 1,
            tries: 0,
            totalTries: 0,
            levelTotalOdds: 0,
            blockCount: Game.numberOfBlocks,
            bombPositions: Game.initBombs(Game.numberOfBombs, Game.numberOfBlocks),
            blockColors: Game.randomColor(Game.numberOfBlocks),
            selectedBlocks: [],
            bombCount: Game.numberOfBombs,
            isDone: false,
            levelDone: false,
            infoVisible: false,
        };
    };

    initState = () => {
        this.setState(prevState => ({
            blockCount: prevState.blockCount,
            bombPositions: Game.initBombs(prevState.bombCount, prevState.blockCount),
            blockColors: Game.randomColor(prevState.blockCount),
            selectedBlocks: [],
            bombCount: prevState.bombCount,
            isDone: false,
        }));
    };

    changeGameMode = () => {
        this.setState(prevState => ({
            gameMode: (prevState.gameMode === 'practice') ? 'levels' : 'practice',
        }), this.initLevel(this.state.level));
    };

    updateLevel = (level) => {
        this.setState({tries: 0}, this.initLevel(level));
    };

    initLevel = (level) => {
        let levelBombCount;
        let levelBlockCount;
        switch(level) {
            case 1: // Level odds 1:2
                levelBombCount = 1;
                levelBlockCount = 2;   
                break;
            case 2: // Level odds 1:3
                levelBombCount = 2;   
                levelBlockCount = 3;
                break;
            case 3: // Level odds 1:4
                levelBombCount = 3;
                levelBlockCount = 4;
                break;
            case 4: // Level odds 1:10
                levelBombCount = 2;
                levelBlockCount = 5;
                break;
            case 5: // Level odds 1:15
                levelBombCount = 2
                levelBlockCount = 6;
                break;
            case 6: // Level odds 1:20
                levelBombCount = 3;
                levelBlockCount = 6;
                break;
            case 7: // Level odds 1:35
                levelBombCount = 1;
                levelBlockCount = 30;
                break; 
            case 8: // Level odds 1:56
                levelBombCount = 3;
                levelBlockCount = 8;
                break;
            case 9: // Level odds 1:105
                levelBombCount = 2;
                levelBlockCount = 15;
                break;
            case 10: // Level odds 1:210
                levelBombCount = 4;
                levelBlockCount = 10;
                break;
            case 11: // Level odds 1:560
                levelBombCount = 13;
                levelBlockCount = 16;
                break;
            case 12: // Level odds 1:792
                levelBombCount = 5;
                levelBlockCount = 12;
                break;
            case 13: // Level odds 1:1365
                levelBombCount = 4;
                levelBlockCount = 15;
                break;
            case 14: // Level odds 1:2024
                levelBombCount = 3;
                levelBlockCount = 24;
                break;
            case 15: // Level odds 1:5005
                levelBombCount = 6;
                levelBlockCount = 15;
                break;
            case 16: // Level odds 1:8568
                levelBombCount = 5;
                levelBlockCount = 18;
                break;
            case 17: // Level odds 1:14190
                levelBombCount = 3;
                levelBlockCount = 45;
                break;
            case 18: // Level odds 1:27132
                levelBombCount = 13;
                levelBlockCount = 19;
                break;
            case 19: // Level odds 1:48620
                levelBombCount = 9;
                levelBlockCount = 18;
                break;
            case 20: // Level odds 1:91390
                levelBombCount = 4;
                levelBlockCount = 40;
                break;
            case 21: // Level odds 1:293,930
                levelBombCount = 12;
                levelBlockCount = 21;
                break;
            default:
                levelBombCount = 1;
                levelBlockCount = 1;
                break;
        }
        let levelOdds = 1;
        let singleOdds = 1;
        let d = levelBlockCount;
        let i = 0;
        for(d ; levelBombCount < d; d--) {
            singleOdds = 1 - (levelBombCount / (levelBlockCount - i));
            levelOdds = levelOdds * singleOdds;
            i++;
        }
        levelOdds = Math.round(1 / levelOdds);
        levelOdds = levelOdds--;
        this.setState(prevState => ({
            level: level,
            levelTotalOdds: levelOdds,
            blockCount: levelBlockCount,
            bombCount: levelBombCount,
            bombPositions: Game.initBombs(levelBombCount, levelBlockCount),
            blockColors: Game.randomColor(levelBlockCount),
            selectedBlocks: [],
            isDone: false,
            levelDone: false,
        }));
    };

    selectBlock = (block) => {
        if (this.state.selectedBlocks.indexOf(block) >= 0) { return; }
        else if(!this.state.isDone && !this.state.levelDone) {
            this.setState(prevState => ({
                selectedBlocks: prevState.selectedBlocks.concat(block),
                blockColors: this.changeColor(prevState.blockColors, block)
            }), this.updatedoneStatus(block));
        }
    };

    updatedoneStatus = (i) => {
        if (this.state.bombPositions.indexOf(i) >=0) {
            this.setState(prevState => ({
                isDone: true,
                tries: prevState.gameMode === 'levels' ? prevState.tries + 1 : prevState.tries,
                totalTries: prevState.gameMode === 'levels' ? prevState.totalTries + 1 : prevState.totalTries,
            }));
        }
        else if(this.state.gameMode === 'levels' && 
                ((this.state.selectedBlocks.length + 1) + this.state.bombCount === this.state.blockCount)) {
                    this.setState(prevState => ({
                    levelDone: true,
                    tries: prevState.tries + 1,
                    totalTries: prevState.totalTries + 1,
                }));
        }
    };

    changeColor = (arr, i) => {
        if(this.state.bombPositions.indexOf(i) >=0) {arr[i] = '#ff0000'; return arr;}
        arr[i] = '#FFFFFF'
        return arr;
    };

    setBlockCount = (e) => {
        e.persist();
        if(this.state.selectedBlocks.length === 0) {
            this.setState(prevState =>({
                blockCount: e.target.value,
                blockColors: (prevState.blockColors.length < e.target.value) ? 
                                prevState.blockColors.concat(Game.randomColor(1)) :
                                prevState.blockColors.slice(0, -1),
                bombPositions: Game.initBombs(prevState.bombCount, e.target.value),
            }));
        }
    };

    setBombCount = (e) => {
        e.persist();
        if(this.state.selectedBlocks.length === 0) {
            this.setState(prevState =>({
                bombCount: e.target.value,
                bombPositions: Game.initBombs(e.target.value, prevState.blockCount),
            }));
        }
    };

    showInfo = () => {
        this.setState(prevState => ({
            infoVisible: !prevState.infoVisible,
        }));
    };

    static initBombs = (bombCount, blockCount) => {
        var arr = [];
        for(let i = 0; i < bombCount; i++) {
            let ind = Math.floor(Math.random() * blockCount);
            if(arr.indexOf(ind) < 0) {
                arr.push(ind); 
            }
            else {
                i--;
            }
        }
        return arr;
    };

    static randomColor = (num) => {
        var arr = [];
        let letters = '0123456789ABCDEF';
        let color = '#';
        for(let j = 0; j < num; j++) {
            for(let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            arr.push(color);
            color = '#';
        }
        return arr;
    };

    render() {
        return (
            <div className="game">
                <Info infoVisible={this.state.infoVisible}
                      showInfo={this.showInfo}  />
                <h1>Random Game</h1>
                <GameMode gameMode={this.state.gameMode} 
                          changeGameMode={this.changeGameMode}
                          selectedBlocks={this.state.selectedBlocks} />
                { this.state.gameMode === 'practice' && 
                <Settings gameMode={this.state.gameMode}
                          blockCount={this.state.blockCount} 
                          bombCount={this.state.bombCount}
                          setBlockCount={this.setBlockCount}
                          setBombCount={this.setBombCount}
                          selectedBlocks={this.state.selectedBlocks}
                          isDone={this.state.isDone}
                          initState={this.initState} />
                }
                { this.state.gameMode === 'levels' &&
                <Levels level={this.state.level}
                        bombCount={this.state.bombCount}
                        selectedBlocks={this.state.selectedBlocks}
                        isDone={this.state.isDone}
                        levelDone={this.state.levelDone}
                        texts={Game.levelTexts}
                        tries={this.state.tries}
                        totalTries={this.state.totalTries} />
                }
                <Odds blockCount={this.state.blockCount}
                      selectedBlocks={this.state.selectedBlocks}
                      isDone={this.state.isDone}
                      numberOfBombs={this.state.bombCount}
                      levelDone={this.state.levelDone}
                      levelTotalOdds={this.state.levelTotalOdds} />
                {this.state.isDone &&
                    <Newgame initState={this.initState}
                             gameMode={this.state.gameMode} />
                }
                <br />
                {this.state.levelDone &&
                <NextLevel updateLevel={this.updateLevel} 
                           level={this.state.level} />
                }
                <Block blockCount={this.state.blockCount}
                       selectedBlocks={this.state.selectedBlocks}
                       selectBlock={this.selectBlock}
                       blockColors={this.state.blockColors} 
                       bombPositions={this.state.bombPositions}
                       isDone={this.state.isDone}
                       levelDone={this.state.levelDone}
                       gameMode={this.state.gameMode} />
                {this.state.isDone && 
                    <Newgame initState={this.initState}
                             gameMode={this.state.gameMode} />
                }
                {(this.state.levelDone && this.state.level !== 21) &&
                    <NextLevel updateLevel={this.updateLevel} 
                               level={this.state.level} />
                }
                
            </div>
        );
    }
}

export default Game