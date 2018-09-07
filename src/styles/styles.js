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
        justifyContent: 'center',
    },
    loadingContainer: {
        marginTop: 270,
        justifyContent: 'center'
    },
    resultsContainer: {
        marginTop: 22,
        marginLeft: 20,
        justifyContent: 'center'
    },
    buttonContainer: {
        flexDirection:'column',
        marginLeft:20
    },
    options: {
        flexDirection: 'row',
        marginLeft:20
    },
    questionButton: {
        margin:10,
        width:110,
        height:30,
        justifyContent:'center',
        backgroundColor:'#DDDDDD'
    },
    titleText: {
      fontSize: 50,
    },
  });