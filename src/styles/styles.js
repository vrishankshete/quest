import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    homeContainer: {
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    homeContainer1: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    orientationContainer:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center'
    },
    lefty: {
        marginRight:'20%',
        marginTop:90,
        height:140,
        width:'25%',
        justifyContent:'center',
        backgroundColor:'black',
        borderRadius: 10
    },
    righty:{
        marginLeft:'20%',
        marginTop:90,
        height:140,
        width:'25%',
        justifyContent:'center',
        backgroundColor:'black',
        borderRadius: 10
    },
    questionContainer: {
        width:'100%',
        flex:1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    modalContainer: {
        width:'100%',
        height:'100%'
    },
    loadingContainer: {
        marginTop: 270,
        justifyContent: 'center'
    },
    resultsContainer: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
        padding: 20
    },
    buttonContainer: {
        flexDirection:'row',
        alignSelf:'flex-end'
    },
    options: {
        flexDirection: 'row',
        marginLeft:2
    },
    questionButton: {
        margin:20,
        width:110,
        height:40,
        justifyContent:'center',
        backgroundColor:'black',
        borderRadius: 10
    },
    singleQuizButton: {
        width:80,
        height:80,
        justifyContent:'center',
        backgroundColor:'#841584',
        borderRadius: 80
    },
    titleText: {
      fontSize: 50,
    },
  });