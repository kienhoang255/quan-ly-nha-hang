import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutesLv1, privateRoutesLv2, publicRoutes } from '~/routes';
import { IsLogged, ProtectRoute } from './components/IsLogged';
import StaffLayout from './layout/StaffLayout/StaffLayout';
import Menu from '~/pages/Staff/Menu/Menu';
import IsFetching from './components/IsFetching/IsFetching';
import Missing from './pages/Missing';

function App() {
    return (
        <Router>
            <IsFetching>
                <div className="App">
                    <Routes>
                        <Route path="*" element={<Missing />} />

                        <Route element={<IsLogged />}>
                            {publicRoutes.map((route, index) => {
                                const Page = route.component;
                                return <Route key={index} path={route.path} element={<Page />} />;
                            })}
                        </Route>

                        <Route element={<ProtectRoute />}>
                            <Route element={<StaffLayout />}>
                                {privateRoutesLv1.map((route, index) => {
                                    const Page = route.component;
                                    return <Route key={index} path={route.path} element={<Page />} />;
                                })}

                                {privateRoutesLv2?.map((route, index) => {
                                    const Page = route.component;
                                    return <Route key={index} path={route.path} element={<Page />} />;
                                })}
                            </Route>
                            <Route path="/menu" element={<Menu />} />
                        </Route>
                    </Routes>
                </div>
            </IsFetching>
        </Router>
    );
}

export default App;
