import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import Axios from '../../utils/Axios'; // Import Axios with your configurations
import { useToast } from 'react-native-toast-notifications';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleResetPassword = async () => {
    try {
      if (!email) {
        Alert.alert('Error', 'Please enter your email.');
        return;
      }

      setLoading(true);

      // Assuming your API endpoint for password reset is /auth/reset-password
      const response = await Axios.post('/auth/reset-password', { email });

      // Handle the response from the server as needed
      console.log('Reset Password Response:', response.data);

      const { code, msg } = response.data;

      if (code === 200) {
        // Jika code 200, tampilkan toast success
        toast.show(msg, {
          type: 'success',
          placement: 'center'
        });
        setEmail('');
      } else if (code === 404) {
        // Jika code 404, tampilkan toast error
        toast.show(msg, {
          type: 'danger',
          placement: 'center'
        });
      }
    } catch (error) {
      toast.show('An error occurred. Please try again.', {
        type: 'danger',
        placement: 'center'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/login.png')}
        style={styles.logo}
      />
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleResetPassword}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  card: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  logo: {
    marginTop: -190,
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ResetPassword;
