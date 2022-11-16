import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import { publicRoutes, privateRoutesStaff, privateRoutesClient } from '~/routes';
import Missing from './pages/Missing';
import IsLogged from './components/IsLogged';
import Login from './pages/Login/Login';
import Resigter from './pages/Resigter/Resigter';

const ROLES = {
    client: '0',
    staff: '1',
};
function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* pages with not conditions */}
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}

                    {/* pages is disable when logged */}
                    <Route element={<IsLogged />}>
                        <Route path="/login" element={<Login />} />;
                        <Route path="/resigter" element={<Resigter />} />;
                    </Route>

                    {/* pages allow for staff */}
                    <Route element={<RequireAuth allowedRoles={ROLES.staff} />}>
                        {privateRoutesStaff.map((route, index) => {
                            const Page = route.component;
                            return <Route key={index} path={route.path} element={<Page />} />;
                        })}
                    </Route>

                    {/* pages allow for client */}
                    <Route element={<RequireAuth allowedRoles={ROLES.client} />}>
                        {privateRoutesClient.map((route, index) => {
                            const Page = route.component;
                            return <Route key={index} path={route.path} element={<Page />} />;
                        })}
                    </Route>
                    <Route path="*" element={<Missing />}></Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
