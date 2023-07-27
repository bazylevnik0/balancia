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
  buttonVisible: {
    color: 'blue',
  },
  buttonInvisible: {
    backgroundColor: 'red',
  },
});

export default function App() {
  
  let field;
  let weigh;
  
  const canvasRef = useRef(null);
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 300;
      canvas.height = 250;
      weigh.draw();
    }
  }, [canvasRef]);
  
  const [buttons,setButtons] = useState([ 
          <Button
            title="00"
            disabled
            onPress={() => field.select(0)}
          />,
          <Button
            title="01"
            disabled
            onPress={() => field.select(1)}
          />,
          <Button
            title="02"
            disabled
            onPress={() => field.select(2)}
          />,
          <Button
            title="03"
            disabled
            onPress={() => field.select(3)}
          />,
          <Button
            title="04"
            disabled
            onPress={() => field.select(4)}
          />,
          <Button
            title="05"
            disabled
            onPress={() => field.select(5)}
          />,
          <Button
            title="06"
            disabled
            onPress={() => field.select(6)}
          />,
          <Button
            title="07"
            disabled
            onPress={() => field.select(7)}
          />,
          <Button
            title="08"
            disabled
            onPress={() => field.select(8)}
          />,
          <Button
            title="09"
            disabled
            onPress={() => field.select(9)}
          />,
          <Button
            title="10"
            disabled
            onPress={() => field.select(10)}
          />,
          <Button
            title="11"
            disabled
            onPress={() => field.select(11)}
          />,
          <Button
            title="12"
            disabled
            onPress={() => field.select(12)}
          />,
          <Button
            title="13"
            disabled
            onPress={() => field.select(13)}
          />,
          <Button
            title="14"
            disabled
            onPress={() => field.select(14)}
          />,
          <Button
            title="15"
            disabled
            onPress={() => field.select(15)}
          />,]);


  class Field {
    constructor() {
        this.num = 0;
        this.selected = [];
    }
    build(){
      //calc new num
      this.num = Math.floor(Math.random()*14)+3;
    
      for (let i = 0; i < this.num; i++) {
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
      for (let i = this.num; i < 16; i++) {
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
      setButtons([...buttons]);// 

    }
    refresh(){
      //without calculating new num
    }
    select(num){
      if(!this.selected.includes(num)){
      this.selected.push(num);
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
      }
    }
  }

  class Weigh {
    constructor() {
      this.left  = [];
      this.right = [];
      this.count =  '00'; //through function from field
      this.state = "start";
    }
    draw(){
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
           
        switch (this.state) {
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
                //draw start position
                ctx.beginPath(); 
                ctx.strokeStyle='black'; 
                ctx.lineWidth = 10;
                //base
                ctx.moveTo(150, 50); 
                ctx.lineTo(150, 200);
                //left
                ctx.moveTo(50, 125); 
                ctx.lineTo(100, 125);
                //right
                ctx.moveTo(200, 125); 
                ctx.lineTo(250, 125);
                ctx.stroke();
                //text
                ctx.fillStyle = 'black';
                ctx.font = "50px sans";
                ctx.fillText(this.count, 121, 245);  
                break;
        }
    }
    refresh(){
        this.left  = [];
        this.right = [];
        this.count =  0; 
    }
    click(obj){
      console.log("test")
      if(weigh.state == "start") {
        field.build();
      }
      weigh.state="weigh";
      setWeigh(weigh);
      weigh.draw();                        
    }
  }

  [field,setField] = useState(new Field());
  [weigh,setWeigh] = useState(new Weigh());
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
            onPress={() => Alert.alert('Left button pressed')}
          />
          <Button
            title="---x---"
              style={styles.footerButton}
          
            onPress={() => Alert.alert('Right button pressed')}
          />
          <Button
            title="----->"
              style={styles.footerButton}
          
            onPress={() => Alert.alert('Left button pressed')}
          />
         </View>
    </View>
  );
}
