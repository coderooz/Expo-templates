import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';

export default function OnboardingScreen({ navigation }) {
  return (
    <Onboarding
      onDone={() => navigation.replace('Home')}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={require('../assets/onboarding1.png')} />,
          title: 'Welcome',
          subtitle: 'This is your personalized app template!',
        },
        // Add more slides...
      ]}
    />
  );
}
