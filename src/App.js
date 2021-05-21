import logo from "./logo.svg";
import "./App.css";
import { useContext, useEffect, useState } from "react";

const friendList = [
  { id: 1, name: "Phoebe" },
  { id: 2, name: "Rachel" },
  { id: 3, name: "Ross" },
];

function ChatRecipientPicker() {
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);

  return (
    <>
      {/* <Circle color={isRecipientOnline ? 'green' : 'red'} /> */}
      <select
        value={recipientID}
        onChange={(e) => setRecipientID(Number(e.target.value))}
      >
        {friendList.map((friend) => (
          <option key={friend.id} value={friend.id}>
            {friend.name}
          </option>
        ))}
      </select>
    </>
  );
}

function UseStateHookExample() {
  const [count, setCount] = useState(0);
  const [{ count1, count2 }, setCountState] = useState({
    count1: 10,
    count2: 20,
  });
  // Similar to componentDidMount and componentDidUpdate:
  //this component sets the document title after React updates the DOM:
  /***
   * When you call useEffect, you’re telling React to run your “effect” function after flushing changes to the DOM.
   */
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   document.title = `You clicked ${count} times`;
  // });

  /* You can tell React to skip applying an effect if certain values haven’t changed between re-renders. 
  To do so, pass an array as an optional second argument to useEffect:
  //  */
  // useEffect(() => {
  //   document.title = `You clicked ${count} times`;
  // }, [count]); // Only re-run the effect if count changes

  return (
    <div>
      <p>You clicked count {count} times</p>
      <p>You clicked count1 {count1} times</p>
      <button onClick={() => setCount(count + 1)}>increment count</button>
      <button
        onClick={() =>
          setCountState((currentState) => ({
            ...currentState,
            count1: currentState.count1 + 1
           
          }))
        }
      >
        increment count 1
      </button>
    </div>
  );
}

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    // ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      // ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
      //In this example, React would unsubscribe from our ChatAPI when the component unmounts,
    };
  }, [props.friend.id]); // Only re-subscribe if props.friend.id changes

  if (isOnline === null) {
    return "Loading...";
  }
  return isOnline ? "Online" : "Offline";
}

//It takes friendID as an argument, and returns whether our friend is online.
//Custom Hooks are more of a convention than a feature.
// If a function’s name starts with ”use” and it calls other Hooks, we say it is a custom Hook.
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  /***
   * useEffect equal to those
   * componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }
  componentDidUpdate(prevProps) {
    // Unsubscribe from the previous friend.id
    ChatAPI.unsubscribeFromFriendStatus(
      prevProps.friend.id,
      this.handleStatusChange
    );
    // Subscribe to the next friend.id
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
    //when you clean up use return inside useEffect()
    componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );

  }

   */
  useEffect(() => {
    // ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      //  ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
// Now we can use it from both components:
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? "green" : "black" }}>{props.friend.name}</li>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <UseStateHookExample />
      </header>
    </div>
  );
}

export default App;
