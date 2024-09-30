import { StatusBar } from 'expo-status-bar';
import { startTransition, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Modal } from 'react-native';

export default function App() {


  const url = 'http://localhost:8000/api/v1/cars'

const [data, setData]= useState([])
const [openDialog,setOpenDialog] = useState(false)
const [selectedUser, setSelectedUser] = useState(undefined)

// Getting cars 
  const getAPIData = async () =>{
    const url = 'http://localhost:8000/api/v1/cars'
    let result = await fetch(url);
    result = await result.json();
    setData(result);
  }

  useEffect(() =>{
    getAPIData()
  },[])

  const updateUser = (data) =>{
    setOpenDialog(true)
    setSelectedUser(data)
  }

  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState(0)

  // Posting new cars 
  const saveCars= async () =>{
    console.warn(make)
    
    let result = await fetch(url, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body:JSON.stringify({make,model,year})
    });
    result = await result.json();
    if(result){
      console.warn("Data is added ")
    }
  }

// Deleting cars 
  const deleteCar = async (_id) =>{
    let result = await fetch(`${url}/${_id}`, {
      method: "DELETE",
    });
    result = await result.json();
    if(result){
      console.warn("Car has been deleted ")
      getAPIData()
    }
  }

  return (
    <View style={styles.container}> 
      <Text style={{fontSize: 30, marginTop:30}}>Add Your Favorite Cars Here! </Text>
      <TextInput placeholder='Car Make' style={styles.input} value={make}
    onChangeText={(text) => setMake(text)}
    ></TextInput> 
    <TextInput placeholder='Car Model' style={styles.input} value={model}
    onChangeText={(text) => setModel(text)}
    >
    </TextInput>
    <TextInput placeholder='Car Year'style={styles.input} value={year}
    onChangeText={(text) => setYear(text)}
    ></TextInput>
    <Button title='Save Car' onPress={saveCars}></Button>

    <View>
      <Text style={{fontSize: 30, color:'#3a3335'}}>Car List</Text>
      {
        data.length?
        <FlatList
        data= {data}
        renderItem={({item}) => <View style={styles.list}>
          <Text style={{fontSize: 15}}> Make:{item.make}</Text>
          <Text style={{fontSize: 15}}>Model:{item.model}</Text>
          <Text style={{fontSize: 15}}>Year:{item.year}</Text>
          <Button title='Delete Button' onPress={() => deleteCar(item._id)}>Delete</Button>
          <Button title='Update Button' onPress={updateUser}>Update</Button>
        </View>}
        />
        :null
      }

    <Modal visible={openDialog} transparent={false}>
      <UpdateModal setOpenDialog={setOpenDialog} selectedUser={selectedUser}/>
    </Modal>

    </View>
    </View>
  
  )
}


// used to try and Update but did not work
const UpdateModal = (props) =>{
  console.warn(props.selectedUser)
  const [make, setMake] = useState(undefined)
  const [model, setModel] = useState(undefined)
  const [year, setYear] = useState(undefined)

  useEffect(() =>{
    if(props.selectedUser){
      setMake(props.selectedUser.name)
      setModel(props.selectedUser.model)
      setYear(props.selectedUser.year)
    }
  },[props.selectedUser])

  const updateUser = async () => {
      console.warn(make,model,year)
      const url = 'http://localhost:8000/api/v1/cars'
      const id = props.selectedUser._id
      let result = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify({make,model,year})
      });
      result = await result.json();
      if(result){
        console.warn("Car has been updated ")
        getAPIData()
      }
    }
  return(
    <View>
      <TextInput placeholder='Car Make' style={styles.input} value={make}
    onChangeText={(text) => setMake(text)}
    ></TextInput> 
    <TextInput placeholder='Car Model' style={styles.input} value={model}
    onChangeText={(text) => setModel(text)}
    ></TextInput>
    <TextInput placeholder='Car Year'style={styles.input} value={year}
    onChangeText={(text) => setYear(text)}
    ></TextInput>
    <View>
      <Button onPress={updateUser} title='Update User'></Button>
      </View>
      <Button onPress={() => props.setOpenDialog(false)} title='Close'></Button>
      
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C6D8D3',
  },
  input:{
    margin:20,
    backgroundColor:'#d9d1c1',
    borderColor: "black",
    borderWidth:1
  },
  list:{
    borderBottomColor:"black",
    borderBottomWidth: 1, 
  },
  
});
