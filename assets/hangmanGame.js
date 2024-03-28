let lives=7;
    let playAgain;
    let gameOver=false;
    const alpha=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    const wordList= makeWordList();
    let alphaGuessed=[]
    for(let i=0;i<alpha.length;i++){alphaGuessed.push(false)};
    
    let regex = /^[a-zA-Z]+$/;
    for(var i = 0; i <wordList.length;i++){
        if(!regex.test(wordList[i])){
            console.log("Purging " + wordList[i] + " from the list of words!");
            wordList.pop(i);
        }
    }
    for(let i = 0; i < wordList.length;i++){wordList[i]=wordList[i].toUpperCase();}
    
    let guessedWord="";
    let hiddenWord=wordList[randInt(0,wordList.length-1)];
    let shown="";
    let shownBool=[];
    const canvas = document.getElementById("hangman");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle="red";
    ctx.strokeStyle = "red";
    ctx.lineWidth=5;

    hideWord(hiddenWord);
    initWord();

    //Creating buttons for the display
    

    //Setting up all buttons to update the revealed word
    for(let i = 0; i < alpha.length;i++){
        let d = alpha[i];
        document.getElementById(d).addEventListener("click",function(){updateRevWord(d)});
    }

    function hideWord(hiddenWord){
        hiddenWord=hiddenWord.toUpperCase();
        //console.log(hiddenWord);
        for(let i = 0; i < hiddenWord.length;i++){
            shownBool.push(false);
        }
        //console.log(shownBool);
    }

    function initWord(){
        let temp="";
        for(let i = 0; i < shownBool.length;i++){
            temp=temp+"_ ";
        }
        shown=temp;
        //console.log(temp);
        document.getElementById("revWord").innerHTML = temp;
    }
    function updateRevWord(inLetter){ //Checks letter to see if it's in the hidden word. Will then reveal each letter found.
        //console.log("Searching for the letter " + inLetter);
        shown="";
        let inst = document.getElementById(inLetter);
        inst.style.color="steelblue";
        //inst.textContent="";
        let index = alpha.indexOf(inLetter);
        /* console.log(index);
        console.log(alpha[index]+" is at index " + index + " and has " + (alphaGuessed[index] ? "":"not ") + "been guessed"); */
        if(gameOver || alphaGuessed[index]){
            document.getElementById("status").innerHTML = "You have already guessed " +inLetter + "!";
            console.log("Problem, ended loop")
            return;
        }
        alphaGuessed[index]=true;
        if(hiddenWord.includes(inLetter)==true){
            for(let i = 0; i < hiddenWord.length;i++){
            if(hiddenWord[i]===inLetter.toUpperCase()){
                shownBool[i]=true;
                }
            }
        }
        else{
            lives--;
            document.getElementById("livesRem").innerHTML = "Lives Left: " + lives;
        }
        for(let i = 0; i < shownBool.length;i++){
            if(shownBool[i] ){
                shown=shown+hiddenWord[i]+" ";
            }
            else{
                shown=shown + "_ ";
            }
            
        }
        document.getElementById("revWord").innerHTML = shown;
        stickMan();
        checkWin();
    }
    //Returns a random integer between two values
    function stickMan(){
        if(lives==6){
            //Frame
            ctx.fillRect(canvas.width*0.3, canvas.height*0.9, canvas.width*0.4, 5);
            ctx.fillRect(canvas.width*0.7,canvas.height*0.9+5,5,-canvas.height*.85);
            ctx.fillRect(canvas.width/2,canvas.height*0.05+5,canvas.width*0.2,5);
            ctx.fillRect(canvas.width/2,canvas.height*0.05+5,5,canvas.height*0.15);
        }
        else if(lives==5){
            //head
            ctx.beginPath();
            ctx.arc(canvas.width/2+2.5,canvas.height*0.3,canvas.width*0.03,0,2*Math.PI);
            ctx.stroke();
        }

        else if(lives==4){
            //body
            ctx.fillRect(canvas.width/2,canvas.height*0.36,5,canvas.height*0.19);
        }

        else if(lives==3){
            //right leg
            ctx.beginPath();
            ctx.moveTo(canvas.width/2+5, canvas.height*0.55);
            ctx.lineTo((canvas.width/2)*1.15, canvas.height*0.75);
            ctx.stroke();               
        }

        else if(lives==2){
                //left leg
                ctx.beginPath();
            ctx.moveTo(canvas.width/2, canvas.height*0.55);
            ctx.lineTo((canvas.width/2)*20/23, canvas.height*0.75);
            ctx.stroke();
        }

        else if(lives==1){
            //right arm
            ctx.beginPath();
            ctx.moveTo(canvas.width/2+5, canvas.height*0.42);
            ctx.lineTo(canvas.width/2*1.14, canvas.height*0.35);
            ctx.stroke();               
        }
        else if(lives==0){
                //left arm
                ctx.beginPath();
            ctx.moveTo(canvas.width/2, canvas.height*0.42);
            ctx.lineTo(canvas.width/2*50/57,canvas.height*0.35);
            ctx.stroke();
        }             
        else{
            ctx.clearRect(0,0,canvas.width,canvas.height);
        }
    }

    function randInt(min, max){
        return Math.floor(Math.random()*(max-min))+min;
    }

    function checkWin(){
        let win = true;
        for(let i = 0; i < hiddenWord.length;i++){
            if(shownBool[i]==false){
                win=false;
            }
        }
        if(win){
            document.getElementById("status").innerHTML = "Congratulations!";
            gameOver=true;


        }
        else if(lives<=0){
            document.getElementById("status").innerHTML = "You Lose!";
            gameOver=true;
        }

        if(gameOver){
            let result= win ? "winner":"loser";
            setTimeout(function(){
                playAgain=window.confirm("You were a "+result+". The word was " + hiddenWord + ". Play again?");
                if(playAgain){resetGame()}
            }, 2000)
            
            return;

        }
    }

    function resetGame(){
        lives=7;
        stickMan();
        playAgain=false;
        gameOver=false;
        let r = randInt(0,wordList.length-1);
        console.log(r);
        hiddenWord=wordList[r];
        document.getElementById("status").innerHTML = "Time to guess!";
        alphaGuessed=[]
        for(let i=0;i<alpha.length;i++){alphaGuessed.push(false)};
        for(let i=0;i<alpha.length;i++){document.getElementById(alpha[i]).style.color="white"};
        guessedWord="";
        shown="";
        shownBool=[];
        hideWord(hiddenWord);
        initWord();
        document.getElementById("livesRem").innerHTML = "Lives Left: " + lives;

    }
    function makeWordList(){
        let list=["able","about","account","acid","across","act","addition","adjustment","advertisement","after","again","against","agreement","air","all","almost","among","amount","amusement","and","angle","angry","animal","answer","ant","any","apparatus","apple","approval","arch","argument","arm","army","art","as","at","attack","attempt","attention","attraction","authority","automatic","awake","baby","back","bad","bag","balance","ball","band","base","basin","basket","bath","be","beautiful","because","bed","bee","before","behaviour","belief","bell","bent","berry","between","bird","birth","bit","bite","bitter","black","blade","blood","blow","blue","board","boat","body","boiling","bone","book","boot","bottle","box","boy","brain","brake","branch","brass","bread","breath","brick","bridge","bright","broken","brother","brown","brush","bucket","building","bulb","burn","burst","business","but","butter","button","by","cake","camera","canvas","card","care","carriage","cart","cat","cause","certain","chain","chalk","chance","change","cheap","cheese","chemical","chest","chief","chin","church","circle","clean","clear","clock","cloth","cloud","coal","coat","cold","collar","colour","comb","come","comfort","committee","common","company","comparison","competition","complete","complex","condition","connection","conscious","control","cook","copper","copy","cord","cork","cotton","cough","country","cover","cow","crack","credit","crime","cruel","crush","cry","cup","cup","current","curtain","curve","cushion","damage","danger","dark","daughter","day","dead","dear","death","debt","decision","deep","degree","delicate","dependent","design","desire","destruction","detail","development","different","digestion","direction","dirty","discovery","discussion","disease","disgust","distance","distribution","division","do","dog","door","doubt","down","drain","drawer","dress","drink","driving","drop","dry","dust","ear","early","earth","east","edge","education","effect","egg","elastic","electric","end","engine","enough","equal","error","even","event","ever","every","example","exchange","existence","expansion","experience","expert","eye","face","fact","fall","false","family","far","farm","fat","father","fear","feather","feeble","feeling","female","fertile","fiction","field","fight","finger","fire","first","fish","fixed","flag","flame","flat","flight","floor","flower","fly","fold","food","foolish","foot","for","force","fork","form","forward","fowl","frame","free","frequent","friend","from","front","fruit","full","future","garden","general","get","girl","give","glass","glove","go","goat","gold","good","government","grain","grass","great","green","grey","grip","group","growth","guide","gun","hair","hammer","hand","hanging","happy","harbour","hard","harmony","hat","hate","have","he","head","healthy","hear","hearing","heart","heat","help","high","history","hole","hollow","hook","hope","horn","horse","hospital","hour","house","how","humour","I","ice","idea","if","ill","important","impulse","in","increase","industry","ink","insect","instrument","insurance","interest","invention","iron","island","jelly","jewel","join","journey","judge","jump","keep","kettle","key","kick","kind","kiss","knee","knife","knot","knowledge","land","language","last","late","laugh","law","lead","leaf","learning","leather","left","leg","let","letter","level","library","lift","light","like","limit","line","linen","lip","liquid","list","little","living","lock","long","look","loose","loss","loud","love","low","machine","make","male","man","manager","map","mark","market","married","mass","match","material","may","meal","measure","meat","medical","meeting","memory","metal","middle","military","milk","mind","mine","minute","mist","mixed","money","monkey","month","moon","morning","mother","motion","mountain","mouth","move","much","muscle","music","nail","name","narrow","nation","natural","near","necessary","neck","need","needle","nerve","net","new","news","night","no","noise","normal","north","nose","not","note","now","number","nut","observation","of","off","offer","office","oil","old","on","only","open","operation","opinion","opposite","or","orange","order","organization","ornament","other","out","oven","over","owner","page","pain","paint","paper","parallel","parcel","part","past","paste","payment","peace","pen","pencil","person","physical","picture","pig","pin","pipe","place","plane","plant","plate","play","please","pleasure","plough","pocket","point","poison","polish","political","poor","porter","position","possible","pot","potato","powder","power","present","price","print","prison","private","probable","process","produce","profit","property","prose","protest","public","pull","pump","punishment","purpose","push","put","quality","question","quick","quiet","quite","rail","rain","range","rat","rate","ray","reaction","reading","ready","reason","receipt","record","red","regret","regular","relation","religion","representative","request","respect","responsible","rest","reward","rhythm","rice","right","ring","river","road","rod","roll","roof","room","root","rough","round","rub","rule","run","sad","safe","sail","salt","same","sand","say","scale","school","science","scissors","screw","sea","seat","second","secret","secretary","see","seed","seem","selection","self","send","sense","separate","serious","servant","sex","shade","shake","shame","sharp","sheep","shelf","ship","shirt","shock","shoe","short","shut","side","sign","silk","silver","simple","sister","size","skin","","skirt","sky","sleep","slip","slope","slow","small","smash","smell","smile","smoke","smooth","snake","sneeze","snow","so","soap","society","sock","soft","solid","some","","son","song","sort","sound","soup","south","space","spade","special","sponge","spoon","spring","square","stage","stamp","star","start","statement","station","steam","steel","stem","step","stick","sticky","stiff","still","stitch","stocking","stomach","stone","stop","store","story","straight","strange","street","stretch","strong","structure","substance","such","sudden","sugar","suggestion","summer","sun","support","surprise","sweet","swim","system","table","tail","take","talk","tall","taste","tax","teaching","tendency","test","than","that","the","then","theory","there","thick","thin","thing","this","thought","thread","throat","through","through","thumb","thunder","ticket","tight","till","time","tin","tired","to","toe","together","tomorrow","tongue","tooth","top","touch","town","trade","train","transport","tray","tree","trick","trouble","trousers","true","turn","twist","umbrella","under","unit","up","use","value","verse","very","vessel","view","violent","voice","waiting","walk","wall","war","warm","wash","waste","watch","water","wave","wax","way","weather","week","weight","well","west","wet","wheel","when","where","while","whip","whistle","white","who","why","wide","will","wind","window","wine","wing","winter","wire","wise","with","woman","wood","wool","word","work","worm","wound","writing","wrong","year","yellow","yes","yesterday","you","young","Bernhard","Breytenbach","Android",];
        return list;
    }

    