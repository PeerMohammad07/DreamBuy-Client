import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { rootState } from '../../Redux/store/store'
import { useNavigate } from 'react-router-dom'

// Define the type for the props
interface ProtectLoginProps {
  children: ReactNode
}

const ProtectLogin: React.FC<ProtectLoginProps> = ({ children }) => {
  const status = useSelector((prevState: rootState) => prevState.seller.sellerLogin)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (status) {
      navigate('/seller/')
    }
  }, [status, navigate])

  return <>{!status && children}</>
}

export default ProtectLogin
