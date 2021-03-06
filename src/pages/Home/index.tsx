import React from 'react';
import {StyleSheet, View, ImageBackground, Text, Image} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

// @ts-ignore
import logo from '../../assets/logo.png';
// @ts-ignore
import background from '../../assets/home-background.png';

const Home: React.FC = () => {
  const navigation = useNavigation();

  function handleNavigationToPoints() {
    navigation.navigate('Points');
  }

  return (
    <ImageBackground
      source={background}
      style={styles.container}
      imageStyle={{width: 274, height: 368}}>
      <View style={styles.main}>
        <Image source={logo} />
        <Text style={styles.title}>Your leavings collection marketplace.</Text>
        <Text style={styles.description}>
          We help people find collection points efficiently.
        </Text>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleNavigationToPoints}>
          <View style={styles.buttonIcon}>
            <Icon name="angle-right" size={25} color="#fff" />
          </View>
          <Text style={styles.buttonText}>Enter</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu-Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto-Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },
});

export default Home;
