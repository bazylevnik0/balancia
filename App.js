import React, {useRef, useEffect} from 'react';
import { Text, View, StyleSheet, Button, Alert} from 'react-native';
import Constants from 'expo-constants';

//https://github.com/iddan/react-native-canvas/ 
import Canvas from 'react-native-canvas';

export default function App() {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 300;
      canvas.height = 250;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'blue';
      ctx.fillRect(0, 0, 300, 600);
      ctx.beginPath(); // Start a new path
      ctx.moveTo(30, 50); // Move the pen to (30, 50)
      ctx.lineTo(150, 100); // Draw a line to (150, 100)
      ctx.stroke(); // Render the path
    }
  }, [canvasRef]);

  return (
    <View style={styles.containerView}>
      <View style={styles.headerView}>
        <Button
            title="?"
            onPress={() => Alert.alert('Left button pressed')}
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
