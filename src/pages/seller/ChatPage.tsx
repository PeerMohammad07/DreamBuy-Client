import React,{useEffect} from 'react'
import ChatSideBar from './ChatSideBar'
import { useExpandContext } from '../../Context/ExpandContext'
import ChatMessageContainer from './ChatMessageContainer'

const ChatPage = () => {

  const {setExpanded} = useExpandContext()

  useEffect(()=>{
    setExpanded(false)

    return ()=>{
      setExpanded(true)
    }
  },[])

  return (
    <div className='flex h-screen'>
      <ChatSideBar/>
      <ChatMessageContainer/>
    </div>
  )
}

export default ChatPage
