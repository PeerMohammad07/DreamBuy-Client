import React, { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { rootState } from '../../Redux/store/store'
import { useNavigate } from 'react-router-dom'

// Define the type for the props
interface ProtectLoginProps {
  children: ReactNode
}

const ProtectLogin: React.FC<ProtectLoginProps> = ({ children }) => {
  const status = useSelector((prevState: rootState) => prevState.admin.adminLogin)
  const navigate = useNavigate()

  useEffect(() => {
    if (status) {
      navigate('/admin/')
    }
  }, [status, navigate])

  return <>{!status && children}</>
}

export default ProtectLogin
