//made with Bard participating
import React, {useRef, useEffect, useState} from 'react';
import { Text, View, StyleSheet, Button, Alert, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import Canvas from 'react-native-canvas'; //https://github.com/iddan/react-native-canvas/ 

const styles = StyleSheet.create({
  containerView: {
    flex: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  headerView: {
    flex: 1,
    alignSelf: 'stretch',
  },
  fieldView: {
    flex: 5,
    width: '100%',
    justifyContent: 'space-around',
  },
  fieldViewRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  weighView: {
    flex: 5.25,
    width: 300,
    height: 250,
  },
  footerView: {
    flex: 0.75,
    width: '100%',
    flexDirection: 'row',  
    justifyContent: 'space-between',
    backgroundColor: 'blue',
  },
  footerButton: {
    width: '33.33%',
  },
});

export default function App() {
  let field;
  [buttons ,setButtons] =useState([]);
  [selected,setSelected]=useState([]);
  field =  {
    num : 0, 
    star: undefined,
    build(){
      setSelected([]);
      //calc new num and star
      field.num  = Math.floor(Math.random()*14)+3;
      field.star = Math.floor(Math.random()*(field.num));
      console.log(field.num,field.star)
      for (let i = 0; i < field.num; i++) {
         let title;
         if(i<10){
           title="0"+i;
         } else title = ""+i;
            buttons[i] = (<Button
            title={title}
            color="blue"
            onPress={() => field.select(i)}
            />);
      }
      for (let i = field.num; i < 16; i++) {
         let title;
         if(i<10){
           title="0"+i;
         } else title = ""+i;
            buttons[i] = (<Button
            title={title}
            disabled
            onPress={() => field.select(i)}
            />);
      }
      setButtons([...buttons]);
      weigh.refresh();
    },
    refresh(){
      //without calculating new num
      for (let i = 0; i < field.num; i++) {
         let title;
         if(i<10){
           title="0"+i;
         } else title = ""+i;
            buttons[i] = (<Button
            title={title}
            color="blue"
            onPress={() => field.select(i)}
            />);
      }
      for (let i = field.num; i < 16; i++) {
         let title;
         if(i<10){
           title="0"+i;
         } else title = ""+i;
            buttons[i] = (<Button
            title={title}
            disabled
            onPress={() => field.select(i)}
            />);
      }
      setButtons([...buttons]);
    },
    select(num){
      if(!selected.includes(num)){
        selected.push(num);
        let title;
        if(num<10){
          title="0"+num;
        } else title = ""+num;
            buttons[num] = (<Button
            title={title}
            color="green"
            onPress={() => field.select(num)}
        />);
        setButtons([...buttons]);
        setSelected([...selected]);
      }
    }
  }

  let weigh; 
  weigh = {
    left  : [],
    right : [],
    count : 0,
    state : "start",
    draw(){
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
           
        switch (weigh.state) {
            case "start":
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, 300, 250);
                //draw text
                ctx.fillStyle = 'black';
                ctx.font = "40px sans";
                ctx.fillText("press to start", 30, 125);
                break;
            case "weigh":
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, 300, 250);
                //draw weigh position
                ctx.beginPath(); 
                ctx.strokeStyle='black'; 
                ctx.lineWidth = 10;
                //base
                ctx.moveTo(150, 50); 
                ctx.lineTo(150, 200);
                ctx.stroke();
                let star_shift = 0;
                //left
                let left_weight  = weigh.left.length;
                if(weigh.left.includes(field.star))star_shift = 20;
                ctx.strokeStyle='black'; 
                ctx.beginPath(); 
                ctx.lineWidth = 10;
                ctx.moveTo(50 , 125+(5*left_weight)+star_shift); 
                ctx.lineTo(100, 125+(5*left_weight)+star_shift);
                ctx.stroke();
                ctx.beginPath(); 
                ctx.lineWidth = 3;
                ctx.strokeStyle='blue'; 
                for(let i = 0; i < left_weight; i++){
                   ctx.moveTo(50 , 125+(5*left_weight)-(i*5)-10+star_shift); 
                   ctx.lineTo(100, 125+(5*left_weight)-(i*5)-10+star_shift);
                }
                ctx.stroke();
                star_shift = 0;
                //right
                let right_weight = weigh.right.length;
                if(weigh.right.includes(field.star))star_shift = 20;
                ctx.strokeStyle='black';
                ctx.lineWidth = 10;
                ctx.beginPath(); 
                ctx.moveTo(200, 125+(5*right_weight)+star_shift); 
                ctx.lineTo(250, 125+(5*right_weight)+star_shift);
                ctx.stroke();
                ctx.beginPath(); 
                ctx.lineWidth = 3;
                ctx.strokeStyle='blue';
                for(let i = 0; i < right_weight; i++){
                   ctx.moveTo(200, 125+(5*right_weight)-(i*5)-10+star_shift); 
                   ctx.lineTo(250, 125+(5*right_weight)-(i*5)-10+star_shift);
                }
                ctx.stroke();
                star_shift = 0;
                //text
                ctx.fillStyle = 'black';
                ctx.font = "50px sans";
                ctx.fillText("0"+weigh.count, 121, 245);  
                break;
        }
    },
    refresh(){
        weigh.left  = [];
        weigh.right = [];
        weigh.count = Math.ceil(Math.pow(field.num+1, 1/3))+1; 
    },
    click(){
      if(weigh.state=="start") field.build();
      if(weigh.count>0){
      weigh.state="weigh";
      setWeigh(weigh);
      weigh.count--;
      weigh.draw();     
      }                   
    },
  }

  
  const canvasRef = useRef(null);
  [field,setField] = useState(field);
  [weigh,setWeigh] = useState(weigh);
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 300;
      canvas.height = 250;
      weigh.draw(); //first "welcome" draw
    }
  }, [canvasRef]);

  
  return (
    <View style={styles.containerView}>
      <View style={styles.headerView}>
        <Button
            title="?"
            onPress={() => {
                console.log('"?" pressed');
                //Alert.alert('"?" pressed')
            }}
          />
      </View>
      <View style={styles.fieldView}>
        <View style={styles.fieldViewRow}>
          {buttons[0]}
          {buttons[1]}
          {buttons[2]}
          {buttons[3]}
        </View>
        <View style={styles.fieldViewRow}>
          {buttons[4]}
          {buttons[5]}
          {buttons[6]}
          {buttons[7]}
        </View>
        <View style={styles.fieldViewRow}>
          {buttons[8]}
          {buttons[9]}
          {buttons[10]}
          {buttons[11]}
        </View>
        <View style={styles.fieldViewRow}>
          {buttons[12]}
          {buttons[13]}
          {buttons[14]}
          {buttons[15]}
        </View>
      </View>
      <View style={styles.weighView}>
         <Canvas ref={canvasRef} style={{width: 300, height: 250}}/>
         <TouchableOpacity
            onPress={weigh.click}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}>
         </TouchableOpacity>
      </View>
        <View style={styles.footerView}>
          <Button
            title="<-----"
            style={styles.footerButton}
            onPress={() => {
              Alert.alert("added to left: ",selected.toString());
              weigh.left = [...selected];
              setSelected([]);
              field.refresh();
              console.log("left:",weigh.left);
            }}
          />
          <Button
            title="---x---"
            style={styles.footerButton}
            onPress={() => {
              //Alert.alert('Right button pressed')
              field.build(); //!
              weigh.refresh();
              weigh.draw();
            }}
          />
          <Button
            title="----->"
            style={styles.footerButton}
            onPress={() => {
              Alert.alert("added to right: ",selected.toString());
              weigh.right = [...selected];
              setSelected([]);
              field.refresh();
              console.log("right:",weigh.right);
            }}
          />
         </View>
    </View>
  );
}
