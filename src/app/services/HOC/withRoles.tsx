import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

function hasRequiredPermissions( requiredPermissions: number[], userPermissions: number[]): boolean {
  return requiredPermissions.some(permission => userPermissions.includes(permission)
  );
}

export function withRoles( Component: any, requiredPermissions: number[], goBackRoute: string) {
  return function WithRolesWrapper(props: any) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push(goBackRoute);
        return;
      }

        const decodedToken: { rolId: number } = jwtDecode(token);

        if (!decodedToken.rolId) {
          router.push(goBackRoute);
          return;
        }

        const userPermissions = [decodedToken.rolId];
        const hasPermission = hasRequiredPermissions(requiredPermissions, userPermissions);

        if (!hasPermission) {
          router.push(goBackRoute);
        }
    }, []);

    if (Component) {
      return <Component {...props} />;
    }

    return null;
  };
}