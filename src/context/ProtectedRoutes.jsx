import React from 'react'
import { Navigate } from 'react-router'
import { UserAuth } from './AuthContext'

export function UserRoutes({ children }) {
  const { user } = UserAuth()
  if (!user) {
    return <Navigate to="/" />
  } 

  return children
}

export function NoUserRoutes({ children }) {
  const { user } =  UserAuth()
  if (user) {
    return <Navigate to="/notes" />
  }

  return children
}
