/**
 * 导航栏
 */

import React, {
  Component,
  PropTypes
} from 'react'
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native'
import px2dp from '../utils/Utils'
import Icon from 'react-native-vector-icons/Ionicons'

export default class NavBar extends Component{

    static propTypes = {

        title: PropTypes.string,
        leftIcon: PropTypes.string,
        rightIcon: PropTypes.string,
        leftPress: PropTypes.func,
        rightPress: PropTypes.func,
        style: PropTypes.object
    }
    static topbarHeight = (Platform.OS === 'ios' ? 64 : 42)
    renderBtn(pos){
      let render = (obj) => {
        const { name, onPress } = obj
        if(Platform.OS === 'android'){
          return (
            <TouchableNativeFeedback onPress={onPress} style={styles.btn}>
              <Icon name={name} size={px2dp(26)} color="#fff" />
            </TouchableNativeFeedback>
          )
        }else{
          return (
            <TouchableOpacity onPress={onPress} style={styles.btn}>
              <Icon name={name} size={px2dp(26)} color="#fff" />
            </TouchableOpacity>
          )
        }
      }
      if(pos == "left"){
        if(this.props.leftIcon){
          return render({
            name: this.props.leftIcon,
            onPress: this.props.leftPress
          })
        }else{
          // return (<ImageButton style={styles.btn} source={require('../images/ic_back_white.png')}/>)
            return (<View style={styles.btn}/>)
        }
      }else if(pos == "right"){
        if(this.props.rightIcon){
          return render({
            name: this.props.rightIcon,
            onPress: this.props.rightPress
          })
        }else{
          return (<View style={styles.btn}/>)
        }
      }
    }
    render(){
        return(
            <View style={[styles.topbar, this.props.style]}>
                {this.renderBtn("left")}
                <Animated.Text numberOfLines={1} style={[styles.title, this.props.titleStyle]}>{this.props.title}</Animated.Text>
                {this.renderBtn("right")}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topbar: {
        height: NavBar.topbarHeight,
        backgroundColor: "#06C1AE",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        paddingHorizontal: px2dp(10)
    },
    btn: {
      width: 22,
      height: 22,
      justifyContent: 'center',
      alignItems: 'center'
    },
    title:{
        color: "#fff",
        fontWeight: "bold",
        fontSize: px2dp(16),
        marginLeft: px2dp(5),
    }
});
