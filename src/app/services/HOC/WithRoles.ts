"use client"

import { useRouter } from 'next/navigation'
import { jwtDecode } from "jwt-decode";

function hasRequiredPermissions(requiredPermissions: string[],userPermissions: string[]): boolean {
  // get userPermissions from the redux-store
  return requiredPermissions.some((permission) =>
    userPermissions.includes(permission)
  )
}

export function withRoles(Component: any, requiredPermissions: string[],goBackRoute: string) {
  return function WithRolesWrapper(props: any) {
    const router = useRouter();

    const token = localStorage.getItem('accessToken');

    let userPermissions : string[] = [];
    if (token) {
      const decodedToken: { role: string[] } = jwtDecode(token);

      if (decodedToken.role) {
        userPermissions = decodedToken.role;
      }
    }


    const hasPermission = hasRequiredPermissions(requiredPermissions, userPermissions)
    if (hasPermission) {
      return <Component {...props} />
    } else {
      router.push(goBackRoute)
      return null
    }
  }
}