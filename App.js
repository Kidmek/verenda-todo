import { StatusBar } from 'expo-status-bar'
import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { styles } from './app.style'
import * as SQLite from 'expo-sqlite'
import { useEffect, useState } from 'react'
import Todo from './components/Todo/Todo'
import moment from 'moment'
import { AntDesign } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'

export default function App() {
  const db = SQLite.openDatabase('test5.db')
  const [loading, setLoading] = useState(true)
  const [todos, setTodos] = useState([])
  const [groups, setGroups] = useState({})
  const [title, setTitle] = useState('')
  const [titleErrr, setTitleErrr] = useState(false)
  const [calendarVisible, setCalendarVisible] = useState(false)
  const [date, setDate] = useState(new Date())

  //Functions
  const fetchTodos = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM todos',
        null,
        (_, res) => {
          setTodos(res.rows._array)
          setLoading(false)
        },
        (_, err) => {
          console.log('Select Error:', err)
          setLoading(false)
        }
      )
    })
  }

  const addTodo = () => {
    const sqlDate = date.toISOString().split('T')[0]
    if (title) {
      setTitleErrr(false)
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO todos (title,done,created_at) values (?,?,?)',
          [title, false, sqlDate],
          (_, res) => {
            setTodos([
              ...todos,
              { id: res.insertId, title: title, created_at: sqlDate },
            ])
            setTitle(null)
          },
          (_, err) => console.log('Insert Error:', err)
        )
      })
    } else {
      setTitleErrr(true)
    }
  }

  const updateTodo = (id, title) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE todos set title = ? where id = ?',
        [title, id],
        (_, res) => {
          if (res.rowsAffected > 0) {
            let prev = [...todos]

            setTodos([
              ...prev.map((todo) => {
                if (todo.id === id) {
                  todo.title = title
                }
                return todo
              }),
            ])
          }
          setTitle(null)
        },
        (_, err) => console.log('Insert Error:', err)
      )
    })
  }

  const deleteTodo = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM todos where id=?',
        [id],
        (_, res) => {
          if (res.rowsAffected > 0) {
            setTodos([...todos.filter((todo) => todo.id != id)])
          }
        },
        (_, err) => console.log('Delete Error:', err)
      )
    })
  }

  //

  // UseEffects
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT , done BOOL,created_at DATE)',
        null,
        () => fetchTodos(),
        (_, err) => console.log('Create Error:', err)
      )
    })
  }, [])

  useEffect(() => {
    const grouped = todos.reduce((group, todo) => {
      const { created_at } = todo
      group[created_at] = group[created_at] ?? []
      group[created_at].push(todo)
      return group
    }, {})
    setGroups(grouped)
  }, [todos])
  //
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>Loading Todos...</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      {calendarVisible && (
        <DateTimePicker
          value={date}
          onChange={(e, selected) => {
            setDate(new Date(selected))
            setCalendarVisible(false)
          }}
          mode={'date'}
        />
      )}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            testID='todo-title'
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder='Todo Title'
          />
          <TouchableOpacity
            style={styles.calendarBtn}
            onPress={() => setCalendarVisible(true)}
          >
            <AntDesign color={'blue'} size={22} name='calendar' />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          testID='todo-add'
          onPress={addTodo}
          style={styles.addBtn}
        >
          <Text style={{ color: 'white' }}>ADD</Text>
        </TouchableOpacity>
      </View>
      {titleErrr && <Text style={styles.errTxt}>Title Required</Text>}
      <View style={styles.divider} />
      <FlatList
        data={Object.keys(groups)}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={<View style={styles.separator} />}
        keyExtractor={(item) => item}
        renderItem={({ item: group }) => {
          let title = moment(new Date(group)).startOf('days').fromNow()
          if (title.includes('hours') || title.includes('seconds')) {
            title = 'Today'
          }
          return (
            <FlatList
              data={groups[group]}
              renderItem={({ item }) => (
                <Todo
                  todo={item}
                  deleteTodo={deleteTodo}
                  updateTodo={updateTodo}
                />
              )}
              ListHeaderComponent={<Text style={styles.title}>{title}</Text>}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={
                <View>
                  <Text style={styles.emptyText}>No Tasks Yet</Text>
                </View>
              }
              ItemSeparatorComponent={<View style={styles.separator} />}
            />
          )
        }}
      />
    </View>
  )
}
