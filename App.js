import React, {useRef, useEffect} from 'react';
import { Text, View, StyleSheet, Button, Alert, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';

//https://github.com/iddan/react-native-canvas/ 
import Canvas from 'react-native-canvas';

export default function App() {
  let field;
  let weigh;
  
  const canvasRef = useRef(null);
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 300;
      canvas.height = 250;
      weigh.draw("start");
      console.log("asda")
    }
  }, [canvasRef]);
  
  class Field {
    rebuild(){
    }
    refresh(){
        //without calculating new num
    }
    constructor() {
        this.num  = Math.floor(Math.random()*16);
        this.selected = [];
    }
  }

  class Weigh {
    click(){
        console.log("click");
    }
    draw(state){
        switch (state) {
            case "start" :
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
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
                ctx.font = "50px serif";
                ctx.fillText(this.count, 120, 245);
                break;
            case "current":
                break;
        }
    }
    refresh(){
        this.left  = [];
        this.right = [];
        this.count =  0; 
    }
    constructor() {
        this.left  = [];
        this.right = [];
        this.count =  '00'; //through function from field
    }
  }

  field = new Field();
  weigh = new Weigh();
  return (
    <View style={styles.containerView}>
      <View style={styles.headerView}>
        <Button
            title="?"
            onPress={() => {
                weigh.draw("start");
                console.log('"?" pressed');
                //Alert.alert('"?" pressed')
            }}
          />
      </View>
      <View style={styles.fieldView}>
        <View style={styles.fieldViewRow}>
          <Button
            title="01"
            onPress={() => Alert.alert('Left button pressed')}
          />
          <Button
            title="02"
            onPress={() => Alert.alert('Right button pressed')}
          />
          <Button
            title="03"
            onPress={() => Alert.alert('Left button pressed')}
          />
          <Button
            title="04"
            onPress={() => Alert.alert('Right button pressed')}
          />
        </View>
        <View style={styles.fieldViewRow}>
          <Button
            title="05"
            onPress={() => Alert.alert('Left button pressed')}
          />
          <Button
            title="06"
            onPress={() => Alert.alert('Right button pressed')}
          />
          <Button
            title="07"
            onPress={() => Alert.alert('Left button pressed')}
          />
          <Button
            title="08"
            onPress={() => Alert.alert('Right button pressed')}
          />
        </View>
        <View style={styles.fieldViewRow}>
          <Button
            title="09"
            onPress={() => Alert.alert('Left button pressed')}
          />
          <Button
            title="10"
            onPress={() => Alert.alert('Right button pressed')}
          />
          <Button
            title="11"
            onPress={() => Alert.alert('Left button pressed')}
          />
          <Button
            title="12"
            onPress={() => Alert.alert('Right button pressed')}
          />
        </View>
        <View style={styles.fieldViewRow}>
          <Button
            title="13"
            onPress={() => Alert.alert('Left button pressed')}
          />
          <Button
            title="14"
            onPress={() => Alert.alert('Right button pressed')}
          />
          <Button
            title="15"
            onPress={() => Alert.alert('Left button pressed')}
          />
          <Button
            title="16"
            onPress={() => Alert.alert('Right button pressed')}
          />
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
  }
});
