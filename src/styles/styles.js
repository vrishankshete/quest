import { StyleSheet} from 'react-native';

export const homeStyles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center'
    },
    titleContainer:{
        flex:1,
        justifyContent:'center'
    },
    actionsContainer:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    actionsInnerContainer:{
        flex:1,
        alignItems:'center'
    },
    textBig:{
        textAlign:'center', 
        padding:'5%', 
        fontWeight:'bold', 
        fontSize:26, 
        color:'white'
    },
    textMedium:{
        textAlign:'center',
        fontWeight:'bold', 
        fontSize:16, 
        color:'white'
    },
    handButton: {
        height:'80%',
        width:'25%',
        justifyContent:'center',
        borderRadius: 10
    },
    input: {
        width:'80%',
        height:'20%',
        textAlign: 'center',
        color:'white'
    },
    quizButton: {
        width:'80%',
        height:'40%',
        justifyContent:'center',
        backgroundColor:'#841584',
        borderRadius: 10
    }
});

export const stageStyles = StyleSheet.create({
    container:{
        paddingTop:'10%',
        flex:1
    },
    nextButtonContainer:{
        flex:0.07,
        flexDirection:'row',
        justifyContent:'center'
    },
    nextButton:{
        width:'40%',
        justifyContent:'center',
        backgroundColor:'black',
        borderRadius: 10
    },
    nextButtonText:{
        textAlign:'center',
        color:'white'
    },
    innerContainer:{
        flex:1,
        justifyContent:'center'
    },
    questionContainer:{
        flex:1,
        padding:'2%'
    },
    questionText:{
        color:'white',
        fontSize:18
    },
    optionText:{
        color: 'white',
        fontSize:16,
        fontWeight:'normal'
    },
    optionContainer:{
        backgroundColor: 'transparent',
        borderColor:'transparent'
    },
    optionsContainer:{
        flex:0.15,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly'
    },
    ansButtonContainer:{
        flex:0.1,
        flexDirection:'row',
        justifyContent:'center'
    },
    ansButton:{
        width:'40%',
        justifyContent:'center',
        backgroundColor:'black',
        borderRadius: 10
    },
    progressContainer:{
        flex:0.1,
        paddingLeft: '2%',
        paddingRight: '2%',
        justifyContent:'space-around'
    },

});

export const gradientColors = ['#000000', '#030184'];

  export const styles = StyleSheet.create({
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
    titleText: {
      fontSize: 50,
    },
  });