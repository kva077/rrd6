import React from "react";
import { Link, useParams, Navigate, Outlet, useRoutes } from "react-router-dom";

function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "users",
      element: <UsersLayout />,
      children: [
        {
          path: "",
          element: <UsersListPage />,
        },
        {
          path: "/users/:userId/profile",
          element: <UserProfilePage />,
        },
        { path: "/users/:userId/edit", element: <EditUserPage /> },
      ],
    },
    { path: "*", element: <Navigate to="/" /> },
  ]);
  return (
    <>
      <h1>App Layout</h1>
      <Link to="/users">Users List Page</Link>
      {/* <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersLayout />}>
          <Route index element={<UsersListPage />} />
          <Route path="/users/:userId/edit" element={<EditUserPage />} />
          <Route path="/users/:userId/profile" element={<UserProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes> */}
      {routes}
    </>
  );
}

function HomePage() {
  return <h1>Main Page</h1>;
}

function UsersListPage() {
  const usersArr = [
    { name: "User 1", id: 1 },
    { name: "User 2", id: 2 },
    { name: "User 3", id: 3 },
    { name: "User 4", id: 4 },
    { name: "User 5", id: 5 },
  ];
  return (
    <>
      <h1>Users List Page</h1>
      <ul>
        {usersArr.map((u) => (
          <li key={u.id}>
            <Link to={`${u.id}/profile`}>{u.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function UsersLayout() {
  return (
    <>
      <h1>Users Layout</h1>
      <Link to="/">Main Page</Link>
      <Outlet />
    </>
  );
}

function UserProfilePage() {
  const params = useParams();
  const id = params.userId;
  return (
    <>
      <h1>User Profile Page</h1>
      <ul>
        <li>
          <Link to="/users">Users List Page</Link>
        </li>
        <hr />
        <li>
          <Link to={`/users/${id}/edit`}>Edit this user</Link>
        </li>
      </ul>
      <span>User Id: {id}</span>
    </>
  );
}

function EditUserPage() {
  const params = useParams();
  const id = params.userId;
  return (
    <>
      <h1>Edit User Page</h1>
      <ul>
        <li>
          <Link to="/users">Users List Page</Link>
        </li>
        <hr />
        <li>
          <Link to={`/users/${id}/profile`}>User Profile Page</Link>
        </li>
        <li>
          <Link to={`/users/${+id + 1}/profile`}>Another User</Link>
        </li>
      </ul>
    </>
  );
}

export default App;
