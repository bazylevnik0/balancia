import React, {useRef, useEffect} from 'react';
import { Text, View, StyleSheet, Button, Alert} from 'react-native';
import Constants from 'expo-constants';

//https://github.com/iddan/react-native-canvas/ 
import Canvas from 'react-native-canvas';

export default function App() {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (canvasRef.current) {
    console.log("test");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'blue';
      ctx.fillRect(0, 0, 300, 300);
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
         <Canvas ref={canvasRef}/>
      </View>
      <View>
        <View style={styles.footerView}>
          <Button
            title="<---"
            onPress={() => Alert.alert('Left button pressed')}
          />
          <Button
            title="-x-"
            onPress={() => Alert.alert('Right button pressed')}
          />
          <Button
            title="--->"
            onPress={() => Alert.alert('Left button pressed')}
          />
         </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  headerView: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    width: 300,
  },
  fieldView: {
    flex: 1,
    justifyContent: 'center',
  },
  fieldViewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weighView: {
   flex: 1,
   justifyContent: 'center',
  },
  footerView: {
    flex: 0,
    flexDirection: 'row',
  },
  footerButton: {
    margin: 5,
  },
});
