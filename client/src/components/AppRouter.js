import React, {useContext} from "react";
import {Routes, Route, Navigate } from 'react-router-dom';
import {authRoutes, publicRoutes} from "../routes";
import { LOGIN_ROUTE } from "../utils/constsRoutes";
import {Context} from "../index";

function AppRouter() {
  const {user} = useContext(Context)

  return (
    <Routes>
      {user.isAuth && authRoutes.map(({path, Component}) => 
        <Route key={path} path={path} element={<Component />} />
      )}

      {publicRoutes.map(({path, Component}) =>
        <Route key={path} path={path} element={<Component />} />
      )}

      <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />}
    />
    </Routes>
  );
}

export default AppRouter;
