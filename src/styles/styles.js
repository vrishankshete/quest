import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    homeContainer: {
        flex:1,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
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
        flexDirection:'column'
    },
    options: {
        flexDirection: 'row',
        marginLeft:20
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