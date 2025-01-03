import { NavigationContainer } from '@react-navigation/native';

//stack navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

//import screen splash
import Splash from '../screens/splash/Index';

//import BottomTabsNavigation
import BottomTabsNavigation from './BottomTabsNavigation';

//import screen post show
import PostShow from '../screens/posts/Show';

//import screen product show
// import ProductShow from '../screens/products/Show';

//import screen page show
// import PageShow from '../screens/pages/Show';

//import screen login
import Login from '../screens/login/Index';
import EditProfileScreen from '../screens/edit-profile';
import ChangePasswordScreen from '../screens/change-password';
import TidakMasukHariIniScreen from '../screens/riwayat-menu/tidak-masuk-hari-ini';
import RiwayatAbsensiScreen from '../screens/riwayat-menu/riwayat-absensi';
import RiwayatPengajuanIzinSakitScreen from '../screens/riwayat-menu/riwayat-pengajuan-izin-sakit';
import RiwayatPengajuanCutiScreen from '../screens/riwayat-menu/riwayat-pengajuan-cuti';
import RiwayatPengajuanRevisiAbsensiScreen from '../screens/riwayat-menu/riwayat-pengajuan-revisi-absensi';
import RangkingPointsScreen from '../screens/rangking-point';
import ResetPassword from '../screens/reset-password';

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen
                    name="Splash"
                    component={Splash}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="HomeScreen"
                    component={BottomTabsNavigation}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PostShow"
                    component={PostShow}
                    options={{ title: '' }}
                />
                <Stack.Screen
                    name="EditProfileScreen"
                    component={EditProfileScreen}
                    options={{ title: 'Edit Profile' }}
                />
                <Stack.Screen
                    name="ChangePasswordScreen"
                    component={ChangePasswordScreen}
                    options={{ title: 'Change Password' }}
                />
                <Stack.Screen
                    name="TidakMasukHariIniScreen"
                    component={TidakMasukHariIniScreen}
                    options={{ title: "Employee Didn't Work Today" }}
                />
                <Stack.Screen
                    name="RangkingPointsScreen"
                    component={RangkingPointsScreen}
                    options={{ title: "Rangking Points" }}
                />
                <Stack.Screen
                    name="RiwayatAbsensiScreen"
                    component={RiwayatAbsensiScreen}
                    options={{ title: 'Presence History' }}
                />
                <Stack.Screen
                    name="RiwayatPengajuanIzinSakitScreen"
                    component={RiwayatPengajuanIzinSakitScreen}
                    options={{ title: 'Sick or Leave Request History' }}
                />
                <Stack.Screen
                    name="RiwayatPengajuanCutiScreen"
                    component={RiwayatPengajuanCutiScreen}
                    options={{ title: 'Riwayat Pengajuan Cuti' }}
                />
                <Stack.Screen
                    name="RiwayatPengajuanRevisiAbsensiScreen"
                    component={RiwayatPengajuanRevisiAbsensiScreen}
                    options={{ title: 'Riwayat Pengajuan Revisi Absensi' }}
                />
                <Stack.Screen
                    name="ResetPassword"
                    component={ResetPassword}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
