import { Outlet, useNavigate } from 'react-router-dom';
import styles from './AuthLayout.module.css';
import { useEffect } from 'react';

export function AuthLayout() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate("login");
  }, [ navigate]);
  return (
    <div className={styles['layout']}>

      <div className={styles['content']}>
        <Outlet />
      </div>
    </div>
  );
}
